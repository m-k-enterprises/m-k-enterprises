# Phase 0 Research: Brand-focused site refresh

## Decision: Data access layer approach

**Decision**: Add a single Shopify data-access module that wraps Storefront queries and exposes typed helper functions/hooks for fetching shop + brand + articles per active brand.

**Rationale**:
- Centralizes query shape and response typing in one module.
- Makes caching and request deduping consistent across routes.
- Minimizes changes to page components and avoids a full rewrite.

**Alternatives considered**:
- Keep `useQuery` usage inside each route (rejected: duplicates logic and makes caching/deduping inconsistent).
- Introduce a new state library (rejected: unnecessary for scope; adds bundle overhead).

## Decision: Caching + request deduping

**Decision**: Use in-memory, per-session cache keyed by `{shopId|clientKey}:{querySignature}` with a short TTL, plus an in-flight promise map for deduping concurrent requests.

**Rationale**:
- Meets per-session caching requirement without persistent storage.
- Prevents duplicate network requests when multiple routes render concurrently.
- Keeps implementation lightweight and CRA-compatible.

**Alternatives considered**:
- Rely solely on Apollo cache (rejected: still allows parallel duplicate queries across clients; does not enforce TTL or shared in-flight deduping).
- Add SWR/React Query (rejected: new dependency and larger architectural change).

## Decision: Shopify query scope

**Decision**: Fetch only `shop`, `brand` (logo/colors/shortDescription/coverImage), and `articles` fields as defined in the spec.

**Rationale**:
- Aligns with clarified requirements and payload budget.
- Avoids unnecessary Shopify object fetching (products/collections).

**Alternatives considered**:
- Fetch featured products for brand tiles (rejected: increases payload and scope).

## Decision: Error + empty state behavior

**Decision**: Use inline error blocks with a “Retry” action for failures, and dedicated empty-state messages for empty data.

**Rationale**:
- Keeps UX consistent and avoids route changes on failure.
- Differentiates between empty content and network/service failure.

**Alternatives considered**:
- Full-page error screens (rejected: disruptive for simple data errors).

## Decision: Performance constraints

**Decision**: Maintain loading feedback within 1 second and cap homepage data payload (brands + news) at ≤250KB.

**Rationale**:
- Matches spec and keeps UI responsive.
- Measurable without over-engineering.

**Alternatives considered**:
- Stricter budgets (≤100KB) (rejected: likely unrealistic without deeper content changes).
