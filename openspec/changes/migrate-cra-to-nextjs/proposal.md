## Why

The site is still built on Create React App, which keeps the entire experience in a client-side bundle, relies on manual route and metadata wiring, and limits the project to an ageing toolchain. Migrating to Next.js now reduces platform risk, improves the site foundation for performance and SEO, and gives the team a supported path for future server-rendered or build-time enhancements.

## What Changes

- Replace `react-scripts` and the CRA entrypoint with a Next.js application using the App Router.
- Preserve the current public route map and visitor-facing behaviour for the existing pages: Home, About, Brands, News, Responsibility, Contact, Privacy Policy, and Links.
- Move the shared shell, navigation, footer, and page-level metadata from runtime browser code into Next.js layouts, pages, and metadata exports.
- Keep the first migration compatible with static hosting by using a static export build and updating the deploy pipeline accordingly.
- Migrate environment variables, test setup, and build scripts from CRA conventions to Next.js conventions.
- Retain the current Shopify storefront data scope and active-brand rules during the migration; do not reintroduce disabled brands or broaden API calls in this change.

## Capabilities

### New Capabilities
- `nextjs-site-platform`: Defines the Next.js-based application platform, including route preservation, static export deployment, metadata handling, and the migration of the existing public site shell onto the App Router.

### Modified Capabilities
- None.

## Impact

- Affected code: application entrypoints, route structure, layout composition, metadata handling, environment variable access, test configuration, build scripts, and deployment configuration.
- Affected dependencies: remove CRA-specific runtime/build tooling, add Next.js runtime and test integration, and validate compatibility for GraphQL query loading and Sass styling.
- Affected systems: GitHub Pages static deployment, CI build steps, and local development workflow.
