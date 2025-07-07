-- Active Soft Website Database Schema for Supabase
-- PostgreSQL Database

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ================================================
-- 1. ADMIN USERS TABLE
-- ================================================
CREATE TABLE IF NOT EXISTS admin_users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(100),
    full_name VARCHAR(100),
    role VARCHAR(20) DEFAULT 'admin',
    is_active BOOLEAN DEFAULT true,
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ================================================
-- 2. SERVICES TABLE
-- ================================================
CREATE TABLE IF NOT EXISTS services (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name_en VARCHAR(200) NOT NULL,
    name_ar VARCHAR(200) NOT NULL,
    description_en TEXT,
    description_ar TEXT,
    icon VARCHAR(100),
    category VARCHAR(50),
    features_en TEXT, -- JSON format as text
    features_ar TEXT, -- JSON format as text
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ================================================
-- 3. PORTFOLIO PROJECTS TABLE
-- ================================================
CREATE TABLE IF NOT EXISTS portfolio_projects (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title_en VARCHAR(200) NOT NULL,
    title_ar VARCHAR(200) NOT NULL,
    description_en TEXT,
    description_ar TEXT,
    client_name_en VARCHAR(200),
    client_name_ar VARCHAR(200),
    category VARCHAR(50),
    status VARCHAR(20) DEFAULT 'completed', -- completed, in_progress, planned
    technologies TEXT, -- JSON format as text
    features_en TEXT, -- JSON format as text
    features_ar TEXT, -- JSON format as text
    project_duration VARCHAR(50),
    completion_date DATE,
    image_url VARCHAR(500),
    is_featured BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ================================================
-- 4. CONTACT SUBMISSIONS TABLE
-- ================================================
CREATE TABLE IF NOT EXISTS contact_submissions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    company VARCHAR(200),
    subject VARCHAR(200),
    message TEXT NOT NULL,
    source VARCHAR(50) DEFAULT 'website',
    status VARCHAR(20) DEFAULT 'new', -- new, read, replied, closed
    ip_address VARCHAR(45),
    user_agent VARCHAR(500),
    is_spam BOOLEAN DEFAULT false,
    replied_at TIMESTAMP WITH TIME ZONE,
    replied_by UUID REFERENCES admin_users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ================================================
-- 5. CONTENT MANAGEMENT TABLE
-- ================================================
CREATE TABLE IF NOT EXISTS content_sections (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    section_name VARCHAR(100) UNIQUE NOT NULL,
    title_en VARCHAR(500),
    title_ar VARCHAR(500),
    content_en TEXT,
    content_ar TEXT,
    content_type VARCHAR(20) DEFAULT 'text', -- text, html, json
    category VARCHAR(50), -- home, services, about, contact, general
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ================================================
-- 6. COMPANY SETTINGS TABLE
-- ================================================
CREATE TABLE IF NOT EXISTS company_settings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT,
    setting_type VARCHAR(20) DEFAULT 'string', -- string, number, boolean, json
    category VARCHAR(50) DEFAULT 'general',
    description_en VARCHAR(500),
    description_ar VARCHAR(500),
    is_public BOOLEAN DEFAULT false, -- true if can be displayed publicly
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ================================================
-- 7. ANALYTICS TABLE
-- ================================================
CREATE TABLE IF NOT EXISTS analytics_events (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    event_type VARCHAR(50) NOT NULL, -- page_view, contact_form, download, etc.
    page_url VARCHAR(500),
    user_ip VARCHAR(45),
    user_agent VARCHAR(500),
    referrer VARCHAR(500),
    session_id VARCHAR(100),
    user_id UUID,
    event_data TEXT, -- JSON format for additional data
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ================================================
-- INDEXES
-- ================================================
CREATE INDEX IF NOT EXISTS idx_services_active ON services(is_active);
CREATE INDEX IF NOT EXISTS idx_services_category ON services(category);
CREATE INDEX IF NOT EXISTS idx_services_sort ON services(sort_order);

CREATE INDEX IF NOT EXISTS idx_portfolio_active ON portfolio_projects(is_active);
CREATE INDEX IF NOT EXISTS idx_portfolio_category ON portfolio_projects(category);
CREATE INDEX IF NOT EXISTS idx_portfolio_status ON portfolio_projects(status);
CREATE INDEX IF NOT EXISTS idx_portfolio_featured ON portfolio_projects(is_featured);
CREATE INDEX IF NOT EXISTS idx_portfolio_sort ON portfolio_projects(sort_order);

CREATE INDEX IF NOT EXISTS idx_contact_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_contact_created ON contact_submissions(created_at);
CREATE INDEX IF NOT EXISTS idx_contact_email ON contact_submissions(email);

CREATE INDEX IF NOT EXISTS idx_content_active ON content_sections(is_active);
CREATE INDEX IF NOT EXISTS idx_content_category ON content_sections(category);
CREATE INDEX IF NOT EXISTS idx_content_name ON content_sections(section_name);

CREATE INDEX IF NOT EXISTS idx_settings_key ON company_settings(setting_key);
CREATE INDEX IF NOT EXISTS idx_settings_public ON company_settings(is_public);
CREATE INDEX IF NOT EXISTS idx_settings_category ON company_settings(category);

CREATE INDEX IF NOT EXISTS idx_analytics_type ON analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_created ON analytics_events(created_at);
CREATE INDEX IF NOT EXISTS idx_analytics_page ON analytics_events(page_url);

-- ================================================
-- TRIGGERS FOR UPDATED_AT
-- ================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply the trigger to all tables with updated_at
CREATE TRIGGER update_admin_users_updated_at 
    BEFORE UPDATE ON admin_users 
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_services_updated_at 
    BEFORE UPDATE ON services 
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_portfolio_updated_at 
    BEFORE UPDATE ON portfolio_projects 
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_contact_updated_at 
    BEFORE UPDATE ON contact_submissions 
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_content_updated_at 
    BEFORE UPDATE ON content_sections 
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_settings_updated_at 
    BEFORE UPDATE ON company_settings 
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- ================================================
-- ROW LEVEL SECURITY (RLS)
-- ================================================

-- Enable RLS on all tables
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

-- Policies for public read access to active content
CREATE POLICY "Public can read active services" 
    ON services FOR SELECT 
    USING (is_active = true);

CREATE POLICY "Public can read active portfolio projects" 
    ON portfolio_projects FOR SELECT 
    USING (is_active = true);

CREATE POLICY "Public can read active content sections" 
    ON content_sections FOR SELECT 
    USING (is_active = true);

CREATE POLICY "Public can read public settings" 
    ON company_settings FOR SELECT 
    USING (is_public = true);

-- Policy for contact form submissions (anyone can insert)
CREATE POLICY "Anyone can insert contact submissions" 
    ON contact_submissions FOR INSERT 
    WITH CHECK (true);

-- Policy for analytics (anyone can insert)
CREATE POLICY "Anyone can insert analytics events" 
    ON analytics_events FOR INSERT 
    WITH CHECK (true);

-- Admin policies (for authenticated admin users)
-- Note: You'll need to implement proper authentication policies based on your auth setup