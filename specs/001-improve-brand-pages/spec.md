# Feature Specification: Brand-focused site refresh

**Feature Branch**: `001-improve-brand-pages`  
**Created**: 2026-01-24  
**Status**: Draft  
**Input**: User description: "Improve the M-K Enterprises website: Clear homepage that links to the 3 active brands; Pages with consistent layout and messaging; Shared components, loading states, and error states; No references or surfaced content for closed/disabled brands; Basic SEO: titles/descriptions per page, sensible headings, and clean URLs"

## Clarifications

### Session 2026-01-24

- Q: Should we change URLs or keep them while improving SEO? → A: Keep existing URLs; update titles/descriptions/headings only.
- Q: Where should homepage brand tiles link? → A: Link directly to external Shopify storefronts (primaryDomain URLs).
- Q: What error-state UX should be used? → A: Inline error block with a “Retry” action.
- Q: What loading-state UX should be used? → A: Inline loading state inside the page content.
- Q: Should we keep the current site map? → A: Keep current routes (Home, About, Brands, News, Responsibility, Contact, Privacy Policy, Links).
- Q: Which Shopify objects should we fetch? → A: Fetch only shop + brand (logo/colors/shortDescription/coverImage) and articles.
- Q: How should empty data be handled? → A: Use empty-state messaging; reserve error states for actual failures.
- Q: What performance constraints should we target? → A: Loading feedback ≤1s and homepage data payload ≤250KB.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Discover active brands from the homepage (Priority: P1)

As a visitor, I want a clear homepage that highlights only the active brands so I can quickly navigate to the brand I care about.

**Why this priority**: Brand discovery is the primary entry point and should be immediately obvious.

**Independent Test**: A tester can open the homepage and confirm only the three active brands are presented with working links.

**Acceptance Scenarios**:

1. **Given** I am on the homepage, **When** I view the brand section, **Then** exactly three active brands are displayed and each links to its brand page.
2. **Given** I am on the homepage, **When** I scan visible content, **Then** no closed or disabled brand names appear anywhere.

---

### User Story 2 - Consistent layout and messaging across pages (Priority: P2)

As a visitor, I want pages to feel cohesive so I can trust I am on the official M-K Enterprises site and understand how the brands relate.

**Why this priority**: Consistency builds credibility and reduces confusion across the site.

**Independent Test**: A tester can compare any two top-level pages and confirm shared layout elements and aligned messaging are present.

**Acceptance Scenarios**:

1. **Given** I navigate between top-level pages, **When** I compare their structure, **Then** they share a consistent layout framework and messaging style.
2. **Given** I view any top-level page, **When** I read headings and supporting text, **Then** the content aligns with the approved brand and company messaging.

---

### User Story 3 - Clear status feedback and SEO basics (Priority: P3)

As a visitor, I want clear loading or error feedback and meaningful page titles and descriptions so I can understand what is happening and find the right page.

**Why this priority**: Transparent status feedback and basic SEO improve trust, usability, and discoverability.

**Independent Test**: A tester can simulate a slow or failed load and verify the status message, then verify each page has a unique, descriptive title and description.

**Acceptance Scenarios**:

1. **Given** a page is loading content, **When** data takes longer than a brief moment to appear, **Then** a clear loading message is shown until content is ready.
2. **Given** a page fails to load content, **When** the failure occurs, **Then** a clear error message is shown with a recovery option.
3. **Given** I visit any top-level page, **When** I check its title and description, **Then** they are unique and accurately describe the page content.

### Edge Cases

