# InfoEducatie UI/UX Audit

Audit date: 2026-07-22

## Scope

The audit covered the deployed `https://infoeducatie.ro` experience at 1280x720 and 390x844, with focused checks on the homepage, account registration, participants, results, seminars, schedule, photos, about, and contact routes. It combined visual review, keyboard/DOM inspection, axe-core accessibility scans, console/network inspection, and a mobile Lighthouse run.

The deployed site is still serving the legacy bundle. The local React 19/Vite build already fixes the missing `lang` attribute, mobile navigation collapse, modern autocomplete values, and legacy Sentry/analytics integrations. Findings below distinguish remaining code work from deployment work.

## Baseline

- Mobile Lighthouse: Performance 54, Accessibility 65, Best Practices 92, SEO 73.
- Mobile FCP: 5.5 s; LCP: 9.4 s; TBT: 310 ms; transfer size: about 1.9 MiB.
- Homepage axe scan: 14 contrast failures, 16 images without alternatives, 16 unnamed links, invalid heading order, no main landmark, and no document language in the deployed bundle.
- The deployed results page throws while rendering project arrays and leaves the results table unavailable.
- The deployed mobile navigation is permanently expanded and delays the primary page task.
- The participant listing contains 131 rows without search, sorting, pagination, or a mobile-first presentation.
- Registration places the form below a large decorative header, does not clearly communicate all requirements, and preselects newsletter consent.

## First Improvement Batch Completed Locally

- The homepage, English homepage, registration, participants, and results routes now return zero axe-core violations at the audited breakpoints.
- All 19 public routes return HTTP 200 in the 390x844 local smoke run, render one `main` landmark and one H1, use the expected route language, and avoid document-level horizontal overflow.
- Results tolerate missing API arrays and render successfully against the live read-only API instead of crashing.
- Participants now support title, contestant, county, and category filtering with a visible result count and empty state.
- Task pages use shorter headers, readable three-column mobile filters, labeled selectors, focusable table regions, and semantic links/buttons.
- Registration and sign-in fields have associated labels and autocomplete metadata; newsletter consent is no longer preselected.
- Route splitting reduced the main JavaScript chunk from 636.75 kB (219.16 kB gzip) to 450.99 kB (162.99 kB gzip).
- `npm test`, the production build, and `npm audit` pass; the dependency audit reports zero vulnerabilities.
- The local smoke preview is available at `http://127.0.0.1:4173`. Production remains on the legacy bundle until `REL-001` is completed.

Known external limitation: the Google Docs schedule iframe emits a `DOCS_timing is not defined` console error from Google's document code. The InfoEducatie application routes and bundle remain error-free during the smoke run.

## P0: Functional And Inclusive Access

- Deploy the tested React 19/Vite image so production receives the already completed mobile navigation, language, autocomplete, Sentry, and request-layer fixes.
- Make results rendering tolerant of partial or changing API records and remove render-time data mutation.
- Add a skip link, main landmark, footer landmark, and uniquely named navigation landmarks.
- Give every form control, edition selector, category filter, view toggle, and scrollable data region an accessible name and keyboard path.
- Replace click-only rows and text links without `href` with semantic links or buttons.
- Add useful alternative text to sponsor logos and meaningful images; mark decorative images appropriately.
- Correct WCAG AA contrast failures on calls to action, news, footer text, and yellow/green sections.

## P1: Core Workflow UX

- Reduce decorative header height on task-focused pages so forms, filters, schedules, and lists appear earlier.
- Add participant search, visible result counts, empty states, and clear filter state.
- Replace the wide mobile participant/results tables with compact cards or a deliberate table/card mode.
- Add visible form requirements, inline validation, password visibility controls, matching-password feedback, submit progress, and error focus management.
- Make newsletter consent opt-in rather than preselected and link to an appropriate privacy notice.
- Add loading, empty, error, and retry states to all API-driven pages.
- Make news pagination and “read more” controls semantic buttons and return focus after modal close.
- Refresh the footer: current copyright year, HTTPS destinations, remove Google+, verify Forum/Blog availability, and improve newsletter hierarchy.
- Replace ambiguous icon-only controls with labeled tooltips and consistent selected/pressed states.

## P1: Performance

- Split route bundles with `React.lazy` and `Suspense` so visitors do not download every page on first load.
- Convert large JPEG/PNG assets to responsive AVIF/WebP variants and define intrinsic dimensions.
- Lazy-load below-the-fold sponsor and gallery images.
- Split shared CSS by route or remove unused legacy styles after component migration.
- Preload only the hero asset and critical fonts used in the first viewport.
- Add a Lighthouse CI budget for LCP, accessibility, JavaScript size, and total transfer size.

## P2: Information Architecture And Polish

- Add route-specific document titles, descriptions, canonical URLs, and social sharing metadata.
- Rework heading levels so each page has one H1 and sections proceed in order.
- Add a persistent authenticated entry point and make registration status/deadline explicit.
- Improve participants and results with sorting, shareable filters, county/category facets, and preserved state when returning from a project.
- Review Romanian and English content parity and select language from the route on direct visits.
- Establish reusable tokens for color, spacing, typography, focus rings, controls, tables, and responsive page headers.
- Add a real 404 page instead of silently redirecting unknown URLs to the homepage.
- Add automated axe checks and Playwright smoke coverage for the key public flows.

## Success Criteria

- No critical or serious axe violations on the audited public routes.
- Mobile Lighthouse accessibility at least 95 and performance at least 80.
- Mobile LCP below 2.5 s on a representative mid-tier profile.
- Every primary workflow is keyboard usable with a visible focus indicator.
- Account registration and project registration expose clear requirements, progress, success, and recovery states.
- Participants and results are usable at 320 px without requiring two-dimensional table navigation.
- Production serves the same tested commit and asset generation as CI.
