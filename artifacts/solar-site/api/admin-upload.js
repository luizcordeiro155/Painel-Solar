export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false });
  }

  const {
    ADMIN_PASSWORD,
    GITHUB_TOKEN,
    GITHUB_OWNER,
    GITHUB_REPO,
    GITHUB_BRANCH = "main",
  } = process.env;

  const { password, fileName, fileBase64 } = req.body || {};

  if (!ADMIN_PASSWORD || password !== ADMIN_PASSWORD) {
    return res.status(401).json({
      success: false,
      message: "Senha incorreta",
    });
  }

  if (!GITHUB_TOKEN || !GITHUB_OWNER || !GITHUB_REPO) {
    return res.status(500).json({
      success: false,
      message: "Variáveis do GitHub não configuradas",
    });
  }

  if (!fileName || !fileBase64) {
    return res.status(400).json({
      success: false,
      message: "Arquivo inválido",
    });
  }

  const safeName = fileName
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9.]/g, "-");

  const finalName = `${Date.now()}-${safeName}`;
  const githubPath = `artifacts/solar-site/public/uploads/${finalName}`;
  const publicPath = `/uploads/${finalName}`;

  const cleanBase64 = fileBase64.split(",").pop();

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
        content: cleanBase64,
        branch: GITHUB_BRANCH,
      }),
    }
  );

  if (!response.ok) {
    return res.status(500).json({
      success: false,
      message: "Erro ao enviar imagem para o GitHub",
      error: await response.text(),
    });
  }

  return res.status(200).json({
    success: true,
    path: publicPath,
  });
}
