# Project Progress Save Point

Use this file as the project's running memory. Update it at the end of each
work session or whenever a meaningful decision changes.

## Current Status

**Current phase:** Phase 5 complete; ready for Phase 6 staff order dashboard
**Last updated:** 2026-06-08
**Project state:** Initial local scaffold has been created, verified, committed,
pushed to GitHub, and deployed through Cloudflare Workers static assets. The
browser-only cart and pickup form now support basic customer input validation.
Cloudflare Worker API routes and D1 fake-order storage are working locally and
in production. No payment or staff authentication configuration exists yet.

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
| Local backend testing | Wrangler dev server, curl, and jq |

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
- Added npm project tooling with Wrangler as a development dependency.
- Added a root `wrangler.jsonc` configuration for Cloudflare Workers static
  assets and a Worker entry at `src/index.js`.
- Added `GET /api/health` as the first backend health-check endpoint.
- Verified the health endpoint locally with Wrangler and `curl`.
- Merged the Phase 4 feature branch into `main` and verified the endpoint on
  the deployed Cloudflare Worker.
- Created the Cloudflare D1 database `rolling-kitchen-orders` with binding `DB`.
- Added and applied the `orders` table migration locally and remotely.
- Added `POST /api/orders` with server-side item validation and trusted price
  recalculation.
- Added `GET /api/orders` for retrieving saved fake orders.
- Connected the browser checkout form to save visibly unpaid/test orders.
- Verified a fake production order through Insomnia and curl.

## In Progress

- Prepare the staff order dashboard to display and manage saved fake orders.

## Next Actions

1. Create a Phase 6 feature branch.
2. Replace the staff placeholder with an order list fetched from
   `GET /api/orders`.
3. Display active fake orders oldest-first and poll approximately every five
   seconds.
4. Add and validate backend order-status updates.
5. Keep Stripe and staff authentication out of Phase 6.

## Important Boundaries

- No real payments are enabled.
- No Stripe account values or secrets have been created or stored.
- The D1 database `rolling-kitchen-orders` exists and its first migration has
  been applied locally and remotely.
- A Cloudflare Worker deployment exists at
  `https://rolling-kitchen.sarchan-rex.workers.dev`.
- Cloudflare created a remote `cloudflare/workers-autoconfig` branch.
- `wrangler` is installed as a local development dependency for testing and
  deployment workflows.

## Decisions Log

| Date | Decision | Reason |
| --- | --- | --- |
| 2026-05-27 | Start with Cloudflare Pages, Pages Functions, D1, and Stripe Checkout. | This exposes the core website/backend/payment/database connections while avoiding server management. |
| 2026-05-27 | Use vanilla HTML/CSS/JavaScript first. | This keeps the learning focus on data flow rather than a framework. |
| 2026-05-27 | Build a browser staff dashboard before POS integration. | It is the smallest way to prove that orders arrive on another device. |
| 2026-05-27 | Poll for new orders before using WebSockets. | Simple polling is sufficient for the first milestone and easier to debug. |
| 2026-05-28 | Use Cloudflare Workers static assets for the deployed static site. | Cloudflare configured this project through the newer Workers static-assets flow, which still supports the planned static frontend and later backend endpoints. |
| 2026-05-29 | Use a feature branch for Phase 4 backend work. | Practicing branch-based work keeps `main` stable while a phase is being built and reviewed. |
| 2026-05-29 | Add Wrangler as a local development dependency. | Local Worker testing before deployment is closer to professional backend workflow than relying only on Cloudflare production deploys. |
| 2026-05-30 | Treat Phase 4 as the backend health-check milestone only. | The project proved Worker routing and local/live API testing first; fake order submission is safer after Phase 5 D1 schema planning. |
| 2026-06-08 | Keep menu products in trusted backend code for Phase 5. | The backend can reject unknown item IDs and recalculate prices without adding product administration or another database table. |
| 2026-06-08 | Store customer pickup details directly on each order. | Version one does not need customer accounts or customer identity management. |
| 2026-06-08 | Use D1 local-first migrations, then apply the same pending migration remotely. | This allows database behavior to be tested safely before changing the production database. |

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

