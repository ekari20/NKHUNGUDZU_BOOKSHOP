# Technical Architecture: NKHUNGUDZU Bookshop

## Overview

NKHUNGUDZU Bookshop is built as a lightweight, high-performance static web application using standard modern web technologies (HTML5, CSS3, Vanilla JavaScript ES6+). It requires no build steps, bundlers, or server-side runtime, making it highly portable, fast to load, and easy to deploy on any static hosting platform.

---

## Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Structure & Content** | Semantic HTML5 | Page structure, SEO meta tags, accessibility, and content hierarchy |
| **Styling & Layout** | CSS3 (Variables, Grid, Flexbox) | Design system, responsive layouts, color tokens, and animations |
| **Interactivity & Logic**| Vanilla JavaScript (ES6+) | DOM manipulation, category filtering, search, dynamic rendering |
| **Client Storage** | Web Storage API (`localStorage`) | Persistent client-side review and rating storage |
| **Assets & Documents** | JPEG, PNG, Favicon suite, PDF | Product banners, branch photography, brand assets, and 2026 Price List PDF |
| **Hosting & Serving** | Static Web Server (e.g., Vercel) | Direct static file delivery over HTTPS |

---

## Directory & File Structure

```
NKHUNGUDZU_BOOKSHOP/
├── index.html                                 # Main landing page
├── LICENSE                                    # Open source MIT license
├── README.md                                  # Repository documentation and setup guide
├── AGENTS.md                                  # Agent guidelines and project map
├── NKHUNGUDZU BOOKSHOP 2026 PRICE LIST (1).pdf # Official downloadable 2026 Price List document
│
├── context/                                   # Project reference documentation
│   ├── project-overview.md                    # Business context, features, branches, mission
│   ├── architecture.md                        # Technical architecture and component structure
│   └── code-standards.md                      # Development rules, style conventions, and guidelines
│
├── css/
│   └── style.css                              # Master stylesheet (design tokens, layout, components, responsive rules)
│
├── js/
│   ├── script.js                              # Global behaviors (mobile nav, hero carousel, smooth scrolling)
│   ├── books.js                               # Book catalog category filter logic
│   ├── pricelist.js                           # Product catalog dataset, price formatting, search, and category filter
│   └── reviews.js                             # Interactive star rating system, review form submission, localStorage persistence
│
├── pages/                                     # Subpages
│   ├── about.html                             # About us, history, mission/vision/values, branch contacts
│   ├── bibles.html                            # Bibles, translations, and Christian songbooks showcase
│   ├── books.html                             # Educational book collection by level and subject
│   ├── pricelist.html                         # Interactive price list table and PDF download section
│   ├── reviews.html                           # Customer reviews display and submission form
│   └── stationery.html                        # School and office stationery products
│
└── images/                                    # Media assets
    ├── Blantyre.jpeg                          # Blantyre branch photo
    ├── Lilongwe.jpeg                          # Lilongwe branch photo
    ├── Limbe.jpeg                             # Limbe branch photo
    ├── Zomba.jpeg                             # Zomba branch photo
    ├── bibles.jpeg                            # Bibles category banner
    ├── books.jpeg                             # Books category banner
    ├── stationary.jpeg                        # Stationery category banner
    ├── logo.jpg                               # NKHUNGUDZU Bookshop brand logo
    ├── favicon/                               # Cross-device favicon package
    └── screenshot/                            # Website preview screenshot
```

---

## Component & Module Architecture

### 1. Global Shell & Navigation
- **Top Information Bar (`.top-bar`)**: Contains business phone numbers, email address, and Facebook page link.
- **Header (`.main-header`)**: Features the bookshop logo, branding, and global product search field.
- **Navigation Bar (`.main-navigation`)**: Multi-page links with active page indicator and mobile hamburger toggle (`.mobile-menu-button`).
- **Footer (`.main-footer`)**: Multi-column layout featuring quick links, product categories, branch locations with direct phone links, and copyright info.

### 2. Client Scripts & Responsibilities

