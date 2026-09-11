import { createHash } from "node:crypto";

const STORE_KEY = "__wmSolarRateLimits";

function store() {
  if (!globalThis[STORE_KEY]) globalThis[STORE_KEY] = new Map();
  return globalThis[STORE_KEY];
}

function header(value) {
  return String(Array.isArray(value) ? value[0] || "" : value || "")
    .split(",")[0]
    .trim();
}

function clientId(req) {
  const ip =
    header(req.headers?.["x-vercel-forwarded-for"]) ||
    header(req.headers?.["x-forwarded-for"]) ||
    header(req.headers?.["x-real-ip"]) ||
    req.socket?.remoteAddress ||
    "unknown";

  return createHash("sha256").update(ip).digest("hex");
}

export function applyAdminRateLimit(req, res, namespace, limit, windowMs) {
  const now = Date.now();
  const key = `${namespace}:${clientId(req)}`;
  const limits = store();
  let item = limits.get(key);

  if (!item || item.resetAt <= now) {
    item = { count: 0, resetAt: now + windowMs };
  }

  item.count += 1;
  limits.set(key, item);

  const remaining = Math.max(0, limit - item.count);
  const retryAfter = Math.max(1, Math.ceil((item.resetAt - now) / 1000));

  res.setHeader("X-RateLimit-Limit", String(limit));
  res.setHeader("X-RateLimit-Remaining", String(remaining));
  res.setHeader("X-RateLimit-Reset", String(Math.ceil(item.resetAt / 1000)));

  if (item.count > limit) {
    res.setHeader("Retry-After", String(retryAfter));
    res.status(429).json({
      success: false,
      message: "Muitas solicitações. Aguarde e tente novamente.",
      retryAfter,
    });
    return false;
  }

  return true;
}
