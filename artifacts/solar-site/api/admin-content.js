const FIXED_FAVICON_PATH = "/uploads/1782522774045-wm2.png";

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

  // O favicon oficial deve continuar usando a logo original da WM Solares.
  // Esta proteção impede que uma aba antiga do /admin ou um conteúdo salvo
  // anteriormente restaure o favicon antigo ao editar qualquer outra seção.
  normalized.brand.favicon = FIXED_FAVICON_PATH;

  // O SEO técnico principal é definido em index.html/siteContent.tsx e nos
  // arquivos sitemap.xml, robots.txt e llms.txt. Mantemos estes campos do
  // site-content.json sincronizados com os valores atuais para que uma aba
  // antiga do Admin nunca volte a salvar títulos e descrições anteriores.
  normalized.seo = {
    ...normalized.seo,
    ...FIXED_SEO,
  };

  return normalized;
}

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
    CONTENT_PATH = "artifacts/solar-site/public/site-content.json",
  } = process.env;

  const { action, password, content, baseSha } = req.body || {};

  if (!ADMIN_PASSWORD || password !== ADMIN_PASSWORD) {
    return res.status(401).json({
      success: false,
      message: "Senha incorreta",
    });
  }

  if (action === "login") {
    return res.status(200).json({ success: true });
  }

  if (action !== "load" && action !== "save") {
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
      return res.status(500).json({
        success: false,
        message: "Erro ao buscar arquivo no GitHub",
        error: await currentFileResponse.text(),
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
      return res.status(500).json({
        success: false,
        message: "Erro ao salvar no GitHub",
        error: await updateResponse.text(),
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
    return res.status(500).json({
      success: false,
      message: "Erro interno",
      error: error.message,
    });
  }
}
