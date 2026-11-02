<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# BanglaShoppers storefront

Headless Magento storefront: Next.js 16 (Turbopack), React 19, Tailwind v4, Apollo v4, Magento GraphQL.

## Working rules

- Fonts: Roboto only (`font-sans`). The one exception is Noto Sans Bengali for `lang="bn"` text on the order success page.
- Colours: theme tokens from `src/app/globals.css` only, never hex values in components.
- `reference/` holds design references and API specs. It is never served, so nothing from it goes into `public/`.
- Keep comments short; match the surrounding code.
- Do not run Prettier on the codebase.
- Do not commit or push unless asked.

## Data layer

- GraphQL documents live in `src/graphql/<area>/{queries,mutations,fragments}/*.graphql`. After changing one, run
  `npm run generate` (codegen reads the schema from `NEXT_SERVER_MAGENTO_ENDPOINT`) and import the typed
  `…Document` from its `__generated__/` file. Operation names must be unique.
- `FALLBACK_MODE=true` answers every operation from `src/mocks/` except the ones listed in `LIVE_OPERATIONS`
  (`src/lib/config.ts`), which go to Magento. Add an operation there once its page is integrated.
- Cache Components is on (`cacheComponents: true` in `next.config.ts`). Read queries are cached with `'use cache'`
  in `src/lib/cached-graphql.ts` (times and tags in `src/utils/hooks/useCache.ts`); nothing inside it may read
  `cookies()` or `headers()`. The cache is in memory: after editing mocks or switching an operation to live, restart
  the dev server.
- Cache Components rules: no `export const revalidate` / `dynamic` / `dynamicParams` on routes (use the cache times);
  anything reading cookies, headers, search params or `usePathname()` must sit inside `<Suspense>` (for a path
  watcher use `OnPathnameChange` in `src/packages/module-common/`); `generateStaticParams` must return at least one
  path. `next build` reports every violation.

## Checks

```bash
npx tsc --noEmit -p .
npm run -s check:packages   # known: CartPageView.tsx imports module-customer
```

## Browser testing and visual checks (Playwright)

Use the `playwright-cli` skill in `.claude/skills/playwright-cli/` (upstream:
https://github.com/microsoft/playwright-cli/blob/main/skills/playwright-cli/SKILL.md). `playwright-cli` is
installed globally; browsers are in `~/.cache/ms-playwright`.

Dev server:

- Start your own server on a free port, e.g. `npx next dev -p 3005`, with `FALLBACK_MODE=true` in front for mock
  data. Ports 3000-3002 may be the developer's own servers: never stop them.
- Stop only the processes you started, by PID (`ss -ltnp | grep ':3005 '`). Never use `pkill`.
- Run `playwright-cli` from a scratch directory: it writes snapshots, logs and screenshots to `.playwright-cli/` in
  the current directory (ignored by git).

Typical check:

```bash
playwright-cli open http://localhost:3005/category/makeup-shop
playwright-cli resize 1280 800
# the promo popup and the cookie banner cover the page until they are closed
playwright-cli click "getByRole('button', { name: /show this again/i })"
playwright-cli click "getByRole('button', { name: 'Accept All' })"
playwright-cli snapshot                      # refs (e12 …) for click / hover / fill
playwright-cli hover "getByRole('link', { name: 'Makeup Shop' })"
playwright-cli screenshot --filename=menu-makeup-1280.png
playwright-cli console warning               # runtime errors
playwright-cli close
```

- Widths to check: 390 (phone), 768 (tablet), 1024, 1280 and 1536 (desktop). The header switches to the
  desktop mega menu at 1024 (`lg`).
- Close the promo popup and the cookie banner first (see above): while open they block hovers and clicks.
- Signed-in pages (`/customer/account/*`) in mock mode: log in through `/customer/account/login` with any valid
  email and a password of 6+ characters, then `playwright-cli state-save auth.json` and `state-load auth.json`
  in later sessions.
- Visual comparison: screenshot the same page and width before and after a change, and next to the design
  reference it should match (`reference/`, or the image the developer shared). Compare spacing, alignment, colours
  and text, at every width above.
- Headless browsers hide scrollbars, so check scrollbar styling in a real browser.
- Magento can time out (`UND_ERR_CONNECT_TIMEOUT` in the dev log); retry the page before treating it as a bug.
