# Putting the website live — no commands needed

There are two files in this folder you can **double-click**. That is the whole job.

```
1-PUBLISH-TO-GITHUB.bat     puts the code on GitHub
2-PUBLISH-TO-VERCEL.bat     puts the website live on the internet
```

You do not have to use both. If you only want the site live, run **number 2**.

---

## Before you start — install these two, once

Both are normal Windows installers. Click through, accept the defaults.

| What | Where | Needed for |
|---|---|---|
| **GitHub CLI** | <https://cli.github.com> | file 1 |
| **Node.js** (choose **LTS**) | <https://nodejs.org> | file 2 |

Restart the computer after installing, then carry on.

---

## File 1 — Publish to GitHub

Double-click **`1-PUBLISH-TO-GITHUB.bat`**.

1. Press a key when it asks.
2. It signs you in to GitHub. When the menu appears, choose:
   **GitHub.com** → **HTTPS** → **Login with a web browser**.
3. It shows an eight-character code like `A1B2-C3D4`. Copy it.
4. Your browser opens. Paste the code, and approve.
5. Come back to the black window. It uploads on its own — about 75 MB, so
   give it a few minutes.

When it finishes, your repository is at
<https://github.com/micaiaheagle/chegutu-community-fc>

---

## File 2 — Publish to Vercel (this is what makes it live)

Double-click **`2-PUBLISH-TO-VERCEL.bat`**.

1. Press a key when it asks.
2. Type your email address and press Enter.
3. Vercel emails you a confirmation link. Open your inbox, click it.
4. Come back to the black window — it will have continued on its own.
5. If it asks any questions, pressing **Enter** for each is fine.
   If it asks about linking to an existing project, say **no**.

When it finishes it prints an address ending in **.vercel.app**.
That is your live website. Open it in a browser.

---

## If a black window closes instantly

That means Windows blocked it. Right-click the `.bat` file →
**Properties** → tick **Unblock** at the bottom → **OK**. Then try again.

## If you would rather not use the .bat files at all

Do it entirely in a browser:

1. Go to <https://vercel.com/new> and sign in with your GitHub account.
2. Run file 1 first so the repository exists, then pick
   **chegutu-community-fc** from the list.
3. Framework preset **Other**, build command **empty**, output directory **`.`**
4. **Deploy.**

Every later `git push` then redeploys the site automatically.

---

## Using your own domain

Vercel → your project → **Settings** → **Domains** → add
`ccfc-zw.com`. Vercel shows you the two DNS records to enter at
whoever sells you the domain. HTTPS is automatic.

The site is already built for **https://ccfc-zw.com** — canonical tags,
`sitemap.xml`, `robots.txt` and the social share tags all point there, and
`.htaccess` strips `www.` so the two never disagree. Nothing to edit.

If you ever move to a different domain, Find-and-Replace `ccfc-zw.com` across
the folder and republish.

---

## One catch: the contact forms on Vercel

**Vercel does not run PHP.** `form-handler.php` works on cPanel hosting but
not on Vercel. On Vercel the site falls back to opening the visitor's own email
app with their details already filled in, so nothing fails silently — but it is
not as smooth.

Three ways to fix it, easiest first:

1. **Use a free form service.** Sign up at <https://web3forms.com> (no account
   needed, they email you a key). Then open `assets/js/main.js`, search for
   `form-handler.php`, and change that one line to:

   ```js
   fetch('https://api.web3forms.com/submit', {
     method: 'POST',
     body: (data.append('access_key', 'YOUR-KEY-HERE'), data)
   })
   ```

2. **Host on cPanel instead.** PHP works there with no changes at all — use the
   `.htaccess` file that is already in this folder.

3. **Add a Vercel Function.** Ask a developer for this if you want everything
   inside Vercel.

---

## Which host should the club use?

| | cPanel | Vercel |
|---|---|---|
| Contact forms | Work straight away | Need a form service |
| Speed worldwide | One server | Global network, much faster |
| Cost | Your hosting bill | Free for a site this size |
| Updating | Re-upload changed files | Automatic on every push |
| HTTPS | AutoSSL, a few clicks | Automatic |

**Recommendation:** Vercel for the speed and the free hosting, with Web3Forms
handling the contact forms. Keep the cPanel copy as a backup.

---

## Files already prepared for you

- `vercel.json` — clean URLs, security headers, one-year caching
- `_headers` and `_redirects` — the same thing for Cloudflare Pages, in case
  you ever move
- `.htaccess` — the same thing again for cPanel/Apache
- `.gitignore` — keeps form submissions out of the public repository

None of these need editing.
