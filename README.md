# SoccerIQ Platform Development

SoccerIQ is a React + TypeScript scouting and analytics app ("Moneyball Platform") built with Vite.

## Waarom je nu `GET /src/main.tsx 404` ziet
Die fout betekent dat GitHub Pages nu je **bronbestanden** serveert (raw `index.html`) in plaats van de gebouwde `dist/` output.

Een Vite-app werkt op GitHub alleen correct als je de **gebouwde assets** publiceert.

## Juiste GitHub Pages setup (belangrijk)
1. Ga naar **Settings → Pages**.
2. Zet **Build and deployment → Source** op **GitHub Actions**.
3. Push naar `main` (of run handmatig de workflow).
4. Open daarna de URL uit de workflow output (`github-pages` environment).

Als Source op branch/folder staat (bijv. `main`/root), dan krijg je precies de fout uit je screenshot.

## Run lokaal
```bash
npm install
npm run dev
```

## Build lokaal
```bash
npm run build
npm run preview
```

## GitHub Pages workflow
Deze repo bevat `.github/workflows/deploy-pages.yml` die:
- dependencies installeert,
- `npm run build` uitvoert,
- `dist` uploadt,
- en deployt naar GitHub Pages.

## SPA routing op Pages
Na build kopieert `postbuild` automatisch `dist/index.html` naar `dist/404.html`.
Daardoor werken refresh/deeplinks voor React Router routes zoals `/players/:id` op GitHub Pages.
