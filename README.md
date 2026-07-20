# Ayomitunde Uji — Portfolio

A single-page portfolio site (plain HTML/CSS/JS, no build step) rebuilt from the original Framer project content.

## Files
- `index.html` — all page content and structure
- `styles.css` — design system (colors, type, layout, animation)
- `script.js` — mobile nav, scroll reveals, splash screen, smoke cursor trail, contact form
- `blog-career.html`, `blog-landing-page.html`, `blog-future.html` — the three "Thoughts" articles, now real pages instead of dead links

## Get your contact form working (2 minutes, free)
The form is wired to [Formspree](https://formspree.io) but needs your own form ID:
1. Go to formspree.io and sign up with **gabrieliyanu2014@gmail.com**.
2. Create a new form — Formspree gives you a form ID.
3. Open `index.html`, find this line near the contact section:
   ```html
   <form class="contact-form" id="contactForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
4. Replace `YOUR_FORM_ID` with the ID Formspree gave you. Save, commit, push.
5. Every submission now arrives as an email at gabrieliyanu2014@gmail.com. Formspree's free plan covers 50 submissions/month.

Note: a plain static site (GitHub Pages) can't write directly to a Google Doc — there's no server to hold credentials safely. Formspree is the standard workaround. If you specifically want submissions to land in a **Google Sheet** instead of email, Formspree's paid plans have a Google Sheets integration, or I can wire up a free Google Apps Script webhook instead — just ask.

## Run locally
Just open `index.html` in a browser, or serve it:
```
python3 -m http.server 8000
```
Then visit `http://localhost:8000`.

## Deploy on GitHub Pages
1. Create a new GitHub repository (e.g. `portfolio`).
2. Push these three files to the repo root:
   ```
   git init
   git add .
   git commit -m "Initial portfolio site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
3. On GitHub: go to **Settings → Pages**.
4. Under "Build and deployment", set **Source** to `Deploy from a branch`, branch `main`, folder `/ (root)`. Save.
5. Your site will be live in a minute or two at:
   `https://<your-username>.github.io/<repo-name>/`

## Next steps to make it fully live
- **Contact form**: currently a static demo. Wire it up to [Formspree](https://formspree.io) (add a `form action="https://formspree.io/f/yourID"`) or Netlify Forms if you host there instead.
- **Real images**: swap the abstract dot pattern in the hero for a portrait or project screenshots — drop image files into an `/images` folder and reference them in `index.html`.
- **Blog posts**: the "Thoughts" section currently shows teaser cards only. Link each `<article class="thought-card">` to a full post page if you want them readable in full.
- **Custom domain**: add a `CNAME` file at the repo root with your domain, and point your DNS at GitHub Pages, if you want something other than the default `github.io` URL.
