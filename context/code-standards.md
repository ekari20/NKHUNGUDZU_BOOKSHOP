# Code Standards & Guidelines: NKHUNGUDZU Bookshop

## Overview

This document outlines the coding standards, design conventions, and architectural best practices for the NKHUNGUDZU Bookshop codebase. Any agent or developer contributing to this repository must adhere to these standards to maintain high quality, performance, and cross-device consistency.

---

## 1. General Principles

- **Simplicity & Performance First**: The project relies on pure, lightweight Vanilla HTML5, CSS3, and JavaScript without heavy frameworks, bundlers, or unnecessary third-party dependencies.
- **Accessibility & Semantics**: Always use semantic HTML tags with proper ARIA attributes to ensure an inclusive user experience.
- **Mobile-Responsive by Default**: Every layout, card, and navigation element must render seamlessly on mobile phones, tablets, and desktop displays.
- **Clean Separation of Concerns**: Keep markup in HTML files, styling in `css/style.css`, and logic in modular JavaScript files under `js/`.

---

## 2. HTML Standards

### Semantic Structure
- Use semantic landmarks for page layouts:
  ```html
  <div class="top-bar">...</div>
  <header class="main-header">...</header>
  <nav class="main-navigation">...</nav>
  <main>
    <section class="...">
      <div class="container">
        <article class="...">...</article>
      </div>
    </section>
  </main>
  <footer class="main-footer">...</footer>
  ```

### Meta Tags & Headers
- Ensure all pages include the standard viewport, charset, favicon links, and descriptive title tags:
  ```html
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Page Title | Nkhungudzu Bookshop</title>
  ```

### Asset & Relative Path Conventions
- **From Root (`index.html`)**:
  - CSS: `href="./css/style.css"`
  - JS: `src="./js/script.js"`
  - Subpages: `href="pages/books.html"`
  - Images: `src="images/..."`
- **From Subpages (`pages/*.html`)**:
  - CSS: `href="../css/style.css"`
  - JS: `src="../js/script.js"`
  - Root: `href="../index.html"`
  - Sibling subpages: `href="./books.html"` or `href="books.html"`
  - Images: `src="../images/..."`

### Accessibility
- Every `<img>` element must have a meaningful `alt` attribute describing its content (e.g. `alt="Nkhungudzu Bookshop Logo"` or `alt="Lilongwe Branch"`).
- Interactive buttons and inputs without visible labels must have `aria-label` attributes.
- Mobile navigation toggles must use `aria-expanded="true"` / `aria-expanded="false"` states.

---

## 3. CSS & Styling Standards

### Design Tokens & Variables
- Always utilize the established CSS custom properties defined in `:root` within `css/style.css`:
  - Primary Theme Colors: `var(--primary-green)`, `var(--dark-green)`, `var(--light-green)`
  - Accent / Brand Red: `var(--primary-red)`, `var(--dark-red)`, `var(--light-red)`
  - Accent Gold: `var(--gold)`
  - Neutral Colors: `var(--white)`, `var(--off-white)`, `var(--light-gray)`, `var(--gray)`, `var(--dark)`, `var(--black)`, `var(--border)`
  - Shadows & Radii: `var(--shadow-small)`, `var(--shadow-medium)`, `var(--shadow-large)`, `var(--radius-small)`, `var(--radius-medium)`, `var(--radius-large)`
  - Transition: `var(--transition)`
- **Rule**: Avoid introducing arbitrary hardcoded hex color values in component rules when an existing theme variable applies.

### Layout Patterns
- Standard page container wrapper:
  ```css
  .container {
    width: min(92%, 1200px);
    margin: 0 auto;
  }
  ```
- Use CSS Grid with `repeat(auto-fit, minmax(...))` for flexible responsive cards.
- Use Flexbox for aligned toolbars, header elements, navigation lists, and button groups.

### Breakpoints
- Follow standard media query thresholds:
  - `@media (max-width: 992px)`: Tablet landscape adjustments.
  - `@media (max-width: 768px)`: Tablet portrait & mobile drawer navigation activation.
  - `@media (max-width: 480px)`: Small screen phone optimizations.

---

## 4. JavaScript Standards

### Defensive DOM Execution
- Wrap scripts in `DOMContentLoaded` listeners or verify element existence defensively before attaching listeners:
  ```javascript
  document.addEventListener("DOMContentLoaded", function () {
    const targetElement = document.querySelector(".target-class");
    if (!targetElement) return;

    targetElement.addEventListener("click", function () {
      // Event logic
    });
  });
  ```

### Code Organization
- **`js/script.js`**: Universal site behaviors (hamburger mobile menu toggle, hero carousel timer & controls, back-to-top scrolling, global search redirect).
- **`js/books.js`**: Books page interactive category filter tabs (`.book-filter` and `.book-category-card`).
- **`js/pricelist.js`**: In-memory product dataset, search query filtering, category selection, Kwacha currency formatting (`formatPrice()`), and PDF modal controls.
- **`js/reviews.js`**: Star rating widget, customer review form validation, `localStorage` read/write handlers (`nkhungudzuReviews`), and live average rating calculations.

### Formatting & Currency
- Always format Malawian Kwacha currency consistently with the `K` prefix and standard thousand separators:
  ```javascript
  function formatPrice(price) {
    if (typeof price === "number") {
      return "K" + price.toLocaleString();
    }
    // ...
  }
  ```

### Storage Best Practices
- When interacting with `localStorage`, always handle parsing and serializing with error safety:
  ```javascript
  function getReviews() {
    const saved = localStorage.getItem("nkhungudzuReviews");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error parsing saved reviews", e);
      }
    }
    return defaultReviews;
  }
  ```

---

## 5. Verification & Quality Checklist

Before completing any changes to the codebase, verify:

1. **Navigation Links**: Ensure all links resolve correctly both from the root index page and from any page within `/pages/`.
2. **Mobile Layout**: Confirm navigation drawer, cards, and tables adapt gracefully on screen widths from 360px up to 1440px.
3. **No Console Errors**: Verify that JavaScript executes cleanly without unhandled exceptions or missing element errors.
4. **Asset Integrity**: Confirm all referenced images, favicons, and the 2026 Price List PDF file exist and load properly.
