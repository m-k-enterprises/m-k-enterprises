# M-K Enterprises Next.js Frontend

This project now runs on [Next.js](https://nextjs.org/) App Router with static export output for GitHub Pages deployment.

## Setup

1. Copy `.env.example` to `.env` and fill in your Shopify tokens.
2. Install dependencies with `yarn install`.
3. Start the dev server with `yarn dev`.

### Required environment variables

```
NEXT_PUBLIC_SHOPIFY_TOKEN_BEAR_BELTS=<token>
NEXT_PUBLIC_SHOPIFY_TOKEN_POCKET_BEARS_APPAREL=<token>
NEXT_PUBLIC_SHOPIFY_TOKEN_MYTHICAL_MOODS=<token>
# NEXT_PUBLIC_SHOPIFY_TOKEN_SIZZLE_SOAK=<token> # optional, currently disabled
# NEXT_PUBLIC_SHOPIFY_TOKEN_AURA_ESSENCE=<token> # optional, currently disabled
```

**Secrets hygiene**: never log or surface Shopify tokens in UI. Tokens live only
in `.env` (local) or CI secret stores (pipeline); `.env.example` must contain
placeholders only. CI should inject `NEXT_PUBLIC_*` values via encrypted secrets.

**Brand matrix**: Bear Belts, Pocket Bears Apparel, and Mythical Moods are
active. Sizzle & Soak and Aura & Essence are disabled (no UI routes or calls).

## Available Scripts

In the project directory, you can run:

### `yarn dev`

Runs the Next.js dev server.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Runs the Jest test suite through `next/jest`.

### `yarn lint`

Runs ESLint with the Next.js config.

### `yarn build`

Builds the app for production and statically exports the site to the `build` folder.

The exported output preserves direct-route HTML for each public page and is ready for `gh-pages`.

### `yarn deploy`

Publishes the `build/` directory to GitHub Pages.

### `yarn preview`

Serves the exported `build/` directory locally for a quick deploy smoke test.

## Deployment Notes

- The site uses `output: 'export'`, `distDir: 'build'`, and `trailingSlash: true` in `next.config.ts`.
- `public/CNAME` is copied into the export output so the custom domain remains attached to GitHub Pages.
- The old SPA redirect shim is no longer needed because each preserved route now exports its own static HTML file.

## Learn More

You can learn more in the [Next.js documentation](https://nextjs.org/docs/app/getting-started/installation).

To learn React, check out the [React documentation](https://react.dev/).
