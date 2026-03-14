## ADDED Requirements

### Requirement: Existing public routes remain available after the migration
The site SHALL expose the current top-level public routes at their existing paths after the framework migration. The preserved route set MUST include `/`, `/about`, `/brands`, `/news`, `/responsibility`, `/contact`, `/privacy-policy`, and `/links`.

#### Scenario: Direct navigation to a preserved route
- **WHEN** a visitor loads any preserved top-level path from a fresh browser request
- **THEN** the site returns the corresponding page content without depending on the previous CRA SPA redirect workaround

### Requirement: Static export deployment remains supported
The application SHALL produce a static export build that is deployable to the current static hosting model, including the custom-domain GitHub Pages flow.

#### Scenario: Production build creates deployable static output
- **WHEN** the production build command is run
- **THEN** the build output contains static files for each preserved top-level route and a deployable `404` page in the configured deploy directory

### Requirement: Page metadata is defined declaratively in the Next.js route structure
Each top-level page SHALL define a unique, descriptive title and description through Next.js metadata exports, and the shared site-level metadata SHALL be defined in the root layout.

#### Scenario: Built page includes route metadata
- **WHEN** a top-level page is rendered from the Next.js build output
- **THEN** the page includes that route's title and description without requiring browser-side metadata mutation after hydration

### Requirement: Storefront behaviour is preserved during the platform migration
The migrated site SHALL preserve the existing Shopify storefront data scope, active-brand filtering, and user-visible loading, error, and empty-state behaviour for brand and news content.

#### Scenario: Homepage content matches current storefront rules
- **WHEN** the homepage loads successfully after the migration
- **THEN** it shows only the active brands, uses the existing storefront data scope, and preserves the current loading and status-message behaviour for brand and news sections

### Requirement: Repository workflows use Next.js conventions
The repository SHALL provide Next.js-native development, build, test, and deploy workflows, and client-exposed environment variables MUST use `NEXT_PUBLIC_` naming.

#### Scenario: Contributor runs local and CI workflows
- **WHEN** a contributor configures the project environment and runs the documented development, test, or build commands
- **THEN** the workflows execute through Next.js tooling rather than CRA tooling and load the expected root-level environment variables
