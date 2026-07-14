# M-K Enterprises Next.js Frontend

A TypeScript and React app that showcases our brands, news and landing pages.
The stack is **Next.js App Router**, Apollo Client for Shopify Storefront
GraphQL, React-Bootstrap and custom SCSS.

## 🛠️ Setup

| Step | Command |
| --- | --- |
| Install dependencies | `yarn install` (`yarn.lock` is authoritative) |
| Start development | `yarn dev` → http://localhost:3000 |
| Run tests | `yarn test` (Jest + React Testing Library) |
| Lint | `yarn lint` |
| Type-check | `yarn typecheck` |
| Production build | `yarn build` → `out/` |
| Deploy to GitHub Pages | `yarn deploy` (`gh-pages -d out`) |

Use Node.js 20.9 or later and Yarn 1.22.22.

## 🧪 Testing

- Co-locate Jest tests as `*.test.tsx` or `*.test.ts`.
- Use `CI=true yarn test --coverage --runInBand` for deterministic CI output.
- Verify framework changes in this order: lint, type-check, tests, build.

## 📁 Folder layout

```text
src/
├── app/                 # App Router pages, layout and metadata
├── components/          # Reusable UI widgets
├── routes/              # Page views imported by app/**/page.tsx
├── services/            # Shopify query, cache, hooks and domain types
├── App.tsx              # Shared storefront context, navigation and footer
├── App.scss             # Bootstrap theme and component styles
└── index.scss           # Global styles
public/                  # Static assets copied into the export
```

- Use PascalCase for component files such as `Home.tsx` and `BrandTile.tsx`.
- Put URL entry points and route metadata in `src/app/`.
- Keep SCSS beside the components it supports or in `src/` for global styles.
- Do not add Tailwind; use Bootstrap utilities and the existing SCSS variables.

## 📝 Coding conventions

| Area | Rule |
| --- | --- |
| Components | Function components with ES module default exports |
| Routing | App Router pages and `next/link`; do not add React Router |
| Client code | Add `'use client'` only where hooks, state or browser APIs require it |
| Metadata | Export Next.js `Metadata` from the corresponding `page.tsx` |
| Props | Define narrow TypeScript interfaces |
| Formatting | Two spaces, single quotes and trailing commas |

## 🔐 Shopify and environment variables

- Copy `.env.example` to `.env.local`; Next.js loads it automatically.
- The static site uses `NEXT_PUBLIC_SHOPIFY_TOKEN_*` Storefront tokens in the
  browser. Use only restricted Storefront tokens, never Admin or private tokens.
- Never log token values or hard-code them in source.
- Keep Sizzle & Soak and Aura & Essence disabled in routes and API calls.

## 🚀 Static export

`next.config.ts` emits a static export with trailing slashes for GitHub Pages.
Do not introduce server-only route handlers, dynamic rendering or default Next
image optimisation without also changing the deployment architecture.
