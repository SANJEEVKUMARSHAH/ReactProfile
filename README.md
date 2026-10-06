# Sanjeev Kumar Shah, Portfolio

React + Vite + Tailwind CSS v4 + React Router + AOS.
Contact form and ratings use small serverless functions in `/api` (Vercel), so no secret ever reaches the browser.

## 1. Add your own files (the site works without them, but shows placeholders)

Copy these from your live site / computer:

| File | Where it goes |
| --- | --- |
| Profile photo | `public/profile.jpg` |
| Smart-farming screenshot | `public/images/smart-farming.png` (rename the old "smart-farming webpage.png") |
| Weather App screenshot | `public/images/weather-app.png` |
| Resume | `public/resume.pdf` |

`public/og-image.png` (social preview) and `public/favicon.ico` are simple generated placeholders. Replace them with your own design if you like (OG size 1200x630).

## 2. Run it

```bash
npm install
npm run dev        # site only; /api calls will show friendly error messages
```

To test the contact form and ratings locally, run the whole thing with Vercel's dev server:

```bash
npx vercel dev
```

## 3. Set up the two services (both have free tiers)

1. **Resend** (sends the contact email): create an account and an API key. With the free test sender
   (`onboarding@resend.dev`), Resend only delivers to the email address you signed up with, which is perfect for a portfolio inbox.
2. **Upstash Redis** (stores ratings): create a database and copy the REST URL and token.

Put the values from `.env.example` into Vercel -> Project -> Settings -> Environment Variables.
Never prefix them with `VITE_`: anything with that prefix ends up in public browser code.

## 4. Deploy

1. Push to GitHub (`.env` is already git-ignored).
2. Import the repository in Vercel. It detects Vite automatically (build: `npm run build`, output: `dist`).
3. Add the environment variables, then redeploy.
4. Add `sanjeevkumarshah.com.np` under Project -> Domains and update your DNS as Vercel instructs.

## Where things live (and the React idea each teaches)

| Path | Idea |
| --- | --- |
| `src/main.jsx` | Mounts React and wraps the app in `BrowserRouter` |
| `src/App.jsx` | Route table (`Routes`/`Route`), `lazy` + `Suspense`, `useEffect` for AOS |
| `src/hooks/useTheme.js` | A custom hook: `useState` + `useEffect` + `localStorage` |
| `src/components/Navbar.jsx`, `MobileMenu.jsx` | `NavLink` active styles, state for the menu, props, conditional rendering |
| `src/data/*.js` | Plain arrays and objects that components `map()` over |
| `src/components/ProjectCard.jsx` | One reusable card driven by props |
| `src/pages/ProjectDetails.jsx` | `useParams()`, `find()`, not-found state |
| `src/components/ContactForm.jsx` | Controlled inputs, validation, loading/success/error states |
| `src/components/StarRating.jsx`, `RatingForm.jsx`, `pages/Rating.jsx` | Accessible radio group, fetch, lifting state up through a prop |
| `src/components/Seo.jsx` | `useEffect` that updates the document head per route |
| `api/contact.js`, `api/ratings.js` | Server-side validation, secrets in env vars, spam limits |

## Things to review before going live

- `src/data/skills.js`: levels marked `// added` are my cautious guesses. Make them match reality.
- `src/data/projects.js`: the `TODO` comments (your exact contribution, future improvements, Weather App links).
- `src/pages/About.jsx`: the "Where I'm heading" text is deliberately general. Put your real direction there.
- `public/sitemap.xml`: add a line for each new project page.

## SEO notes

Titles, descriptions, canonical URLs, Open Graph and Twitter tags are updated per route by `Seo.jsx`.
The Person and WebSite JSON-LD lives in `index.html`; each page adds its own WebPage data.
Google runs JavaScript, so it sees the per-page tags. Some link-preview bots (WhatsApp, LinkedIn, X) do not,
so they show the Home preview for any URL. Fixing that needs pre-rendering, which is a good later upgrade.
The 404 page uses `noindex`, but static hosts still reply with status 200 for unknown URLs (a "soft 404").
