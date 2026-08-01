# Deploying — GitHub then Cloudflare Pages

The repository is already initialised and committed on branch `main`, with the
remote pointed at `https://github.com/micaiaheagle/chegutu-community-fc.git`.
Everything below runs from inside this `website` folder.

Both steps need **your** credentials, which is why they were not run for you.

---

## Step 1 — Push to GitHub (2 minutes)

Authenticate once:

```bash
gh auth login
```

Choose **GitHub.com → HTTPS → Login with a web browser**, and paste the one-time
code it shows you.

Then create the repository and push:

```bash
gh repo create micaiaheagle/chegutu-community-fc --public --source=. --remote=origin --push
```

> If `gh` complains that the remote already exists, that is expected — it was
> pre-configured. Use `git push -u origin main` instead.

**Without the `gh` CLI:** create an empty repo named `chegutu-community-fc` at
<https://github.com/new> (no README, no .gitignore), then:

```bash
git push -u origin main
```

Note: the repository is about 28 MB because of the 246 photograph files. That is
well inside GitHub's limits.

---

## Step 2 — Deploy to Cloudflare Pages

### Option A — connect the repo (recommended, auto-deploys on every push)

1. Go to <https://dash.cloudflare.com> → **Workers & Pages** → **Create** →
   **Pages** → **Connect to Git**.
2. Authorise GitHub and select **chegutu-community-fc**.
3. Set the build settings to:

   | Field | Value |
   |---|---|
   | Framework preset | **None** |
   | Build command | *(leave completely empty)* |
   | Build output directory | `/` |
   | Root directory | *(leave empty)* |

4. **Save and Deploy.**

You get `chegutu-community-fc.pages.dev` in about a minute, and every future
`git push` redeploys automatically.

### Option B — deploy straight from this folder

```bash
npx wrangler login
npx wrangler pages deploy . --project-name=chegutu-community-fc
```

`wrangler login` opens your browser once. After that the deploy command works on
its own.

---

## Step 3 — Point your domain at it

Cloudflare Pages → your project → **Custom domains** → **Set up a custom domain**
→ enter `chegutucommunityfc.com` (and `www`). If the domain is already on
Cloudflare DNS the records are created for you and HTTPS is automatic.

Then update the domain in three files and push again:

- `sitemap.xml` — every `<loc>`
- `robots.txt` — the `Sitemap:` line
- the `og:url` and `canonical` tags in each page (find and replace
  `chegutucommunityfc.com` across the folder)

---

## Important: the contact forms on Cloudflare

**Cloudflare Pages does not run PHP.** `form-handler.php` works on cPanel but
will not run on Pages. On Pages the site automatically falls back to opening the
visitor's email app with their details pre-filled, so no form silently fails —
but you have three better options:

1. **Host on cPanel instead** — PHP works, nothing to change. Use `.htaccess`,
   which is already in this folder.
2. **Use a form service** — sign up at Formspree or Web3Forms, then change one
   line in `assets/js/main.js`:

   ```js
   fetch('form-handler.php', { method: 'POST', body: data })
   ```
   becomes
   ```js
   fetch('https://formspree.io/f/YOUR_ID', { method: 'POST', body: data, headers: {Accept: 'application/json'} })
   ```
3. **Use a Cloudflare Pages Function** — create `functions/api/contact.js` and
   point the same fetch at `/api/contact`. Ask your developer for this if you
   want everything staying inside Cloudflare.

`_headers` and `_redirects` in this folder are the Cloudflare equivalents of
`.htaccess` and are already configured — security headers, one-year asset
caching, and the custom 404.

---

## Which host should the club actually use?

| | cPanel | Cloudflare Pages |
|---|---|---|
| Contact forms | Work out of the box | Need a form service or a Function |
| Speed worldwide | One server | Global CDN, much faster from anywhere |
| Cost | Your existing hosting bill | Free tier is plenty for this site |
| Updating | Re-upload changed files | `git push` and it redeploys |
| HTTPS | AutoSSL, a few clicks | Automatic |

**Recommendation:** deploy to Cloudflare Pages for speed and free hosting, and
point the forms at Formspree's free tier. Keep the cPanel copy as a fallback.
