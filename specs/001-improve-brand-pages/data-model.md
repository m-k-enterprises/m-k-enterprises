# Data Model: Brand-focused site refresh

## Entity: Brand

Represents an active brand displayed on the homepage and brands route.

**Fields**:
- `id` (string): Shopify shop ID.
- `name` (string): Brand name.
- `primaryDomainUrl` (string): External storefront URL.
- `shortDescription` (string): One-paragraph summary.
- `logo` (object): `{ originalUrl, altText, width, height }`.
- `colors` (object): `{ primary: [{ background, foreground }] }`.
- `coverImage` (object): `{ url }`.

**Relationships**:
- One Brand belongs to one Shopify shop.
- One Brand can have many NewsArticle items.

**Validation/Rules**:
- Only active brands are allowed (Bear Belts, Pocket Bears Apparel, Mythical Moods).
- Disabled brands must never appear in UI or API calls.

## Entity: NewsArticle

Represents a Shopify article displayed on the homepage or news route.

**Fields**:
- `id` (string)
- `title` (string)
- `handle` (string)
- `excerpt` (string)
- `publishedAt` (string ISO date)
- `image` (object): `{ url, altText }`

**Validation/Rules**:
- Articles are sorted by newest published date.

## Entity: PageMetadata

Represents per-page SEO metadata.

**Fields**:
- `title` (string)
- `description` (string)
- `path` (string)

**Validation/Rules**:
- Title + description must be unique per top-level page.
- Paths must remain unchanged.

## Entity: StatusMessage

Represents user-facing status content for loading, error, or empty states.

**Fields**:
- `state` (enum): `loading` | `error` | `empty`
- `message` (string)
- `actionLabel` (string, optional)
- `actionType` (enum, optional): `retry` | `navigate`

**Validation/Rules**:
- Error states use inline error blocks with retry actions.
- Empty states use dedicated empty messages (not errors).
