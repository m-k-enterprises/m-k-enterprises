# Tasks: Brand-focused site refresh

**Input**: Design documents from `/specs/001-improve-brand-pages/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/

**Tests**: Tests are REQUIRED when key components or routes change.

**Constitution Gates (required)**: Include tasks to verify lint (`yarn lint`), key component tests, accessibility checks (keyboard + basic ARIA), performance/bundle impact, and Shopify token hygiene (no logging, env-only).

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Verify `.env.example` has placeholder Shopify tokens (`REACT_APP_SHOPIFY_TOKEN_*`) in `/workspaces/m-k-enterprises/.env.example`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

- [x] T002 Create active brand config in `src/services/brandConfig.ts` (active brands + client mapping)
- [x] T003 Create typed storefront models in `src/services/shopifyTypes.ts`
- [x] T004 Update Storefront query fields in `src/storefront.gql` to match contract scope
- [x] T005 Implement Shopify data-access module with cache + dedupe + retry + timeout handling (10s timeout, inline error on timeout) in `src/services/shopifyData.ts`
- [x] T006 Add service exports in `src/services/index.ts`
- [x] T007 Refactor data wiring to use the data-access layer in `src/App.tsx`

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Discover active brands from the homepage (Priority: P1) 🎯 MVP

**Goal**: Clear homepage with exactly three active brands linking to external storefronts.

**Independent Test**: Load homepage and confirm three active brands with external links; no disabled brand names appear.

### Tests for User Story 1

- [x] T008 [P] [US1] Update homepage brand link assertions in `src/routes/Home.test.tsx`

### Implementation for User Story 1

- [x] T009 [P] [US1] Create reusable brand tile component in `src/components/BrandTile.tsx` and export via `src/components/index.tsx`
- [x] T010 [US1] Render active brand tiles on the homepage in `src/routes/Home.tsx`

**Checkpoint**: User Story 1 is independently functional and testable

---

## Phase 4: User Story 2 - Consistent layout and messaging across pages (Priority: P2)

**Goal**: Shared layout patterns and aligned messaging across top-level pages.

**Independent Test**: Compare two top-level pages and confirm shared layout structure and messaging tone.

### Tests for User Story 2

- [x] T011 [P] [US2] Update layout-related assertions in `src/routes/About.test.tsx`
- [x] T012 [P] [US2] Update layout-related assertions in `src/routes/Responsibility.test.tsx`
- [x] T013 [P] [US2] Update layout-related assertions in `src/routes/Contact.test.tsx`
- [x] T014 [P] [US2] Update layout-related assertions in `src/routes/News.test.tsx`
- [x] T015 [P] [US2] Update layout-related assertions in `src/routes/Brands.test.tsx`
- [x] T016 [P] [US2] Update layout-related assertions in `src/routes/PrivacyPolicy.test.tsx`
- [x] T017 [P] [US2] Update layout-related assertions in `src/routes/Links.test.tsx`

### Implementation for User Story 2

- [x] T018 [P] [US2] Create shared layout components in `src/components/PageLayout.tsx` and `src/components/PageHeader.tsx` (export via `src/components/index.tsx`)
- [x] T019 [P] [US2] Apply shared layout to `src/routes/About.tsx`
- [x] T020 [P] [US2] Apply shared layout to `src/routes/Responsibility.tsx`
- [x] T021 [P] [US2] Apply shared layout to `src/routes/Contact.tsx`
- [x] T022 [P] [US2] Apply shared layout to `src/routes/News.tsx`
- [x] T023 [P] [US2] Apply shared layout + active-brand filter to `src/routes/Brands.tsx`
- [x] T024 [P] [US2] Apply shared layout to `src/routes/PrivacyPolicy.tsx`
- [x] T025 [P] [US2] Apply shared layout to `src/routes/Links.tsx`
- [x] T026 [P] [US2] Audit/update primary headings to ensure one H1 per page in `src/routes/*.tsx`

**Checkpoint**: User Story 2 is independently functional and testable

---

## Phase 5: User Story 3 - Clear status feedback and SEO basics (Priority: P3)

**Goal**: Inline loading/error/empty states and per-page SEO metadata without URL changes.

**Independent Test**: Simulate load failure/empty data for Home/Brands/News and confirm inline status UX; verify unique titles/descriptions per page.

### Tests for User Story 3

- [x] T027 [P] [US3] Add status-state coverage to `src/routes/Home.test.tsx`
- [x] T028 [P] [US3] Add status-state coverage to `src/routes/Brands.test.tsx`
- [x] T029 [P] [US3] Add status-state coverage to `src/routes/News.test.tsx`

### Implementation for User Story 3

- [x] T030 [P] [US3] Create inline status component in `src/components/StatusMessage.tsx` and export via `src/components/index.tsx`
- [x] T031 [P] [US3] Create metadata hook in `src/components/usePageMetadata.ts` and export via `src/components/index.tsx`
- [x] T032 [P] [US3] Apply status + metadata to `src/routes/Home.tsx`
- [x] T033 [P] [US3] Apply status + metadata to `src/routes/Brands.tsx`
- [x] T034 [P] [US3] Apply status + metadata to `src/routes/News.tsx`
- [x] T035 [P] [US3] Wire retry actions to re-fetch data in `src/routes/Home.tsx`, `src/routes/Brands.tsx`, `src/routes/News.tsx`
- [x] T036 [P] [US3] Apply metadata to `src/routes/About.tsx`
- [x] T037 [P] [US3] Apply metadata to `src/routes/Responsibility.tsx`
- [x] T038 [P] [US3] Apply metadata to `src/routes/Contact.tsx`
- [x] T039 [P] [US3] Apply metadata to `src/routes/PrivacyPolicy.tsx`
- [x] T040 [P] [US3] Apply metadata to `src/routes/Links.tsx`

**Checkpoint**: User Story 3 is independently functional and testable

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Quality gates, accessibility checks, and performance validation

- [x] T041 [P] Run `yarn lint` (scripts in `/workspaces/m-k-enterprises/package.json`) and resolve findings
- [x] T042 [P] Run `yarn test` and fix failing route/component tests (`src/routes/*.test.tsx`, `src/components/*.test.tsx`)
- [x] T043 [P] Run `yarn build` (scripts in `/workspaces/m-k-enterprises/package.json`)
- [x] T044 [P] Assess bundle size regression (`yarn build && npx source-map-explorer 'build/static/js/*.js'`) and note results in `/workspaces/m-k-enterprises/specs/001-improve-brand-pages/quickstart.md`
- [ ] T045 [P] Perform basic keyboard/ARIA checks on updated routes in `src/routes/*.tsx`
- [ ] T046 [P] Verify homepage payload ≤250KB and log result in `/workspaces/m-k-enterprises/specs/001-improve-brand-pages/quickstart.md`
- [x] T047 [P] Validate token hygiene in `src/clients.ts` and `/workspaces/m-k-enterprises/.env.example`
- [ ] T048 [P] QA check: confirm homepage → brand storefront path is ≤2 clicks; record result in `/workspaces/m-k-enterprises/specs/001-improve-brand-pages/quickstart.md`
- [ ] T049 [P] QA check: confirm top-level route map unchanged (Home, About, Brands, News, Responsibility, Contact, Privacy Policy, Links) and note result in `/workspaces/m-k-enterprises/specs/001-improve-brand-pages/quickstart.md`
- [ ] T050 [P] QA check: verify top-level URL paths remain unchanged (compare `/` + existing route paths) and note result in `/workspaces/m-k-enterprises/specs/001-improve-brand-pages/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: Depend on Foundational phase completion
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational - no dependencies
- **User Story 2 (P2)**: Can start after Foundational - no dependencies
- **User Story 3 (P3)**: Can start after Foundational - no dependencies

### Parallel Opportunities

- All tasks marked [P] can run in parallel if on different files
- User story phases can proceed in parallel once Foundational is complete

---

## Parallel Example: User Story 2

- Update `src/routes/About.tsx`
- Update `src/routes/Responsibility.tsx`
- Update `src/routes/Contact.tsx`

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. Validate User Story 1 independently

### Incremental Delivery

1. Complete Setup + Foundational
2. Add User Story 1 → Test independently → Demo
3. Add User Story 2 → Test independently → Demo
4. Add User Story 3 → Test independently → Demo

---

## Notes

- [P] tasks = different files, no dependencies
- Each user story is independently completable and testable
- Avoid cross-story dependencies that break independence
