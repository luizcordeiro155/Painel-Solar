import {
  applyAdminRateLimit,
  clearAdminAuthFailures,
  getAdminAuthState,
  recordAdminAuthFailure,
} from "../server/rate-limit.js";
import { passwordMatches, validateAdminRequest } from "../server/admin-guard.js";

const FIXED_FAVICON_PATH = "/uploads/1782522774045-wm2.png";
const AUTH_LIMIT_NAMESPACE = "admin-auth";
const AUTH_LIMIT = 5;
const AUTH_WINDOW_MS = 15 * 60 * 1000;

const FIXED_SEO = {
  title: "Aquecedor Solar em Belo Horizonte | Banho e Piscina | WM Solares",
  description:
    "Instalação e manutenção de aquecedor solar para banho e piscina em Belo Horizonte e região. Sistemas convencionais e a vácuo. Orçamento gratuito.",
  keywords:
    "aquecedor solar belo horizonte, instalação de aquecedor solar, aquecimento solar de água, placa solar para banho, aquecimento solar para piscina, boiler solar, sistema solar a vácuo, sistema solar convencional, manutenção de aquecedor solar, aquecimento solar BH, aquecedor solar MG, WM Solares",
  ogTitle: "Aquecedor Solar em Belo Horizonte | Banho e Piscina | WM Solares",
  ogDescription:
    "Aquecimento solar de água para banho e piscina em Belo Horizonte e região. Instalação, manutenção, sistemas convencionais e a vácuo.",
};

function protectSiteIdentity(value) {
  const normalized =
    value && typeof value === "object" && !Array.isArray(value)
      ? JSON.parse(JSON.stringify(value))
      : {};

  if (
    !normalized.brand ||
    typeof normalized.brand !== "object" ||
    Array.isArray(normalized.brand)
  ) {
    normalized.brand = {};
  }

  if (
    !normalized.seo ||
    typeof normalized.seo !== "object" ||
    Array.isArray(normalized.seo)
  ) {
    normalized.seo = {};
  }

  normalized.brand.favicon = FIXED_FAVICON_PATH;
  normalized.seo = {
    ...normalized.seo,
    ...FIXED_SEO,
  };

  return normalized;
}

function serverError(res, context, error) {
  console.error(`[admin-content] ${context}`, {
    message: error instanceof Error ? error.message : String(error || "unknown"),
  });

  return res.status(500).json({
    success: false,
    message: "Erro interno. Tente novamente em instantes.",
  });
}

