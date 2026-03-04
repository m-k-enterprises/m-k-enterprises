# Implementation Plan: Brand-focused site refresh

**Branch**: `001-improve-brand-pages` | **Date**: 2026-01-24 | **Spec**: `/workspaces/m-k-enterprises/specs/001-improve-brand-pages/spec.md`
**Input**: Feature specification from `/specs/001-improve-brand-pages/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Deliver a clearer homepage focused on the three active brands, align layout/messaging across routes, add shared loading/error/empty states, and improve SEO metadata while keeping existing URLs. Implement a lightweight Shopify data-access module with typed responses, in-memory session caching, and request deduping to improve resilience and performance without a full rewrite.

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: TypeScript (CRA defaults)  
**Primary Dependencies**: React, React Router, Apollo Client, graphql.macro, React-Bootstrap, @smolpack/react-bootstrap-extensions, lodash  
**Storage**: N/A (in-memory session cache only)  
**Testing**: Jest + React Testing Library (CRA)  
**Target Platform**: Web (modern evergreen browsers)
**Project Type**: web  
**Performance Goals**: Loading feedback within 1 second; homepage data payload ≤250KB  
**Constraints**: Keep existing routes/URLs, no disabled brands in UI or calls, CRA/Yarn conventions, no token logging  
**Scale/Scope**: 3 active Shopify clients, 8 top-level routes, shared UI components

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- CRA + TypeScript + Yarn conventions maintained (CRA scripts, `yarn.lock`).
- Secrets hygiene enforced (Shopify tokens only in `.env`/CI, never logged).
- Brand enablement matrix respected (disabled brands have no routes or calls).
- Quality gates covered (lint/tests/a11y/perf budget).
- Shopify API resilience planned (graceful errors, timeouts, caching).

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```text
src/
├── components/
├── routes/
├── services/              # Shopify data-access module
├── clients.ts
├── storefront.gql
└── App.tsx

public/
└── index.html
```

**Structure Decision**: Single CRA web app; add a `src/services` module for Shopify data access while keeping existing routes and components intact.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |

## Phase 0: Research Summary

Reference: `/workspaces/m-k-enterprises/specs/001-improve-brand-pages/research.md`

Key outcomes:
- Centralized Shopify data-access module with typed helpers.
- Per-session in-memory cache + in-flight deduping to prevent redundant calls.
- Inline loading/error/empty states with retry actions.

## Phase 1: Design & Contracts

Planned artifacts:
- `data-model.md` (brand, page metadata, status message)
- `contracts/storefront.graphql` (shop + brand + articles schema)
- `quickstart.md` (developer workflow + cache/deduping notes)

## Phase 1: Constitution Re-check

- CRA + TypeScript + Yarn conventions maintained.
- Secrets hygiene enforced (no token logging; `.env` pattern).
- Disabled brands remain excluded from routes and calls.
- Quality gates maintained with updated tests for touched routes/components.
- Shopify API resilience includes inline error handling, caching, and deduping.
