# HIAL Website — `hial_web`

The official website for the **Himalayan Institute of Alternatives, Ladakh (HIAL)**, deployed at **[hial.edu.in](https://hial.edu.in)**.

This is a static HTML + Tailwind CSS site (jQuery for component loading), deployed via **Vercel**, with source hosted in this GitHub repository.

---

## 🌐 Domain & Subdomain Map

> **Important:** Only the root domain `hial.edu.in` is served from *this* repository. All subdomains below are **separately hosted on Hostinger** and are **not part of this codebase** — they have their own independent hosting, CMS, and deployment pipelines.

```
hial.edu.in                      ← THIS REPO (static HTML, Vercel)
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

**Deployment pipeline for this repo:**
```
git push → main branch → GitHub → Vercel (auto-build & deploy) → hial.edu.in
```

- **Production:** `main` branch → `hial.edu.in`
- **Previews:** any other branch/PR → auto-generated `*.vercel.app` preview URL
- **CNAME** file in repo root points the custom domain to Vercel

---

## 🗺️ Site Structure — Pages by Section

This mirrors the live navigation menu (`public/components/header.html`).

```
hial.edu.in
│
├── Home ─────────────────────────────── index.html
│
├── Our Story
│   ├── Our Philosophy ─────────────────  ourphilosophy.html
│   ├── Our Values ─────────────────────  ourvalues.html
│   ├── Patron ──────────────────────────  patron.html
│   ├── Board of Directors ─────────────  boardofdirectors.html
│   ├── Founding Members ───────────────  foundingmembers.html
│   ├── Founding Partners ──────────────  foundingpartners.html
│   ├── Advisory Board ─────────────────  advisoryboard.html
│   ├── Executive Team ─────────────────  executiveteam.html
│   └── Supporters ──────────────────────  supporters.html
│
├── Our Schools
│   ├── SeRA  (School of Eco-Responsive Architecture) ── sera.html
│   ├── SENSe (School of Energy Studies) ──────────────── sense.html
│   ├── SHADE (School of High Altitude Desert Ecology) ── shade.html
│   └── SoRT  (School of Responsible Tourism) ─────────── sort.html
│
├── Internships
│   ├── ERBC (Eco-Responsive Building Course) ── erbc.html
│   ├── RTC  (Responsible Tourism Course) ────── rtc.html
│   ├── PC   (Plantation Course) ──────────────── pc.html
│   └── ISC  (Ice-Stupa Course) ───────────────── isc.html
│
├── Flagship Programmes
│   ├── HILLs Fellowship ──────────────── hillsfello.html
│   ├── Ladakh Fellowship ─────────────── ladakhfellow.html
│   └── HELM Residency ────────────────── helmresidency.html
│
├── Short Courses & Workshops
│   ├── OSDA (Open Space Documentary Arts) ── osda.html
│   └── DFW  (Documentary Film Workshop) ───── dwf.html
│
├── Life at HIAL
│   ├── Campus Life ────────────────────── campuslife.html
│   └── Life in Phyang and Ladakh ──────── lifeatphyangvillage.html
│
├── Enterprises
│   ├── Agrivoltaics ──────────────────── agrivoltac.html
│   ├── Ice-Stupa Automation ──────────── isautomation.html
│   ├── Solar Tent ────────────────────── solartent.html
│   └── GTS ───────────────────────────── gts.html
│
├── Centers of Excellence
│   ├── HFS (Himalayan Farm Stays) ────── hfs.html
│   ├── SheShyon ──────────────────────── sheshyon.html
│   ├── PoL ───────────────────────────── pol.html
│   ├── Omniverse ─────────────────────── omniverse.html
│   ├── Omaju ──────────────────────────── omaju.html
│   ├── Ladakh Orchards ───────────────── ladakhorchards.html
│   ├── PSH (Mainstreaming) ───────────── psh.html / mainstreaminpsh.html
│   └── AVR ────────────────────────────── avr.html
│
├── Events & Updates ──────────────────── news.html
├── Careers ─────────────────────────────  career.html
└── 404 (Not Found) ─────────────────────  404.html
```

### Shared components

```
public/components/
├── header.html   ← Nav bar + dropdown menus (desktop + mobile), loaded via jQuery on every page
└── footer.html   ← Site footer, loaded via jQuery on every page
```

Every page loads these two via:
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
| Styling | Tailwind CSS (utility classes) + custom `style.css` (theme colors, fonts) |
| Font | Plus Jakarta Sans (Google Fonts) |
| Dynamic includes | jQuery (`$.load()` for header/footer) |
| Hosting / CI-CD | Vercel (auto-deploy on push to `main`) |
| Source control | GitHub — [`Himalayan-Institute-of-Alternatives/hial_web`](https://github.com/Himalayan-Institute-of-Alternatives/hial_web) |
| Domain registrar / DNS | See `CNAME` file — points to `hial.edu.in` |

---

## 📁 Repository Structure

```
hial_web/
├── public/                  ← Everything Vercel actually serves
│   ├── index.html
│   ├── [all other pages].html
│   ├── components/
│   │   ├── header.html
│   │   └── footer.html
│   ├── static/              ← Images, favicon, media assets
│   └── style.css
├── src/                     ← (build-time assets, if used by tooling)
├── .github/workflows/       ← GitHub Actions (case-sensitivity checks etc.)
├── vercel.json               ← Vercel routing/config — keep minimal, see note below
├── CNAME                     ← Custom domain binding for GitHub Pages fallback
└── README.md                  ← This file
```

> ⚠️ **`vercel.json` note:** keep this file minimal. It previously contained an invalid `errorPage` property that broke schema validation and silently failed *every* deployment for months. If editing it, validate against [Vercel's project configuration docs](https://vercel.com/docs/concepts/projects/project-configuration) before pushing.

---

## 🚀 Local Development

Since this is a static site with relative asset paths (`./style.css`, `./static/...`, `./components/...`), **do not open HTML files directly via `file://`** — relative paths will fail to resolve and the page will render unstyled.

Instead, serve the `public/` folder locally:

```bash
cd public
python3 -m http.server 8000
```

Then visit `http://localhost:8000/index.html`.

---

## 🔀 Branching & Deployment Workflow

1. Create a feature branch from `main` (e.g. `vish`, `feature/xyz`)
2. Make changes inside `public/`
3. Commit and push the branch
4. Open a Pull Request → Vercel automatically builds a **preview deployment** (check the PR's comments/checks for the preview URL)
5. Review the preview, confirm styling and links work
6. Merge the PR into `main` → Vercel deploys to **production** (`hial.edu.in`)

**Recommended (not yet enforced):** add branch protection on `main` requiring PR review before merge — see the HIAL IT Admin documentation for the full hardening checklist.

---

## 🖼️ Adding or Replacing Images

All images live in `public/static/`. Reference them in HTML as:

```html
<img src="./static/your-image-name.webp" alt="Description" class="w-full max-w-4xl rounded-lg shadow-lg" />
```

**Naming rules:**
- Lowercase filenames only (this repo has a documented history of case-sensitivity bugs between Windows and the Linux-based deploy server — see `fix-case-sensitivity.sh`)
- No spaces — use hyphens (`helm-hero-1.webp`, not `helm hero 1.webp`)
- Prefer `.webp` for smaller file size and faster load times

---

## 📌 Adding a New Page

1. Create `public/yourpage.html`, copying the `<head>` and header/footer loader pattern from an existing page (e.g. `helmresidency.html`)
2. Match the existing design system: `theme-golden` headings, white `rounded-lg shadow-md` cards, `lg:grid lg:grid-cols-2` layout for content sections
3. Add a corresponding link in **both** the desktop and mobile menu blocks of `public/components/header.html`, under the correct section (see the Site Structure diagram above)
4. Push, open a PR, verify on the preview deployment, then merge

---

*Maintained by the HIAL IT Admin team.*
