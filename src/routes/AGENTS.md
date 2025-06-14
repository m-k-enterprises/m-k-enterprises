# 📍 Routes Guide (src/routes)

This folder contains **page-level React components** that map to the app’s URL paths via React-Router.  
Each file exports a **default function component** and is **lazy-loaded** in `App.tsx` to enable code-splitting.

---

## 🗂️ Folder Layout

```

src/routes/
Home.tsx
Brands.tsx
News.tsx
Contact.tsx
PrivacyPolicy.tsx
index.ts          # barrel export – KEEP UPDATED
AGENTS.md         # ← you are here

````

> **Rule:** one file = one route component.  
> If a route needs sub-views (tabs, steps), create a nested folder:  
> `src/routes/Account/Settings.tsx` etc.

---

## 🔑 Naming & Conventions

| Aspect | Convention |
|--------|------------|
| File name | `PascalCase.tsx` matching component name |
| Export   | **default** export only |
| Props    | Keep minimal; use hooks (e.g. `useShop()`) rather than props when possible |
| Styling  | Use Bootstrap utility classes + `.scss` for route-specific styles (optional) |
| Tests    | Co-locate as in the same folder |

---

## 🚦 Adding a New Route (agent checklist)

1. **Create Component**  
   ```bash
   touch src/routes/FooBar.tsx
````

Scaffold:

```tsx
export default function FooBar() {
  return </>;
}
```

2. **Update Barrel Export** (`src/routes/index.ts`)

   ```ts
   export { default as FooBar } from './FooBar';
   ```

3. **Wire into Router** (`src/App.tsx`)

   ```tsx
   const FooBar = lazy(() => import('./routes/FooBar'));
   // ...
   <Route path="/foo" element={<FooBar />} />
   ```

4. **Add Menu Link** (if required) in `NavBar.tsx`.

5. **Write a Test**

   ```tsx
   it('renders FooBar page', () => {
     render(<FooBar />);
     expect(screen.getByText(/Foo Bar/i)).toBeInTheDocument();
   });
   ```

6. **Run** `yarn test` ➜ all green.

---

## 🧩 Route-Level Data

* For Shopify data, **query in parent layout** (e.g. `App.tsx`) and pass down via context/hooks (`useBrands()`).
* If a route needs unique data, place **GraphQL queries** in `src/routes/fooBar.gql` and import with `graphql.macro`.

---

## 🗺️ URL Patterns & Params

Use `useParams<{ handle: string }>()` for type-safe params.

---

## ☑️ Agent To-Dos

When a task says “add a new page” or “modify route X”:

* **Search** in `src/routes/` first.
* **Keep barrel export** (`index.ts`) in sync.
* **Update router** in `App.tsx`.
* **Add/adjust tests** so CI stays green.

Happy routing! 🛣️
