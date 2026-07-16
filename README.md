# M-K Enterprises

A TypeScript and React site built with Next.js App Router. It showcases the
M-K Enterprises brands, company news and supporting pages, with live Shopify
Storefront data and a static export for GitHub Pages.

## 🛠️ Setup

1. Use Node.js 20.9 or later.
2. Copy `.env.example` to `.env.local` and add the Shopify Storefront tokens.
3. Install dependencies with `yarn install`.
4. Start the development server with `yarn dev`.
5. Open [http://localhost:3000](http://localhost:3000).

### Environment variables

```dotenv
NEXT_PUBLIC_SHOPIFY_TOKEN_BEAR_BELTS=<storefront-token>
NEXT_PUBLIC_SHOPIFY_TOKEN_POCKET_BEARS_APPAREL=<storefront-token>
NEXT_PUBLIC_SHOPIFY_TOKEN_MYTHICAL_MOODS=<storefront-token>
```

The site is statically hosted and loads Shopify data in the browser. Next.js
therefore includes variables prefixed with `NEXT_PUBLIC_` in the client bundle.
Use only restricted Shopify Storefront access tokens here. Never use Shopify
Admin tokens or other private credentials, and never log token values.

Bear Belts, Pocket Bears Apparel and Mythical Moods are active. Sizzle & Soak
and Aura & Essence remain disabled and must not receive routes or API calls.

## 🧰 Scripts

| Command | Purpose |
| --- | --- |
| `yarn dev` | Run the Next.js development server |
| `yarn start` | Alias for the development server |
| `yarn lint` | Run ESLint across the repository |
| `yarn typecheck` | Type-check without emitting files |
| `yarn test` | Run Jest and React Testing Library tests |
| `yarn build` | Build the static site into `out/` |
| `yarn deploy` | Publish `out/` to GitHub Pages |

Run non-watch tests in CI or locally with:

```bash
CI=true yarn test --coverage --runInBand
```

## 📁 Structure

```text
src/
├── app/                 # App Router layouts, pages and route metadata
├── components/          # Reusable UI components
├── routes/              # Existing page views mounted by app/**/page.tsx
├── services/            # Shopify data, query and domain types
├── App.tsx              # Shared storefront provider, navigation and footer
├── App.scss             # Bootstrap theme and component styles
└── index.scss           # Global reboot and grid styles
public/                  # Static icons, manifest, robots.txt and CNAME
```

## 🚀 Deployment

`next.config.ts` uses `output: 'export'` and trailing slashes so every route is
emitted as static HTML suitable for GitHub Pages. `yarn build` writes the export
to `out/`; `yarn deploy` publishes that directory and includes `public/CNAME`.
