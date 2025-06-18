# 📍 Pages Guide (`src/app`)

Use the **Next.js app router** for all pages. Each folder under `src/app/` becomes a route.

```
src/app/
  about/page.tsx
  brands/page.tsx
  news/page.tsx
  contact/page.tsx
  layout.tsx        # shared layout
```

- **File Names:** use `page.tsx` for pages, `layout.tsx` for nested layouts.
- **Components:** export a default function component per page.
- **Testing:** add `page.test.tsx` next to each page.
- **Styles:** import SCSS modules or use Bootstrap utilities.

## 🚦 Adding a New Page

1. `mkdir src/app/foo && touch src/app/foo/page.tsx`
2. Implement the component.
3. Add a test `src/app/foo/page.test.tsx`.
4. Run `yarn test` and `yarn lint`.

Happy coding! 🛣️
