# InfoEducatie UI/UX Tasks

Status: `[x]` complete, `[-]` in progress, `[ ]` queued.

## Audit And Release

- [x] AUD-001 Audit the deployed homepage and primary public routes at desktop and mobile sizes.
- [x] AUD-002 Run axe-core scans on all first-party public routes.
- [x] AUD-003 Capture mobile Lighthouse baselines and remediation metrics.
- [x] AUD-004 Compare the deployed React 19 image with the earlier visual identity.
- [x] REL-001 Deploy and verify the initial React 19/Vite image.
- [x] REL-003 Add the production image updater, health check, failed-image quarantine, and rollback.
- [ ] REL-002 Add a visible build/version marker to deployment diagnostics.
- [ ] REL-004 Commit and push the current visual remediation, then verify the expected image in production.

## Visual Identity And Responsive UX

- [x] VIS-001 Restore the original pink, green, blue, yellow, cyan overlay, and contrast-safe foregrounds.
- [x] VIS-002 Restore the original typography, container widths, section rhythm, and rounded calls to action.
- [x] VIS-003 Restore compact white desktop navigation and add a usable collapsed mobile menu.
- [x] VIS-004 Compact inner-page heroes while preserving the original homepage composition and palette.
- [x] VIS-005 Rebuild jury, albums, contact, schedule, alumni, and seminar layouts around their primary user tasks.
- [x] RWD-001 Map legacy Bootstrap 3 grid props to the correct Bootstrap 5 breakpoints.
- [x] RWD-002 Reflow selectors, filters, sponsors, alumni, seminars, jury, photos, and forms on narrow screens.
- [x] DATA-004 Render participant and result records as labeled mobile cards.
- [x] RWD-003 Remove the final 320 px jury/about overflow caused by grid styling on inline decoration.
- [x] RWD-004 Verify all 17 routes at phone, landscape, tablet, desktop, and wide breakpoints after the cross-route refresh.

## Accessibility And Semantics

- [x] A11Y-001 Add skip navigation, `main`/`footer` landmarks, route language handling, and named navigation landmarks.
- [x] A11Y-002 Add accessible names and keyboard behavior to selectors, filters, view controls, tables, albums, and news controls.
- [x] A11Y-003 Add meaningful image alternatives and mark decorative images appropriately.
- [x] A11Y-004 Correct heading order across Romanian and English routes.
- [x] A11Y-005 Meet automated contrast checks while preserving the original brand palette.
- [x] A11Y-006 Replace pointer-only gallery and registration interactions with keyboard-operable controls.
- [x] FORM-001 Associate labels and help text with registration, sign-in, and newsletter fields; make newsletter consent opt-in.

## Data And Navigation

- [x] DATA-001 Make results rendering immutable and tolerant of absent API arrays.
- [x] DATA-002 Add participant search, visible result count, category filtering, and empty state.
- [x] NAV-003 Redirect unfinished Calendar and Kitchen URLs to supported destinations.
- [ ] DATA-003 Add participant sorting and shareable URL filters.
- [-] DATA-005 Add consistent loading, empty, error, and retry components to every API view; alumni, seminars, participants, and results now cover the main states.
- [ ] NEWS-001 Restore focus after closing an article and announce pagination status.
- [x] NAV-001 Preserve focus and scroll behavior after client-side route changes.
- [x] NAV-002 Add a dedicated not-found route.
- [-] EMBED-001 Replace or isolate the Google Docs schedule embed; the resilient external fallback link is complete.

## Registration Follow-Up

- [-] FORM-002 Password visibility, minimum requirements, confirmation matching, and progress text are complete; add live matching and error focus.
- [x] FORM-003 Add a clear registration-open/closed state and next action.

## Performance And Assets

- [x] PERF-001 Split non-home routes into lazy-loaded chunks.
- [-] PERF-002 Convert major backgrounds and content photos to WebP; continue with remaining oversized legacy images.
- [x] PERF-003 Add responsive sources, intrinsic dimensions, decoding hints, lazy loading, and critical font/image preloads.
- [ ] PERF-004 Remove unused legacy CSS and reduce the main JavaScript chunk.
- [ ] PERF-005 Add Lighthouse CI budgets and publish reports as workflow artifacts.

## Content And Trust

- [x] SEO-001 Add route-specific metadata, canonical/social URLs, `robots.txt`, and sitemap.
- [-] COPY-001 Correct visible registration/gallery copy; complete the full Romanian content review.
- [-] I18N-001 Derive language from direct URLs; full Romanian/English content parity remains.
- [ ] TRUST-001 Verify Forum, Blog, sponsor, and social destinations and remove dead links.
- [ ] TRUST-002 Add privacy information beside newsletter and account consent controls.

## Verification

- [x] QA-001 Run lint, production build, dependency audit, and whitespace checks.
- [x] QA-002 Run 102 responsive checks across 17 routes and six viewport classes with zero failures.
- [x] QA-003 Run axe on all 17 first-party routes with zero violations.
- [x] QA-004 Confirm participant filters, result rendering, and mobile card presentation against the live read-only API.
- [x] QA-005 Reach Lighthouse 81/100/100/100 with CLS 0.017 and about 733 KiB transferred.
- [x] QA-006 Capture and review all 16 distinct route views at 390 px, 820 px, and 1440 px, including the opened mobile navigation.
