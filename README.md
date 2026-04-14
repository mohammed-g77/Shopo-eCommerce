# Shopo eCommerce

Shopo is a modern, responsive, production-ready eCommerce frontend built with React. It provides a seamless shopping experience directly out-of-the-box by seamlessly bridging beautifully crafted User Interfaces with robust backend API architecture.

## 🚀 Key Features

- **Robust API Architecture:** Centralized `apiClient.js` providing deeply secure `authClient` interceptors (JWT Bearer Token injection) alongside a separate `publicClient`. Deeply isolated defensive parsing to prevent app breakage from changing backend response schemas.
- **Server State Management:** Leveraging **TanStack Query (React Query)** to handle caching, mutations, and reactive cache invalidation globally (e.g. invalidating Cart queries natively upon checkout success or product additions).
- **Core eCommerce Pipeline:** Fully realized implementations for:
  - **Shop Listing:** Dynamic grid/list visual toggles alongside responsive extraction mapping for deeply nested server schemas incorporating multi-page queries.
  - **Single Product Flow:** Dynamic parameter decoding and safe fallbacks for pricing layouts alongside one-click Cart mutations.
  - **Cart & Checkout Logic:** Client-side real-time form validation managing billing logic, dynamic shipping selectors locking cleanly into global submission hooks utilizing React Hook Form.
- **Authentication & Profile Management:**
  - Standard Register & Sign-in mechanisms securely cached locally.
  - Compartmentalized Profile mutations: Update details, change email, and alter passwords with isolated form tracking cleanly separated from core profiles.
- **Dynamic Design System:** Handcrafted Modular CSS mixed beautifully with `Material-UI (MUI)` component configurations supporting responsive skeletons, overlay modals, toasts/snackbars seamlessly interacting with global APIs. 
- **Production Preparedness:** Safely labels, masks, and disables UI features awaiting official API documentation endpoints natively ensuring safe UX experiences (Wishlist, Compare & Advanced Filter sliders).

## 🛠️ Tech Stack

- **Framework:** React + Vite
- **Styling:** CSS Modules + Material-UI (MUI)
- **Data Fetching & Cache:** Axios + TanStack React Query (`@tanstack/react-query`)
- **Routing:** React Router v6
- **Forms & Validation:** React Hook Form

## 📂 Architecture Organization

- `src/api/` — Houses centralized API Clients (`publicClient`, `authClient`) and the isolated domain-specific modular service layers (`productService`, `cartService`, `checkoutService`, `profileService`) translating raw HTTP to normalized local JavaScript objects explicitly.
- `src/hooks/` — Abstracts API Service calls gracefully via React Query encapsulating global hooks (e.g `useCart.js`).
- `src/components/` — Global re-usable presentation bits including layout elements (`Header`, `Footer`, `MainNavbar`) and dynamic cards (`ProductCard`, `Newsletter`).
- `src/pages/` — Top-level view blocks segmenting primary route architecture strictly mapping domains (Home, Shop, Cart, Checkout, Profile, Login, Contact).

## 💻 Getting Started

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Run Development Server:**
   ```bash
   npm run dev
   ```

3. **Build for Production:**
   ```bash
   npm run build
   ```

## ⚠️ Notes on Unsupported Features

This project utilizes defensive architectural standards. Several UI features dynamically mark themselves via opaque buttons, disabled toggles, and UI Toast flags declaring `TODO: WAITING FOR API SUPPORT`. This protects end users from dead endpoints regarding:
- Sidebar Category/Pricing Filter mapping
- Favorites/Wishlist arrays
- Product Comparisons 
- External Customer Review lists
