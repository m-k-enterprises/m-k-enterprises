# 📍 Pages Guide (`app/`)

Next.js uses the `app/` directory for routing. Each folder that contains a `page.tsx` file becomes a route.

---

## 🗂️ Folder Layout

```
src/app/
├── about/
│   └── page.tsx
├── brands/
│   └── page.tsx
└── layout.tsx
```

Create subfolders for nested routes. Dynamic segments use the `[param]` syntax, e.g. `src/app/products/[id]/page.tsx`.

---

## 🛠️ Adding a Page

1. Create the folder and `page.tsx`:
   ```bash
   mkdir src/app/foo && touch src/app/foo/page.tsx
   ```

2. Scaffold the component:
   ```tsx
   import Link from 'next/link';

   export default function Page() {
     return (
       <div>
         <p>Hello from Foo 🚀</p>
         <Link href='/'>Back home</Link>
       </div>
     );
   }
   ```
   Use `<Link>` from `next/link` for internal navigation.

3. Write a test next to `page.tsx` (`page.test.tsx`):
   ```tsx
   import { render, screen } from '@testing-library/react';
   import Page from './page';

   it('shows foo text', () => {
     render(<Page />);
     expect(screen.getByText(/hello from foo/i)).toBeInTheDocument();
   });
   ```

---

## 🧩 Data Fetching Tips

Use `generateMetadata` and `generateStaticParams` when data or metadata is needed. Return early and keep components small.

Happy paging! 🌐
