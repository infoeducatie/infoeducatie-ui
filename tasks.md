# InfoEducatie UI/UX Tasks

Status: `[x]` complete, `[-]` in progress, `[ ]` queued.

## Audit And Release

- [x] AUD-001 Audit the deployed homepage and primary public routes at desktop and mobile sizes.
- [x] AUD-002 Run axe-core scans on homepage, registration, participants, and results.
- [x] AUD-003 Capture a mobile Lighthouse baseline and record the performance metrics.
- [x] AUD-004 Compare the deployed legacy bundle with the local React 19/Vite build.
- [x] AUD-005 Smoke all 19 public routes at the mobile breakpoint and inspect key routes at desktop.
- [ ] REL-001 Deploy the React 19/Vite image and verify that production serves the expected commit.
- [ ] REL-002 Add a visible build/version marker to deployment diagnostics.

## Current Implementation Batch

- [x] A11Y-001 Add skip navigation, `main`/`footer` landmarks, route language handling, and named navigation landmarks.
- [x] A11Y-002 Add accessible names and keyboard behavior to edition selectors, filters, view controls, tables, and news controls.
- [x] A11Y-003 Add sponsor image alternatives and correct Romanian/English homepage heading structure.
- [x] FORM-001 Associate labels and help text with registration/sign-in/newsletter fields and make newsletter consent opt-in.
- [x] DATA-001 Make results rendering immutable and tolerant of absent API arrays.
- [x] DATA-002 Add participant search, visible result count, category filtering, and empty state.
- [x] VIS-001 Correct the audited call-to-action, news, footer, and section contrast failures.
- [x] VIS-002 Reflow category filters into readable, tap-friendly mobile rows.
- [x] FOOT-001 Remove obsolete social links, use HTTPS destinations, and display the current year.
- [x] PERF-001 Split non-home routes into lazy-loaded chunks.

## Core Workflow Follow-Up

- [ ] FORM-002 Add password visibility, live requirement feedback, confirmation matching, progress text, and error focus.
- [ ] FORM-003 Add a registration-open/closed banner with deadline and next action.
- [ ] DATA-003 Add participant sorting and shareable URL filters.
- [ ] DATA-004 Design compact mobile cards for participant and result records.
- [ ] DATA-005 Add consistent loading, empty, error, and retry components to every API view.
- [ ] NEWS-001 Restore focus after closing an article and expose pagination status to assistive technology.
- [ ] NAV-001 Preserve focus and scroll behavior after client-side route changes.
- [ ] NAV-002 Add a dedicated not-found route.
- [ ] EMBED-001 Replace or isolate the Google Docs schedule embed and provide a resilient fallback link.

## Performance And Assets

- [ ] PERF-002 Generate responsive AVIF/WebP hero, gallery, alumnus, and sponsor assets.
- [ ] PERF-003 Add `srcset`, dimensions, decoding hints, and below-the-fold lazy loading.
- [ ] PERF-004 Remove unused legacy CSS and split route-specific styles.
- [ ] PERF-005 Add Lighthouse CI budgets and publish reports as workflow artifacts.

## Content And Trust

- [ ] SEO-001 Add route-specific titles, descriptions, canonical URLs, and social metadata.
- [ ] COPY-001 Review all Romanian labels, diacritics, dates, and action wording.
- [ ] I18N-001 Align English route content/navigation and derive language from direct URLs.
- [ ] TRUST-001 Verify Forum, Blog, sponsor, and social destinations and remove dead links.
- [ ] TRUST-002 Add privacy information beside newsletter and account consent controls.

## Verification For This Batch

- [x] QA-001 Run lint, production build, dependency audit, and whitespace checks.
- [x] QA-002 Run desktop and mobile smoke checks against the local smoke proxy.
- [x] QA-003 Re-run axe on Romanian/English homepage, registration, participants, and results; all return zero violations locally.
- [x] QA-004 Confirm participant search/filter behavior and results rendering against the live read-only API.
- [x] QA-005 Confirm no horizontal document overflow at 390 px and 1280 px.
