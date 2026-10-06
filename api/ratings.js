// Vercel serverless function: GET /api/ratings (stats) and POST /api/ratings (submit)
// Ratings live in Upstash Redis as counts per star: ratings:stars -> { "1": n, ..., "5": n }
import { clean, hasRedis, hashIp, readBody, redis } from "./_lib/helpers.js";

async function getStats() {
  const [flat] = await redis([["HGETALL", "ratings:stars"]]);
  // Redis returns ["1","3","5","2", ...] as [star, count, star, count, ...]
  let total = 0;
  let sum = 0;
  for (let i = 0; i < (flat?.length ?? 0); i += 2) {
    const stars = Number(flat[i]);
    const count = Number(flat[i + 1]);
    total += count;
    sum += stars * count;
  }
  return { total, average: total ? Math.round((sum / total) * 10) / 10 : 0 };
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (!hasRedis()) {
    return res.status(503).json({ error: "Ratings aren't set up yet." });
  }

  try {
    if (req.method === "GET") {
      return res.status(200).json(await getStats());
    }

    if (req.method === "POST") {
      const body = readBody(req);
      const rating = Number(body.rating);
      const feedback = clean(body.feedback, 500);

      if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
        return res.status(400).json({ error: "Rating must be a whole number from 1 to 5." });
      }

      // Spam protection: up to 3 ratings per visitor per day
      const key = `ratings:rl:${hashIp(req)}`;
      const [count] = await redis([["INCR", key], ["EXPIRE", key, "86400", "NX"]]);
      if (count > 3) {
        return res.status(429).json({ error: "You've already rated recently. Thank you!" });
      }

      const commands = [["HINCRBY", "ratings:stars", String(rating), "1"]];
      if (feedback) {
        commands.push(
          ["LPUSH", "ratings:feedback", JSON.stringify({ rating, feedback, at: new Date().toISOString() })],
          ["LTRIM", "ratings:feedback", "0", "199"]
        );
      }
      await redis(commands);

      return res.status(200).json({ ok: true, stats: await getStats() });
    }

    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({ error: "Method not allowed." });
  } catch (err) {
    console.error("Ratings error", err);
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
}
