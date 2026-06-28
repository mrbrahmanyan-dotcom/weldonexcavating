-- Create leads table
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    address TEXT NOT NULL,
    service TEXT NOT NULL,
    message TEXT,
    status TEXT NOT NULL DEFAULT 'New', -- 'New', 'Contacted', 'Quoted', 'Completed', 'Archived'
    notes TEXT
);

-- Create gallery_projects table
CREATE TABLE IF NOT EXISTS public.gallery_projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    service_type TEXT NOT NULL,
    before_image_url TEXT,
    after_image_url TEXT,
    is_featured BOOLEAN DEFAULT false
);

-- Create site_settings table
CREATE TABLE IF NOT EXISTS public.site_settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Insert default site settings
INSERT INTO public.site_settings (key, value) VALUES
('slogan', 'Your Site. Our Strength.'),
('tagline', 'Serving the area with reliable work'),
('phone', '+1 256-223-7541'),
('email', 'weldonmatt@yahoo.com'),
('address', '1485 Stockdale Rd, Munford, AL, United States'),
('facebook_url', 'https://www.facebook.com/people/Weldon-Excavating-LLC/61556214349918/')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- Enable Row Level Security (RLS)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Leads Policies:
-- 1. Permit anonymous/public insertions (so website users can submit quotes)
CREATE POLICY "Allow public insert to leads" ON public.leads
    FOR INSERT WITH CHECK (true);

-- 2. Restrict selection/updates/deletions to authenticated admin users only
CREATE POLICY "Allow authenticated read leads" ON public.leads
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated update leads" ON public.leads
    FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated delete leads" ON public.leads
    FOR DELETE TO authenticated USING (true);

-- Gallery Projects Policies:
-- 1. Allow public select (anyone can view portfolio)
CREATE POLICY "Allow public read gallery_projects" ON public.gallery_projects
    FOR SELECT USING (true);

-- 2. Restrict write actions to authenticated admins only
CREATE POLICY "Allow authenticated write gallery_projects" ON public.gallery_projects
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Site Settings Policies:
-- 1. Allow public select (anyone can view current address/slogan)
CREATE POLICY "Allow public read site_settings" ON public.site_settings
    FOR SELECT USING (true);

-- 2. Restrict writes to authenticated admins
CREATE POLICY "Allow authenticated write site_settings" ON public.site_settings
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Create indices for optimization
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads(status);
CREATE INDEX IF NOT EXISTS idx_gallery_featured ON public.gallery_projects(is_featured);
