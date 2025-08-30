/*
  # Website Metrics System

  1. New Tables
    - `website_metrics`
      - `id` (uuid, primary key)
      - `metric_name` (text, unique)
      - `metric_value` (integer)
      - `last_updated` (timestamp)
      - `metadata` (jsonb for additional data)

  2. Security
    - Enable RLS on `website_metrics` table
    - Add policies for public read access and authenticated write access

  3. Initial Data
    - Insert default metrics for website visitors, active clients, and services offered
*/

-- Create website_metrics table
CREATE TABLE IF NOT EXISTS website_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_name text UNIQUE NOT NULL,
  metric_value integer NOT NULL DEFAULT 0,
  last_updated timestamptz DEFAULT now(),
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE website_metrics ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public can read website metrics"
  ON website_metrics
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage website metrics"
  ON website_metrics
  FOR ALL
  TO authenticated
  USING (true);

-- Create function to update metrics
CREATE OR REPLACE FUNCTION update_website_metric(
  p_metric_name text,
  p_metric_value integer,
  p_metadata jsonb DEFAULT '{}'::jsonb
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO website_metrics (metric_name, metric_value, metadata, last_updated)
  VALUES (p_metric_name, p_metric_value, p_metadata, now())
  ON CONFLICT (metric_name)
  DO UPDATE SET
    metric_value = EXCLUDED.metric_value,
    metadata = EXCLUDED.metadata,
    last_updated = now();
END;
$$;

-- Create function to increment metrics
CREATE OR REPLACE FUNCTION increment_website_metric(
  p_metric_name text,
  p_increment integer DEFAULT 1
)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  new_value integer;
BEGIN
  INSERT INTO website_metrics (metric_name, metric_value, last_updated)
  VALUES (p_metric_name, p_increment, now())
  ON CONFLICT (metric_name)
  DO UPDATE SET
    metric_value = website_metrics.metric_value + p_increment,
    last_updated = now()
  RETURNING metric_value INTO new_value;
  
  RETURN new_value;
END;
$$;

-- Insert initial metrics
INSERT INTO website_metrics (metric_name, metric_value, metadata) VALUES
  ('website_visitors', 1247, '{"description": "Total unique website visitors", "display_name": "Website Visitors"}'),
  ('active_clients', 89, '{"description": "Number of active clients", "display_name": "Active Clients"}'),
  ('services_offered', 6, '{"description": "Number of services offered", "display_name": "Services Offered"}'),
  ('projects_completed', 156, '{"description": "Total completed projects", "display_name": "Projects Completed"}'),
  ('countries_served', 15, '{"description": "Countries we serve", "display_name": "Countries Served"}'),
  ('years_experience', 15, '{"description": "Years of experience", "display_name": "Years Experience"}')
ON CONFLICT (metric_name) DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_website_metrics_name ON website_metrics(metric_name);
CREATE INDEX IF NOT EXISTS idx_website_metrics_updated ON website_metrics(last_updated DESC);