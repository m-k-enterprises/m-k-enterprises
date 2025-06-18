# Getting Started with Next.js

This project uses [Next.js](https://nextjs.org/) for server-side rendered React.

## Setup

1. Copy `.env.example` to `.env` and fill in your Shopify tokens.
2. Install dependencies with `yarn install` or `npm install`.
3. Start the dev server with `next dev`.

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

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page reloads on edits.\
You will also see any lint errors in the console.

### `next test`

Launches the test runner in interactive watch mode.

### `yarn lint`

Runs ESLint over all `.ts` and `.tsx` files in `src/`.

### `next build`

Builds the app for production to the `build` folder.\
Next.js optimizes the output for performance.


## Learn More

You can learn more in the [Next.js documentation](https://nextjs.org/docs).

To learn React, check out the [React documentation](https://reactjs.org/).
