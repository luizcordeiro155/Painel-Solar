export default async function handler(req: any, res: any) {
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
    });
  }

  const { action, password } = req.body;

  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({
      success: false,
    });
  }

  if (action === "login") {
    return res.status(200).json({
      success: true,
    });
  }

  if (action === "save") {
    return res.status(200).json({
      success: true,
      message: "Salvar GitHub será implementado",
    });
  }

  return res.status(400).json({
    success: false,
  });
}
