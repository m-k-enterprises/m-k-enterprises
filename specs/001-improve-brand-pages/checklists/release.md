# Release Checklist: Brand-focused site refresh

**Purpose**: Release readiness checks for security, brand scope, data UX, quality gates, and accessibility
**Created**: 2026-01-24
**Feature**: /workspaces/m-k-enterprises/specs/001-improve-brand-pages/spec.md

## Security & Tokens

- [ ] CHK001 Shopify tokens are not committed to the repo (no tokens in git history, working tree, or logs)
- [ ] CHK002 Runtime logs do not print any `REACT_APP_SHOPIFY_TOKEN_*` values
- [ ] CHK003 `.env.example` contains placeholders only (no real secrets)

## Brand Scope & Content

- [ ] CHK004 Brand pages and homepage surface only the three active brands (Bear Belts, Pocket Bears Apparel, Mythical Moods)
- [ ] CHK005 No UI routes, navigation links, or API calls reference disabled brands (Sizzle & Soak, Aura & Essence)

## Shopify Data UX States

- [ ] CHK006 Loading states render inline for Shopify data fetches
- [ ] CHK007 Error states render inline with a retry action
- [ ] CHK008 Empty states show dedicated messaging (not error blocks) for no brands or no news

## Quality Gates

- [ ] CHK009 `yarn lint` passes
- [ ] CHK010 `yarn test` passes
- [ ] CHK011 `yarn build` passes

## Accessibility (Basic)

- [ ] CHK012 All interactive elements are keyboard reachable in updated routes
- [ ] CHK013 Primary headings are present and unique per page
- [ ] CHK014 Images in updated routes have appropriate alt text or are marked decorative

## Notes

- Check items off as completed: `[x]`
- Add evidence or links inline where helpful
