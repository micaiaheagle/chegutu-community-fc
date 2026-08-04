# Chegutu Community Football Club — Website Handover

**Developing Talent • Building Character • Inspiring Communities**

A complete, self-contained static website. Pure HTML, CSS and JavaScript plus one
PHP file for form delivery. No database, no build step, no monthly software fees.
Upload it to cPanel and it runs.

---

## 1. Uploading to cPanel (10 minutes)

1. Log into cPanel → **File Manager** → open `public_html`.
2. Delete the default `index.html` or `default.html` if one is there.
3. Zip the **contents** of this `website` folder (not the folder itself), upload
   the zip into `public_html`, then right-click → **Extract**.
4. Confirm `index.html` sits directly inside `public_html` (not in a sub-folder).
5. cPanel → **Security → SSL/TLS Status** → tick your domain → **Run AutoSSL**.
   Wait for the padlock to appear, then the HTTPS redirect in `.htaccess` takes over.
6. Visit your domain. Done.

**Hidden files:** in File Manager click *Settings* and tick
*Show Hidden Files* so you can see `.htaccess`.

---

## 2. Making the contact forms work

Every form posts to `form-handler.php`.

1. cPanel → **Email Accounts** → create `website@yourdomain.com`.
2. Open `form-handler.php` and edit the two lines at the top:

   ```php
   $CLUB_EMAIL = 'admin@ccfc-zw.com';    // where enquiries arrive
   $FROM_EMAIL = 'admin@ccfc-zw.com'; // must be a real mailbox on YOUR domain
   ```

   `$FROM_EMAIL` **must** be a mailbox that exists on your own domain, or the
   host will silently reject the message as spoofed.

3. Optional — route certain enquiries to their own inbox by filling in `$ROUTES`.

**Every submission is also written to `/form-submissions/YYYY-MM.log`** on the
server, so nothing is lost even if email fails. That folder is blocked from the
public web by `.htaccess`.

**If the host has `mail()` disabled**, the site automatically falls back to
opening the visitor's email app with the details pre-filled — forms never
silently fail.

---

## 3. Updating content day to day

### Fixtures, results, league tables, squad, staff, news, shop

Open **`assets/js/data.js`** in any text editor. It is heavily commented. Change
the values, save, upload. That single file drives:

| Section in `data.js` | Controls |
|---|---|
| `CCFC.fixtures` | Fixture lists, match cards, the matchday ticker, countdown |
| `CCFC.results` | Results pages, recent form, the ticker |
| `CCFC.tables` | Both league tables, including the form guide |
| `CCFC.squad` | Squad grids, player profile pages, statistics leaderboards |
| `CCFC.staff` | The Coaches & Staff page, grouped by department |
| `CCFC.news` | News grid, article pages, related stories, search |
| `CCFC.videos` | The video hub |
| `CCFC.products` | Club shop and shopping bag |
| `CCFC.i18n` | Shona and Ndebele translations of the site chrome |
| `CCFC.searchIndex` | What the site search can find |

**Adding a fixture** — copy an existing line and change the values:

```js
{ id:'f16', team:'women', date:'2026-10-17', time:'15:00',
  opponent:'Herentals Queens', home:true, comp:'ZWPSL',
  venue:'Pfupajena Grounds, Chegutu', tickets:true },
```

`team` must be `'women'` or `'boys'`. `date` must be `YYYY-MM-DD`.
`home:true` means the match is at Pfupajena.

**Adding a news article** — add an entry to `CCFC.news`. `body` is an array; each
string becomes a paragraph. It appears automatically on the news page, the
homepage, search and the article page at `article.html?id=yourNewId`.

### Text on the pages themselves

All wording (About, Academy, Safeguarding, Governance, and so on) is plain HTML
inside each `.html` file. Open the file, find the words, change them, save.

> The header and footer are repeated inside each page. If you change a
> navigation link or a phone number, use your editor's *Find in Files* to update
> it across all 36 files at once.

---

## 4. Adding photographs

1. Save the full-size photo into `assets/img/photos/` — name it `p124.jpg`,
   `p125.jpg`, and so on.
2. Save a smaller copy (about 640px on its longest side) into
   `assets/img/thumbs/` with **exactly the same filename**.
3. Add one line to `assets/js/gallery-data.js`:

   ```js
   { id:'p124.jpg', cat:'matchday', w:640, h:426, cap:'Short description of the photo' },
   ```

   `cat` is one of `matchday`, `squad`, `travel`, `staff`, `behind`.
   `w` and `h` are the **thumbnail's** pixel dimensions.

Keep photos under about 250 KB each so the site stays fast.

