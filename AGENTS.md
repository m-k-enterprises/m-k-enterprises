# M-K Enterprises React Frontend

A TypeScript + React app that showcases our brands, news, and landing pages.
Tech stack: **Next.js**, Apollo Client (Shopify Storefront GraphQL), React-Bootstrap + custom SCSS.

---

## 🛠️ Setup

| Step | Command |
|------|---------|
| Install deps | `yarn install` or `npm install` |
| Start dev server | `next dev` |
| Run tests | `yarn test` (React Testing Library + Jest, watch mode) |
| Lint | `yarn lint` |
| Type-check only | `tsc --noEmit` |
| Prod build | `next build` |
| Start production | `next start` |

> **Node LTS** is recommended. Yarn or npm both work.

---

## 🧪 Testing

- Jest with React Testing Library; tests live beside code as `*.test.tsx` / `*.test.ts`.
- CI tip: run with `CI=true yarn test --coverage` for deterministic output.

---

## 📁 Folder Layout (excerpt)

```

src/
├── components/      # Re-usable UI widgets
├── app/             # Next.js route segments
├── clients.ts       # Apollo Shopify clients
├── storefront.ts   # GraphQL queries (Apollo `gql` constants)
├── index.scss       # Bootstrap reboot/grid + globals
public/
└──                # static assets (favicon, images)

```

- **PascalCase** for component files (`Home.tsx`, `BrandCard.tsx`).
- **SCSS** modules live next to components or in `src/`.
- No Tailwind; styling via Bootstrap utilities and custom SCSS variables.

---

## 📝 Coding Conventions

| Area | Rule |
|------|------|
| Components | Function components with ES module **default export** |
| Hooks | Follow React Hook rules (`useX` prefix) |
| Props | Typed via `interface` |
| Lint | Next.js ESLint (`next/core-web-vitals`) |
| Formatting | Tabs = 2 spaces, single quotes, trailing commas |

---

## 🔧 Common Commands (reference)

| Task | Command |
|------|---------|
| Storybook (if added) | `yarn storybook` |
| Analyse bundle | `yarn build && npx source-map-explorer 'build/static/js/*.js'` |
| Update GraphQL types | `npx graphql-codegen --config codegen.yml` |

---

### 🤖 Agent Notes

- Put new page components in `app/`.
- Add env secrets (if ever required) via `.env.local` *before* running `next dev`; Next.js auto-loads `NEXT_PUBLIC_*` vars.

Happy shipping!
