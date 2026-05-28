# Project Progress Save Point

Use this file as the project's running memory. Update it at the end of each
work session or whenever a meaningful decision changes.

## Current Status

**Current phase:** Phase 1 complete; ready for Phase 2 Cloudflare Pages deployment
**Last updated:** 2026-05-27  
**Project state:** Initial local scaffold has been created, verified, committed,
and pushed to GitHub. No deployment, backend, database, or payment configuration
exists yet.

## Goal

Build a small food truck online ordering practice application where a customer
can submit and pay for an order and a protected staff screen on another device
can display and manage that paid order.

## Selected Technology Direction

| Area | Current decision |
| --- | --- |
| Front end | HTML, CSS, vanilla JavaScript |
| Hosting | Cloudflare Pages |
| Backend | Cloudflare Pages Functions |
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

## In Progress

- Prepare the static scaffold for Cloudflare Pages deployment.

## Next Actions

1. Create a Cloudflare Pages project connected to the GitHub repository.
2. Configure Cloudflare Pages to serve the `public/` directory.
3. Deploy the static site with no backend behavior yet.
4. Open the deployed Pages URL on a phone and a computer.
5. Confirm the menu and cart interface loads correctly on both devices.

## Important Boundaries

- No real payments are enabled.
- No Stripe account values or secrets have been created or stored.
- No database exists and no schema migration has been run.
- No Cloudflare project has been configured.
- No package dependencies are installed.

## Decisions Log

| Date | Decision | Reason |
| --- | --- | --- |
| 2026-05-27 | Start with Cloudflare Pages, Pages Functions, D1, and Stripe Checkout. | This exposes the core website/backend/payment/database connections while avoiding server management. |
| 2026-05-27 | Use vanilla HTML/CSS/JavaScript first. | This keeps the learning focus on data flow rather than a framework. |
| 2026-05-27 | Build a browser staff dashboard before POS integration. | It is the smallest way to prove that orders arrive on another device. |
| 2026-05-27 | Poll for new orders before using WebSockets. | Simple polling is sufficient for the first milestone and easier to debug. |

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

- The next phase is Cloudflare Pages deployment of the static `public/` site.
- Do not add backend, database, or payment code before the static deployment is
  verified.
