# Client Setup Guide

This guide walks you through deploying your own copy of the NCBI-style site
with OpenAI integration. Total time: **~5 minutes**.

**Live demo (mine, for reference):** https://client1-xi-seven.vercel.app
**Source code:** https://github.com/MohamedMushraf-dev/ncbi-clone-demo

---

## What you're getting

- A 2-page website that looks like the NCBI website
- Page 1: homepage with a search bar (NCBI style)
- Page 2: result page (NCBI Nucleotide style) where the AI answer appears in
  the **REFERENCE 2** block (highlighted yellow)
- All AI calls go through a secure server function — your OpenAI API key
  is **never visible in the browser**

---

## Step 1 — Get an OpenAI API key

1. Go to <https://platform.openai.com/api-keys>
2. Sign in (or create an account)
3. Click **+ Create new secret key**
4. Give it a name (e.g. "NCBI demo") → **Create secret key**
5. **Copy the key** (starts with `sk-...`) — you can only view it once
6. **Recommended:** set a monthly spending limit so the key can't run up a
   surprise bill: <https://platform.openai.com/settings/organization/limits>
   → Set "Hard limit" to e.g. **$5** or **$10**

---

## Step 2 — Deploy to Vercel (choose one option)

### 📌 Don't have a GitHub or Vercel account yet? — read this first

You'll be asked to sign in to both. Both are **100% free**, no credit card,
no plan choice. Total signup time: **~2 minutes**.

1. **GitHub signup** → <https://github.com/signup>
   - Enter email → password → username → solve a small puzzle → verify email
   - Done. (You don't need to upload any code — Vercel handles that.)
2. **Vercel signup** → happens automatically when you click the Deploy button
   below. Just click **"Continue with GitHub"** on the Vercel sign-in screen
   and use the GitHub account you just made.

After this one-time setup, the Deploy button takes ~1 minute.

---

### Option A — One-click Deploy (recommended, easiest)

1. Click this button:

   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FMohamedMushraf-dev%2Fncbi-clone-demo&env=OPENAI_API_KEY&envDescription=Your%20OpenAI%20API%20key%20-%20get%20it%20from%20https%3A%2F%2Fplatform.openai.com%2Fapi-keys&envLink=https%3A%2F%2Fplatform.openai.com%2Fapi-keys&project-name=ncbi-clone-demo&repository-name=ncbi-clone-demo)

   *(Or paste this URL in your browser: <https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FMohamedMushraf-dev%2Fncbi-clone-demo&env=OPENAI_API_KEY&envDescription=Your%20OpenAI%20API%20key&envLink=https%3A%2F%2Fplatform.openai.com%2Fapi-keys&project-name=ncbi-clone-demo&repository-name=ncbi-clone-demo>)*

2. On the Vercel screen → click **Continue with GitHub** (use the account you
   just created above)
3. GitHub asks: **"Authorize Vercel?"** → click **Authorize Vercel**
4. Vercel automatically creates a **copy of the repo in your own GitHub
   account** (you don't need to do anything for this — it just happens)
5. When prompted for `OPENAI_API_KEY`, paste the key from Step 1
6. Click **Deploy**
7. Wait ~30 seconds → you'll get a live URL like
   `https://ncbi-clone-demo-xxx.vercel.app`
8. Click **Visit** to open your live site

🎉 **You're done.** Bookmark this URL — it's your site.

### Option B — Fork manually (if Option A button doesn't work)

1. Go to <https://github.com/MohamedMushraf-dev/ncbi-clone-demo>
2. Click **Fork** (top right) — this copies the repo to your GitHub account
3. Go to <https://vercel.com/new>
4. Sign in → click **Import** next to the forked repo
5. Expand **Environment Variables**, add:
   - **Name:** `OPENAI_API_KEY`
   - **Value:** the key from Step 1
6. Click **Deploy**

---

## Step 3 — Test it

1. Open the deployed URL (Vercel shows it after deploy completes)
2. Type a question in the search bar, e.g. *"What is human ribosomal DNA?"*
3. Click **Search**
4. The result page loads — scroll to **REFERENCE 2** (yellow highlight)
5. You should see the OpenAI answer there

If REFERENCE 2 shows an error like *"Server is not configured"* → the env
variable is missing. Go to **Vercel → Project → Settings → Environment
Variables** and add `OPENAI_API_KEY`, then redeploy.

---

## How to redeploy (after changing the key)

If you change the API key or add it later, the running deployment won't see
the new value until you redeploy:

1. In Vercel, open your project
2. Click the **Deployments** tab
3. Find the latest deployment → click the **⋯** menu → **Redeploy**
4. Confirm — done in ~30 seconds

---

## (Optional) Use your own domain

1. In Vercel project → **Settings → Domains**
2. Add your domain (e.g. `mysite.com`)
3. Vercel will show you the DNS records to add at your registrar
4. Done in a few minutes once DNS propagates

---

## Security — what's protected and what's not

✅ **Protected:**
- Your OpenAI key lives **only** in Vercel's encrypted environment storage
- The key is **never sent to the browser**, never appears in page source,
  never committed to git
- All OpenAI traffic is **server → server** (Vercel → OpenAI), not browser → OpenAI

⚠️ **Things to be aware of:**
- The deployed site is **public** — anyone with the URL can use it (and each
  use costs you a tiny amount on OpenAI)
- If you want to limit usage: set a hard spending limit on OpenAI (Step 1.6)
- For higher security: ask your developer to add rate-limiting or a password
  prompt to the page

---

## Troubleshooting

**"Server is not configured" error in REFERENCE 2**
→ `OPENAI_API_KEY` is missing or wasn't applied. Check Vercel Settings →
Environment Variables, then redeploy.

**"OpenAI error 401"**
→ Key is invalid or expired. Generate a new one and update the env variable.

**"OpenAI error 429"**
→ You hit a rate limit or your account has no credits. Add a payment method
on OpenAI: <https://platform.openai.com/settings/organization/billing>

**Page looks broken / unstyled**
→ Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

---

## Need help?

Contact: Mohamed Mushraf — mohamedmushrafofficial@gmail.com