**Safeguarding:** only publish photographs of players under 18 where a parent or
guardian has consented, and never alongside identifying details. This is written
into the club's own policy on the Safeguarding page.

---

## 4a. What changed in the latest update

- **The league table is now the real one.** Official ZWPSL log, Matchday 15.
  Chegutu Community sit **14th of 15** with 2 W, 0 D, 12 L and 6 points. The
  homepage mini-table shows the top four, then a break, then our own position —
  a plain top-six would have hidden us entirely.
- **The invented results are gone.** They showed wins the record does not
  support. Only the verified 1–3 against Herentals Queens remains. Add real
  results to `CCFC.results` as they happen.
- **Lillian Masase** is on the Coaches & Staff page with her photograph.
- **Boys U19** — 23 photographs from a Division Two matchday, their own gallery
  filter, a rebuilt team page and a homepage section. Credited to Bhora Redu ZW
  Media.
- **Brighton Tinago film** on the homepage. He plays for **Chegutu Town FC**,
  not this club, so the section is framed as Chegutu football rather than
  implying he is one of ours. Change it if you would rather it were not there.
- **WhatsApp channel** linked from the Match Centre heading.
- **The hero video now plays on phones.** It previously loaded only above
  768px. It still skips anyone on Save-Data or a 2G connection.

### Updating the league table each matchday

Open `assets/js/data.js`, find `CCFC.tables.women.rows`, and edit the numbers
straight off the league's published log. Update `season:` to the new matchday.
Nothing else needs touching — the homepage, table page and stats page all read
from that one list. Leave `club:true` on the Chegutu row so it stays highlighted.

The Form column only appears if you add a `form:'WWDLL'` value to the rows. With
no form data it hides itself rather than showing an empty column.

---

## 4b. Two things waiting for you

### ~~The head coach's photograph~~ — done

Lillian Masase is live on **Coaches & Staff** as the lead feature card, with her
photograph at `assets/img/staff/head-coach.jpg`. To change either, replace that
file or edit the first entry in `CCFC.staff`.

### The hero video

`videos/chegutu video.mp4` (3:22, 78 MB) has been cut and compressed into:

| File | Use | Size |
|---|---|---|
| `assets/video/hero-720.mp4` | desktop hero background | 5.5 MB |
| `assets/video/hero-480.mp4` | narrower screens | 2.5 MB |
| `assets/video/hero-poster.jpg` | still frame / fallback | 141 KB |

It is a 60-second cut starting at 0:20 of the original, silent, and it loops.
The original file is untouched.

**Data-conscious by design:** the video only loads on screens 768px and wider,
and never when the browser reports Save-Data or a 2G/3G connection. On a phone
in Chegutu the poster frame shows instead and the photo slides carry the hero —
nobody's bundle gets spent on a 5 MB autoplay.

To swap the video later, replace those three files keeping the same names.

---

## 5. What is placeholder content

Replace these before promoting the site widely:

| What | Where | Note |
|---|---|---|
| Fixtures, results, league standings | `data.js` | Realistic sample data using real league club names. **Scores and standings are invented — with one exception:** the top result, `Chegutu Community Queens 1–3 Herentals Queens`, is the real scoreline read off the club's own match footage. It is marked with a comment in the file. |
| Squad names, ages, appearance and goal totals | `data.js` → `CCFC.squad` | Sample players. Squad cards deliberately use the club crest rather than a photograph, so no real person appears beside a placeholder name. |
| Staff names | `data.js` → `CCFC.staff` | Roles and departments are real; individual names are marked "Head Coach" etc. until you supply them. |
| News articles | `data.js` → `CCFC.news` | Written to be plausible and on-message, but they are drafts, not published history. |
| Shop prices | `data.js` → `CCFC.products` | Set your real prices. |
| Ticket and membership prices | `tickets.html`, `membership.html` | Written directly in the HTML. |
| Social media links | Footer of every page + `data.js` | Currently point at expected handles — update to your real accounts. |
| Email addresses | Throughout | `info@`, `safeguarding@`, `partners@`, `media@` — create these mailboxes or change the addresses. |
| Video thumbnails | `videos.html` | Placeholder cards; embed real YouTube videos when you have them. |
| Domain name | `sitemap.xml`, `robots.txt`, meta tags in each page | Replace `ccfc-zw.com` with your real domain. |

**Photography note:** the supplied archive is almost entirely the Women's First
Team. The Boys First Team and Academy pages therefore use ground, facility and
coaching photographs rather than squad shots — no photograph is captioned as
something it is not. Send through boys' team and academy photos and they can be
dropped straight in.

---

## 6. What is built in

