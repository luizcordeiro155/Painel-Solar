import { timingSafeEqual } from "node:crypto";

function firstHeader(value) {
  return String(Array.isArray(value) ? value[0] || "" : value || "")
    .split(",")[0]
    .trim();
}

export function setAdminHeaders(res) {
  res.setHeader("Cache-Control", "no-store, max-age=0");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "no-referrer");
}

export function validateAdminRequest(req, res) {
  setAdminHeaders(res);

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({ success: false, message: "Método não permitido" });
    return false;
  }

  const contentType = firstHeader(req.headers?.["content-type"]).toLowerCase();
  if (!contentType.startsWith("application/json")) {
    res.status(415).json({ success: false, message: "Tipo de conteúdo inválido" });
    return false;
  }

  const origin = firstHeader(req.headers?.origin);
  const host = firstHeader(req.headers?.host).toLowerCase();

  if (origin) {
    try {
      if (new URL(origin).host.toLowerCase() !== host) {
        res.status(403).json({ success: false, message: "Origem não permitida" });
        return false;
      }
    } catch {
      res.status(403).json({ success: false, message: "Origem não permitida" });
      return false;
    }
  }

  return true;
}

export function passwordMatches(provided, expected) {
  if (typeof provided !== "string" || typeof expected !== "string") return false;

  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}
