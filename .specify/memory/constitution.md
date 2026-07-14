<!--
Sync Impact Report:
- Version change: 1.0.0 → 2.0.0 (framework governance changed from CRA to Next.js)
- Modified principles: CRA + TypeScript + Yarn Conventions → Next.js + TypeScript + Yarn Conventions; Strict Secrets Hygiene; Quality Gates & UX Baselines
- Added sections: Security & Brand Constraints; Development Workflow & Quality Gates
- Removed sections: None
- Templates requiring updates:
	- .specify/templates/plan-template.md ✅ updated
	- .specify/templates/spec-template.md ✅ updated
	- .specify/templates/tasks-template.md ✅ updated
	- README.md ✅ updated
	- AGENTS.md ✅ updated
	- .specify/templates/commands/ ⚠ not present in repo
- Follow-up TODOs:
	- TODO(RATIFICATION_DATE): confirm original ratification date
-->
# M-K Enterprises Next.js Frontend Constitution

## Core Principles

### I. Next.js + TypeScript + Yarn Conventions
This codebase MUST remain a Next.js App Router + TypeScript project. URL entry
points and metadata MUST live in `src/app`, and static hosting constraints MUST
remain explicit in `next.config.ts`. Yarn is the standard package manager: keep
`yarn.lock` authoritative, run `yarn` scripts, and avoid npm unless explicitly
approved and documented. Next.js environment conventions, including
`NEXT_PUBLIC_*` only for intentionally browser-visible configuration, MUST be
followed.

### II. Strict Secrets Hygiene (Shopify Tokens)
Shopify tokens MUST never be logged, rendered as UI content, or committed to the
repo. Tokens MUST live only in local environment files (with placeholders in
`.env.example`) or in CI secret stores. The static client MAY use narrowly scoped
Shopify Storefront tokens through `NEXT_PUBLIC_*`; Shopify Admin or other private
credentials MUST never use a public variable. Error handling and telemetry MUST
redact tokens before logging.

### III. Multi-Brand Enablement Matrix
Active brands are **Bear Belts**, **Pocket Bears Apparel**, and **Mythical Moods**.
Disabled brands **Sizzle & Soak** and **Aura & Essence** MUST remain disabled:
no UI routes, no navigation links, no API calls, and no client initialization.
Enabling or disabling a brand requires explicit approval and a constitution
amendment.

### IV. Quality Gates & UX Baselines
ESLint and TypeScript checks MUST pass before merge, followed by tests and the
production build. Key components and route-level pages MUST have tests (unit or
integration) updated with behaviour changes. Accessibility MUST
cover keyboard navigation for interactive elements and basic ARIA labels and
semantics. Performance budgets MUST be protected by avoiding heavy dependencies,
preferring code splitting, and reviewing bundle size regressions.

### V. Shopify API Resilience
Shopify Storefront calls MUST handle failures gracefully with user-friendly
fallbacks, timeouts, and retry-safe behavior. Caching MUST be used where
sensible (e.g., Apollo cache) to avoid redundant requests and to reduce latency.
Unhandled promise rejections are not allowed.

## Security & Brand Constraints

- Tokens exist only in local environment files or CI secret stores.
- `.env.example` may include placeholders, never real secrets.
- Only restricted Storefront tokens may use `NEXT_PUBLIC_*`; never expose Admin
  or private credentials.
- Disabled brands MUST not appear in UI routes, navigation, or API calls.
- Any new Shopify integration MUST document its error and timeout behavior.

## Development Workflow & Quality Gates

- PRs MUST document constitution compliance.
- `yarn lint` MUST pass before review.
- `yarn typecheck`, `yarn test` and `yarn build` MUST pass before review.
- Tests for touched key components/routes MUST be updated and green.
- Accessibility checks (keyboard + basic ARIA) are required for new/changed UI.
- Bundle size regressions MUST be assessed (e.g., `yarn build` + bundle analysis).

## Governance

- The constitution supersedes all other project conventions.
- Amendments require a PR that updates this document, includes the rationale,
	and bumps the version using semantic versioning (MAJOR: breaking governance,
	MINOR: new or expanded principle/section, PATCH: clarifications).
- Every plan/spec MUST include a constitution check; PR reviewers MUST verify
	compliance or document exceptions with approval.
- Compliance is reviewed at least once per release cycle or major feature.

**Version**: 2.0.0 | **Ratified**: TODO(RATIFICATION_DATE): confirm original adoption date | **Last Amended**: 2026-07-13
