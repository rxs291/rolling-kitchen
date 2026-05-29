# Project Progress Save Point

Use this file as the project's running memory. Update it at the end of each
work session or whenever a meaningful decision changes.

## Current Status

**Current phase:** Phase 3 complete; ready for Phase 4 backend health endpoint
**Last updated:** 2026-05-28
**Project state:** Initial local scaffold has been created, verified, committed,
pushed to GitHub, and deployed through Cloudflare Workers static assets. The
browser-only cart and pickup form now support basic customer input validation.
No backend API, database, or payment configuration exists yet.

## Goal

Build a small food truck online ordering practice application where a customer
can submit and pay for an order and a protected staff screen on another device
can display and manage that paid order.

## Selected Technology Direction

| Area | Current decision |
| --- | --- |
| Front end | HTML, CSS, vanilla JavaScript |
| Hosting | Cloudflare Workers static assets |
| Backend | Cloudflare Workers |
| Database | Cloudflare D1 |
| Payments | Stripe Checkout, test mode first |
| Staff protection | Cloudflare Access, later phase |
| Order refresh | Polling first, not WebSockets |

## Completed Work

- Created an empty local project workspace.
- Initialized a local Git repository with the `main` branch.
- Added documentation and a minimal static-page scaffold.
- Verified the static customer menu, browser-only cart update, and navigation
  to the staff dashboard placeholder.
- Made the first local Git commit.
- Connected the local repository to GitHub at
  `git@github.com:rxs291/rolling-kitchen.git`.
- Pushed the local `main` branch to `origin/main`.
- Deployed the static site through Cloudflare Workers static assets.
- Verified the deployed site works on multiple devices.
- Added browser-only pickup form fields for name, phone, pickup option, and
  notes.
- Added checkout-button state logic so the simulated checkout is available only
  when the cart and required pickup fields are complete.

## In Progress

- Start the first backend endpoint for a small deployed health check.

## Next Actions

1. Inspect the Cloudflare-generated `cloudflare/workers-autoconfig` branch
   before adding backend files.
2. Add a small `GET /api/health` endpoint.
3. Deploy it and confirm the public site can request it successfully.
4. Keep fake order submission, D1 storage, and payment work out of this first
   backend checkpoint.

## Important Boundaries

- No real payments are enabled.
- No Stripe account values or secrets have been created or stored.
- No database exists and no schema migration has been run.
- A Cloudflare Worker deployment exists at
  `https://rolling-kitchen.sarchan-rex.workers.dev`.
- Cloudflare created a remote `cloudflare/workers-autoconfig` branch.
- No package dependencies are installed.

## Decisions Log

| Date | Decision | Reason |
| --- | --- | --- |
| 2026-05-27 | Start with Cloudflare Pages, Pages Functions, D1, and Stripe Checkout. | This exposes the core website/backend/payment/database connections while avoiding server management. |
| 2026-05-27 | Use vanilla HTML/CSS/JavaScript first. | This keeps the learning focus on data flow rather than a framework. |
| 2026-05-27 | Build a browser staff dashboard before POS integration. | It is the smallest way to prove that orders arrive on another device. |
| 2026-05-27 | Poll for new orders before using WebSockets. | Simple polling is sufficient for the first milestone and easier to debug. |
| 2026-05-28 | Use Cloudflare Workers static assets for the deployed static site. | Cloudflare configured this project through the newer Workers static-assets flow, which still supports the planned static frontend and later backend endpoints. |

## Session Log

### 2026-05-27 - Project Scaffold

Planned outcome:

- Create the documentation and a small static starting point.
- Initialize local Git tracking without committing or pushing anything.

Files introduced:

- `README.md`
- `.gitignore`
- `docs/PROJECT_GUIDE.md`
- `docs/PROGRESS.md`
- `public/index.html`
- `public/styles.css`
- `public/app.js`
- `public/staff/orders.html`

Notes for resuming:

- Read `docs/PROJECT_GUIDE.md` before implementing a later phase.
- Do not skip directly to payments; first prove the fake-order path from public
  screen to staff screen.
- External GitHub and Cloudflare setup still requires user decisions/account
  access.

Verification completed:

- Loaded the customer page in a local browser preview.
- Confirmed that three menu item `Add` buttons render.
- Added Street Tacos and confirmed the cart total changed to `$9.50`.
- Followed the staff-screen link and confirmed the placeholder dashboard
  renders.

### 2026-05-27 - GitHub Repository Established

Planned outcome:

- Save the scaffold in local Git history.
- Connect the local repository to GitHub.
- Push the initial project checkpoint to the remote repository.

Verification completed:

- Confirmed the active local branch is `main`.
- Confirmed `main` tracks `origin/main`.
- Confirmed the remote repository URL is
  `git@github.com:rxs291/rolling-kitchen.git`.
- Confirmed the latest local commit exists on the GitHub remote.
- Confirmed the working tree is clean after the push.

Notes for resuming:

- The next phase is Cloudflare deployment of the static `public/` site.
- Do not add backend, database, or payment code before the static deployment is
  verified.

### 2026-05-28 - Cloudflare Deployment Verified

Planned outcome:

- Deploy the static site from GitHub to Cloudflare.
- Confirm the deployed customer and staff pages load on multiple devices.

Verification completed:

- Confirmed the deployed URL works:
  `https://rolling-kitchen.sarchan-rex.workers.dev`.
- Confirmed the customer-facing menu/cart page loads from the deployed URL.
- Confirmed the staff placeholder page can be opened from the deployed URL.
- Confirmed the deployment uses Cloudflare Workers static assets rather than
  the older classic Pages-only flow.

Notes for resuming:

- Do not change Cloudflare bindings, databases, secrets, or domain settings
  until a specific phase requires them.
- Inspect the Cloudflare-generated `cloudflare/workers-autoconfig` branch
  before adding backend Worker code.

### 2026-05-28 - Browser-Only Cart And Pickup Form

Planned outcome:

- Complete the browser-only cart and pickup form checkpoint before backend
  work.
- Keep checkout simulated and avoid submitting any customer data.

Verification completed:

- Cart items can be added and removed.
- Cart totals update using prices stored as integer cents.
- Pickup name, phone, pickup option, and notes are available in the form.
- The simulated checkout button remains disabled until the cart has items and
  required pickup fields are complete.
- The checkout action displays a browser-only message explaining that backend
  submission comes later.

Notes for resuming:

- The next phase is the smallest backend proof: `GET /api/health`.
- Fake order submission and database persistence belong to later checkpoints.
