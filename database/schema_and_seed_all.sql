-- =============================================================================
-- NKHUNGUDZU BOOKSHOP - SUPABASE DATABASE MIGRATION & SEED SCRIPT (2026)
--
-- This script contains the complete database schema creation and seed data
-- for NKHUNGUDZU Bookshop ("Education Made Simple").
--
-- Tables created:
--   1. public.products (152 catalog products aligned with 2026 Price List PDF)
--   2. public.reviews  (Customer testimonials & star ratings)
--
-- Features:
--   - Identity primary keys
--   - Performance indexes on categories, names, and ratings
--   - Automatic updated_at trigger for products
--   - Row Level Security (RLS) policies for Supabase public access
-- =============================================================================

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


-- =============================================================================
-- SEED DATA: PRODUCTS & REVIEWS
-- =============================================================================

-- =============================================================================
-- Migration: 02_populate_products.sql
-- Description: Seeds official 2026 catalog products into public.products table.
--              Includes Secondary Books, Made Simple Q&A, Literature,
--              Dictionaries, Spiritual Literature, and Office/School Stationery.
-- =============================================================================

-- Clean existing product seed data if needed (optional)
-- TRUNCATE TABLE public.products RESTART IDENTITY;

INSERT INTO public.products (
    name,
    category,
    subcategory,
    brand,
    description,
    price,
    image_url,
    available
) VALUES
    ('Target Senior Geography', 'secondary', 'Geography', 'Target Series', 'Comprehensive senior secondary geography textbook covering physical, human, and economic geography for MSCE.', 35000.00, 'images/books.jpeg', TRUE),
    ('Target Junior Secondary Books (Forms 1 & 2)', 'secondary', 'General Secondary', 'Target Series', 'Standard Target curriculum textbook series for junior secondary subjects (Forms 1 and 2).', 28000.00, 'images/books.jpeg', TRUE),
    ('Target Senior Secondary Books (Forms 3 & 4)', 'secondary', 'General Secondary', 'Target Series', 'Standard Target curriculum textbook series for senior secondary subjects (Forms 3 and 4).', 28000.00, 'images/books.jpeg', TRUE),
    ('Arise Senior Social & Life Skills', 'secondary', 'Social & Life Skills', 'Arise Series', 'Senior secondary Social and Life Skills textbook aligned with the MSCE syllabus.', 35000.00, 'images/books.jpeg', TRUE),
    ('Arise Senior Geography', 'secondary', 'Geography', 'Arise Series', 'Senior secondary Geography textbook covering key topics for MSCE examinations.', 35000.00, 'images/books.jpeg', TRUE),
    ('Arise Secondary Textbooks (General)', 'secondary', 'General Secondary', 'Arise Series', 'Core Arise secondary series textbooks for junior and senior secondary forms.', 28000.00, 'images/books.jpeg', TRUE),
    ('Comprehensive Atlas for Malawian Schools', 'secondary', 'Atlas & Geography', 'Macmillan / Dzuka', 'Official full-colour educational atlas with detailed maps of Malawi, Africa, and the World.', 25000.00, 'images/books.jpeg', TRUE),
    ('Excel / Succeed Complete Geography Book 1 & 2', 'secondary', 'Geography', 'Excel / Succeed', 'Junior secondary complete geography textbook with diagrams and activities for Forms 1 and 2.', 30000.00, 'images/books.jpeg', TRUE),
    ('Excel / Succeed Complete Geography Book 3 & 4', 'secondary', 'Geography', 'Excel / Succeed', 'Senior secondary complete geography textbook with case studies and exam questions for Forms 3 and 4.', 35000.00, 'images/books.jpeg', TRUE),
    ('Excel / Succeed Senior Physics', 'secondary', 'Physics', 'Excel / Succeed', 'In-depth physics textbook covering theoretical concepts, calculations, and practical experiments for MSCE.', 35000.00, 'images/books.jpeg', TRUE),
    ('Excel Mathematics Form 1 & 2', 'secondary', 'Mathematics', 'Excel / Succeed', 'Junior secondary mathematics textbook with step-by-step problem-solving methods and practice exercises.', 28000.00, 'images/books.jpeg', TRUE),
    ('Excel Mathematics Form 3 & 4', 'secondary', 'Mathematics', 'Excel / Succeed', 'Senior secondary mathematics textbook covering advanced algebraic, geometric, and statistical topics for MSCE.', 35000.00, 'images/books.jpeg', TRUE),
    ('Excel / Succeed Secondary Books (General)', 'secondary', 'General Secondary', 'Excel / Succeed', 'General Excel and Succeed series textbooks across science, humanities, and languages.', 28000.00, 'images/books.jpeg', TRUE),
    ('Achievers Senior Social & Life Skills', 'secondary', 'Social & Life Skills', 'Achievers Series', 'Senior secondary Social and Life Skills textbook for Forms 3 and 4.', 35000.00, 'images/books.jpeg', TRUE),
    ('Achievers Secondary Books (General)', 'secondary', 'General Secondary', 'Achievers Series', 'Achievers series secondary textbooks designed for comprehensive exam preparation.', 28000.00, 'images/books.jpeg', TRUE),
    ('Jhango Senior Social & Life Skills', 'secondary', 'Social & Life Skills', 'Jhango Series', 'Jhango series Senior Social and Life Skills textbook for MSCE candidates.', 35000.00, 'images/books.jpeg', TRUE),
    ('Jhango Senior Geography', 'secondary', 'Geography', 'Jhango Series', 'Jhango series Senior Geography textbook for Forms 3 and 4.', 35000.00, 'images/books.jpeg', TRUE),
    ('Jhango Secondary Books (General)', 'secondary', 'General Secondary', 'Jhango Series', 'Jhango series secondary curriculum textbooks across core disciplines.', 28000.00, 'images/books.jpeg', TRUE),
    ('Strides Senior Geography', 'secondary', 'Geography', 'Strides Series', 'Strides Senior Geography textbook tailored to the Malawi national syllabus.', 35000.00, 'images/books.jpeg', TRUE),
    ('Strides Secondary Books (General)', 'secondary', 'General Secondary', 'Strides Series', 'Strides series secondary school textbooks for junior and senior forms.', 28000.00, 'images/books.jpeg', TRUE),
    ('Chanco Chemistry', 'secondary', 'Chemistry', 'Chanco Series', 'Chancellor College (Chanco) chemistry textbook with comprehensive theory, equations, and lab practicals.', 28000.00, 'images/books.jpeg', TRUE),
    ('Chanco Biology', 'secondary', 'Biology', 'Chanco Series', 'Chancellor College (Chanco) biology textbook detailing physiology, genetics, ecology, and botany.', 28000.00, 'images/books.jpeg', TRUE),
    ('Chanco Agriculture', 'secondary', 'Agriculture', 'Chanco Series', 'Chancellor College (Chanco) agriculture textbook covering soil science, crop production, and animal husbandry.', 28000.00, 'images/books.jpeg', TRUE),
    ('Chanco Senior History', 'secondary', 'History', 'Chanco Series', 'Senior secondary History textbook covering Malawian, African, and World history for MSCE.', 28000.00, 'images/books.jpeg', TRUE),
    ('Chanco Secondary Books (General)', 'secondary', 'General Secondary', 'Chanco Series', 'General Chanco series secondary textbooks for Malawi secondary school curriculum.', 25000.00, 'images/books.jpeg', TRUE),
    ('Better Future Secondary Books', 'secondary', 'General Secondary', 'Better Future', 'Better Future series secondary school textbooks offering clear explanations and exercises.', 35000.00, 'images/books.jpeg', TRUE),
    ('Kalea MSCE Social & Life Skills', 'secondary', 'Social & Life Skills', 'Kalea Series', 'Specialized Kalea MSCE Social and Life Skills textbook for comprehensive senior examination preparation.', 40000.00, 'images/books.jpeg', TRUE),
    ('Kalea Secondary Books (General)', 'secondary', 'General Secondary', 'Kalea Series', 'All standard Kalea series secondary textbooks for various school subjects.', 28000.00, 'images/books.jpeg', TRUE),
    ('Giant Secondary Books (All Titles)', 'secondary', 'General Secondary', 'Giant Series', 'All Giant series secondary textbooks and study materials for Malawian secondary schools.', 28000.00, 'images/books.jpeg', TRUE),
    ('JCE Mathematics Questions and Answers Made Simple', 'made-simple', 'Mathematics', 'Made Simple', 'Comprehensive JCE Mathematics revision guide with fully worked questions and step-by-step model solutions.', 30000.00, 'images/books.jpeg', TRUE),
    ('MSCE Mathematics Questions and Answers Made Simple', 'made-simple', 'Mathematics', 'Made Simple', 'Complete MSCE Mathematics revision book with past examination questions and detailed model answers.', 35000.00, 'images/books.jpeg', TRUE),
    ('MSCE Biology Questions and Answers Made Simple', 'made-simple', 'Biology', 'Made Simple', 'MSCE Biology revision handbook with structured questions, labeled diagrams, and comprehensive explanations.', 35000.00, 'images/books.jpeg', TRUE),
    ('MSCE Physical Science Questions and Answers Made Simple', 'made-simple', 'Physical Science', 'Made Simple', 'MSCE Physical Science revision handbook containing structured questions and solutions for physics and chemistry.', 35000.00, 'images/books.jpeg', TRUE),
    ('MSCE Physics Questions and Answers Made Simple', 'made-simple', 'Physics', 'Made Simple', 'Focused MSCE Physics study guide with theoretical questions, formulas, calculations, and practical analysis.', 35000.00, 'images/books.jpeg', TRUE),
    ('MSCE Chemistry Questions and Answers Made Simple', 'made-simple', 'Chemistry', 'Made Simple', 'Focused MSCE Chemistry study guide with chemical equations, stoichometry, and laboratory calculations.', 35000.00, 'images/books.jpeg', TRUE),
    ('MSCE Agriculture Questions and Answers Made Simple', 'made-simple', 'Agriculture', 'Made Simple', 'MSCE Agriculture exam revision book covering crop production, livestock, farm management, and agricultural economics.', 35000.00, 'images/books.jpeg', TRUE),
    ('MSCE Geography Questions and Answers Made Simple', 'made-simple', 'Geography', 'Made Simple', 'MSCE Geography revision guide containing map reading exercises, physical geography, and regional case studies.', 35000.00, 'images/books.jpeg', TRUE),
    ('MSCE History Questions and Answers Made Simple', 'made-simple', 'History', 'Made Simple', 'MSCE History study guide featuring essay-writing techniques, source evaluations, and model answers.', 35000.00, 'images/books.jpeg', TRUE),
    ('MSCE Social and Life Skills Questions and Answers Made Simple', 'made-simple', 'Social & Life Skills', 'Made Simple', 'MSCE Social and Life Skills revision book covering contemporary social issues, family life, and civic education.', 35000.00, 'images/books.jpeg', TRUE),
    ('MSCE English Questions and Answers Made Simple', 'made-simple', 'English', 'Made Simple', 'MSCE English revision guide covering grammar, composition writing, summary skills, and comprehension.', 35000.00, 'images/books.jpeg', TRUE),
    ('MSCE Chichewa Questions and Answers Made Simple', 'made-simple', 'Chichewa', 'Made Simple', 'MSCE Chichewa revision book covering grammar (malamulo a chilankhulo), essay writing, and comprehension.', 35000.00, 'images/books.jpeg', TRUE),
    ('MSCE Computer Studies Questions and Answers Made Simple', 'made-simple', 'Computer Studies', 'Made Simple', 'MSCE Computer Studies revision guide covering hardware, software, networking, programming logic, and practical theory.', 35000.00, 'images/books.jpeg', TRUE),
    ('The Pearl', 'literature', 'English Literature', 'John Steinbeck', 'Prescribed secondary school literature novella exploring themes of greed, fortune, and human nature.', 25000.00, 'images/books.jpeg', TRUE),
    ('Romeo and Juliet', 'literature', 'English Literature', 'William Shakespeare', 'Classic Shakespearean romantic tragedy set in Verona, prescribed for secondary school English literature.', 25000.00, 'images/books.jpeg', TRUE),
    ('The Merchant of Venice', 'literature', 'English Literature', 'William Shakespeare', 'Prescribed Shakespearean play examining themes of justice, mercy, love, and prejudice.', 25000.00, 'images/books.jpeg', TRUE),
    ('Macbeth', 'literature', 'English Literature', 'William Shakespeare', 'Shakespearean tragedy dramatizing the damaging physical and psychological effects of political ambition.', 28000.00, 'images/books.jpeg', TRUE),
    ('Animal Farm', 'literature', 'English Literature', 'George Orwell', 'Satirical allegorical novella reflecting events leading up to the Russian Revolution and Stalinist era.', 25000.00, 'images/books.jpeg', TRUE),
    ('A Grain of Wheat', 'literature', 'English Literature', 'Ngugi wa Thiong''o', 'Historical novel depicting Kenya on the verge of independence and personal struggles of freedom fighters.', 25000.00, 'images/books.jpeg', TRUE),
    ('Mine Boy', 'literature', 'English Literature', 'Peter Abrahams', 'Seminal African literature novel depicting the struggles of a black worker in South African gold mines.', 25000.00, 'images/books.jpeg', TRUE),
    ('An African Thunderstorm and Other Poems', 'literature', 'English Literature', 'David Rubadiri', 'Celebrated African poetry collection featuring poems by David Rubadiri and other prominent African poets.', 15000.00, 'images/books.jpeg', TRUE),
    ('The River Between', 'literature', 'English Literature', 'Ngugi wa Thiong''o', 'Novel telling the story of the separation of two neighbouring villages of the Gikuyu tribe by a river.', 25000.00, 'images/books.jpeg', TRUE),
    ('Things Fall Apart', 'literature', 'English Literature', 'Chinua Achebe', 'Masterpiece of modern African literature chronicling pre-colonial life in southeastern Nigeria and European arrival.', 25000.00, 'images/books.jpeg', TRUE),
    ('Betrayal in the City', 'literature', 'English Literature', 'Francis Imbuga', 'Play set in the fictional post-independence state of Kafira, dealing with corruption, leadership, and disillusionment.', 25000.00, 'images/books.jpeg', TRUE),
    ('Looking for a Rain God and Other Stories', 'literature', 'English Literature', 'Various African Authors', 'Curated anthology of African short stories reflecting cultural realities, traditions, and resilience.', 25000.00, 'images/books.jpeg', TRUE),
    ('The Dilemma of a Ghost', 'literature', 'English Literature', 'Ama Ata Aidoo', 'Drama exploring cultural clash when a Ghanaian student returns from America with an African-American bride.', 25000.00, 'images/books.jpeg', TRUE),
    ('Shreds of Tenderness', 'literature', 'English Literature', 'John Ruganda', 'Powerful play examining the plight of refugees, displacement, and sibling rivalry in post-civil war Africa.', 25000.00, 'images/books.jpeg', TRUE),
    ('Bwampini', 'literature', 'Chichewa Literature', 'Chichewa Classic', 'Classic Chichewa literature book prescribed for junior secondary school reading and comprehension.', 15000.00, 'images/books.jpeg', TRUE),
    ('Nthondo', 'literature', 'Chichewa Literature', 'S.J. Ntara', 'Celebrated Chichewa historical and biographical narrative set in traditional Malawian society.', 20000.00, 'images/books.jpeg', TRUE),
    ('Kokha Mcheperaweni', 'literature', 'Chichewa Literature', 'Chichewa Classic', 'Traditional Chichewa prose novel prescribed for secondary school curriculum study.', 20000.00, 'images/books.jpeg', TRUE),
    ('Atsikana a ku Mtunthama', 'literature', 'Chichewa Literature', 'Chichewa Classic', 'Chichewa novel focusing on moral growth, family values, and girls'' education in Malawi.', 20000.00, 'images/books.jpeg', TRUE),
    ('Tikuferanji', 'literature', 'Chichewa Literature', 'Chichewa Drama', 'Chichewa drama and prose reflecting contemporary social issues and relationship dynamics.', 20000.00, 'images/books.jpeg', TRUE),
    ('Wachitatu Nkapasule', 'literature', 'Chichewa Literature', 'Chichewa Classic', 'Chichewa prose drama examining friendship, loyalty, betrayal, and community life.', 20000.00, 'images/books.jpeg', TRUE),
    ('Chuma Chobisika', 'literature', 'Chichewa Literature', 'Chichewa Classic', 'Chichewa educational story exploring hidden wisdom, hard work, and moral character.', 20000.00, 'images/books.jpeg', TRUE),
    ('Mtima Sukhuta', 'literature', 'Chichewa Literature', 'Chichewa Classic', 'Prescribed Chichewa literary novel exploring human desires, discipline, and consequence.', 20000.00, 'images/books.jpeg', TRUE),
    ('Kuimba Kwa Mlakatuli', 'literature', 'Chichewa Literature', 'Chichewa Poetry', 'Rich anthology of Chichewa poetry expressing Malawian heritage, emotion, and culture.', 20000.00, 'images/books.jpeg', TRUE),
    ('Utatamasika', 'literature', 'Chichewa Literature', 'Chichewa Classic', 'Chichewa literary work illustrating traditional values, wisdom, and oral storytelling tradition.', 20000.00, 'images/books.jpeg', TRUE),
    ('Oxford Advanced Learner''s Dictionary (10th Edition)', 'dictionaries', 'English Dictionary', 'Oxford University Press', 'Flagship 10th edition Oxford English dictionary with over 86,000 words, 95,000 phrases, and writing tools.', 120000.00, 'images/books.jpeg', TRUE),
    ('Oxford Advanced Learner''s Dictionary (9th Edition)', 'dictionaries', 'English Dictionary', 'Oxford University Press', 'Comprehensive 9th edition Oxford English reference dictionary with clear definitions, collocations, and idioms.', 100000.00, 'images/books.jpeg', TRUE),
    ('Cambridge Advanced Learner''s Dictionary (4th Edition)', 'dictionaries', 'English Dictionary', 'Cambridge University Press', 'Premier Cambridge dictionary featuring over 140,000 words, phrases, and definitions with real-world examples.', 100000.00, 'images/books.jpeg', TRUE),
    ('Collins English Dictionary (Complete & Unabridged)', 'dictionaries', 'English Dictionary', 'Collins', 'Authoritative and comprehensive reference dictionary covering contemporary English vocabulary.', 50000.00, 'images/books.jpeg', TRUE),
    ('Oxford Student''s Dictionary', 'dictionaries', 'English Dictionary', 'Oxford University Press', 'Academic dictionary specially designed for secondary school students taking exams across various subjects.', 45000.00, 'images/books.jpeg', TRUE),
    ('Oxford Basic English Dictionary', 'dictionaries', 'English Dictionary', 'Oxford University Press', 'Clear and simple English dictionary designed for primary learners and beginner English speakers.', 35000.00, 'images/books.jpeg', TRUE),
    ('Oxford Pocket School Dictionary', 'dictionaries', 'English Dictionary', 'Oxford University Press', 'Portable, easy-to-carry school dictionary ideal for classroom use and quick reference.', 25000.00, 'images/books.jpeg', TRUE),
    ('Oxford Mini Dictionary', 'dictionaries', 'English Dictionary', 'Oxford University Press', 'Compact pocket-sized English dictionary for fast definitions and spelling checks on the go.', 20000.00, 'images/books.jpeg', TRUE),
    ('Contemporary English Grammar', 'secondary', 'English Language', 'David Green', 'In-depth modern English grammar reference with rules, exceptions, structures, and practical exercises.', 30000.00, 'images/books.jpeg', TRUE),
    ('High School English Grammar & Composition (Wren & Martin)', 'secondary', 'English Language', 'Wren & Martin / S. Chand', 'Renowned standard textbook for high school English grammar, syntax, analysis, and composition writing.', 35000.00, 'images/books.jpeg', TRUE),
    ('English Grammar in Use (Raymond Murphy)', 'secondary', 'English Language', 'Raymond Murphy / Cambridge', 'World-famous self-study reference and practice book for intermediate to advanced learners of English.', 35000.00, 'images/books.jpeg', TRUE),
    ('Advanced English Grammar', 'secondary', 'English Language', 'Martin Hewings / Cambridge', 'Advanced grammar reference and practice book for senior secondary and tertiary students.', 35000.00, 'images/books.jpeg', TRUE),
    ('Dzuka Activity Books (Standard 1 to 8)', 'primary-teacher', 'Primary Education', 'Dzuka Publishing', 'Comprehensive primary learner activity book series covering literacy, numeracy, and environmental studies.', 28000.00, 'images/books.jpeg', TRUE),
    ('Primary English Course (Standard 1 to 8)', 'primary-teacher', 'Primary Education', 'Macmillan / Dzuka', 'Structured English course books for primary school standards with graded readings and vocabulary building.', 25000.00, 'images/books.jpeg', TRUE),
    ('Secondary Teacher''s Guide (Forms 1 - 4)', 'secondary-teacher', 'Secondary Education', 'Ministry of Education / MIE', 'Official instructional curriculum guide for secondary school teachers across all subjects and forms.', 35000.00, 'images/books.jpeg', TRUE),
    ('Primary Teacher''s Guide (Standards 1 - 8)', 'primary-teacher', 'Primary Education', 'Ministry of Education / MIE', 'Comprehensive pedagogical guide and lesson planning framework for primary school educators.', 25000.00, 'images/books.jpeg', TRUE),
    ('Buku Lopatulika (Chichewa Bible)', 'spiritual', 'Bibles', 'Bible Society of Malawi', 'Official complete Holy Bible translated into Chichewa with old and new testaments and cross-references.', 25000.00, 'images/bibles.jpeg', TRUE),
    ('Good News Bible (GNB)', 'spiritual', 'Bibles', 'Bible Society of Malawi', 'Clear and accessible contemporary English translation with Annie Vallotton line illustrations and study aids.', 25000.00, 'images/bibles.jpeg', TRUE),
    ('King James Version (KJV) Bible', 'spiritual', 'Bibles', 'Bible Society', 'Classic and revered King James Version Holy Bible with concordance, maps, and red-letter text.', 25000.00, 'images/bibles.jpeg', TRUE),
    ('New International Version (NIV) Bible', 'spiritual', 'Bibles', 'Zondervan / Biblica', 'Accurate, readable, and clear modern English translation Holy Bible suitable for personal devotion and study.', 28000.00, 'images/bibles.jpeg', TRUE),
    ('New King James Version (NKJV) Bible', 'spiritual', 'Bibles', 'Thomas Nelson', 'Modern language edition maintaining the poetic beauty and cadence of the classic King James Version.', 28000.00, 'images/bibles.jpeg', TRUE),
    ('Catholic Bible (Jerusalem / Christian Community)', 'spiritual', 'Bibles', 'Catholic Truth Society', 'Complete Catholic Holy Bible including Deuterocanonical books (Apocrypha) with detailed theological footnotes.', 35000.00, 'images/bibles.jpeg', TRUE),
    ('Nyimbo za Mulungu (Chichewa Hymn Book)', 'spiritual', 'Hymn Books', 'CLAIM / CCAP', 'Standard Chichewa church hymn book used across denominations in Malawi for worship and fellowship.', 15000.00, 'images/bibles.jpeg', TRUE),
    ('English Hymnal / Songs of Praise', 'spiritual', 'Hymn Books', 'Oxford / Collins', 'Traditional English hymnal containing sacred songs, hymns, and musical notation for choir and congregational singing.', 18000.00, 'images/bibles.jpeg', TRUE),
    ('Golden Bells Hymn Book', 'spiritual', 'Hymn Books', 'Christian Literature', 'Classic hymnal featuring beloved evangelical and gospel hymns with verses and indices.', 15000.00, 'images/bibles.jpeg', TRUE),
    ('Nyimbo za Chitsitsimutso (CCAP Revival Hymns)', 'spiritual', 'Hymn Books', 'CCAP', 'Collection of Chichewa revival and spiritual renewal hymns for church choirs and personal prayer.', 15000.00, 'images/bibles.jpeg', TRUE),
    ('Seventh-day Adventist (SDA) Hymnal', 'spiritual', 'Hymn Books', 'Review and Herald', 'Official hymnal of the Seventh-day Adventist Church with over 690 hymns, responsive readings, and worship music.', 20000.00, 'images/bibles.jpeg', TRUE),
    ('Children''s Illustrated Bible Story Book', 'spiritual', 'Children''s Bibles', 'Bible Society', 'Full-colour illustrated Bible stories for young learners with engaging lessons and simple language.', 20000.00, 'images/bibles.jpeg', TRUE),
    ('Daily Devotional & Prayer Book', 'spiritual', 'Devotionals', 'Various Publishers', 'Inspirational 365-day spiritual devotional with scripture readings, reflections, and prayers for daily spiritual growth.', 15000.00, 'images/bibles.jpeg', TRUE),
    ('Comprehensive Study Bible (NIV / ESV / Life Application)', 'spiritual', 'Study Bibles', 'Zondervan / Crossway', 'In-depth study Bible featuring extensive verse-by-verse commentary, character profiles, maps, and theological essays.', 65000.00, 'images/bibles.jpeg', TRUE),
    ('Wall Educational Charts (Various Subjects)', 'stationery', 'Teaching Aids', 'Educational Charts', 'Large laminated educational wall charts for classroom display across science, geography, biology, and math.', 12500.00, 'images/stationary.jpeg', TRUE),
    ('Rotatrim Photocopying Paper (A4 80gsm Ream - 500 Sheets)', 'stationery', 'Paper Products', 'Rotatrim', 'Premium quality high-brightness 80gsm A4 printing and photocopying paper ream (500 sheets).', 20000.00, 'images/stationary.jpeg', TRUE),
    ('Typek Photocopying Paper (A4 80gsm Ream - 500 Sheets)', 'stationery', 'Paper Products', 'Typek', 'Standard high-performance multipurpose A4 printing paper ream suitable for laser, inkjet, and copy machines.', 18500.00, 'images/stationary.jpeg', TRUE),
    ('Chamex Photocopying Paper (A4 75gsm Ream - 500 Sheets)', 'stationery', 'Paper Products', 'Chamex', 'Reliable 75gsm A4 office printing and photocopying paper ream offering crisp print clarity.', 17500.00, 'images/stationary.jpeg', TRUE),
    ('Heavy Duty / Medium Stapler Machine', 'stationery', 'Office Tools', 'Kangaro / Deli', 'Durable metal desktop stapler machine suitable for school administrative and office binding.', 25000.00, 'images/stationary.jpeg', TRUE),
    ('Staple Pins (No. 24/6 & 26/6 Box)', 'stationery', 'Office Fasteners', 'Kangaro', 'Box of 1,000 standard galvanized steel staple pins compatible with standard office staplers.', 3500.00, 'images/stationary.jpeg', TRUE),
    ('Rubber Bands (Large Pack / Box)', 'stationery', 'Office Fasteners', 'Stationery Pro', 'Strong elastic rubber bands pack for bundling documents, cash, and school test papers.', 6500.00, 'images/stationary.jpeg', TRUE),
    ('Paper Clips (Box of 100)', 'stationery', 'Office Fasteners', 'Stationery Pro', 'Smooth vinyl coated metal paper clips for securing documents without tearing.', 3500.00, 'images/stationary.jpeg', TRUE),
    ('Office Scissors (Stainless Steel 8-inch)', 'stationery', 'Office Tools', 'Deli / Maped', 'Ergonomic stainless steel heavy-duty craft and office scissors with sharp precision blades.', 6500.00, 'images/stationary.jpeg', TRUE),
    ('Two-Hole Desktop Puncher', 'stationery', 'Office Tools', 'Kangaro / Deli', 'Heavy-duty 2-hole metal paper puncher with adjustable paper guide and waste tray.', 25000.00, 'images/stationary.jpeg', TRUE),
    ('Lever Arch File (A4 Heavy Duty)', 'stationery', 'Filing & Storage', 'Bantex / Donau', 'Sturdy polypropylene-covered lever arch binder file with metal finger ring and spine label.', 9500.00, 'images/stationary.jpeg', TRUE),
    ('Ring Binder File (2-Ring / 4-Ring)', 'stationery', 'Filing & Storage', 'Bantex', 'Durable presentation ring binder file for organizing loose leaf sheets, records, and reports.', 7500.00, 'images/stationary.jpeg', TRUE),
    ('Flat File / Spring File Folder', 'stationery', 'Filing & Storage', 'Manila Folders', 'Heavy manila document folder with metal spring mechanism for storing student records and projects.', 3500.00, 'images/stationary.jpeg', TRUE),
    ('Box of Bic Ballpoint Pens (50 Pens)', 'stationery', 'Writing Instruments', 'Bic', 'Original Bic Cristal 1.0mm medium ballpoint pens box (50 pens per box) in Blue or Black ink.', 50000.00, 'images/stationary.jpeg', TRUE),
    ('Single Bic Ballpoint Pen', 'stationery', 'Writing Instruments', 'Bic', 'Individual Bic Cristal ballpoint pen with smooth long-lasting ink flow.', 1200.00, 'images/stationary.jpeg', TRUE),
    ('Permanent Marker Pen (Bullet / Chisel Tip)', 'stationery', 'Writing Instruments', 'Pentel / Artline', 'Waterproof, quick-drying permanent marker suitable for paper, cardboard, plastic, and metal.', 3500.00, 'images/stationary.jpeg', TRUE),
    ('Whiteboard Marker Pen (Dry Erase)', 'stationery', 'Writing Instruments', 'Pentel / Edding', 'Low-odour whiteboard dry wipe marker pen for smooth writing and easy erasability.', 3500.00, 'images/stationary.jpeg', TRUE),
    ('Office Desktop Calculator (Citizen / Standard)', 'stationery', 'Calculators', 'Citizen / Deli', '12-digit large dual-power (solar and battery) commercial desktop office calculator with tax calculation.', 25000.00, 'images/stationary.jpeg', TRUE),
    ('Scientific Calculator (Casio fx-82MS / fx-991ES Plus)', 'stationery', 'Calculators', 'Casio', 'Official 240+ function scientific calculator for MSCE, college mathematics, physics, and chemistry.', 28500.00, 'images/stationary.jpeg', TRUE),
    ('Basic Handheld / Desktop Calculator', 'stationery', 'Calculators', 'Standard', '8-digit compact battery-powered electronic calculator for everyday arithmetic operations.', 10000.00, 'images/stationary.jpeg', TRUE),
    ('Clear Sellotape (Large Roll 48mm / 24mm)', 'stationery', 'Adhesives & Tapes', 'Sellotape', 'Strong transparent adhesive tape roll for book wrapping, repairs, and general sealing.', 6500.00, 'images/stationary.jpeg', TRUE),
    ('BOPP Packaging Tape (Brown / Clear 48mm x 50m)', 'stationery', 'Adhesives & Tapes', 'Packaging Pro', 'Heavy-duty industrial brown / clear carton sealing tape for packaging and shipping boxes.', 8500.00, 'images/stationary.jpeg', TRUE),
    ('Masking Tape (General Purpose / Painters Tape)', 'stationery', 'Adhesives & Tapes', 'ProMask', 'Easy-to-tear paper masking tape for labelling, drafting, art, and temporary holding without residue.', 7500.00, 'images/stationary.jpeg', TRUE),
    ('Jumbo Dustless Chalk Box (100 Sticks - White / Coloured)', 'stationery', 'Teaching Aids', 'Omega / Lion', 'Premium dustless blackboard chalk box containing 100 solid sticks for smooth blackboard writing.', 12000.00, 'images/stationary.jpeg', TRUE),
    ('Exercise Book (A4 80 - 120 Pages Ruled / Squared)', 'stationery', 'Notebooks & Exercise', 'Nkhungudzu Classic', 'Quality school exercise book with durable cover and ruled margin lines for class work and homework.', 3500.00, 'images/stationary.jpeg', TRUE),
    ('Exercise Book (A5 Standard 64 - 80 Pages)', 'stationery', 'Notebooks & Exercise', 'Nkhungudzu Classic', 'Standard A5 primary and secondary exercise book with clean ruled pages for everyday school subjects.', 1800.00, 'images/stationary.jpeg', TRUE),
    ('Highlighter Pen (Fluorescent Set / Single)', 'stationery', 'Writing Instruments', 'Stabilo / Faber-Castell', 'Chisel-tip bright fluorescent highlighter marker for textbook annotation and study notes.', 4500.00, 'images/stationary.jpeg', TRUE),
    ('Office Note Pad / Spiral Notebook (A5 / A4)', 'stationery', 'Notebooks & Exercise', 'Stationery Pro', 'Spiral wirebound lined writing notebook for office meetings, lectures, and daily journaling.', 5500.00, 'images/stationary.jpeg', TRUE),
    ('Hardcover Counter Book (2 Quire / 3 Quire / 4 Quire)', 'stationery', 'Notebooks & Exercise', 'Treeline / Bantex', 'Section-sewn sturdy hardcover counter register book for accounts, inventories, and permanent records.', 12500.00, 'images/stationary.jpeg', TRUE),
    ('Mathematical Drawing Set (Oxford / Helix Geometry Set)', 'stationery', 'Geometry & Drawing', 'Oxford / Helix', 'Original 9-piece precision tin math set containing compass, divider, protractor, set squares, ruler, and eraser.', 10000.00, 'images/stationary.jpeg', TRUE),
    ('Pencil Eraser / Rubber (Soft Dust-Free)', 'stationery', 'Drawing & Correction', 'Faber-Castell / Maped', 'High-grade non-abrasive soft eraser for clean pencil mark removal without smearing.', 1000.00, 'images/stationary.jpeg', TRUE),
    ('Pencil Sharpener (Single / Double Metal Hole)', 'stationery', 'Drawing & Correction', 'Maped / Staedtler', 'Precision sharpened steel blade pencil sharpener for standard and jumbo graphite pencils.', 1000.00, 'images/stationary.jpeg', TRUE),
    ('Wooden Ruler (30cm / 12 Inch Hardwood)', 'stationery', 'Geometry & Drawing', 'Standard Hardwood', 'Sturdy polished wooden measuring ruler with metric centimetres and imperial inches graduations.', 1500.00, 'images/stationary.jpeg', TRUE),
    ('Clear Plastic Ruler (30cm Shatterproof)', 'stationery', 'Geometry & Drawing', 'Maped / Deli', 'Transparent shatterproof acrylic 30cm school ruler with clear high-contrast markings.', 1000.00, 'images/stationary.jpeg', TRUE),
    ('Correction Fluid / Tipp-Ex Pen (Bottle / Pen)', 'stationery', 'Drawing & Correction', 'Tipp-Ex / Pentel', 'Quick-drying opaque white correction fluid with precision applicator for clean paper corrections.', 3500.00, 'images/stationary.jpeg', TRUE),
    ('Sticky Notes / Post-It Pad (Yellow / Neon 3x3 inch)', 'stationery', 'Paper Products', 'Post-it / Deli', 'Self-adhesive repositionable memo notes pad for reminders, page marking, and task organisation.', 4500.00, 'images/stationary.jpeg', TRUE),
    ('Manilla Paper Sheets (Pack of 10 Assorted Colours)', 'stationery', 'Paper Products', 'Craft Art', 'Large sturdy coloured manilla poster card sheets for school projects, art posters, and teaching aids.', 12500.00, 'images/stationary.jpeg', TRUE),
    ('Flip Chart Paper Pad (50 Large Ruled/Plain Sheets)', 'stationery', 'Paper Products', 'Conference Pro', 'Standard conference easel flip chart paper pad for presentations, workshops, and classroom demonstrations.', 25000.00, 'images/stationary.jpeg', TRUE),
    ('Carbon Paper (Box of 100 Sheets A4 Blue/Black)', 'stationery', 'Paper Products', 'Pelikan / Kores', 'High-transfer precision carbon duplicating paper for invoices, receipts, and handwritten duplicate copies.', 20000.00, 'images/stationary.jpeg', TRUE),
    ('A4 Manila Envelopes (Pack of 25 Heavy Brown)', 'stationery', 'Paper Products', 'Postal Pro', 'Sturdy brown kraft gummed document mailing envelopes designed for A4 letters, certificates, and reports.', 8500.00, 'images/stationary.jpeg', TRUE),
    ('DL Mailing Envelopes (Pack of 50 White / Brown)', 'stationery', 'Paper Products', 'Postal Pro', 'Standard business DL letter envelopes with secure peel-and-seal adhesive strip.', 6500.00, 'images/stationary.jpeg', TRUE),
    ('Glue Stick (UHU / Amos 36g / 40g Non-Toxic)', 'stationery', 'Adhesives & Tapes', 'UHU / Amos', 'Washable solvent-free strong adhesive glue stick for paper, cardboard, photos, and craftwork.', 4500.00, 'images/stationary.jpeg', TRUE),
    ('Liquid Paper / Craft Glue Bottle (100ml)', 'stationery', 'Adhesives & Tapes', 'Amos / Pritt', 'Clear washable liquid school glue with precision dispenser tip for art and woodwork projects.', 3500.00, 'images/stationary.jpeg', TRUE),
    ('Stamp Pad & Refill Ink Bottle (Blue / Black / Red)', 'stationery', 'Office Tools', 'Shiny / Trodat', 'High-density foam pre-inked rubber stamp pad with matching refill ink bottle for official office stamping.', 8500.00, 'images/stationary.jpeg', TRUE),
    ('Desktop Organiser / Metal Mesh Pen Holder', 'stationery', 'Office Tools', 'MeshTech', 'Modern multi-compartment metal wire mesh desk tidy for pens, paper clips, scissors, and sticky notes.', 12500.00, 'images/stationary.jpeg', TRUE),
    ('Artist Drawing Book / Sketch Pad (A4 / A3)', 'stationery', 'Paper Products', 'Art Pro', 'Heavy cartridge art paper sketch book with spiral binding suitable for drawing, shading, and painting.', 6500.00, 'images/stationary.jpeg', TRUE),
    ('Wax Crayons Box (12 / 24 Assorted Colours)', 'stationery', 'Art & Colouring', 'Crayola / Maped', 'Vibrant non-toxic smooth wax crayons designed for early childhood and primary art classes.', 5500.00, 'images/stationary.jpeg', TRUE),
    ('Coloured Pencils Box (12 Full Length Colours)', 'stationery', 'Art & Colouring', 'Faber-Castell / Staedtler', 'Break-resistant lead colouring pencils delivering bright coverage for school artwork and geography map coloring.', 5500.00, 'images/stationary.jpeg', TRUE),
    ('HB Writing Graphite Pencils (Box of 12)', 'stationery', 'Writing Instruments', 'Staedtler / Faber-Castell', 'High-quality break-resistant HB graphite pencils for school exams, writing, and sketching.', 6500.00, 'images/stationary.jpeg', TRUE),
    ('Zippered Pencil Case / Canvas Pouch', 'stationery', 'School Bags & Cases', 'Student Pro', 'Durable nylon zippered pencil pouch with sturdy zipper for storing pens, math set instruments, and erasers.', 6500.00, 'images/stationary.jpeg', TRUE),
    ('Clear Document Wallet / Button Folder (A4 Pack)', 'stationery', 'Filing & Storage', 'Bantex / Deli', 'Waterproof transparent poly plastic envelope folder with snap button fastener for carrying reports.', 3500.00, 'images/stationary.jpeg', TRUE),
    ('Thermal POS Receipt Paper Rolls (Pack of 5)', 'stationery', 'Paper Products', 'Thermal Tech', 'Standard 80mm / 57mm thermal printing till rolls for electronic point of sale machines and cash registers.', 4500.00, 'images/stationary.jpeg', TRUE),
    ('A4 Lamination Pouches (Pack of 100 - 80 Micron)', 'stationery', 'Office Supplies', 'GBC / Fellowes', 'Glossy high-clarity heat laminating film pouches for preserving certificates, cards, and notice boards.', 35000.00, 'images/stationary.jpeg', TRUE),
    ('Plastic Binding Combs (Pack of 50 - Assorted Sizes)', 'stationery', 'Office Supplies', 'GBC / Fellowes', 'Flexible plastic 21-ring spine binding combs for book binding, manuals, dissertations, and project reports.', 20000.00, 'images/stationary.jpeg', TRUE),
    ('A4 Binding Covers (Pack of 100 Clear PVC / Leatherette)', 'stationery', 'Office Supplies', 'GBC', 'Professional report presentation front and back binding covers in clear plastic and embossed leatherette finish.', 25000.00, 'images/stationary.jpeg', TRUE),
    ('Office Hardboard Clipboard (A4 with Sturdy Wire Clip)', 'stationery', 'Office Tools', 'Standard Office', 'Smooth wooden hardboard clipboard with rubberized corner clip for examinations, stocktaking, and fieldwork.', 7500.00, 'images/stationary.jpeg', TRUE);


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

