// @ts-nocheck

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Método não permitido",
    });
  }

  const {
    ADMIN_PASSWORD,
    GITHUB_TOKEN,
    GITHUB_OWNER,
    GITHUB_REPO,
    GITHUB_BRANCH = "main",
    CONTENT_PATH = "artifacts/solar-site/public/site-content.json",
  } = process.env;

  const { action, password, content } = req.body || {};

  if (!ADMIN_PASSWORD || password !== ADMIN_PASSWORD) {
    return res.status(401).json({
      success: false,
      message: "Senha incorreta",
    });
  }

  if (action === "login") {
    return res.status(200).json({
      success: true,
    });
  }

  if (action !== "save") {
    return res.status(400).json({
      success: false,
      message: "Ação inválida",
    });
  }

  if (!GITHUB_TOKEN || !GITHUB_OWNER || !GITHUB_REPO) {
    return res.status(500).json({
      success: false,
      message: "Variáveis do GitHub não configuradas",
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
      const error = await currentFileResponse.text();
      return res.status(500).json({
        success: false,
        message: "Erro ao buscar arquivo no GitHub",
        error,
      });
    }

    const currentFile = await currentFileResponse.json();

    const jsonContent = JSON.stringify(content, null, 2);

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
      const error = await updateResponse.text();
      return res.status(500).json({
        success: false,
        message: "Erro ao salvar no GitHub",
        error,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Conteúdo salvo com sucesso",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Erro interno",
      error: error.message,
    });
  }
}
