## 1. Foundation

- [x] 1.1 Add Next.js and supporting configuration, including `next.config` for static export to `build/` and trailing-slash route output.
- [x] 1.2 Update `package.json`, `.gitignore`, TypeScript includes, and Jest wiring so the repo runs on Next.js tooling instead of CRA tooling.
- [x] 1.3 Update environment variable examples and documentation from `REACT_APP_*` to `NEXT_PUBLIC_*` naming without changing the active brand matrix.

## 2. App Router Structure

- [x] 2.1 Create the root Next.js layout in `src/app` and move the shared shell, navigation, footer, and global style imports into it.
- [x] 2.2 Create App Router page files for all current top-level routes and map them to the existing page content/components.
- [x] 2.3 Move page titles and descriptions to Next.js metadata exports and migrate supported static metadata assets away from CRA `index.html` conventions.

## 3. Storefront and UI Parity

- [x] 3.1 Replace `graphql.macro` usage with a Next-compatible query module and adapt the storefront service layer accordingly.
- [x] 3.2 Port the Shopify data-loading flow into the Next app while preserving the existing active-brand filtering, data scope, and status-message behaviour.
- [x] 3.3 Replace internal React Router navigation with Next.js navigation primitives while keeping the public route paths unchanged.

## 4. Cleanup and Deployment

- [x] 4.1 Remove CRA-only entry files, SPA redirect plumbing, and obsolete router/build dependencies after Next route parity is confirmed.
- [x] 4.2 Update the static deployment flow for the Next build output, including custom-domain assets and direct-route handling expectations.
- [x] 4.3 Refresh repository documentation and agent notes so local development, testing, and deploy steps describe the Next.js workflow.

## 5. Verification

- [x] 5.1 Update existing tests to run under `next/jest` and add or adjust route-level assertions where the migration changes structure.
- [x] 5.2 Run the repository quality gates in order: lint, tests, and production build; fix migration regressions that block parity.
- [x] 5.3 Smoke-test each preserved top-level route for direct navigation, metadata presence, active-brand filtering, and deployable static output.
