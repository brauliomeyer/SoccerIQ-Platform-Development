# SoccerIQ Platform Development

SoccerIQ is a React + TypeScript scouting and analytics app ("Moneyball Platform") built with Vite.

## Why the 404 happened on GitHub
GitHub repository pages (`github.com/<user>/<repo>/tree/...`) do **not** render Vite apps.
Your app must be deployed to **GitHub Pages** and loaded from:

`https://<user>.github.io/<repo>/`

## Run locally
```bash
npm install
npm run dev
```

## Build locally
```bash
npm run build
npm run preview
```

## Deploy to GitHub Pages
This repo includes `.github/workflows/deploy-pages.yml`.

1. Push to `main`.
2. In GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Wait for the `Deploy SoccerIQ to GitHub Pages` workflow.
4. Open the Pages URL from workflow output.

## SPA routing on Pages
This project copies `dist/index.html` to `dist/404.html` after build (`postbuild`).
That enables refresh/deep-link support for React Router routes like `/players/:id` on GitHub Pages.
