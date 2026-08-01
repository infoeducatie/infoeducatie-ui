# infoeducatie-ui

[![Run tests](https://github.com/infoeducatie/infoeducatie-ui/actions/workflows/test.yaml/badge.svg)](https://github.com/infoeducatie/infoeducatie-ui/actions/workflows/test.yaml)

React frontend for [InfoEducație](https://infoeducatie.ro) and the
[InfoEducație API](https://github.com/infoeducatie/infoeducatie-api).

## Quick start

Use Node.js 22.13+ or Node 24+ (an even-numbered LTS release is recommended)
and npm 10 or newer.

```sh
npm ci
npm start
```

The Vite development server is available at <http://localhost:3001>. In
development mode, API requests expect `infoeducatie-api` to be running at
<http://localhost:3000>.

The public pages have fallback content, so the UI can still be reviewed without
the API. To browse read-only public data without running the backend locally,
use the smoke build and preview server:

```sh
npm run build:smoke
npm run preview
```

Open <http://localhost:4173>. Smoke mode proxies requests to the public API, so
use it only to review public pages and do not submit forms.

## Run the full stack

Clone the API next to this repository and start its Docker Compose stack:

```sh
git clone https://github.com/infoeducatie/infoeducatie-api.git
cd infoeducatie-api
docker compose up --build
```

The API and PostgreSQL will start on port 3000. Return to this repository and
run `npm start` for the frontend.

## Commands

- `npm start` or `npm run dev` starts Vite in development mode on port 3001.
- `npm run build` creates a production bundle in `build/`.
- `npm run build:smoke` creates a local bundle configured for the public API.
- `npm run build:staging` creates a staging bundle.
- `npm run preview` serves the current bundle on port 4173.
- `npm run lint` checks the JavaScript and JSX sources.
- `npm test` runs lint and a production build.
- `npm run clean` removes the generated `build/` directory.

Runtime settings can be overridden with `VITE_API_URL`,
`VITE_MAILCHIMP_URL`, `VITE_SENTRY_DSN`, and `VITE_GA_TRACKING_ID`.

## Project structure

- `assets/` contains legacy fonts, images, icons, and sponsor artwork.
- `public/` contains files copied directly into the build.
- `src/components/` contains pages and reusable UI components.
- `src/lib/` contains API, analytics, authentication, and navigation helpers.
- `src/styles/` contains shared LESS variables, mixins, and utility classes.
- `src/main.jsx` configures the application shell and routes.
- `src/main.less` imports the global and component styles.
- `vite.config.js` defines runtime environments, aliases, and build behavior.

## Docker

`Dockerfile` builds the production frontend and serves it with the included
NGINX configuration. Release automation and host update units are in `deploy/`.

## Browser support

The current application targets modern evergreen browsers. Responsive layouts
and keyboard navigation should remain usable down to a 320-pixel viewport.