export default async function handler(req, res) {
  if (!validateAdminRequest(req, res)) return;

  if (!applyAdminRateLimit(req, res, "admin-content", 120, 60 * 1000)) {
    return;
  }

  const {
    ADMIN_PASSWORD,
    GITHUB_TOKEN,
    GITHUB_OWNER,
    GITHUB_REPO,
    GITHUB_BRANCH = "main",
    CONTENT_PATH = "artifacts/solar-site/public/site-content.json",
  } = process.env;

  const { action, password, content, baseSha } = req.body || {};
  const authState = getAdminAuthState(
    req,
    AUTH_LIMIT_NAMESPACE,
    AUTH_LIMIT,
    AUTH_WINDOW_MS
  );

  if (authState.blocked) {
    res.setHeader("Retry-After", String(authState.retryAfter));
    return res.status(429).json({
      success: false,
      message: "Acesso temporariamente bloqueado por excesso de tentativas.",
      auth: authState,
      retryAfter: authState.retryAfter,
    });
  }

  if (!ADMIN_PASSWORD || !passwordMatches(password, ADMIN_PASSWORD)) {
    const nextAuthState = recordAdminAuthFailure(
      req,
      AUTH_LIMIT_NAMESPACE,
      AUTH_LIMIT,
      AUTH_WINDOW_MS
    );

    if (nextAuthState.blocked) {
      res.setHeader("Retry-After", String(nextAuthState.retryAfter));
      return res.status(429).json({
        success: false,
        message: "Limite de tentativas atingido. O acesso foi temporariamente bloqueado.",
        auth: nextAuthState,
        retryAfter: nextAuthState.retryAfter,
      });
    }

    return res.status(401).json({
      success: false,
      message: "Senha incorreta.",
      auth: nextAuthState,
    });
  }

  clearAdminAuthFailures(req, AUTH_LIMIT_NAMESPACE);

  if (action === "login") {
    return res.status(200).json({
      success: true,
      auth: {
        failedAttempts: 0,
        attemptsRemaining: AUTH_LIMIT,
        maxAttempts: AUTH_LIMIT,
        retryAfter: 0,
        blocked: false,
      },
    });
  }

  if (action !== "load" && action !== "save") {
    return res.status(400).json({
      success: false,
      message: "Ação inválida",
    });
  }

  if (!GITHUB_TOKEN || !GITHUB_OWNER || !GITHUB_REPO) {
    console.error("[admin-content] Variáveis obrigatórias do GitHub ausentes");
    return res.status(500).json({
      success: false,
      message: "Erro interno. Tente novamente em instantes.",
    });
  }

  try {
    const fileUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${CONTENT_PATH}?ref=${GITHUB_BRANCH}`;

    const currentFileResponse = await fetch(fileUrl, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
        "User-Agent": "WM-Solucoes-Admin",
      },
    });

    if (!currentFileResponse.ok) {
      console.error("[admin-content] Falha ao buscar conteúdo no GitHub", {
        status: currentFileResponse.status,
      });
      return res.status(502).json({
        success: false,
        message: "Não foi possível acessar o conteúdo do site.",
      });
    }

    const currentFile = await currentFileResponse.json();
    const parsedCurrentContent = JSON.parse(
      Buffer.from(currentFile.content || "", "base64").toString("utf8")
    );
    const currentContent = protectSiteIdentity(parsedCurrentContent);

    if (action === "load") {
      return res.status(200).json({
        success: true,
        content: currentContent,
        sha: currentFile.sha,
      });
    }

    if (!content || typeof content !== "object" || Array.isArray(content)) {
      return res.status(400).json({
        success: false,
        message: "Conteúdo inválido",
      });
    }

    if (!baseSha) {
      return res.status(409).json({
        success: false,
        stale: true,
        currentContent,
        currentSha: currentFile.sha,
        message:
          "Proteção ativada: recarregue o conteúdo antes de salvar para evitar sobrescrever alterações recentes.",
      });
    }

    if (baseSha !== currentFile.sha) {
      return res.status(409).json({
        success: false,
        stale: true,
        currentContent,
        currentSha: currentFile.sha,
        message:
          "O conteúdo do site mudou depois que você abriu o painel. Recarregue o painel antes de salvar para não voltar alterações antigas.",
      });
    }

    const protectedContent = protectSiteIdentity(content);
    const jsonContent = JSON.stringify(protectedContent, null, 2) + "\n";
    const encodedContent = Buffer.from(jsonContent, "utf8").toString("base64");

    const updateResponse = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${CONTENT_PATH}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github+json",
          "Content-Type": "application/json",
          "User-Agent": "WM-Solucoes-Admin",
        },
        body: JSON.stringify({
          message: "Atualiza conteúdo pelo painel admin",
          content: encodedContent,
          sha: currentFile.sha,
          branch: GITHUB_BRANCH,
        }),
      }
    );

    if (!updateResponse.ok) {
      console.error("[admin-content] Falha ao salvar conteúdo no GitHub", {
        status: updateResponse.status,
      });
      return res.status(502).json({
        success: false,
        message: "Não foi possível salvar o conteúdo agora.",
      });
    }

    const updateData = await updateResponse.json();

    return res.status(200).json({
      success: true,
      message: "Conteúdo salvo com sucesso",
      content: protectedContent,
      sha: updateData?.content?.sha || null,
    });
  } catch (error) {
    return serverError(res, "Erro inesperado", error);
  }
}
