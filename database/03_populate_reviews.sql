-- =============================================================================
-- Migration: 03_populate_reviews.sql
-- Description: Seeds initial verified customer reviews into public.reviews table.
-- =============================================================================

INSERT INTO public.reviews (
    customer_name,
    rating,
    comment,
    approved
) VALUES
    ('Limbani Phiri', 5, 'Best bookshop in Blantyre! I found all the Made Simple MSCE revision books and secondary textbooks for my children. The prices match the official 2026 price list.', TRUE),
    ('Chisomo Banda', 5, 'Very helpful customer service at the Limbe branch. Got all the Bibles, hymn books, and stationery items in one quick visit. Highly recommended!', TRUE),
    ('Grace Mwale', 5, 'Affordable prices for school stationery and genuine textbooks. Fast and reliable service opposite Zomba Private Primary School.', TRUE),
    ('Patrick Gondwe', 4, 'Convenient location in Lilongwe Area 3 opposite Game Complex. Good stock of English literature and dictionaries.', TRUE),
    ('Tadala Kamanga', 5, 'Nkhungudzu Bookshop makes education truly simple. Their 2026 price list is transparent and fair. Excellent stationery selection!', TRUE);
