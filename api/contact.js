// Vercel serverless function: POST /api/contact
// Secrets (RESEND_API_KEY etc.) only exist here on the server, never in the React bundle.
import { clean, escapeHtml, hasRedis, hashIp, readBody, redis } from "./_lib/helpers.js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  const body = readBody(req);

  // Honeypot: real visitors never fill this in. Quietly drop bot submissions.
  if (body.website) return res.status(200).json({ ok: true });

  // Server-side validation (never trust the browser)
  const name = clean(body.name, 100);
  const email = clean(body.email, 200);
  const subject = clean(body.subject, 150).replace(/[\r\n]+/g, " ");
  const message = clean(body.message, 2000);

  const errors = {};
  if (name.length < 2) errors.name = "Name is required.";
  if (!EMAIL_RE.test(email)) errors.email = "A valid email is required.";
  if (subject.length < 3) errors.subject = "Subject is required.";
  if (message.length < 10) errors.message = "Message must be at least 10 characters.";
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ error: "Please check the form fields and try again.", errors });
  }

  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_TO_EMAIL) {
    return res.status(503).json({ error: "The contact service isn't set up yet." });
  }

  try {
    // Basic spam protection: at most 5 messages per hour per visitor
    if (hasRedis()) {
      const key = `contact:rl:${hashIp(req)}`;
      const [count] = await redis([["INCR", key], ["EXPIRE", key, "3600", "NX"]]);
      if (count > 5) {
        return res.status(429).json({ error: "Too many messages. Please try again later." });
      }
    }

    const html = `
      <p><strong>From:</strong> ${escapeHtml(name)} (${escapeHtml(email)})</p>
      <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
      <hr />
      <p style="white-space:pre-wrap">${escapeHtml(message)}</p>`;

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>",
        to: [process.env.CONTACT_TO_EMAIL],
        reply_to: email,
        subject: `[Portfolio] ${subject}`,
        text: `From: ${name} (${email})\n\n${message}`,
        html,
      }),
    });

    if (!response.ok) {
      console.error("Resend error", response.status, await response.text());
      return res.status(502).json({ error: "The message could not be sent right now." });
    }
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Contact error", err);
    return res.status(500).json({ error: "Something went wrong while sending your message." });
  }
}
