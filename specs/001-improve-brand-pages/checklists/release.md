# Release Checklist: Brand-focused site refresh

**Purpose**: Release readiness checks for security, brand scope, data UX, quality gates, and accessibility
**Created**: 2026-01-24
**Feature**: /workspaces/m-k-enterprises/specs/001-improve-brand-pages/spec.md

## Security & Tokens

- [x] CHK001 Shopify tokens are not committed to the repo (no tokens in git history, working tree, or logs)
	- Evidence (2026-01-25): working tree grep found placeholders only in `.env.example` and test mocks; git history search found no token patterns.
- [x] CHK002 Runtime logs do not print any `REACT_APP_SHOPIFY_TOKEN_*` values
	- Evidence (2026-01-25): code scan found env vars used only in `src/clients.ts` and test mocks; no logging of token values.
- [x] CHK003 `.env.example` contains placeholders only (no real secrets)
	- Evidence (2026-01-25): `.env.example` uses `your-*-token` placeholders only.

## Brand Scope & Content

- [x] CHK004 Brand pages and homepage surface only the three active brands (Bear Belts, Pocket Bears Apparel, Mythical Moods)
	- Evidence (2026-01-25): `activeBrands` lists only the three active brands; `App.tsx` and `Home.tsx` render data from those three queries; `Brands.tsx` filters display to `activeBrands`.
- [ ] CHK005 No UI routes, navigation links, or API calls reference disabled brands (Sizzle & Soak, Aura & Essence)

## Shopify Data UX States

- [x] CHK006 Loading states render inline for Shopify data fetches
	- Evidence (2026-01-25): inline placeholders/spinners in `Home.tsx`, `Brands.tsx`, `Contact.tsx`, `Links.tsx`, and `News.tsx`, with `Articles.tsx` rendering skeleton cards during loading.
- [x] CHK007 Error states render inline with a retry action
	- Evidence (2026-01-25): `StatusMessage` renders inline error alerts with a Retry button; routes `Home.tsx`, `Brands.tsx`, and `News.tsx` pass `onRetry` when error state is active.
- [x] CHK008 Empty states show dedicated messaging (not error blocks) for no brands or no news
	- Evidence (2026-01-25): empty-state copy in `Home.tsx`, `Brands.tsx`, and `News.tsx` uses `StatusMessage` with `state="empty"` and dedicated messaging for no brands/news.

## Quality Gates

- [x] CHK009 `yarn lint` passes
	- Evidence (2026-01-25): `yarn lint` completed successfully (warned about TypeScript version support).
- [x] CHK010 `yarn test` passes
	- Evidence (2026-01-25): `CI=true yarn test --watchAll=false` completed successfully (warnings only).
- [x] CHK011 `yarn build` passes
	- Evidence (2026-01-25): `yarn build` completed successfully (warnings only).

## Accessibility (Basic)

- [x] CHK012 All interactive elements are keyboard reachable in updated routes
	- Evidence (2026-01-25): updated routes use semantic buttons/anchors (e.g., `Button` with `as="a"` in `BrandTile`, `ShopCarouselItem`, `Articles`, `LinkCard`, and route-level links) with no custom click-only elements.
- [x] CHK013 Primary headings are present and unique per page
	- Evidence (2026-01-25): `Home.tsx` and `Links.tsx` include a single visually-hidden `<h1>`, while other routes use `PageLayout` headers.
- [x] CHK014 Images in updated routes have appropriate alt text or are marked decorative
	- Evidence (2026-01-25): logo images now fall back to `${shop.name} logo`, articles use titles for alt text, and gravatar/team images include member names; decorative backgrounds remain in CSS.

## Notes

- Check items off as completed: `[x]`
- Add evidence or links inline where helpful
