# M-K Enterprises Next.js Frontend

A TypeScript + React app that showcases our brands, news, and landing pages.  
Tech stack: **Next.js App Router**, Apollo Client (Shopify Storefront GraphQL), React-Bootstrap + custom SCSS.

---

## 🛠️ Setup

| Step | Command |
|------|---------|
| Install deps | `yarn install` (keep `yarn.lock` authoritative) |
| Start dev server | `yarn dev` → http://localhost:3000 (hot-reload) |
| Run tests | `yarn test` (Jest via `next/jest`) |
| Lint (optional) | `yarn lint` |
| Type-check only | `npx tsc --noEmit` |
| Prod build | `yarn build` → outputs `build/` |
| Deploy to GH Pages | `yarn deploy` (script runs `gh-pages -d build`) |

> **Node LTS** is recommended. Use Yarn (packageManager is set to Yarn).

---

## 🧪 Testing

- Jest is configured through `next/jest`; tests live beside code as `*.test.tsx` / `*.test.ts`.
- CI tip: run with `CI=true yarn test --coverage` for deterministic output.

---

## 📁 Folder Layout (excerpt)

```

src/                 # Next.js source root
├── app/             # App Router layouts and page entries
├── components/      # Re-usable UI widgets
├── routes/          # Shared page content used by App Router entries
├── clients.ts       # Apollo Shopify clients
├── services/        # Shopify query and storefront hooks
└── index.scss       # Bootstrap reboot/grid + globals
public/
└── CNAME / icons / manifest / robots

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
| Lint | Next.js ESLint flat config |
| Formatting | Tabs = 2 spaces, single quotes, trailing commas (follow CRA defaults) |

---

## 🔧 Common Commands (reference)

| Task | Command |
|------|---------|
| Storybook (if added) | `yarn storybook` |
| Analyse bundle | `yarn build && npx source-map-explorer 'build/static/js/*.js'` |
| Update GraphQL types | `npx graphql-codegen --config codegen.yml` |

---

### 🤖 Agent Notes

- Put new route content in `src/routes/` and add the matching App Router entry in `src/app/`.
- Add env secrets via `.env` (local) or CI secrets before running `yarn dev`; Next auto-loads `NEXT_PUBLIC_*` vars.
- Never log Shopify tokens; keep disabled brands (Sizzle & Soak, Aura & Essence) out of routes and API calls.

Happy shipping!
