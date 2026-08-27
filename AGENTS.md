# NKHUNGUDZU BOOKSHOP – Agent Guidelines & Context

Welcome to the **NKHUNGUDZU Bookshop** codebase. This file serves as the canonical entry point and guidance manual for AI agents and developers working on this project.

---

## 📚 Project Overview

**NKHUNGUDZU Bookshop** ("Education Made Simple") is a web platform for one of Malawi's leading educational and spiritual bookshops, established on 4 October 2012. The website provides easy access to school textbooks, Bibles, hymn/song books, and office/school stationery, alongside branch contact details and an official 2026 Price List.

- **Stack**: Vanilla HTML5, CSS3, Modern JavaScript (ES6+), Static Hosting
- **Live Preview**: [Nkhungudzu Bookshop](https://nkhungudzu-bookshop-git-main-uuu-f21f.vercel.app/)
- **Repository**: [GitHub Repository](https://github.com/ekari20/NKHUNGUDZU_BOOKSHOP.git)
- **Tagline**: *Education Made Simple*
- **Main Contact**: Phone: `0998 184 070` | Email: `nkhungudzubookshop@gmail.com`

---

## 📖 Essential Context Documents

Before implementing any changes, inspect the documentation files in the `context/` directory in this order:

1. **[context/project-overview.md](context/project-overview.md)**
   Comprehensive business background, mission, vision, core values, branch locations, and product catalog overview.
2. **[context/architecture.md](context/architecture.md)**
   Technical architecture, component responsibilities, file organization, data flows, and design system variables.
3. **[context/code-standards.md](context/code-standards.md)**
   Implementation guidelines, HTML/CSS/JS conventions, defensive coding patterns, and verification checklist.
4. **[context/progress-tracker.md](context/progress-tracker.md)**
   Implementation milestones, completed features (pricing), Supabase roadmap, reviews persistence, and pagination plans.
5. **[README.md](README.md)**
   Project summary, quick start instructions, and local serving details.

---

## 🛠️ Project Structure

```
NKHUNGUDZU_BOOKSHOP/
├── index.html                                 # Main landing page
├── LICENSE                                    # MIT License
├── README.md                                  # Repository readme
├── AGENTS.md                                  # Agent guidelines (this file)
├── NKHUNGUDZU BOOKSHOP 2026 PRICE LIST (1).pdf # Downloadable 2026 Price List
│
├── context/                                   # Project documentation
│   ├── project-overview.md                    # Business context and features
│   ├── architecture.md                        # Technical architecture and DOM scripts
│   ├── code-standards.md                      # Code quality rules and conventions
│   └── progress-tracker.md                    # Stages completed, Supabase roadmap, reviews, and pagination
│
├── css/
│   └── style.css                              # Master stylesheet and CSS custom properties
│
├── js/
│   ├── script.js                              # Global scripts (nav menu, hero slideshow, scrolling)
│   ├── books.js                               # Book catalog category filter logic
│   ├── pricelist.js                           # Price list product data, rendering, and search
│   └── reviews.js                             # Interactive star rating and review management
│
├── pages/                                     # Subpages
│   ├── about.html                             # About us, history, mission/values, branches
│   ├── bibles.html                            # Bibles & song books showcase
│   ├── books.html                             # Educational books collection
│   ├── pricelist.html                         # Interactive price list table & PDF download
│   ├── reviews.html                           # Customer testimonials & rating submission
│   └── stationery.html                        # School & office stationery
│
└── images/                                    # Media assets (logos, branch photos, favicons)
```

---

## 🏪 Physical Branches

| #  | Branch            | Location                              | Phone          |
|----|-------------------|---------------------------------------|----------------|
| 01 | **Limbe Shop**    | Near First Capital Bank               | `0998 184 070` |
| 02 | **Blantyre Shop** | Dossan House                          | `0998 184 071` |
| 03 | **Zomba Shop**    | Opposite Zomba Private Primary School | `0998 184 072` |
| 04 | **Lilongwe Shop** | Area 3, opposite Game Complex         | `0998 666 873` |

---

## ⚡ Core Rules for Agents

1. **Pure Static Architecture**:
   - Do not introduce external frameworks (React, Next.js, Vue, etc.) or complex bundlers unless explicitly requested by the user.
   - Maintain pure, portable Vanilla HTML5, CSS3, and JavaScript.

2. **Design Tokens & Styling**:
   - Use CSS variables defined in `:root` in `css/style.css` (e.g., `--primary-green`, `--dark-green`, `--primary-red`, `--gold`, `--dark`, `--white`).
   - Do not add random hardcoded color literals where custom properties exist.

3. **Relative Path Accuracy**:
   - Maintain accurate relative paths when adding links or assets across `index.html` (root) and files inside `pages/` (subpages).

4. **Defensive JavaScript**:
   - Verify elements exist before adding listeners or performing DOM operations (`if (!element) return;`).
   - Wrap scripts in `DOMContentLoaded` listeners.

5. **Currency & Data Standards**:
   - Prices are denominated in Malawian Kwacha (`K` prefix, e.g. `K25,000` or `formatPrice()`).
   - Customer reviews are persisted via browser `localStorage` using key `nkhungudzuReviews`.
