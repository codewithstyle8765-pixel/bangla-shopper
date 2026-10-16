# Antigravity Agent Guidelines & Coding Standards

This document defines the architectural rules, coding standards, and persona guidelines for any AI agent working on the **nextjs-bangla** storefront repository.

---

## 1. Core Architecture & Tech Stack

* **Reference Codebase:** [`/home/users/prayas.jain/Documents/GIT/GITLAB/bagisto-headless`](file:///home/users/prayas.jain/Documents/GIT/GITLAB/bagisto-headless)
* **Framework:** Next.js 16 (`^16.3.8`) with React 19 and TypeScript 5.
* **Routing:** Direct App Router (`src/app/` or clean route groups `(public)` / `(checkout)`).
  * ❌ **NO `[locale]` folder routing.**
* **Styling:** Tailwind CSS v4 (`@tailwindcss/postcss`, `@import "tailwindcss";`, `@theme` layer in `globals.css`).
  * ❌ Do not create or use a legacy JavaScript `tailwind.config.ts`.
  * Define semantic design tokens in `:root` and `@theme` in `src/app/globals.css`.
* **Typography:** Google Font **Roboto** configured via `next/font/google` in `src/app/layout.tsx` (`--font-roboto` CSS variable).
* **Domain Organization:**
  * `src/packages/module-*`: UI grouped by Magento module. Dependencies are one-way (`npm run check:packages` enforces it):
    * `module-common`: shared primitives (`NextImage`, `Container`, `Breadcrumbs`, `Modal`, form kit, carousel, `ErrorBoundary`) — imports no other package.
    * `module-quote`: cart, checkout and `context/CartContext` → common.
    * `module-catalog`: PDP, PLP, product card → common, quote.
    * `module-customer`: auth and account pages → common, quote, catalog.
    * `module-theme`: header, footer, mega menu, home sections → any of the above.
  * `src/lib/`: Cached GraphQL and Apollo client.
  * `src/utils/`: Helpers, constants, `/api/graphql` operations (`api/operations/*`, helpers in `api/define.ts`) and the typed browser client (`api/client.ts`).

---

## 2. Next.js 16 Caching Architecture (Adopted from `bagisto-headless`)

We adopt the modern Next.js 16 single cache layer pattern from `bagisto-headless/src/lib/cached-graphql.ts`:

### 2.1 The `"use cache"` Directive + `cacheLife()` + `cacheTag()`
```typescript
import { cacheLife, cacheTag } from "next/cache";
import makeClient from "@/lib/apollo-client";
import { type DocumentNode, type OperationVariables } from "@apollo/client";

export async function graphqlRequestCached<
  TData = unknown,
  TVariables extends OperationVariables = OperationVariables,
>(
  query: DocumentNode,
  variables: TVariables | undefined,
  options: { tags?: string[]; life?: 'seconds' | 'minutes' | 'hours' | 'days' | number },
): Promise<TData> {
  "use cache";

  // Apply cache life profile
  applyCacheLife(options.life);

  // Register tags for on-demand revalidation (revalidateTag)
  if (options.tags) {
    for (const tag of options.tags) {
      cacheTag(tag);
    }
  }

  const client = makeClient();
  const result = await client.query({
    query,
    variables,
    fetchPolicy: "network-only",
  });

  return result.data as TData;
}
```

### 2.2 Uncached / Personalized Requests (`graphqlRequestNoCache`)
For user-specific data (cart, checkout, profile):
```typescript
export async function graphqlRequestNoCache<TData = unknown>(query: DocumentNode, variables?: any): Promise<TData> {
  const client = makeClient();
  const result = await client.query({
    query,
    variables,
    fetchPolicy: "no-cache", // Bypasses cache completely
  });
  return result.data as TData;
}
```

---

## 3. Fetcher Handler & API Proxy Pattern

### 3.1 Client Fetcher (`src/utils/fetch-handler.ts`)
For browser client-side calls to internal API routes:
```typescript
export async function fetchHandler<T = unknown>({
  url,
  method = "GET",
  body,
  headers = {},
}: FetchHandlerOptions): Promise<{ data: T | null; error?: { message: string } }> {
  const res = await fetch(`/api/${url}`, {
    method,
    headers: { "Content-Type": "application/json", ...headers },
    body: body ? JSON.stringify(body) : undefined,
  });
  return res.json();
}
```

### 3.2 Route handlers (no Server Actions)
* `app/api/graphql/route.ts`: `POST /api/graphql?op=AddToCart`, allowlisted operations only (`src/utils/api/operations/{cart,checkout,customer}.ts`, each `defineOperation({ parse, run })`). Browser calls `callApi(op, input)` / `useFormOperation(op)` — input and result types are inferred from the operation; body is JSON or FormData; bad input → 400; token and cart id come from httpOnly cookies on the server; same-origin check; `Cache-Control: private, no-store`.
* `app/api/auth/[...nextauth]/route.ts`: next-auth v4 Credentials (config `src/lib/auth.ts`). Magento token lives only in the encrypted JWT; session exposes name/email only. Guest cart merged in `authorize()`; token revoked in `events.signOut`. Client loads `next-auth/react` lazily (login/register submit, Sign Out click) — no `SessionProvider`.
* `app/api/revalidate/route.ts`: Magento webhook, `x-revalidate-secret` header, `revalidateTag(tag, "max")`.
* `src/proxy.ts`: guards `/customer/account/*` and the auth pages.

---

## 4. Reusable Component Rules (Adopted from `bagisto-headless`)

1. **Images (`NextImage`):**
   * Use `src/packages/module-common/NextImage.tsx`.
   * Has built-in `<Shimmer />` loading placeholder and smooth fade-in (`opacity-0` -> `opacity-100`).
   * Fallbacks to `NOT_IMAGE` on error.
2. **Buttons (`Button`):**
   * Use `src/packages/module-common/button/Button.tsx`.
   * Pure Tailwind v4 styling with `clsx` and `<LoadingDots />` animation.
   * ❌ No Material UI dependencies.
3. **Product Card (`ProductCard`):**
   * Reusable catalog card matching the reference PSD (image, 5-star rating, title, sale price + original, origin tag, and Add-to-Cart button).

---

## 5. GraphQL Flexibility

* **Rule:** Do NOT be strict with `.graphql` files or fragments. They are living documents that can be freely adapted, added, or changed as backend requirements evolve.
* Run `npm run generate` anytime to update TypeScript types.

---

## 6. CSS-to-Tailwind Conversion & Responsiveness Standards

1. **Header Source of Truth:**
   * Always reference [`reference/PDP/style.css`](file:///home/users/prayas.jain/Documents/GIT/GITLAB/nextjs-bangla/reference/PDP/style.css) for Header measurements, widths, paddings, and styles (superseding `reference/style.css`).
2. **Container Standards:**
   * Desktop container width: `max-w-[1308px] mx-auto px-4 xl:px-0`.
   * Never hardcode fixed pixel widths on mobile/tablet containers.
3. **No Legacy Floats or Absolute Centering Hacks:**
   * Convert reference CSS `float: left` and `left: 50%; margin-left: -644px` into semantic Tailwind flexbox (`flex items-center justify-between`) and grid layouts.
4. **Desktop Precision Guarantee (`>= 1308px` / `xl:`):**
   * Desktop layout must match the reference PSD pixel-for-pixel (Logo: 291×73px, Search: 626px wide with 17px radius, Badges: 55px/65px with 30×17px pills, All Categories: 210px with #f05658 bg).
5. **Mobile & Small Device Handling (`< 768px`):**
   * Clean responsive adaptations: Compact announcement bar, hamburger drawer menu (`<MobileNavDrawer />`), full-width rounded search bar, touch-friendly icon badges with count pills.

---

## 7. Strict UI Code Standards & Component Architecture

1. **Zero JSX Comments in UI Components:**
   * ❌ Do NOT place noisy comments like `{/* Left: Support Email */}` or `{/* Desktop Header Row */}` inside component JSX. Code must be clean and self-documenting.
2. **Semantic CSS Variables Only (No Arbitrary Hardcoded Hexes):**
   * ❌ Do NOT use inline arbitrary classes like `text-[#000]`, `bg-[#000000]`, `text-[#f05658]`, or `text-gray-100`.
   * ✅ Use semantic Tailwind v4 tokens mapped to CSS variables in `globals.css`:
     * `bg-brand-black`, `text-brand-black`, `border-brand-black`
     * `bg-brand-coral`, `text-brand-coral`, `border-brand-coral`
     * `text-brand-charcoal`, `text-brand-muted`, `text-brand-link`, `text-brand-alert`
     * `border-brand-border`, `bg-brand-surface`
3. **Universal Grid Alignment via `<Container>`:**
   * Use `<Container>` (`src/packages/module-common/Container.tsx`) in all header, menu, page sections, and footer modules to ensure identical left and right alignment on all screen sizes.
4. **Decoupled MegaMenu:**
   * Navigation is separated from `<Header>` into an independent `<MegaMenu>` component (`src/packages/module-theme/layout/mega-menu/MegaMenu.tsx`).
5. **Header Styling:**
   * Header styling must strictly follow [`reference/PDP/style.css`](file:///home/users/prayas.jain/Documents/GIT/GITLAB/nextjs-bangla/reference/PDP/style.css).


