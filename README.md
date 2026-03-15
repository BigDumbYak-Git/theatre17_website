# Theatre 17 Website — Phase 4

This is the complete Eleventy-powered version of the Theatre 17 website.
It replaces the static HTML files from Phase 1 with a templated system
that reads content from the CMS data files automatically.

---

## First-time Setup on Your Computer

You only need to do this once.

### Step 1 — Install Node.js

1. Go to https://nodejs.org
2. Download the LTS version (the button labelled "LTS")
3. Run the installer — all defaults are fine
4. When it finishes, open Terminal (Mac) or Command Prompt (Windows)
5. Type: node --version
   You should see something like: v18.x.x
   If you do, Node is installed successfully.

### Step 2 — Install the project dependencies

1. Open Terminal / Command Prompt
2. Navigate to the folder where you put these files, e.g.:
     cd Desktop/theatre17-v2
3. Run:
     npm install
   This downloads Eleventy and its dependencies into a node_modules folder.
   It only needs to run once (or again if you add new packages).

### Step 3 — Preview the site locally

Run:
    npm start

This starts a local preview server. Open your browser to:
    http://localhost:8080

The site will live-reload whenever you save a file. Press Ctrl+C to stop.

---

## Deploying to Netlify (replacing the old static site)

### Option A — Replace via GitHub (recommended)

1. In your GitHub repo, DELETE all the old .html files
   (index.html, show.html, archive.html, bios.html, news.html,
    contact.html, about.html) and the old css/, js/, assets/ folders

2. Upload EVERYTHING from this folder into the root of your repo:
   - .eleventy.js
   - netlify.toml          ← replaces the old one
   - package.json
   - src/                  ← entire folder

3. Netlify will detect the push, run "npm run build", and deploy.
   The build takes about 20–30 seconds.
   Your site at theatre17.netlify.app will update automatically.

### Option B — Drag and drop the _site folder

If you want to deploy manually without touching GitHub:
1. Run: npm run build
   This generates a _site/ folder with all the finished HTML.
2. In Netlify dashboard → your site → Deploys
3. Drag the _site/ folder into the deploy drop zone.

---

## File Structure

theatre17-v2/
├── .eleventy.js          ← Eleventy config (filters, collections, settings)
├── netlify.toml          ← Tells Netlify how to build
├── package.json          ← Node dependencies
└── src/
    ├── _data/            ← Global data
    │   ├── settings.js   ← Loads settings/general.json
    │   └── settings/
    │       └── general.json  ← Edit via CMS → Site Settings
    ├── _includes/        ← Shared partials (nav, footer, base layout)
    │   ├── base.njk
    │   ├── nav.njk
    │   └── footer.njk
    ├── admin/            ← Decap CMS dashboard (don't edit)
    │   ├── index.html
    │   └── config.yml
    ├── assets/           ← Logos, uploaded images
    ├── css/              ← style.css
    ├── js/               ← main.js
    ├── shows/            ← One .md file per show (created by CMS)
    ├── members/          ← One .md file per member bio (created by CMS)
    ├── news/             ← One .md file per news post (created by CMS)
    ├── index.njk         ← Home page template
    ├── show.njk          ← Current show page template
    ├── archive.njk       ← Archive page template
    ├── bios.njk          ← Member bios page template
    ├── news.njk          ← News page template
    ├── contact.njk       ← Auditions & contact page template
    ├── about.njk         ← About page template
    └── thank-you.njk     ← Form submission confirmation page

---

## How the CMS connects to the site

When an editor saves content in the CMS dashboard at /admin:
1. Decap CMS writes a .md file to the appropriate folder in GitHub
   (src/shows/, src/members/, or src/news/)
2. Netlify detects the GitHub change and runs: npm run build
3. Eleventy reads all the .md files, runs them through the .njk templates,
   and outputs finished HTML into _site/
4. The finished HTML goes live at theatre17.netlify.app
   — usually within 30 seconds of the editor clicking Save.

Editors never need to know any of this. They just fill in fields and save.

---

## Updating the "current show"

In the CMS under Shows:
1. Open the old current show → set "This is the current show" to OFF → Save
2. Open the new show (or create it) → set "This is the current show" to ON → Save

The homepage hero and Current Show page update automatically on the next build.

---

## Adding your real content

Replace the sample data by editing entries in the CMS dashboard, or by
editing the .md files in src/shows/, src/members/, and src/news/ directly.

The about.njk template has static text for the group history and board
members — edit that file directly for those sections.
