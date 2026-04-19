# NCBI Clone with OpenAI Integration

A 2-page static website that mimics the NCBI website style. The user types a
question on the homepage, and the result page (styled like the NCBI Nucleotide
GenBank page) shows the OpenAI answer inside the **REFERENCE 2** block.

**Live demo:** https://client1-xi-seven.vercel.app

## Deploy your own copy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FMohamedMushraf-dev%2Fncbi-clone-demo&env=OPENAI_API_KEY&envDescription=Your%20OpenAI%20API%20key%20-%20get%20it%20from%20https%3A%2F%2Fplatform.openai.com%2Fapi-keys&envLink=https%3A%2F%2Fplatform.openai.com%2Fapi-keys&project-name=ncbi-clone-demo&repository-name=ncbi-clone-demo)

📖 **Full step-by-step setup guide:** [CLIENT_SETUP.md](./CLIENT_SETUP.md)

## Stack

- Pure HTML / CSS / JS (no frameworks)
- One Vercel Serverless Function (`/api/ask.js`) that proxies to OpenAI
- API key kept server-side via Vercel Environment Variables (never in browser)

## How it works

```
[Browser] -> /api/ask?q=question -> [Vercel Function] -> OpenAI -> answer
                                            |
                                    reads OPENAI_API_KEY
                                    from Vercel env vars
```

## Files

| File             | Purpose                                                  |
| ---------------- | -------------------------------------------------------- |
| `index.html`     | Homepage — NIH header, search bar, sidebars              |
| `result.html`    | Nucleotide-style result page; REFERENCE 2 = AI answer    |
| `styles.css`     | All styles (NCBI dark blue header, monospace block, etc.)|
| `script.js`      | Search submit + fetches `/api/ask` on result page        |
| `api/ask.js`     | Serverless function that calls OpenAI server-side        |
| `.env.example`   | Template — copy to `.env` for local dev                  |

## Deploy your own copy

1. Fork or import this repo into Vercel: <https://vercel.com/new>
2. In **Project Settings → Environment Variables** add:
   - **Name:** `OPENAI_API_KEY`
   - **Value:** your key from <https://platform.openai.com/api-keys>
   - **Environments:** Production, Preview, Development
3. Click **Deploy**. Done.

If you change the env var on an existing deployment, go to **Deployments → ⋯ →
Redeploy** so the function picks up the new value.

## Local development

```bash
npm i -g vercel
echo "OPENAI_API_KEY=sk-..." > .env
vercel dev
```

Open http://localhost:3000.

## Security notes

- `OPENAI_API_KEY` lives only on Vercel's servers, encrypted at rest
- The browser only ever talks to `/api/ask`, never to OpenAI directly
- Set a spending limit on your OpenAI account:
  <https://platform.openai.com/settings/organization/limits>
