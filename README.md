# Saree Showroom — Frontend (React + Vite)

A premium e-commerce storefront for sarees and lehengas, designed for a luxury feel with mobile-first UX, conversion-focused flows, and a Google-Sheets-driven catalog.

Pairs with the **amazon-clone-backend** (Express + MongoDB) API.

---

## Quick start

```bash
npm install
cp .env.example .env.local      # edit values
npm run dev
```

App: `http://localhost:3000` — the dev server proxies `/api/*` to `http://localhost:5000`.

## Env

```
VITE_API_URL=http://localhost:5000/api/v1
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxxxxx
VITE_WHATSAPP_NUMBER=919999999999
VITE_INSTAGRAM_HANDLE=yourstore
```

---

## Stack

React 18 · Vite · React Router v6 · Redux Toolkit · TanStack Query · Tailwind · Framer Motion · Axios · React Hook Form · Zod · React Helmet · React Hot Toast · Lucide.

## Highlights

- Lazy-loaded routes (every page is its own chunk)
- Axios with auto-refresh on 401 + `auth:expired` event
- Cart + wishlist persisted to localStorage
- Brand palette (Maroon / Gold / Ivory / Cream)
- Sticky header that hides on scroll, mobile bottom nav, sticky WhatsApp button
- PDP with JSON-LD Product schema for SEO
- Razorpay end-to-end (modal + signature verification)
- Admin (orders, sync trigger + log, coupons)

---

## Folder map

```
src/
├── api/            axios client + per-domain endpoint functions
├── components/
│   ├── ui/         Button, Input, Modal, Drawer, Accordion, Badge
│   ├── layout/     Header, Footer, MobileBottomNav, AnnouncementBar, WhatsAppButton
│   ├── product/    ProductCard, ProductGrid, ImageGallery, PriceTag, ColorSwatch, SizeSelector
│   ├── home/       HeroSlider, CategoryTiles, CollectionStrip, FeatureBanner, InstagramFeed, Testimonials, NewsletterSignup
│   ├── filters/    FilterSidebar, PillFilter, PriceRangeFilter, SortMenu
│   ├── cart/       CartDrawer, CartLine, CartSummary
│   ├── checkout/   AddressForm, PaymentSelector
│   └── common/     Loader, EmptyState, Pagination, Breadcrumbs, Seo
├── features/       auth, cart, wishlist slices + store
├── hooks/          useDebounce, useMediaQuery, useScrollDirection
├── pages/          all routes (Home, Category, ProductDetail, Cart, Checkout, Search, Lookbook, Wholesale, NotFound,
│                   Account/*, Auth/*, Admin/*, Static/*)
├── router/         lazy-loaded routes + RequireAuth guard
├── utils/          cn, formatPrice, storage, razorpay
└── styles/         tailwind.css with brand classes
```

---

## Backend contract

All responses follow the envelope:
```json
{ "success": true, "message": "...", "data": ..., "meta": { ... } }
```

Endpoints used by each page are in the `api/` files — one file per domain (`products`, `auth`, `orders`, `admin`).

---

## Razorpay flow

1. Checkout calls `POST /orders` → backend returns `{ order, payment }` (payment has Razorpay order id + amount)
2. `utils/razorpay.js` dynamically loads the checkout SDK and opens the modal
3. On success, frontend calls `POST /orders/:id/verify-razorpay` with the signature → backend verifies HMAC and marks paid

Set `VITE_RAZORPAY_KEY_ID` to a live key before going to production.

---

## Build & deploy

```bash
npm run build      # outputs dist/
npm run preview    # serve dist/ locally
```

Deploy `dist/` to Vercel / Netlify / Cloudflare Pages. SPA fallback (all routes → `index.html`) is automatic on those hosts; for nginx, add `try_files $uri /index.html;`.

In production env vars, set `VITE_API_URL=https://api.yourdomain.com/api/v1`.

---

## What to wire up next

1. **Google Sheet → MongoDB sync** in your backend (papaparse + cron + upsert by SKU)
2. **Real product images** (replace Unsplash placeholders in HeroSlider / FeatureBanner)
3. **Razorpay live keys**
4. **`public/og-default.jpg`** for social sharing previews
5. **Cloudinary uploads** for the review-photos upload flow (if you add it to PDP)

---

## License

MIT
