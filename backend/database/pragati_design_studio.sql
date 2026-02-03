-- Database Schema for Pragati Design Studio

-- 1. Navbar Links
CREATE TABLE IF NOT EXISTS navbar_links (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    href TEXT NOT NULL,
    display_order INTEGER DEFAULT 0
);

-- 2. Hero Section
CREATE TABLE IF NOT EXISTS hero_section (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    subtitle TEXT NOT NULL,
    image_url TEXT NOT NULL
);

-- 3. Services
CREATE TABLE IF NOT EXISTS services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT,
    is_active BOOLEAN DEFAULT 1,
    display_order INTEGER DEFAULT 0
);

-- 4. Projects
CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    location TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    image_url TEXT NOT NULL,
    is_active BOOLEAN DEFAULT 1,
    display_order INTEGER DEFAULT 0
);

-- 5. Testimonials
CREATE TABLE IF NOT EXISTS testimonials (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    quote TEXT NOT NULL,
    author TEXT NOT NULL,
    location TEXT NOT NULL,
    display_order INTEGER DEFAULT 0
);

-- 6. Principles
CREATE TABLE IF NOT EXISTS principles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL,
    display_order INTEGER DEFAULT 0
);

-- 7. Philosophy
CREATE TABLE IF NOT EXISTS philosophy (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    content TEXT NOT NULL,
    image_url TEXT NOT NULL
);

-- 8. Before After
CREATE TABLE IF NOT EXISTS before_after (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    description TEXT,
    before_image TEXT NOT NULL,
    after_image TEXT NOT NULL
);

-- 9. Blogs
CREATE TABLE IF NOT EXISTS blogs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    author TEXT NOT NULL,
    category TEXT NOT NULL,
    is_published BOOLEAN DEFAULT 0,
    published_at TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    image_url TEXT
);

-- 10. Contact Submissions
CREATE TABLE IF NOT EXISTS contact_submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    submitted_at TEXT NOT NULL
);

-- SEED DATA

-- Navbar Links (Removed Blog)
INSERT INTO navbar_links (name, href, display_order) VALUES 
('Home', '/', 1),
('Portfolio', '/portfolio', 2),
('Services', '/services', 3),
('About Us', '/about', 5);

-- Hero Section
INSERT INTO hero_section (title, subtitle, image_url) VALUES 
('Crafting Spaces That Breathe', 'Designing warm, contemporary interiors rooted in material, light, and everyday living.', 'hero-interior.jpg');

-- Services (EMPTY)

-- Projects (EMPTY)

-- Testimonials
INSERT INTO testimonials (quote, author, location, display_order) VALUES 
('Our home feels beautifully intentional. Every piece belongs.', 'Radhika', 'Pune', 1),
('We appreciated their clarity, process, and material sensitivity.', 'Priya & Anil', 'Mumbai', 2),
('They transformed our space into something that truly reflects who we are.', 'Vikram', 'Bangalore', 3);

-- Principles
INSERT INTO principles (title, description, image_url, display_order) VALUES 
('Spatial Harmony', 'Balancing proportion, flow, and function to create spaces that feel intuitively right.', 'principle-spatial.jpg', 1),
('Material Storytelling', 'Selecting textures and finishes that age beautifully and speak to the senses.', 'principle-materials.jpg', 2),
('Functional Luxury', 'Designing elegance that serves daily life without compromise or pretense.', 'principle-luxury.jpg', 3),
('Lifestyle Integration', 'Crafting interiors that reflect and enhance how you truly live.', 'principle-lifestyle.jpg', 4);

-- Philosophy
INSERT INTO philosophy (title, content, image_url) VALUES 
('Crafting Interiors Where Materials, Light & Life Coexist', 'Pragati Interior Studio approaches design as a dialogue between materials, light, and daily rituals. Our work prioritizes longevity, warm minimalism, and sensory detail over trends. We believe that the most enduring spaces are those that feel both considered and effortless—where every surface, texture, and proportion has been thoughtfully chosen to enhance the way you experience your home.', 'philosophy-materials.jpg');

-- Before After
INSERT INTO before_after (title, description, before_image, after_image) VALUES 
('From Vision to Reality', 'A quiet transformation shaped by materials, light, and proportion.', 'before-renovation.jpg', 'after-renovation.jpg');

-- Blogs (EMPTY)

