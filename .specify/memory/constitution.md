<!--
Sync Impact Report:
- Version change: N/A (template) → 1.0.0 (initial adoption)
- Modified principles: Template placeholders → CRA + TypeScript + Yarn Conventions; Strict Secrets Hygiene; Multi-Brand Enablement Matrix; Quality Gates & UX Baselines; Shopify API Resilience
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
# M-K Enterprises React Frontend Constitution

## Core Principles

### I. CRA + TypeScript + Yarn Conventions
This codebase MUST remain a Create React App (CRA) + TypeScript project.
All development and build commands MUST use CRA scripts, and application code
MUST be written in TypeScript. Yarn is the standard package manager: keep
`yarn.lock` authoritative, run `yarn` scripts, and avoid npm unless explicitly
approved and documented. CRA environment conventions (e.g., `REACT_APP_*`) MUST
be followed for client-side configuration.

### II. Strict Secrets Hygiene (Shopify Tokens)
Shopify tokens MUST never be logged, surfaced in UI, or committed to the repo.
Tokens MUST live only in local `.env` files (with placeholders in `.env.example`)
or in CI secret stores. Local development uses `.env`; CI uses encrypted secrets
and injected environment variables. Any error handling or telemetry MUST redact
tokens before logging.

### III. Multi-Brand Enablement Matrix
Active brands are **Bear Belts**, **Pocket Bears Apparel**, and **Mythical Moods**.
Disabled brands **Sizzle & Soak** and **Aura & Essence** MUST remain disabled:
no UI routes, no navigation links, no API calls, and no client initialization.
Enabling or disabling a brand requires explicit approval and a constitution
amendment.

### IV. Quality Gates & UX Baselines
ESLint MUST pass before merge. Key components and route-level pages MUST have
tests (unit or integration) updated with behavior changes. Accessibility MUST
cover keyboard navigation for interactive elements and basic ARIA labels and
semantics. Performance budgets MUST be protected by avoiding heavy dependencies,
preferring code splitting, and reviewing bundle size regressions.

### V. Shopify API Resilience
Shopify Storefront calls MUST handle failures gracefully with user-friendly
fallbacks, timeouts, and retry-safe behavior. Caching MUST be used where
sensible (e.g., Apollo cache) to avoid redundant requests and to reduce latency.
Unhandled promise rejections are not allowed.

## Security & Brand Constraints

- Tokens exist only in `.env` (local) or CI secret stores (pipeline).
- `.env.example` may include placeholders, never real secrets.
- Disabled brands MUST not appear in UI routes, navigation, or API calls.
- Any new Shopify integration MUST document its error and timeout behavior.

## Development Workflow & Quality Gates

- PRs MUST document constitution compliance.
- `yarn lint` MUST pass before review.
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

**Version**: 1.0.0 | **Ratified**: TODO(RATIFICATION_DATE): confirm original adoption date | **Last Amended**: 2026-01-24
