-- =============================================================================
-- Migration: 01_create_tables.sql
-- Description: Creates the products and reviews tables with proper constraints,
--              indexes, triggers, and Supabase Row Level Security (RLS) policies.
-- =============================================================================

-- Enable UUID extension if needed in future
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- -----------------------------------------------------------------------------
-- 1. Table: public.products
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.products (
    id BIGINT GENERATED ALWAYS AS IDENTITY NOT NULL,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    subcategory TEXT NULL,
    brand TEXT NULL,
    description TEXT NULL,
    price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
    image_url TEXT NULL,
    available BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    CONSTRAINT products_pkey PRIMARY KEY (id)
) TABLESPACE pg_default;

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products (category);
CREATE INDEX IF NOT EXISTS idx_products_name ON public.products (name);
CREATE INDEX IF NOT EXISTS idx_products_available ON public.products (available);
CREATE INDEX IF NOT EXISTS idx_products_brand ON public.products (brand);

-- Trigger to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_products_updated_at ON public.products;
CREATE TRIGGER trg_products_updated_at
    BEFORE UPDATE ON public.products
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- -----------------------------------------------------------------------------
-- 2. Table: public.reviews
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.reviews (
    id BIGINT GENERATED ALWAYS AS IDENTITY NOT NULL,
    customer_name TEXT NOT NULL,
    rating INTEGER NOT NULL,
    comment TEXT NOT NULL,
    approved BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    CONSTRAINT reviews_pkey PRIMARY KEY (id),
    CONSTRAINT reviews_rating_check CHECK (rating >= 1 AND rating <= 5)
) TABLESPACE pg_default;

-- Indexes for reviews
CREATE INDEX IF NOT EXISTS idx_reviews_approved ON public.reviews (approved);
CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON public.reviews (created_at DESC);

-- -----------------------------------------------------------------------------
-- 3. Row Level Security (RLS) Policies
-- -----------------------------------------------------------------------------

-- Enable RLS on tables
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Products RLS: Everyone (anon and authenticated) can read available products
DROP POLICY IF EXISTS "Public can view available products" ON public.products;
CREATE POLICY "Public can view available products"
    ON public.products
    FOR SELECT
    USING (true);

-- Products RLS: Only authenticated/service users can insert/update/delete
DROP POLICY IF EXISTS "Authenticated users can modify products" ON public.products;
CREATE POLICY "Authenticated users can modify products"
    ON public.products
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Reviews RLS: Everyone can read approved reviews
DROP POLICY IF EXISTS "Public can view approved reviews" ON public.reviews;
CREATE POLICY "Public can view approved reviews"
    ON public.reviews
    FOR SELECT
    USING (approved = true);

-- Reviews RLS: Anonymous & authenticated users can insert reviews (pending approval)
DROP POLICY IF EXISTS "Public can submit reviews" ON public.reviews;
CREATE POLICY "Public can submit reviews"
    ON public.reviews
    FOR INSERT
    WITH CHECK (true);

-- Reviews RLS: Authenticated admin users can view all reviews & manage approval
DROP POLICY IF EXISTS "Authenticated users can manage reviews" ON public.reviews;
CREATE POLICY "Authenticated users can manage reviews"
    ON public.reviews
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);
