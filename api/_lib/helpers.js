import { createHash } from "node:crypto";

// ---------- Upstash Redis (REST API, no extra package needed) ----------
export function hasRedis() {
  return Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);
}

// Sends one or more Redis commands in a single request, e.g. [["INCR", "key"]]
export async function redis(commands) {
  const res = await fetch(`${process.env.UPSTASH_REDIS_REST_URL}/pipeline`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commands),
  });
  if (!res.ok) throw new Error("Redis request failed");
  const data = await res.json();
  return data.map((item) => {
    if (item.error) throw new Error(item.error);
    return item.result;
  });
}

// ---------- Request helpers ----------
// Visitor IPs are hashed with a secret salt, so raw IPs are never stored.
export function hashIp(req) {
  const ip =
    String(req.headers["x-forwarded-for"] || "").split(",")[0].trim() ||
    req.socket?.remoteAddress ||
    "unknown";
  return createHash("sha256")
    .update(ip + (process.env.IP_HASH_SALT || "portfolio"))
    .digest("hex")
    .slice(0, 32);
}

export function readBody(req) {
  try {
    if (typeof req.body === "string") return JSON.parse(req.body);
    return req.body && typeof req.body === "object" ? req.body : {};
  } catch {
    return {};
  }
}

// Trim, strip control characters, and cap length
export function clean(value, max) {
  return String(value ?? "")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .trim()
    .slice(0, max);
}

export function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
