// Vercel Serverless Function — runs on the server, NOT in the browser.
// The OpenAI API key is read from the OPENAI_API_KEY environment variable
// configured in the Vercel dashboard. It is never exposed to the client.

export default async function handler(req, res) {
  // Basic CORS / method guard
  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const question =
    (req.method === "GET" ? req.query.q : (req.body && req.body.q)) || "";
  const q = String(question).trim();

  if (!q) {
    return res.status(400).json({ error: "Missing query parameter 'q'." });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      error:
        "Server is not configured. Add OPENAI_API_KEY in Vercel → Project → Settings → Environment Variables, then redeploy.",
    });
  }

  try {
    const upstream = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + apiKey,
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: [
          {
            role: "system",
            content: [
              {
                type: "input_text",
                text: "You are a helpful assistant. Answer concisely in plain text.",
              },
            ],
          },
          {
            role: "user",
            content: [
              {
                type: "input_text",
                text: q,
              },
            ],
          },
        ],
      }),
    });

    if (!upstream.ok) {
      const text = await upstream.text();
      return res
        .status(upstream.status)
        .json({ error: "OpenAI error", detail: text });
    }

    const data = await upstream.json();
    const answer = (data && data.output_text) || "(empty response)";

    res.setHeader("Cache-Control", "no-store");
    return res.status(200).json({ answer: answer.trim() });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Request failed", detail: String(err && err.message ? err.message : err) });
  }
}