**Structure — 36 pages**
Home · About · Teams · Women's First Team · Boys First Team · Squad · Player
profile · Coaches & Staff · Academy · Player Pathway · Departments · Governance ·
Safeguarding · Community · Careers & Volunteering · Contact · News · Article ·
Fixtures · Results · League Tables · Statistics · Tickets · Gallery · Videos ·
Membership · Donate · Shop · Partners · Register/Trials · Search · Sitemap ·
Privacy · Terms · Accessibility · 404

**Working features**
- Full-bleed hero with wipe transitions, per-slide copy that animates in and out,
  thumbnail rail, progress bars, keyboard and swipe control
- Live matchday ticker, next-match countdown, league tables with form guides
- Filterable squad, news, gallery, video and shop grids
- Photo lightbox with keyboard arrows, swipe and captions
- Shopping bag with quantity control, saved between visits, orders sent to WhatsApp
- Eight validated forms with inline errors, a three-step registration form,
  and an email fallback if PHP mail is unavailable
- Site-wide search (press `/` anywhere)
- English / ChiShona / IsiNdebele switcher for the site chrome
- Membership card live preview

**Technical**
- Mobile-first; tested at 390px and 1440px with zero horizontal overflow
- Fonts self-hosted (276 KB, no Google Fonts request, works behind any firewall)
- Total CSS + JS under 130 KB uncompressed
- Skip link, focus outlines, ARIA labelling, `prefers-reduced-motion` support
- Open Graph and Twitter cards, JSON-LD `SportsOrganization` schema,
  `sitemap.xml`, `robots.txt`, web app manifest, full favicon set
- `.htaccess`: HTTPS redirect, clean URLs (`/fixtures` works), Gzip/Brotli,
  one-year asset caching, security headers, custom 404

---

## 7. File map

```
website/
├── index.html … 404.html          36 pages
├── form-handler.php               form delivery + local log
├── .htaccess                      HTTPS, clean URLs, caching, security
├── sitemap.xml robots.txt site.webmanifest favicon.ico
└── assets/
    ├── css/  main.css             the whole design system
    │         fonts.css            self-hosted font declarations
    ├── js/   data.js              ← EDIT THIS for day-to-day updates
    │         gallery-data.js      ← EDIT THIS to add photographs
    │         main.js              behaviour (no dependencies)
    ├── fonts/                     Archivo, Barlow Condensed, Bodoni Moda, Inter
    └── img/
        ├── photos/                123 full-size photographs
        ├── thumbs/                123 grid-size copies
        ├── crest-*.png            club crest, transparent, six sizes
        ├── favicon-*.png          browser and app icons
        └── sponsor-goldstar.*     Gold Star Travel & Tours
```

---

## 8. Brand reference

| | Value | Used for |
|---|---|---|
| Club Green | `#344E29` | Primary — buttons, headers, accents |
| Crest Navy | `#2D2D45` | Secondary surfaces |
| Club Gold | `#FFF00F` | Highlights, calls to action, the ticker label |
| Ink | `#14180F` | Body text, footer |
| Paper / Cream | `#FFFFFF` / `#F5F6F4` | Page backgrounds |

Fonts: **Archivo** 900 (headlines) · **Barlow Condensed** (labels, nav, stats) ·
**Bodoni Moda** italic (editorial accents) · **Inter** (body text).
All four are already installed in `assets/fonts/` — nothing to download.

---

## 9. Before you go live — checklist

- [ ] `form-handler.php` — both email addresses set to real mailboxes
- [ ] Send a test message through the contact form and confirm it arrives
- [ ] AutoSSL run; padlock showing; `http://` redirects to `https://`
- [ ] Real domain replacing `ccfc-zw.com` in `sitemap.xml`,
      `robots.txt` and the meta tags
- [ ] Real social media links in the footer
- [ ] Real fixtures, results and league standings in `data.js`
- [ ] Real squad names, or the sample squad removed
- [ ] Real ticket, membership and shop prices
- [ ] Submit `sitemap.xml` to Google Search Console
- [ ] Enable the `Strict-Transport-Security` header in `.htaccess`
      (uncomment it) once HTTPS is confirmed working everywhere

---

## 10. Support notes

- Nothing on this site needs Node, npm, a database or a CMS licence.
- Any text editor will do. Notepad++, VS Code and cPanel's own File Manager
  editor all work.
- Always keep a copy of `data.js` before editing it — a stray comma will stop
  the fixtures and squad rendering. If something disappears, open the browser
  console (F12) and it will point at the line.
- The design system in `main.css` is fully commented and organised into twenty
  numbered sections, so a future developer can extend it without guesswork.

*Built for Chegutu Community Football Club, August 2026.*
