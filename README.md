# Getting Started with Next.js

This project is powered by [Next.js](https://nextjs.org/), Apollo Client and React-Bootstrap.

### Node version

Use **Node.js 20.x LTS** for all development and CI steps.

## Setup

1. Copy `.env.example` to `.env.local` and fill in your Shopify tokens.
2. Install dependencies with `yarn install` or `npm install`.
3. Start the dev server with `next dev`.

### Required environment variables

Environment variable names now share the `NEXT_PUBLIC_SHOPIFY_TOKEN_` prefix.

```
NEXT_PUBLIC_SHOPIFY_TOKEN_BEAR_BELTS=<token>
NEXT_PUBLIC_SHOPIFY_TOKEN_POCKET_BEARS_APPAREL=<token>
NEXT_PUBLIC_SHOPIFY_TOKEN_MYTHICAL_MOODS=<token>
NEXT_PUBLIC_SHOPIFY_TOKEN_AURA_ESSENCE=<token>
# NEXT_PUBLIC_SHOPIFY_TOKEN_SIZZLE_SOAK=<token> # optional, currently disabled
```

## Available Scripts

In the project directory, you can run:

### `next dev`

Runs the app in development mode at [http://localhost:3000](http://localhost:3000).\
The page reloads on edits and displays lint errors in the console.

### `next test`

Launches the test runner in watch mode.

### `yarn lint`

Runs ESLint over all `.ts` and `.tsx` files in `src/`.

### `next build`

Creates an optimized production build in `.next/`.


## Learn More

You can learn more in the [Next.js documentation](https://nextjs.org/docs).

To learn React, check out the [React documentation](https://reactjs.org/).
