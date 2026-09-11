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

function keyFor(req, namespace) {
  return `${namespace}:${clientId(req)}`;
}

function pruneExpired(now = Date.now()) {
  const limits = store();

  if (limits.size < 250) return;

  for (const [key, item] of limits.entries()) {
    if (!item || item.resetAt <= now) limits.delete(key);
  }
}

function getActiveItem(req, namespace, windowMs) {
  const now = Date.now();
  const limits = store();
  const key = keyFor(req, namespace);
  let item = limits.get(key);

  if (!item || item.resetAt <= now) {
    item = { count: 0, resetAt: now + windowMs };
    limits.set(key, item);
  }

  pruneExpired(now);
  return { key, item, now, limits };
}

function setRateHeaders(res, item, limit, now) {
  const remaining = Math.max(0, limit - item.count);
  const retryAfter = Math.max(1, Math.ceil((item.resetAt - now) / 1000));

  res.setHeader("X-RateLimit-Limit", String(limit));
  res.setHeader("X-RateLimit-Remaining", String(remaining));
  res.setHeader("X-RateLimit-Reset", String(Math.ceil(item.resetAt / 1000)));

  return retryAfter;
}

function respondRateLimited(res, retryAfter) {
  res.setHeader("Retry-After", String(retryAfter));
  res.status(429).json({
    success: false,
    message: "Muitas tentativas. Aguarde alguns minutos e tente novamente.",
    retryAfter,
  });
}

export function applyAdminRateLimit(req, res, namespace, limit, windowMs) {
  const { item, now, limits, key } = getActiveItem(req, namespace, windowMs);

  item.count += 1;
  limits.set(key, item);

  const retryAfter = setRateHeaders(res, item, limit, now);

  if (item.count > limit) {
    respondRateLimited(res, retryAfter);
    return false;
  }

  return true;
}

export function allowAdminAuthAttempt(req, res, namespace, limit, windowMs) {
  const { item, now } = getActiveItem(req, namespace, windowMs);
  const retryAfter = setRateHeaders(res, item, limit, now);

  if (item.count >= limit) {
    respondRateLimited(res, retryAfter);
    return false;
  }

  return true;
}

export function recordAdminAuthFailure(req, namespace, windowMs) {
  const { item, limits, key } = getActiveItem(req, namespace, windowMs);
  item.count += 1;
  limits.set(key, item);
}

export function clearAdminAuthFailures(req, namespace) {
  store().delete(keyFor(req, namespace));
}
