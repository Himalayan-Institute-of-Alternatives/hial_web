# HIAL Website — `hial_web`

The official website of the **Himalayan Institute of Alternatives, Ladakh (HIAL)**, served at **[hial.edu.in](https://hial.edu.in)**.

A static HTML + Tailwind CSS site (jQuery loads the shared header and footer). Source lives in this repository; hosting is moving from **GitHub Pages** to **Vercel** (see [Hosting & Deployment](#-hosting--deployment)).

_Last updated: 21 October 2026_

---

## 🌐 Domain & Subdomain Map

> **Important:** Only the root domain `hial.edu.in` is served from *this* repository. The subdomains below are **hosted separately on Hostinger** and are **not part of this codebase**. Do not change them as part of any `hial_web` work.

```
hial.edu.in                      ← THIS REPO (static HTML)
│
├── academics.hial.edu.in        ← Separate: Moodle LMS (Hostinger)
├── fellows.hial.edu.in          ← Separate: Hostinger
├── sef.hial.edu.in              ← Separate: Hostinger
├── cdh.hial.edu.in              ← Separate: Hostinger
│
└── (related, but independently hosted)
    ├── gitanjali.in             ← Separate: WordPress (Hostinger)
    └── hialcdh.in               ← Separate: domain not currently active
```

- DNS for `hial.edu.in` is managed in **Cloudflare**. Email runs on **Google Workspace**; never edit MX or site-verification TXT records.
- DNS values, rollback details and account ownership are kept in the internal IT documentation, not in this repo.

---

## 🚀 Hosting & Deployment

| | |
|---|---|
| **Target host** | Vercel (project `hial-web`) |
| **Previous host** | GitHub Pages (workflow still present, see below) |
| **Production branch** | `main` |
| **Previews** | Any other branch or PR gets a `*.vercel.app` preview URL |

**Migration status:** the Vercel project is set up and deploying from `main`. The switch of `hial.edu.in` DNS from GitHub Pages to Vercel is tracked in the internal IT docs. Until it is complete, the live domain may still be served by GitHub Pages and the security headers below will not be visible on it.

### Two pipelines currently exist

1. **Vercel** — deploys on every push, using `vercel.json`. It does **not** run the GitHub Actions workflow below, and `vercel.json` defines no build step, so **`public/style.css` must be committed up to date** (see [Tailwind](#-tailwind-css)).
2. **GitHub Actions → GitHub Pages** (`.github/workflows/deploy.yml`) — on push/PR to `main`, it installs Tailwind, rebuilds `style.css`, appends cache-busting `?v=` strings to asset references, applies a long list of `sed` case-sensitivity fixes, and publishes `public/` to GitHub Pages. Its fixes only touch the Pages build artifact. **They do not exist on Vercel**, so file names and links must be correct in the source (see [naming rules](#-adding-or-replacing-images-and-files)). Once the Vercel cutover is verified, decide whether to disable this workflow.

The `CNAME` file in the repo root is a GitHub Pages artifact.

### `vercel.json`

Currently sets:

- Security headers on all routes: `X-Content-Type-Options`, `X-Frame-Options` (`SAMEORIGIN`), `Referrer-Policy`, `Permissions-Policy` (geolocation, microphone and camera disabled) and `Strict-Transport-Security` (2 years, `includeSubDomains`, `preload`).
- Long-lived immutable caching for `/static/*.mp4`.

A **Content-Security-Policy** header is deliberately not set yet. It needs an audit of every external script and resource (Google Fonts, jQuery CDN, embeds) first, because a wrong CSP can silently break the site.

> ⚠️ Keep `vercel.json` minimal and valid. It previously contained an invalid `errorPage` property that made *every* deployment fail silently for months. Validate against [Vercel's project configuration docs](https://vercel.com/docs/project-configuration) before pushing.

`public/_redirects` contains a catch-all rule for `/404.html`, which is a Netlify-style file. On Vercel, unmatched routes use `404.html` automatically.

---

## 🗺️ Site Structure

This mirrors the live navigation menu in `public/components/header.html`.

```
hial.edu.in
│
├── Home ───────────────────────────────── index.html
│
├── Thinking
│   ├── Our Philosophy ─────────────────── ourphilosophy.html
│   └── Our Values ─────────────────────── ourvalues.html
│
├── Leadership
│   ├── Patron ─────────────────────────── patron.html
│   ├── Board of Directors ─────────────── boardofdirectors.html
│   ├── Founding Members ───────────────── foundingmembers.html
│   ├── Founding Partners ──────────────── foundingpartners.html
│   └── Advisory Board ─────────────────── advisoryboard.html
│
├── Executive Team ─────────────────────── executiveteam.html
├── Support → Our Supporters ───────────── supporters.html
│
├── Academics
│   ├── Our Schools
│   │   ├── SeRA   (Eco-Responsive Architecture) ── sera.html
│   │   ├── SENSe  (Energy Studies) ─────────────── sense.html
│   │   ├── SHADE  (High Altitude Desert Ecology) ─ shade.html
│   │   └── SoRT   (Responsible Tourism) ────────── sort.html
│   │
│   ├── Internships
│   │   ├── ERBC (Eco-Responsive Building Course) ─ erbc.html
│   │   ├── RTC  (Responsible Tourism Course) ───── rtc.html
│   │   ├── PC   (Plantation Course) ────────────── pc.html
│   │   └── ISC  (Ice-Stupa Course) ─────────────── isc.html
│   │
│   ├── Flagship Programmes
│   │   ├── HILLs Fellowship ────────────────────── hillsfello.html
│   │   ├── Ladakh Fellowship ───────────────────── ladakhfellow.html
│   │   ├── HELM Residency ──────────────────────── helmresidency.html
│   │   └── Ice Stupa Fellowship ────────────────── icestupafellowship.html
│   │
│   ├── Short Courses & Workshops
│   │   ├── OSDA (Open Space Documentary Arts) ──── osda.html
│   │   ├── DFW  (Documentary Film Workshop) ────── dwf.html
│   │   └── DWIJAA — The Second Curve ───────────── dwijaa.html
│   │
│   └── Life at HIAL
│       ├── Campus Life ─────────────────────────── campuslife.html
│       └── Life in Phyang and Ladakh ───────────── lifeatphyangvillage.html
│
├── Our Research Areas
│   ├── Greenhouse Agri Photovoltaics ──────── agrivoltac.html
│   ├── Ice Stupa Automation ───────────────── isautomation.html
│   ├── Solar Tent ─────────────────────────── solartent.html
│   └── Ground Temperature Study ───────────── gts.html
│
├── HIAL
│   ├── Himalayan Farmstays ────────────────── hfs.html
│   ├── Sheshyon Innovations ───────────────── sheshyon.html
│   └── Pride of Ladakh (PoL) ──────────────── pol.html
│
├── Switch Incubation Centre
│   ├── Omniverse ──────────────────────────── omniverse.html
│   ├── Omaju ──────────────────────────────── omaju.html
│   ├── Ladakh Orchards ────────────────────── ladakhorchards.html
│   └── External links: Misty Hills Cabins, Makoii Apothecary, Creative Ladakh
│
├── Our Centers of Excellence
│   ├── PSH Buildings ──────────────────────── psh.html
│   └── Abandoned Village Rehabilitation ───── avr.html
│
├── Events & Updates ───────────────────────── news.html
├── Careers ────────────────────────────────── career.html
├── Student / Faculty login ────────────────── academics.hial.edu.in (external, Moodle)
└── 404 (Not Found) ────────────────────────── 404.html
```

> The exact menu grouping is defined in `header.html` and may be adjusted there. If this diagram and the header disagree, **the header is the source of truth.**

### Pages that exist but are not in the main menu

| Page | Purpose / how it is reached |
|---|---|
| `achievements.html` | Achievements & Recognitions, linked from the home page |
| `jointhecause.html` | Join The Cause, linked from the home page |
| `educon2026.html` | Education Confluence, linked from `news.html` |
| `designfestform.html` | Art & Design Fest registration form |
| `hialgallery.html` | HIAL Gallery |
| `pshs.html`, `cca.html`, `gls.html`, `oll.html` | Secondary or legacy content pages, not linked from the menu |
| `slider.html`, `tempo.html` | Experimental or older home page variants |
| `Copyright & Fair Use/` | Privacy policy, terms & conditions, cancellation/refund, linked from the footer |

### Sub-folders served from this repo

| Folder | Notes |
|---|---|
| `public/sef/` | Static S&E pages, linked from the footer as `./sef/index.html`. This is separate from the `sef.hial.edu.in` subdomain. |
| `public/ttf/` | Static pages, linked from the footer as `./ttf/index.html`. |
| `public/icestupa/` | A separate mini-app with its own `package.json`, an admin UI and serverless API routes (`api/login.js`, `content.js`, `delete.js`). It depends on `@vercel/blob` and an `ADMIN_PASSWORD` environment variable set in Vercel. Treat it as a separate application: do not commit secrets, and review it before changing hosting. |

### Shared components

```
public/components/
├── header.html   ← Nav bar + dropdown menus (desktop AND mobile blocks), loaded on every page
└── footer.html   ← Site footer, loaded on every page
```

Every page loads them with:

```html
<script>
  $(function () {
    $("#header").load("./components/header.html");
    $("#footer").load("./components/footer.html");
  });
</script>
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Markup | Static HTML5 |
| Styling | Tailwind CSS 3.x (utility classes) compiled into `public/style.css`, with theme colours in `tailwind.config.js` |
| Font | Plus Jakarta Sans (Google Fonts) |
| Dynamic includes | jQuery 3.7.1 (`$.load()` for header/footer) |
| Hosting / CI-CD | Vercel (target) · GitHub Actions + GitHub Pages (legacy, still present) |
| DNS | Cloudflare |
| Source control | GitHub, [`Himalayan-Institute-of-Alternatives/hial_web`](https://github.com/Himalayan-Institute-of-Alternatives/hial_web), managed via GitHub Desktop |

---

## 📁 Repository Structure

```
hial_web/
├── public/                    ← Everything that is served
│   ├── index.html
│   ├── [all other pages].html
│   ├── components/            ← header.html, footer.html
│   ├── static/                ← Images, videos, PDFs (some in sub-folders per programme/event)
│   ├── icestupa/              ← Separate mini-app (see above)
│   ├── sef/  ttf/             ← Static sub-sites
│   ├── Copyright & Fair Use/  ← Legal pages
│   ├── style.css              ← COMPILED Tailwind output, committed
│   ├── tailwind.config.js
│   ├── package.json           ← Tailwind dev dependency
│   └── _redirects
├── src/
│   └── input.css              ← Tailwind entry file
├── .github/workflows/
│   └── deploy.yml             ← GitHub Pages build/deploy (legacy pipeline)
├── vercel.json                ← Security headers + caching
├── CNAME                      ← GitHub Pages custom-domain file
├── fix-case-sensitivity.sh / fix-all-case-sensitivity.sh / fix-case-sensitivity.ps1
├── IMAGE_FIXES_SUMMARY.md     ← Record of past case-sensitivity image fixes
└── README.md                  ← This file
```

---

## 🎨 Tailwind CSS

`public/style.css` is **compiled output that is committed to the repo**, and Vercel serves it as-is. If you use a Tailwind class that is not already in `style.css`, it will silently do nothing until you rebuild.

Rebuild from the `public/` folder:

```bash
cd public
npm install                       # first time only
npx tailwindcss -i ../src/input.css -o ./style.css --config ./tailwind.config.js --minify
```

Add `--watch` instead of `--minify` while developing. Commit the regenerated `style.css` together with your page.

Things to know:

- The `dev` script in `public/package.json` uses `./src/input.css`, but the file is at the repo root (`../src/input.css` from `public/`). Use the command above, or fix the script.
- `tailwind.config.js` scans only `./*.{html,js}` (top-level pages). Classes used **only** in `components/header.html` or `components/footer.html` are not picked up unless you add `./components/*.html` to `content`.
- Before building a new page, check that the classes you need exist (for example `grep "sm\\\\:grid-cols-3" public/style.css`), or reuse classes from a similar existing page.

---

## 💻 Local Development

Pages use relative paths (`./style.css`, `./static/...`, `./components/...`) and load components through jQuery, so **do not open HTML files with `file://`**. Serve `public/` instead:

```bash
cd public
python3 -m http.server 8000
```

Then visit `http://localhost:8000/index.html`.

---

## 🔀 Branching & Deployment Workflow

1. Create a feature branch from `main` (for example `ice-stupa-fellowship`).
2. Make changes inside `public/`.
3. Commit and push the branch.
4. Open a Pull Request. Vercel builds a **preview deployment** (see the PR checks for the URL).
5. Review the preview on desktop and mobile; confirm styling, menu entries and links.
6. Merge into `main`, which deploys to production.

**Not yet enforced:** branch protection on `main` (require PR + review, block force-push and deletion). Enabling it is on the IT hardening checklist.

---

## 🖼️ Adding or Replacing Images and Files

Assets live in `public/static/`. Group a programme's or event's files in their own sub-folder (for example `static/icestupa-fellowship/`, `static/educon2026/`, `static/osda/`).

```html
<img src="./static/your-image-name.webp" alt="Description" class="w-full max-w-4xl rounded-lg shadow-lg" />
<a href="./static/your-programme/your-file.pdf" target="_blank" rel="noopener noreferrer">…</a>
```

**Naming rules**

- **Lowercase** file and folder names only. The deploy servers are case-sensitive and Windows is not; this has caused broken images in the past (see `IMAGE_FIXES_SUMMARY.md`). The `Copyright & Fair Use/` folder is a legacy exception and should not be copied as a pattern.
- No spaces: use hyphens or underscores (`helm-hero-1.webp`, not `Helm Hero 1.webp`).
- Prefer `.webp` for images.
- Keep the reference in the HTML exactly equal to the file name on disk, including case.

---

## 📌 Adding a New Page

1. Copy an existing page of the same type, for example **`helmresidency.html`** for programme/fellowship pages. Keep its `<head>`, header/footer loader scripts and card layout.
2. Match the design system: `text-theme-golden` headings, white `rounded-lg shadow-md` cards, `lg:grid lg:grid-cols-2` layout, and a gold **Apply Now** button at the end for application-based programmes.
3. Use a lowercase file name without spaces (for example `icestupafellowship.html`).
4. Add a link in **both** the desktop and the mobile menu blocks of `public/components/header.html`, under the right section. Each block appears once for desktop and once for mobile, so a missed block means the page is missing on one device type.
5. Check any new Tailwind classes exist in `style.css`, or rebuild it (see [Tailwind](#-tailwind-css)).
6. Put downloadable files in `public/static/<page-or-programme-name>/`.
7. Push a branch, open a PR, check the preview, then merge.

### Example: Ice Stupa Fellowship (added October 2026)

- Page: `public/icestupafellowship.html` (structure and look copied from `helmresidency.html`)
- Menu: Academics → Flagship Programmes, below HELM Residency, in both header blocks
- Files: `public/static/icestupa-fellowship/Ice_Stupa_Fellowship_FAQ.pdf`, linked from a "For FAQ click here" section
- Apply button: links to the programme's Google Form
- The page contains placeholder boxes for a video and three images; replace them using the comments in the file once the media is ready

---

## 🧾 Known Quirks / Open Items

- Some menu links look like placeholders: "Mainstreaming PSH Building" points to `gts.html`, and "Progressive Future" and "Emerging Pedagogies" point to `hfs.html`.
- The old `dev` Tailwind script path is wrong (see above).
- Both deployment pipelines (GitHub Pages and Vercel) exist until the cutover is finished.
- Content-Security-Policy, 2FA on the hosting account and `main` branch protection are still pending.

---

*Maintained by the HIAL IT Admin team.*
