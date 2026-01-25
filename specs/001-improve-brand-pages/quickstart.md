# Quickstart: Brand-focused site refresh

## Goal
Implement homepage brand focus, shared layout and status messaging, and SEO metadata updates without changing existing routes.

## Prerequisites
- Node LTS
- Yarn
- `.env` with Shopify tokens (`REACT_APP_SHOPIFY_TOKEN_*`)

## Local setup
1. Install dependencies.
2. Run the dev server and confirm existing routes render.

## Feature implementation map
- Add a single Shopify data-access module under `src/services/` that:
  - Fetches `shop` + `brand` (logo/colors/shortDescription/coverImage) + `articles`.
  - Provides typed responses for reuse across routes.
  - Implements per-session in-memory cache and in-flight request deduping.
- Update routes for consistent layout/messaging and inline status states.
- Update page titles and meta descriptions without changing URLs.

## Validation
- Confirm the homepage shows exactly three active brands and links to external storefronts.
- Validate loading, error, and empty states are inline and consistent.
- Verify no disabled brands appear in UI or API calls.
- Ensure homepage data payload stays ≤250KB.

## Notes
- Keep CRA + TypeScript + Yarn conventions intact.
- Do not log Shopify tokens.

## Validation Log

- **Lint**: `yarn lint` completed with a TypeScript version warning from eslint parser.
- **Tests**: `CI=true yarn test --watchAll=false` passed; React Suspense act warning observed in `App.test.tsx`.
- **Build**: `yarn build` completed; Browserslist and TypeScript parser warnings observed.
- **Bundle analysis**: `npx source-map-explorer 'build/static/js/*.js' --no-border-checks --json specs/001-improve-brand-pages/bundle-analysis.json` completed with partial map warnings; output saved to `specs/001-improve-brand-pages/bundle-analysis.json`.
- **Keyboard/ARIA review**: Checked updated routes for native interactive elements (buttons/links), navbar toggle has aria-controls, status spinners include visually-hidden text. No blockers found.
- **QA click path**: Homepage brand tiles link directly to external storefronts (≤2 clicks from homepage).
- **QA route map**: Verified routes in `src/App.tsx` match existing paths: `/`, `/about`, `/brands`, `/news`, `/responsibility`, `/contact`, `/links`, `/privacy-policy`.
- **QA URL paths**: Confirmed no changes to top-level URL paths (same set as route map).
- **Homepage payload**: Shopify response sizes (bytes) = bearBelts 9980, pocketBearsApparel 2511, mythicalMoods 4221. Total 16712 bytes (≤250KB).
