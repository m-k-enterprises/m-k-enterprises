# 📍 Pages Guide (`app/`)

This project uses Next.js `app/` directory routing. Each folder becomes a route segment and must include a `page.tsx` file.

---

## 🗂️ Folder Layout

```
src/app/
├── about/
│   └── page.tsx
├── brands/
│   └── page.tsx
└── layout.tsx  # shared layout
```

Create subfolders for nested routes. Dynamic segments use the `[param]` syntax.

---

## 🛠️ Adding a New Page

1. **Create Folder & Page**
   ```bash
   mkdir src/app/foo && touch src/app/foo/page.tsx
   ```

2. **Scaffold**
   ```tsx
   export default function Page() {
     return <p>Hello from Foo 🚀</p>;
   }
   ```

3. **Test**
   ```tsx
   import { render, screen } from '@testing-library/react';
   import Page from './page';

   it('shows foo text', () => {
     render(<Page />);
     expect(screen.getByText(/hello from foo/i)).toBeInTheDocument();
   });
   ```
   Place the test beside `page.tsx` as `page.test.tsx`.

---

## 🧩 Data Fetching

Use Next.js data functions (`generateMetadata`, `generateStaticParams`) or fetch inside `page.tsx` with `fetch`/`graphql` clients. Return early and keep components small.

---

Happy paging! 🌐
