# Project Overview: NKHUNGUDZU Bookshop

## About the Project

NKHUNGUDZU Bookshop is a modern web platform for one of Malawi's premier bookshops, dedicated to providing easy access to educational, spiritual, and stationery resources. The website serves as a comprehensive digital storefront, digital catalog, and information hub for students, educators, parents, schools, and institutions across Malawi.

- **Tagline**: Education Made Simple
- **Established**: Thursday, 4 October 2012
- **Website/Live Preview**: [Nkhungudzu Bookshop](https://nkhungudzu-bookshop-git-main-uuu-f21f.vercel.app/)
- **Repository**: [GitHub Repository](https://github.com/ekari20/NKHUNGUDZU_BOOKSHOP.git)
- **Primary Contact**: 0998 184 070 | `nkhungudzubookshop@gmail.com`

---

## Mission, Vision & Core Values

### Mission
To be the leading Bookshop in Malawi by delivering accessible, affordable, and high-quality educational and spiritual literature.

### Vision
To educate most of the vulnerable children of Malawi and empower communities through learning and faith.

### Core Values
- **Reliability**: Consistently stocking essential academic and spiritual titles with dependable customer service.
- **Transparency**: Clear, upfront pricing and honest communication across all branches.
- **Integrity**: Dedicated support for education and community development, assisting students from primary school through university.

---

## What the Bookshop Offers

1. **Educational Books**
   - **Primary School Books**: Standard 1 through Standard 8 textbooks covering all national curriculum subjects.
   - **Secondary School Books**: Form 1 through Form 4 core textbooks (Sciences, Humanities, Commercials, Languages).
   - **"Made Simple" Series**: Popular study guides and simplified revision books designed for student mastery.
   - **Literature & Set Books**: Prescribed novels, plays, poetry anthologies, and reader texts.
   - **Teacher's Guides**: Comprehensive guides for primary and secondary school educators.
   - **Dictionaries & Reference**: English, Chichewa, and specialized bilingual dictionaries.

2. **Bibles & Song Books**
   - Bibles in multiple languages and translations (Chichewa, English, Tumbuka, Yao, and other local/international editions).
   - Christian song books, hymnals, and spiritual literature for churches, institutions, and personal devotion.

3. **School & Office Stationery**
   - Exercise books, notebooks, printing and photocopy paper, pens, pencils, markers, crayons, rulers, mathematical instruments, and general office supplies.

4. **Transparent Price List & PDF Catalog**
   - Comprehensive digital price list covering all inventory categories.
   - Official downloadable and viewable "NKHUNGUDZU BOOKSHOP 2026 PRICE LIST" PDF document.

5. **Customer Reviews & Community Feedback**
   - Interactive star rating and review submission system to gather feedback and build trust with customers.

---

## Branch Network Across Malawi

NKHUNGUDZU Bookshop operates four physical branches across major cities in Malawi:

| # | Branch | Location / Landmark | Direct Contact |
|---|---|---|---|
| 01 | **Limbe Shop** | Near First Capital Bank | `0998 184 070` |
| 02 | **Blantyre Shop** | Dossan House | `0998 184 071` |
| 03 | **Zomba Shop** | Opposite Zomba Private Primary School | `0998 184 072` |
| 04 | **Lilongwe Shop** | Area 3, opposite Game Complex | `0998 666 873` |

---

## Website Structure & Pages

The website is structured into intuitive, lightweight static web pages:

```
NKHUNGUDZU_BOOKSHOP/
├── index.html              → Homepage (Hero slideshow, quick categories, featured items, mission, branches)
├── pages/
│   ├── books.html          → Educational books catalog with category filtering
│   ├── bibles.html         → Bibles and spiritual literature catalog
│   ├── stationery.html     → School and office stationery products
│   ├── pricelist.html      → Interactive searchable price list and 2026 PDF viewer/download
│   ├── reviews.html        → Customer ratings, testimonials, and interactive review form
│   └── about.html          → History, mission, vision, values, branch details, opening hours
├── css/
│   └── style.css           → Global responsive stylesheet and design tokens
├── js/
│   ├── script.js           → Shared UI behaviors (navigation toggle, slideshow, smooth scrolling)
│   ├── books.js            → Book filtering and category interactions
│   ├── pricelist.js        → Price list data rendering, search, and category filters
│   └── reviews.js          → Review management, star ratings, and localStorage persistence
└── images/                 → Branch photography, product assets, and favicons
```

---

## Core User Flows

### 1. Discovering Products
- Visitors land on the homepage and view featured categories or use the search bar.
- Category shortcuts take users directly to dedicated pages: `Books`, `Bibles & Song Books`, `Stationery`, or `Price List`.

### 2. Checking Prices & Downloading Catalog
- Visitors navigate to the Price List page (`pages/pricelist.html`).
- Users can filter by category (Secondary, Made Simple, Literature, Dictionaries, Teacher's Guides, Spiritual Literature) or search items by title.
- Users can view or download the complete official 2026 Price List PDF.

### 3. Finding Branch Locations & Placing Orders
- Visitors consult the About Us page or footer branch listings for phone numbers, street locations, and operating hours.
- Direct `tel:` links enable mobile users to call branch managers directly for inquiries and reservations.

### 4. Submitting and Reading Reviews
- Visitors navigate to `pages/reviews.html` to browse recent community reviews and ratings.
- Customers can submit their name, star rating (1–5), and comments, which persist in the browser via `localStorage`.

---

## Target Audience

- **Students**: Primary and secondary learners preparing for MSCE, JCE, and national exams.
- **Teachers & Educators**: Schools and tutors sourcing official syllabi textbooks and teacher guides.
- **Parents & Guardians**: Families purchasing required term books and school supplies.
- **Churches & Christian Institutions**: Organizations seeking Bibles, hymnals, and spiritual literature.
- **Offices & Businesses**: Commercial entities purchasing bulk stationery and supplies.
