# Getting Started with Next.js

This project uses [Next.js](https://nextjs.org/) with Apollo Client and React-Bootstrap.

## Setup

1. Copy `.env.example` to `.env.local` and fill in your Shopify tokens.
2. Install dependencies with `yarn install` or `npm install`.
3. Start the dev server with `next dev`.

### Required environment variables

```
NEXT_PUBLIC_SHOPIFY_TOKEN_BEAR_BELTS=<token>
NEXT_PUBLIC_SHOPIFY_TOKEN_POCKET_BEARS_APPAREL=<token>
NEXT_PUBLIC_SHOPIFY_TOKEN_MYTHICAL_MOODS=<token>
NEXT_PUBLIC_SHOPIFY_TOKEN_AURA_ESSENCE=<token>
# NEXT_PUBLIC_SHOPIFY_TOKEN_SIZZLE_SOAK=<token> # optional, currently disabled
```

## Available Commands

In the project directory, you can run:

### `next dev`

Starts the development server on [http://localhost:3000](http://localhost:3000).

### `yarn test`

Launches the Jest test runner in watch mode.

### `yarn lint`

Runs ESLint over all `.ts` and `.tsx` files in `src/`.

### `next build`

Creates an optimized production build in `.next/`.

### `next start`

Starts the production server.

## Learn More

You can learn more in the [Next.js documentation](https://nextjs.org/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
