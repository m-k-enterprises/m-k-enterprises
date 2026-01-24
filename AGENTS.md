# M-K Enterprises React Frontend

A TypeScript + React app that showcases our brands, news, and landing pages.  
Tech stack: **Create React App**, React-Router, Apollo Client (Shopify Storefront GraphQL), React-Bootstrap + custom SCSS.

---

## 🛠️ Setup

| Step | Command |
|------|---------|
| Install deps | `yarn install` (preferred; keep `yarn.lock` authoritative) |
| Start dev server | `yarn start` → http://localhost:3000 (hot-reload) |
| Run tests | `yarn test` (React Testing Library + Jest, watch mode) |
| Lint (optional) | `yarn lint` |
| Type-check only | `tsc --noEmit` |
| Prod build | `yarn build` → outputs `build/` |
| Deploy to GH Pages | `yarn deploy` (script runs `gh-pages -d build`) |

> **Node LTS** is recommended. Yarn or npm both work.

---

## 🧪 Testing

- Jest is pre-configured by CRA; tests live beside code as `*.test.tsx` / `*.test.ts`.
- CI tip: run with `CI=true yarn test --coverage` for deterministic output.

---

## 📁 Folder Layout (excerpt)

```

src/
├── components/      # Re-usable UI widgets
├── routes/          # Page components, lazy-loaded
├── clients.ts       # Apollo Shopify clients
├── storefront.gql   # GraphQL queries (loaded via graphql.macro)
├── App.tsx          # Router + Suspense wrapper
└── index.scss       # Bootstrap reboot/grid + globals
public/
└── index.html

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
| Lint | CRA ESLint (`react-app`, `react-app/jest`) |
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

- Put new page components in `src/routes/` and export them from `index.ts` re-export barrel.  
- Add env secrets via `.env` (local) or CI secrets before running `yarn start`; CRA auto-loads `REACT_APP_*` vars.
- Never log Shopify tokens; keep disabled brands (Sizzle & Soak, Aura & Essence) out of routes and API calls.

Happy shipping!