### 2026-05-29 - Phase 4 Backend Health Endpoint

Planned outcome:

- Add the smallest possible backend endpoint to prove that the Cloudflare
  Worker can handle API requests while still serving the static frontend.
- Add local backend testing with Wrangler before deploying to Cloudflare.
- Practice feature-branch work for a phase.

Files introduced:

- `package.json`
- `package-lock.json`
- `wrangler.jsonc`
- `src/index.js`

Implementation details:

- Added Wrangler as a local development dependency.
- Added npm scripts:
  - `npm run dev` starts `wrangler dev`.
  - `npm run deploy` runs `wrangler deploy`.
- Configured `wrangler.jsonc` with:
  - Worker name `rolling-kitchen`.
  - Worker entry `src/index.js`.
  - Static asset directory `public`.
  - Asset binding `ASSETS`.
  - `run_worker_first` for `/api/*` routes.
- Added `src/index.js` with:
  - `GET /api/health` returning JSON health-check data.
  - A JSON `404` response for unknown `/api/*` routes.
  - Static asset fallback through `env.ASSETS.fetch(request)`.

Verification completed:

- Created and worked on feature branch `codex/phase-4-health-endpoint`.
- Ran the Worker locally with Wrangler.
- Confirmed local health endpoint:
  `curl -i http://localhost:8787/api/health`.
- Confirmed local unknown API route:
  `curl -i http://localhost:8787/api/not-real`.
- Confirmed local static homepage:
  `curl -I http://localhost:8787/`.
- Used `jq` locally to format JSON curl responses for easier inspection.
- Ran `npx wrangler deploy --dry-run` to validate the Worker config without
  publishing.
- Merged the feature branch into `main` and pushed to GitHub.
- Confirmed the deployed health endpoint works:
  `https://rolling-kitchen.sarchan-rex.workers.dev/api/health`.
- Confirmed the deployed unknown API route returns JSON `404`.
- Confirmed the deployed homepage still returns `200 OK`.

Notes for resuming:

- `jq` is a local developer convenience, not a project dependency.
- Do not create D1 resources or migrations until the Phase 5 schema is reviewed.
- Future phase work should continue using feature branches before merging to
  `main`.

### 2026-06-08 - Phase 5 D1 Fake Order Storage

Planned outcome:

- Persist fake unpaid/test orders in Cloudflare D1.
- Validate order contents and recalculate prices in the Worker.
- Prove the browser-to-Worker-to-database path locally before production.

Files introduced or updated:

- `migrations/0001_create_orders.sql`
- `wrangler.jsonc`
- `src/index.js`
- `public/app.js`

Implementation details:

- Created D1 database `rolling-kitchen-orders`.
- Added the database to Wrangler with binding `DB`, available as `env.DB`.
- Added the `orders` table with customer pickup fields, item JSON, totals,
  payment/order statuses, and timestamps.
- Kept trusted menu IDs and integer-cent prices in Worker code.
- Added `POST /api/orders`:
  - validates required customer fields
  - validates pickup option and positive integer quantities
  - rejects unknown menu item IDs
  - recalculates line totals and order total on the server
  - saves orders as `test_unpaid` and `new`
- Added `GET /api/orders`, returning up to 50 saved orders as JSON.
- Updated the browser checkout flow to submit only customer fields, item IDs,
  and quantities, then show the returned display order ID.

Verification completed:

- Applied `0001_create_orders.sql` to the local D1 database.
- Confirmed the clean local database started with zero orders.
- Tested local order APIs before production deployment.
- Merged Phase 5 into `main` and pushed to GitHub.
- Applied pending migrations to the remote D1 database.
- Submitted production order `RK-957801` through Insomnia.
- Confirmed `POST /api/orders` returned `201 Created`, total `1900`,
  `paymentStatus: test_unpaid`, and `orderStatus: new`.
- Confirmed the same order through production `GET /api/orders` using curl.
- Confirmed production `GET /api/health` and the static homepage still return
  `200 OK`.

Notes for resuming:

- Production currently contains one explicit fake/test order created during
  Phase 5 verification.
- Staff access is still public and unprotected; Cloudflare Access is a later
  phase.
- The next phase is the staff order dashboard and status workflow.
