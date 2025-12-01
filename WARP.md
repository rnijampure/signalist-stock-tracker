# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Common commands

All commands assume the working directory is the project root (where `package.json` lives).

- Install dependencies (first-time setup)
  - `npm install`

- Run the dev server
  - `npm run dev`
  - Serves the app at `http://localhost:3000`.

- Build for production
  - `npm run build`

- Run the production server (after `npm run build`)
  - `npm run start`

- Lint the codebase
  - Lint everything (default ESLint targets):
    - `npm run lint`
  - Lint a specific file or directory:
    - `npx eslint app/(auth)/signup/page.tsx`
    - `npx eslint components/`

- Tests
  - There is currently **no test script** defined in `package.json` and no test runner configuration checked in. Add an appropriate test setup and `"test"` script before relying on test commands here.

## High-level architecture

### Framework and tooling

- This is a **Next.js App Router** project (`next@16`, `react@19`, TypeScript, strict mode) created via `create-next-app`.
- TypeScript config (`tsconfig.json`):
  - Uses a path alias `@/*` mapped to the repo root (`./*`), heavily used across `app`, `components`, and `lib`.
  - `strict: true` with `noEmit`, so TypeScript is used purely for type checking.
- Linting (`eslint.config.mjs`):
  - Based on `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`.
  - Default Next.js ignores (`.next/**`, `out/**`, `build/**`, `next-env.d.ts`) are explicitly configured via `globalIgnores`.
- Styling:
  - Tailwind CSS v4-style setup via `tailwindcss` and `@tailwindcss/postcss` with global styles in `app/globals.css` and route-specific styles (e.g. `app/(auth)/signup/styles.css`).

### App router layout

- `app/layout.tsx` is the **root layout**:
  - Registers Geist font families and applies them as CSS variables.
  - Imports global styles via `./globals.css`.
  - Renders a full-screen animated **Aurora background** (`components/Aurora.tsx`) behind all routes, then the nested `children`.

- Route groups organize high-level sections:
  - `app/(root)/...`: main dashboard / market view.
  - `app/(auth)/...`: authentication and onboarding flows.

#### `(root)` group – trading dashboard

- `app/(root)/layout.tsx`
  - Wraps the main content with a sticky `Header` (`components/ui/Header.tsx`) and a `container` wrapper.

- `app/(root)/page.tsx`
  - Implements the **home page** composed entirely of TradingView widgets.
  - Uses `TradingViewWidget` from `components/traidingView.tsx` for each widget instance.
  - Ties each widget to a specific configuration exported from `lib/constants.tsx`:
    - `MARKET_OVERVIEW_WIDGET_CONFIG`
    - `HEATMAP_WIDGET_CONFIG`
    - `TOP_STORIES_WIDGET_CONFIG`
    - `MARKET_DATA_WIDGET_CONFIG`
  - Script URLs are generated via `scriptURL()` from `lib/constants.tsx`, with optional `path` segments like `stock-heatmap`, `timeline`, or `market-quotes`.

#### `(auth)` group – authentication & onboarding

- `app/(auth)/layout.tsx`
  - Two-column auth shell: left side hosts the auth forms, right side shows marketing/testimonial content and a dashboard preview image.
  - The logo and assets are loaded from the `public/assets/...` tree via `next/image`.

- `app/(auth)/signin/page.tsx`
  - Placeholder sign-in page (`SignInPage`), currently just a stub component.

- `app/(auth)/signup/page.tsx`
  - **Primary example of a complex form flow** using `react-hook-form`.
  - Relies on:
    - `InputFields` and `SelectField` primitives from `components/forms.tsx`.
    - Select option constants from `lib/constants.tsx`:
      - `COUNTRY_LIST`
      - `INVESTMENT_GOALS`
      - `PREFERRED_INDUSTRIES`
      - `RISK_TOLERANCE_OPTIONS`
    - Footer links via `SmallLinks` from `components/ui/footer.tsx`.
  - `useForm<SignUpFormData>` shapes the data model; the `SignUpFormData` and `FooterLinkProps` types are defined in the `app/types` TypeScript declaration files, which are picked up via `tsconfig.json`'s `include` patterns.

### Shared UI and utilities

#### Navigation and layout components

- `components/ui/Header.tsx`
  - Sticky header used by at least the `(root)` and `(auth)` layouts.
  - Displays the logo and a `NavItems` component.

