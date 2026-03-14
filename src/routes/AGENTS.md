# 📍 Routes Guide (src/routes)

This folder contains **page-level React components** that supply content for the Next.js App Router.  
Each file exports a **default function component** and is mounted by a matching `src/app/**/page.tsx` entry.

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
| Props    | Keep minimal; use shared hooks only when route-level state is genuinely shared |
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

3. **Wire into App Router** (`src/app/<route>/page.tsx`)

   ```tsx
   export default function Page() {
     return <FooBar />;
   }
   ```

4. **Add Menu Link** (if required) in `src/app/_components/SiteShell.tsx`.

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

* For shared Shopify data, prefer the shared route wrappers in `src/app/_components/RoutePages.tsx`.
* If a route needs unique data, add a Next-compatible `gql` document under `src/services/` and consume it through the storefront layer.

---

## 🗺️ URL Patterns & Params

Use `useParams<{ handle: string }>()` for type-safe params.

---

## ☑️ Agent To-Dos

When a task says “add a new page” or “modify route X”:

* **Search** in `src/routes/` first.
* **Keep barrel export** (`index.ts`) in sync.
* **Update App Router entry** in `src/app/`.
* **Add/adjust tests** so CI stays green.

Happy routing! 🛣️
