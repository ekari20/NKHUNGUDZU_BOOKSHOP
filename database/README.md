# NKHUNGUDZU Bookshop – Database Migrations (Supabase)

This directory contains database migration scripts for initializing and populating the **NKHUNGUDZU Bookshop** Supabase PostgreSQL database with the official **2026 Price List** catalog and reviews data.

---

## 📁 Migration Files

| File | Description |
|---|---|
| `01_create_tables.sql` | Creates `public.products` and `public.reviews` tables with constraints, indexes, automatic `updated_at` triggers, and Row Level Security (RLS) policies. |
| `02_populate_products.sql` | Inserts 152 verified catalog products with official 2026 pricing across Secondary Textbooks, Made Simple Series, Literature, Dictionaries, Teacher's Guides, Spiritual Literature, and School/Office Stationery. |
| `03_populate_reviews.sql` | Inserts verified initial customer testimonials and 5-star ratings. |
| `schema_and_seed_all.sql` | **All-in-one script** combining schema creation, RLS policies, triggers, and full seed data. |

---

## 🚀 How to Run in Supabase

### Option A: Supabase Web Dashboard (SQL Editor) – *Recommended*

1. Log in to your [Supabase Dashboard](https://app.supabase.com).
2. Select the **NKHUNGUDZU BOOKSHOP** project.
3. In the left sidebar, click **SQL Editor**.
4. Click **New Query**.
5. Copy and paste the contents of `database/schema_and_seed_all.sql` (or run `01_create_tables.sql`, `02_populate_products.sql`, and `03_populate_reviews.sql` sequentially).
6. Click **Run** (or press `Ctrl` + `Enter`).
7. Verify success in the **Table Editor** under `products` and `reviews`.

### Option B: Supabase CLI

```bash
# Link project
supabase link --project-ref <your-project-ref>

# Run migrations
supabase db execute --file database/01_create_tables.sql
supabase db execute --file database/02_populate_products.sql
supabase db execute --file database/03_populate_reviews.sql
```

---

## 📊 Database Schema Summary

### 1. `public.products`

| Column | Type | Nullable | Default | Description |
|---|---|---|---|---|
| `id` | `BIGINT` (Identity) | No | `GENERATED ALWAYS` | Primary Key |
| `name` | `TEXT` | No | - | Product title / book name |
| `category` | `TEXT` | No | - | Category slug (`secondary`, `made-simple`, `literature`, `dictionaries`, `secondary-teacher`, `primary-teacher`, `spiritual`, `stationery`) |
| `subcategory` | `TEXT` | Yes | `NULL` | Specific subject or subcategory |
| `brand` | `TEXT` | Yes | `NULL` | Publisher, author, or manufacturer brand |
| `description` | `TEXT` | Yes | `NULL` | Product summary and specifications |
| `price` | `NUMERIC(10, 2)` | No | - | Price in Malawian Kwacha (MWK) |
| `image_url` | `TEXT` | Yes | `NULL` | Relative image asset path |
| `available` | `BOOLEAN` | No | `true` | Stock availability flag |
| `created_at` | `TIMESTAMPTZ` | No | `NOW()` | Timestamp created |
| `updated_at` | `TIMESTAMPTZ` | No | `NOW()` | Timestamp updated (auto-managed by trigger) |

### 2. `public.reviews`

| Column | Type | Nullable | Default | Description |
|---|---|---|---|---|
| `id` | `BIGINT` (Identity) | No | `GENERATED ALWAYS` | Primary Key |
| `customer_name` | `TEXT` | No | - | Name of reviewer |
| `rating` | `INTEGER` | No | - | Rating between 1 and 5 stars |
| `comment` | `TEXT` | No | - | Customer feedback text |
| `approved` | `BOOLEAN` | No | `false` | Moderation approval flag |
| `created_at` | `TIMESTAMPTZ` | No | `NOW()` | Timestamp submitted |

---

## 🔒 Row Level Security (RLS)

- **`products`**:
  - `Public can view available products`: Read-only access for anonymous and authenticated users (`SELECT`).
  - `Authenticated users can modify products`: Full CRUD permissions for authenticated admins.
- **`reviews`**:
  - `Public can view approved reviews`: Anonymous and authenticated users can view reviews where `approved = true`.
  - `Public can submit reviews`: Anyone can insert new reviews (defaults to `approved = false` for moderation).
  - `Authenticated users can manage reviews`: Full management access for authenticated admins.