- `components/ui/NavItems.tsx`
  - Client component that:
    - Pulls navigation definitions from `NavItems` in `lib/constants.tsx`.
    - Uses `usePathname` from `next/navigation` to compute the active route.
    - Applies an active-link style (`text-yellow-500`) based on whether the current pathname starts with a given `href`.
  - Also renders a `UserMenu` component (in `components/ui/UserMenu.tsx`) as the rightmost nav item.

- `components/ui/footer.tsx`
  - Exposes `SmallLinks`, a small helper for rendering one or more inline text+link pairs, used on the sign-up page for contextual auth navigation.

#### Forms

- `components/forms.tsx` defines **form building blocks** that are reused across auth flows:
  - `InputFields`
    - A wrapper around a standard `<input>` that plugs into `react-hook-form` via a provided `register` function and validation rules.
    - Renders validation errors based on the `errors` object passed from `react-hook-form`.
  - `SelectField`
    - Built on top of the Radix-based `Select` component from `components/ui/select.tsx`.
    - Uses `Controller` from `react-hook-form` to manage select state while still accepting `register`, `validations`, and `errors` props.
    - Renders option lists from arrays of `iconOption` (typed in `lib/constants.tsx`), optionally featuring flag icons via `next/image`.

#### TradingView integration

- `app/hooks/TraidingViews.tsx`
  - Custom hook `useTraidingViewsWidgets` that encapsulates **TradingView widget script embedding**:
    - Accepts `scriptURL`, a `config` object, and an optional `height`.
    - Clears and resets the container DOM, then injects a `<script>` element with the URL and config JSON as `innerHTML`.
    - Marks the container as loaded via a `data-loaded` attribute and ensures cleanup on unmount.
  - Returns a `ref` that is attached to the widget container in the UI layer.

- `components/traidingView.tsx`
  - Client component `TradingViewWidget` that:
    - Calls `useTraidingViewsWidgets` and attaches the returned `ref` to the `.tradingview-widget-container` div.
    - Optionally renders a widget title and a standard TradingView attribution block.
  - All external widget behavior is driven by the `config` objects provided via `lib/constants.tsx`.

- `lib/constants.tsx`
  - Central configuration hub for:
    - Navigation (`NavItems`) and simple user stub data (`user`).
    - Auth form options (`INVESTMENT_GOALS`, `RISK_TOLERANCE_OPTIONS`, `PREFERRED_INDUSTRIES`, `COUNTRY_LIST`).
    - Multiple TradingView widget configuration objects and factories:
      - Dashboard-level widgets (overview, heatmap, news, market data).
      - Symbol-specific widgets (symbol info, candlestick charts, baseline charts, technical analysis, company profile/financials).
    - Miscellaneous UI constants like `POPULAR_STOCK_SYMBOLS`, `NO_MARKET_NEWS` HTML, and `WATCHLIST_TABLE_HEADER` column labels.
  - The `scriptURL` helper centralizes the construction of TradingView embed script URLs and is used throughout the dashboard.

#### Visual effects and utilities

- `components/Aurora.tsx`
  - Client-only component that renders a full-screen animated aurora effect behind the app using **OGL** (`Renderer`, `Program`, `Mesh`, `Triangle`).
  - Uses a `useEffect` hook to:
    - Initialize the WebGL renderer and shader program.
    - Respond to window resize events by updating `uResolution`.
    - Drive animation by updating uniforms (`uTime`, `uAmplitude`, `uColorStops`, `uBlend`) on each animation frame.
  - Controlled via props `colorStops`, `amplitude`, `blend`, `time`, and `speed`.

- `lib/utils.ts`
  - Exposes a single utility `cn(...inputs)` that composes class names using `clsx` and `tailwind-merge`.

### TypeScript type declarations

- The project uses `.d.ts` declaration files under `app/types` (e.g., `app-types.d.ts`, `globals.d.ts`) for globally available types like `SignUpFormData` and `FooterLinkProps`.
- These files are included via the `include` patterns in `tsconfig.json`, so types can be referenced without relative imports.

## Notes for future Warp usage

- Prefer using the `@/*` path alias for imports (e.g., `@/components/...`, `@/lib/constants`) to stay consistent with existing code.
- When adding new TradingView widgets or dashboards:
  - Define or extend widget configuration objects in `lib/constants.tsx`.
  - Use `scriptURL()` to construct the correct embed script URL.
  - Render widgets via `TradingViewWidget` and wire them to `useTraidingViewsWidgets` through props.
- For new auth or onboarding flows, reuse `InputFields`, `SelectField`, and the existing `react-hook-form` setup patterns from `app/(auth)/signup/page.tsx` to keep UX and validation consistent.