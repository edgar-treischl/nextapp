# Copilot instructions

## Build, lint, and test commands

- Install dependencies locally with `npm install`. The GitHub Pages workflow uses `yarn install --frozen-lockfile`.
- Start the dev server with `npm run dev`.
- Create the production static export with `npm run build`. This writes the export to `out/`.
- Lint the whole repo with `npm run lint`.
- Lint a single file with `npx eslint pages/gant.tsx`.
- There is no automated test script or test runner configured in `package.json`, so there is no single-test command yet.

## High-level architecture

- This app uses the **Next.js Pages Router**, not the App Router. The active routes live in `pages/`, and `pages/_app.tsx` provides the shared header, dropdown navigation, and global stylesheet import.
- The repo is structured as a small set of standalone demo pages: a landing page (`pages/index.tsx`), simple content pages (`pages/about.tsx`), and chart/data demos (`pages/charts.tsx`, `pages/scatter.tsx`, `pages/nivo-bar.tsx`, `pages/nivo-tree.tsx`, `pages/users.tsx`, `pages/gant.tsx`).
- Styling is mostly Tailwind utility classes, with a few shared global helpers in `styles/globals.css` (`.nav-link` and `.dropdown-item`).
- Production deployment is a **static GitHub Pages export**. `next.config.ts` sets `output: "export"`, adds the `/nextapp` `basePath` and `assetPrefix` outside development, and exposes `NEXT_PUBLIC_BASE_PATH` for client-side code.
- Static assets live in `public/`. The Gantt page reads `public/data/tasks.csv` in the browser, parses it with Papa Parse, and renders a Highcharts Gantt chart imperatively through a `ref`.
- Chart integrations are page-local: Chart.js pages register their own Chart.js modules in-file, Nivo pages render `Responsive*` components directly, and each demo page owns its own sample data and UI state.

## Key conventions in this repo

- Treat `next.config.ts` as the source of truth for deployment behavior. Any browser-side fetch for files under `public/` should build URLs from `process.env.NEXT_PUBLIC_BASE_PATH || ""` instead of assuming `/`.
- Keep new routes as top-level files under `pages/` unless there is a clear need for shared extraction. Shared UI is intentionally minimal; `components/` currently contains only reusable presentational pieces.
- Demo/chart pages follow a recurring layout: visualization on the left, example code on the right, a copy-to-clipboard button, and any small one-off animation defined with page-local `<style jsx>`.
- Prefer Tailwind utilities and the existing global helper classes over introducing new global CSS files or CSS modules.
- The README is still mostly default `create-next-app` boilerplate and mentions `app/page.tsx`; for implementation details, rely on the actual `pages/` tree and `next.config.ts` instead.
