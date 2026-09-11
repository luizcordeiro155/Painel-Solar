import { applyAdminRateLimit } from "../server/rate-limit.js";
import { passwordMatches, validateAdminRequest } from "../server/admin-guard.js";

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const MIME_EXTENSIONS = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "7mb",
    },
  },
};

function hasValidSignature(buffer, mimeType) {
  if (mimeType === "image/png") {
    return (
      buffer.length >= 8 &&
      buffer.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))
    );
  }

  if (mimeType === "image/jpeg") {
    return buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
  }

  if (mimeType === "image/webp") {
    return (
      buffer.length >= 12 &&
      buffer.subarray(0, 4).toString("ascii") === "RIFF" &&
      buffer.subarray(8, 12).toString("ascii") === "WEBP"
    );
  }

  return false;
}

function safeBaseName(fileName) {
  const withoutExtension = String(fileName || "image")
    .replace(/\.[^/.]+$/, "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);

  return withoutExtension || "image";
}

export default async function handler(req, res) {
  if (!validateAdminRequest(req, res)) return;

  if (!applyAdminRateLimit(req, res, "admin-upload", 10, 10 * 60 * 1000)) {
    return;
  }

  const {
    ADMIN_PASSWORD,
    GITHUB_TOKEN,
    GITHUB_OWNER,
    GITHUB_REPO,
    GITHUB_BRANCH = "main",
  } = process.env;

  const { password, fileName, fileBase64 } = req.body || {};

  if (!ADMIN_PASSWORD || !passwordMatches(password, ADMIN_PASSWORD)) {
    return res.status(401).json({
      success: false,
      message: "Credenciais inválidas",
    });
  }

  if (!GITHUB_TOKEN || !GITHUB_OWNER || !GITHUB_REPO) {
    console.error("[admin-upload] Variáveis obrigatórias do GitHub ausentes");
    return res.status(500).json({
      success: false,
      message: "Erro interno. Tente novamente em instantes.",
    });
  }

  if (typeof fileName !== "string" || typeof fileBase64 !== "string") {
    return res.status(400).json({
      success: false,
      message: "Arquivo inválido",
    });
  }

  const match = fileBase64.match(/^data:(image\/(?:png|jpeg|webp));base64,([A-Za-z0-9+/=\r\n]+)$/);
  if (!match) {
    return res.status(400).json({
      success: false,
      message: "Formato de imagem não permitido. Use PNG, JPG ou WEBP.",
    });
  }

  const mimeType = match[1];
  const extension = MIME_EXTENSIONS[mimeType];
  const decoded = Buffer.from(match[2].replace(/\s/g, ""), "base64");

  if (!decoded.length || decoded.length > MAX_IMAGE_BYTES) {
    return res.status(413).json({
      success: false,
      message: "A imagem deve ter no máximo 5 MB.",
    });
  }

  if (!hasValidSignature(decoded, mimeType)) {
    return res.status(400).json({
      success: false,
      message: "O conteúdo do arquivo não corresponde a uma imagem válida.",
    });
  }

  const finalName = `${Date.now()}-${safeBaseName(fileName)}.${extension}`;
  const githubPath = `artifacts/solar-site/public/uploads/${finalName}`;
  const publicPath = `/uploads/${finalName}`;

  try {
    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${githubPath}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github+json",
          "Content-Type": "application/json",
          "User-Agent": "WM-Solucoes-Admin",
        },
        body: JSON.stringify({
          message: "Upload de imagem pelo painel admin",
          content: decoded.toString("base64"),
          branch: GITHUB_BRANCH,
        }),
      }
    );

    if (!response.ok) {
      console.error("[admin-upload] Falha no upload para o GitHub", {
        status: response.status,
      });
      return res.status(502).json({
        success: false,
        message: "Não foi possível enviar a imagem agora.",
      });
    }

    return res.status(200).json({
      success: true,
      path: publicPath,
    });
  } catch (error) {
    console.error("[admin-upload] Erro inesperado", {
      message: error instanceof Error ? error.message : String(error || "unknown"),
    });
    return res.status(500).json({
      success: false,
      message: "Erro interno. Tente novamente em instantes.",
    });
  }
}