#### `js/script.js` (Global Site Scripts)
- **Mobile Menu Toggle**: Handles mobile menu drawer open/close state with ARIA accessibility attributes.
- **Hero Slideshow Carousel**: Manages active slides, auto-advance timers, previous/next controls, and indicator dots on `index.html`.
- **Search Header Redirect**: Directs user queries entered in the header search to relevant catalog sections or price list.
- **Back-to-Top Button**: Smooth scrolling utility for navigating back to page header.

#### `js/books.js` (Books Page Filtering)
- Reads `data-category` attributes on filter tab buttons and book category cards.
- Toggles card visibility (`display: flex` / `display: none`) dynamically based on user category selection without reloading the page.

#### `js/pricelist.js` (Dynamic Price Catalog & Search)
- **Product Store**: In-memory product catalog containing school books, study guides, dictionaries, teacher guides, and spiritual literature.
- **Currency & Price Formatter**: `formatPrice()` formats Malawian Kwacha values (`K` prefix and locale thousand separators) or handles price range strings.
- **Dynamic DOM Rendering**: Generates product cards and price rows programmatically.
- **Search Filter**: Real-time filter comparing query strings against book titles and descriptions.
- **Category Switcher**: Filters product display based on category keys (`all`, `secondary`, `made-simple`, `literature`, `dictionaries`, `secondary-teacher`, `primary-teacher`, `spiritual`).

#### `js/reviews.js` (Reviews & Rating Engine)
- **Default Review Seed**: Fallback list of pre-seeded authentic customer reviews.
- **Web Storage Sync**: Reads from and writes to `localStorage` key `nkhungudzuReviews`.
- **Interactive Star Rating Selector**: Hover and click handlers that set the active rating value (1 to 5 stars) and status message.
- **Form Submission & Validation**: Validates user name, selected rating, and comment text before appending new reviews.
- **Average Rating Calculation**: Computes live average rating score and star icon visualization dynamically.

---

## Design System & Styling Architecture

The design system is centralized in `css/style.css` using CSS custom properties:

### Color Tokens
```css
:root {
  --primary-green: #176b45;
  --dark-green: #0d4d31;
  --light-green: #eaf5ef;

  --primary-red: #b51f2a;
  --dark-red: #8e1720;
  --light-red: #fbeaec;

  --gold: #d4a72c;

  --white: #ffffff;
  --off-white: #f8faf8;
  --light-gray: #f1f3f2;
  --gray: #6b7280;
  --dark: #1e2521;
  --black: #111111;

  --border: #e1e7e3;

  --shadow-small: 0 4px 12px rgba(0, 0, 0, 0.06);
  --shadow-medium: 0 10px 30px rgba(0, 0, 0, 0.1);
  --shadow-large: 0 20px 50px rgba(0, 0, 0, 0.15);

  --radius-small: 8px;
  --radius-medium: 14px;
  --radius-large: 22px;

  --transition: all 0.3s ease;
}
```

### Layout & Responsive Breakpoints
- **Container**: Max width of `1200px` with fluid `92%` inline padding.
- **Grid Systems**: CSS Grid for product cards, branch directories, mission cards, and footer columns (`grid-template-columns: repeat(auto-fit, minmax(...))`).
- **Responsive Breakpoints**:
  - `max-width: 992px`: Tablet view adaptations, column reductions.
  - `max-width: 768px`: Mobile navigation drawer activation, stacked grids, simplified header.
  - `max-width: 480px`: Compact card padding, single column forms, reduced typography scale.

---

## Data Flow & State Management

```
User Action (Search / Filter / Review Submit)
                    │
                    ▼
          Vanilla JS Event Listener
                    │
    ┌───────────────┴───────────────┐
    ▼                               ▼
In-Memory Filtering / Calc     localStorage API
 (pricelist.js / books.js)      (reviews.js)
    │                               │
    └───────────────┬───────────────┘
                    ▼
        Direct DOM Update / Render
```

---

## Deployment & Hosting

- The codebase is 100% static and self-contained.
- Can be hosted on Vercel, GitHub Pages, Netlify, Cloudflare Pages, or traditional web servers (Nginx/Apache).
- For local development, any static server can be used:
  - `python -m http.server 8000`
  - `npx serve .`
  - Direct browser opening of `index.html`.
