# 📍 Page View Guide (`src/routes`)

This folder contains the existing page-level view components. Next.js URL
routing lives in `src/app/`; each `app/**/page.tsx` imports one of these views
and owns its route metadata.

## 🗂️ Conventions

- Keep one PascalCase view component per file with a default export.
- Add `'use client'` when the view uses hooks, browser APIs or client-only UI.
- Keep props narrow. Storefront-backed views may use `useStorefront()` from
  `src/App.tsx`, while accepting props remains useful for isolated tests.
- Use Bootstrap utilities and the existing SCSS theme.
- Co-locate tests in this folder.

## 🚦 Adding a route

1. Create the page view in `src/routes/FooBar.tsx` when a separate view is useful.
2. Create `src/app/foo-bar/page.tsx` and default-export the view.
3. Export typed Next.js `Metadata` from the page file.
4. Add a `next/link` navigation entry when required.
5. Add or update the co-located view test.
6. Run `yarn lint`, `yarn typecheck`, `yarn test` and `yarn build`.

## 🧩 Storefront data

The root `App` provider loads active Shopify storefronts once and exposes the
combined state through `useStorefront()`. Put GraphQL documents in typed
TypeScript modules using Apollo's `gql` helper; do not reintroduce build macros.
