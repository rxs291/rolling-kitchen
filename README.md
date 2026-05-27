# Food Truck Online Ordering Practice Project

This project is a learning build for connecting the parts of a small online
ordering system:

- A customer-facing menu and cart.
- A Cloudflare-hosted website and serverless backend.
- Stripe Checkout in test mode for payments.
- A Cloudflare D1 database for paid orders.
- A private staff screen that displays incoming orders on another device.

The goal is to build each connection deliberately, with a working checkpoint
after each step.

## Start Here

- Read [docs/PROJECT_GUIDE.md](docs/PROJECT_GUIDE.md) for the user story,
  technical approach, and ordered build plan.
- Read and update [docs/PROGRESS.md](docs/PROGRESS.md) whenever work pauses or
  a milestone is completed.

## Current Scaffold

```text
public/
  index.html         customer menu and cart prototype
  app.js             browser-only cart behavior
  styles.css         shared styling
  staff/
    orders.html      future order dashboard placeholder
docs/
  PROJECT_GUIDE.md   plan and sequential instructions
  PROGRESS.md        saved project status
```

The current site is intentionally static. It does not yet take payments, save
orders, or authenticate staff.

## Technology Direction

```text
Front end:      HTML, CSS, vanilla JavaScript
Hosting:        Cloudflare Pages
Backend:        Cloudflare Pages Functions
Database:       Cloudflare D1
Payment:        Stripe Checkout, test mode first
Staff access:   Cloudflare Access, after the dashboard works
Source control: Git and GitHub
```

This keeps the first version understandable and avoids adding frameworks or
packages before they solve a real problem.