- The active brand list is unavailable or empty.
- A page fails to load its primary content.
- A user navigates directly to a brand page with a malformed or outdated URL.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The homepage MUST prominently present exactly three active brands, each with a clear link to its brand page.
- **FR-001a**: Homepage brand links MUST direct to each brand's external storefront URL (primaryDomain).
- **FR-002**: The site MUST NOT display closed or disabled brand names, links, or related content anywhere in the UI.
- **FR-003**: Top-level pages MUST follow a consistent layout framework and aligned messaging style.
- **FR-004**: The site MUST provide shared visual components for repeated patterns (e.g., brand tiles, page headers, status messaging) to ensure consistency.
- **FR-005**: Pages that load data MUST display a clear loading message during wait states.
- **FR-005a**: Loading states MUST render inline within the page content area, preserving layout.
- **FR-006**: Pages that encounter failures MUST display a clear error message and a recovery option (e.g., retry or return to a safe page).
- **FR-006a**: Error states MUST use an inline error block with a retry action, keeping users on the same page.
- **FR-007**: Each top-level page MUST define a unique, descriptive page title and meta description.
- **FR-008**: Existing top-level page URLs MUST remain unchanged; SEO improvements apply to titles, descriptions, and headings only.
- **FR-009**: Page headings MUST be structured and descriptive, with a single primary heading per page.
- **FR-010**: The top-level route map MUST remain unchanged: Home, About, Brands, News, Responsibility, Contact, Privacy Policy, Links.
- **FR-011**: Shopify data fetching MUST be limited to shop + brand (logo/colors/shortDescription/coverImage) and articles; no product collections are required.
- **FR-012**: Empty data states (e.g., no brands or no news) MUST display a dedicated empty-state message, not an error.
- **FR-013**: Homepage data payload (brands + news) MUST remain at or below 250KB.

### Functional Requirement Acceptance Criteria

- **FR-001**: A reviewer can count three and only three active brands on the homepage, and each link resolves to the correct brand page.
- **FR-001a**: Each homepage brand tile link opens the brand's external storefront URL.
- **FR-002**: A content scan of visible UI and navigation shows no closed or disabled brand names or links.
- **FR-003**: Any two top-level pages share the same core layout structure and messaging tone.
- **FR-004**: Repeated patterns (brand tiles, page headers, status messaging) appear in a consistent visual style across pages.
- **FR-005**: When content is delayed, a user-visible loading message is shown until the content is ready.
- **FR-005a**: The loading message appears inline in the page content (no full-page loading screen).
- **FR-006**: When a failure occurs, a user-visible error message appears with at least one recovery option.
- **FR-006a**: The error message is rendered inline with a retry control; the page route remains unchanged.
- **FR-007**: Each top-level page presents a unique title and description that matches its content intent.
- **FR-008**: No top-level page URL changes occur; metadata and headings are updated without altering routes.
- **FR-009**: Each top-level page has one primary heading that clearly names the page.
- **FR-010**: Navigation and routing confirm the existing top-level routes remain available and unchanged.
- **FR-011**: Network payload inspection shows only shop/brand fields and articles are requested; products are not queried.
- **FR-012**: When data is empty but no failure occurs, an empty-state message is shown and the error block is not rendered.
- **FR-013**: Data payload measurement for the homepage remains ≤250KB.

### Constitution Constraints *(mandatory)*

- The solution MUST remain within CRA + TypeScript + Yarn conventions.
- Shopify tokens MUST stay in `.env`/CI secrets and MUST never be logged.
- Disabled brands (Sizzle & Soak, Aura & Essence) MUST not have UI routes or calls.
- Quality gates MUST be met (lint, key component tests, a11y, performance budget).
- Shopify integrations MUST include graceful errors, timeouts, and sensible caching.

### Key Entities *(include if feature involves data)*

- **Brand**: Represents an active brand with name, summary messaging, and a canonical page link.
- **Page Metadata**: Represents a page’s title, description, and canonical path for discoverability.
- **Status Message**: Represents a user-facing loading or error message for a page.

### Assumptions

- There are exactly three active brands to surface, and their public names are approved.
- Brand pages already exist.

### Dependencies

- Approved list of active brands and their canonical messaging.
- Access to existing page content to align headings and descriptions.

### Out of Scope

- Reintroducing or marketing closed/disabled brands.
- Major rebranding or visual identity changes beyond layout consistency.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of top-level pages have unique, accurate titles and descriptions.
- **SC-002**: 95% of users can reach any active brand page from the homepage in 2 clicks or fewer.
- **SC-003**: 0 instances of closed or disabled brands appear in visible UI content or navigation.
- **SC-004**: Loading feedback appears within 1 second during delayed content loads, and error feedback appears immediately upon failure.
- **SC-005**: Homepage data payload for brands and news stays at or below 250KB.
