## Context

The current site is a Create React App single-page application with a single `BrowserRouter` shell, runtime page metadata updates, and client-side Shopify storefront fetching. It is deployed as a static GitHub Pages site with a custom domain and an SPA redirect workaround in `public/index.html`.

The migration needs to preserve the public route map, active-brand rules, and the current Shopify data scope while replacing the framework, build pipeline, and deploy shape. The repository already keeps application code under `src/`, uses Yarn, TypeScript, React-Bootstrap, and SCSS, and has existing route and component tests that should remain the baseline for parity.

## Goals / Non-Goals

**Goals:**
- Move the public site from CRA to Next.js with the App Router.
- Preserve the existing top-level routes and visitor-facing behaviour during the migration.
- Keep the first release compatible with static export deployment and the current custom-domain hosting flow.
- Replace runtime metadata mutation with declarative Next.js metadata.
- Keep the current styling stack, active-brand filtering, and Shopify data scope intact.

**Non-Goals:**
- Redesigning page layouts or changing the current site information architecture.
- Expanding Shopify queries, introducing product data, or re-enabling disabled brands.
- Moving the site to a server-rendered host in the same change.
- Introducing a full server-side data layer, Route Handlers, or authenticated features.

## Decisions

### 1. Use the App Router in `src/app`

The migration will use Next.js App Router route files in `src/app` and keep the rest of the application code in `src/components`, `src/services`, and related folders. Next.js explicitly supports `src/app`, which lets the project keep its current source layout while adopting file-system routing.

This replaces the single `BrowserRouter` entrypoint with one `page.tsx` per existing public route plus a root `layout.tsx` for shared shell UI.

Alternatives considered:
- Catch-all SPA compatibility shell: lower effort, but it keeps React Router and delays most of the migration value.
- Pages Router: viable, but App Router is the current Next.js direction and maps cleanly to the small, fixed route set in this repository.

### 2. Keep the first migration on static export

The initial Next.js configuration will use static export output so the site can continue to deploy as static files. The build should continue to emit into `build/`, and `trailingSlash: true` should be used so static routes export as `/route/index.html`, which is a better fit for GitHub Pages-style hosting than flat `.html` paths.

This keeps hosting change out of scope and removes the current SPA redirect workaround once route files are emitted directly.

Alternatives considered:
- Move immediately to server hosting: this would enable server-side fetching and private tokens, but it adds hosting, runtime, and deployment changes on top of the framework migration.
- Keep the current CRA hosting behaviour via a catch-all static SPA page: this would not materially simplify the final architecture.

### 3. Migrate route composition, not just the bundler

The shared navbar, footer, and global shell from the current root component will move into the Next root layout, and each current top-level route will become its own App Router page. Internal navigation will use `next/link` rather than `react-router-dom` and `react-router-bootstrap`.

This makes the migration a real route-platform change instead of wrapping the old SPA inside Next.js.

Alternatives considered:
- Embedding the current `App` component behind a client-only catch-all route: useful as a temporary compatibility pattern, but unnecessary for a small route map and harder to clean up later.

### 4. Replace imperative metadata with Next metadata exports

The custom browser-side metadata hook will be removed in favour of static `metadata` exports on pages and the root layout. Shared defaults such as the site title template and `metadataBase` belong in the root layout, while page-specific titles and descriptions belong in each route file.

Static metadata is sufficient for the current route set because the pages are fixed and do not require route-parameter-driven metadata.

Alternatives considered:
- Continue mutating `document.title` and `<meta>` tags in client components: it preserves current behaviour, but leaves SEO improvements and framework conventions unused.
- Use `generateMetadata` everywhere: unnecessary for fixed routes that can use static metadata.

### 5. Keep Shopify fetching client-side for the first pass, but remove CRA-specific query loading

The first migration will preserve the current client-side Shopify data flow so the hosting model stays static. Environment variables that are intentionally exposed to the browser will be renamed from `REACT_APP_*` to `NEXT_PUBLIC_*`, matching Next.js client-exposure rules.

The `graphql.macro` query loading should be replaced with a Next-compatible approach, preferably a local module that exports the query document with Apollo's `gql`. This avoids relying on CRA/Babel macro behaviour inside the new toolchain and keeps query loading explicit.

Alternatives considered:
- Move Shopify fetching to the server or build step immediately: better for secrecy and first-load performance, but not compatible with the chosen static-first migration scope without also changing freshness expectations.
- Preserve `graphql.macro` via custom bundler configuration: possible, but it adds toolchain complexity for little benefit.

### 6. Keep the existing styling and test stack with Next-native integration

The migration will preserve the current SCSS, Bootstrap, and React-Bootstrap stack. Global SCSS imports will move to the root layout, and static assets will remain under the project root `public/` folder, which Next.js continues to serve directly.

For tests, the project should move from CRA’s Jest wiring to `next/jest` while keeping React Testing Library as the test surface for component and route parity. Existing tests remain valuable and should be adapted rather than replaced wholesale.

Alternatives considered:
- Rewrite styles into CSS Modules or a new design system: out of scope and high churn.
- Switch test runners as part of the migration: not necessary to complete the platform move.

## Risks / Trade-offs

- [Static export keeps browser-exposed Shopify tokens public] → Preserve that behaviour intentionally in this change, document it clearly, and treat server-side token protection as a follow-up change.
- [Direct App Router migration touches shared shell, routes, metadata, scripts, and tests at once] → Migrate in vertical slices with route parity checks, then remove CRA artifacts only after Next build parity is confirmed.
- [GitHub Pages-style route handling can fail if export paths are wrong] → Use static export with `trailingSlash: true`, verify route output structure in `build/`, and smoke-test direct navigation for each top-level route.
- [`graphql.macro` may not behave correctly under the new toolchain] → Replace it early with an explicit query module and update related tests in the same change.
- [Static export limits future Next.js features] → Make the static-hosting decision explicit in config so it can be reversed cleanly in a later hosting-focused change.

## Migration Plan

1. Add Next.js configuration and scripts, keeping the app under `src/` and setting static export output to `build/`.
2. Create `src/app/layout.tsx` and `src/app/.../page.tsx` files for the existing top-level routes, moving shared shell UI from the current root component into the layout.
3. Move page metadata to Next metadata exports and migrate supported static metadata files away from `public/index.html` conventions.
4. Replace React Router usage with App Router navigation primitives and remove CRA-specific entry files and SPA redirect plumbing.
5. Port the Shopify query module and client-side data hooks to the Next app, renaming environment variables to `NEXT_PUBLIC_*`.
6. Update Jest, lint, build, and deployment configuration, then remove obsolete CRA dependencies and files.

Rollback strategy:
- Keep the migration isolated to a single change branch.
- Do not delete CRA-specific files until the Next build, tests, and local route checks pass.
- If deployment parity fails, revert the branch and keep the existing CRA build pipeline untouched in production.

## Open Questions

- Should a follow-up change move Shopify storefront requests to build-time or server-side fetching to improve secrecy and first-load performance?
- Does the current GitHub Pages deployment need any CI or workflow updates beyond the local `yarn deploy` script once static export is in place?
