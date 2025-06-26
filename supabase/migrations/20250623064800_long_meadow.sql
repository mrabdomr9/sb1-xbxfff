/*
  # Additional tables for comprehensive database integration

  1. New Tables
    - `user_activity_logs` - Track user actions for audit trail
    - `operation_logs` - Log all database operations
    - `system_metrics` - Store system performance metrics
    - `cache_invalidation` - Track cache invalidation events
    - `api_rate_limits` - Track API usage and rate limiting

  2. Indexes
    - Performance indexes for common queries
    - Composite indexes for complex filtering

  3. Functions
    - Stored procedures for analytics
    - Triggers for automatic logging

  4. Security
    - Enhanced RLS policies
    - Audit trail functionality
*/

-- User activity logs table
CREATE TABLE IF NOT EXISTS user_activity_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  action text NOT NULL,
  timestamp timestamptz DEFAULT now(),
  ip_address text,
  user_agent text,
  session_id text,
  metadata jsonb DEFAULT '{}'::jsonb
);

-- Operation logs table
CREATE TABLE IF NOT EXISTS operation_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE SET NULL,
  table_name text NOT NULL,
  operation text NOT NULL CHECK (operation IN ('create', 'update', 'delete', 'select')),
  record_id text,
  old_values jsonb,
  new_values jsonb,
  timestamp timestamptz DEFAULT now(),
  success boolean DEFAULT true,
  error_message text
);

-- System metrics table
CREATE TABLE IF NOT EXISTS system_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_name text NOT NULL,
  metric_value numeric NOT NULL,
  metric_unit text,
  timestamp timestamptz DEFAULT now(),
  metadata jsonb DEFAULT '{}'::jsonb
);

-- Cache invalidation logs
CREATE TABLE IF NOT EXISTS cache_invalidation_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cache_key text NOT NULL,
  invalidation_reason text,
  timestamp timestamptz DEFAULT now(),
  user_id uuid REFERENCES users(id) ON DELETE SET NULL
);

-- API rate limiting table
CREATE TABLE IF NOT EXISTS api_rate_limits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  endpoint text NOT NULL,
  request_count integer DEFAULT 1,
  window_start timestamptz DEFAULT now(),
  window_end timestamptz DEFAULT (now() + interval '1 hour'),
  is_blocked boolean DEFAULT false
);

-- Performance indexes
CREATE INDEX IF NOT EXISTS idx_user_activity_logs_user_id ON user_activity_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_user_activity_logs_timestamp ON user_activity_logs(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_user_activity_logs_action ON user_activity_logs(action);

CREATE INDEX IF NOT EXISTS idx_operation_logs_user_id ON operation_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_operation_logs_table_name ON operation_logs(table_name);
CREATE INDEX IF NOT EXISTS idx_operation_logs_timestamp ON operation_logs(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_operation_logs_record_id ON operation_logs(record_id);

CREATE INDEX IF NOT EXISTS idx_system_metrics_name ON system_metrics(metric_name);
CREATE INDEX IF NOT EXISTS idx_system_metrics_timestamp ON system_metrics(timestamp DESC);

CREATE INDEX IF NOT EXISTS idx_services_title ON services USING gin(to_tsvector('english', title));
CREATE INDEX IF NOT EXISTS idx_services_description ON services USING gin(to_tsvector('english', description));
CREATE INDEX IF NOT EXISTS idx_services_created_at ON services(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_projects_title ON projects USING gin(to_tsvector('english', title));
CREATE INDEX IF NOT EXISTS idx_projects_order_index ON projects(order_index);

CREATE INDEX IF NOT EXISTS idx_clients_name ON clients USING gin(to_tsvector('english', name));
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON contact_submissions(email);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at DESC);

-- Enable Row Level Security on new tables
ALTER TABLE user_activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE operation_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE cache_invalidation_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_rate_limits ENABLE ROW LEVEL SECURITY;

-- RLS Policies for new tables
CREATE POLICY "Authenticated users can read their own activity logs" 
  ON user_activity_logs FOR SELECT 
  USING (auth.uid() = user_id OR auth.role() = 'authenticated');

CREATE POLICY "System can insert activity logs" 
  ON user_activity_logs FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read operation logs" 
  ON operation_logs FOR SELECT 
  USING (auth.role() = 'authenticated');

CREATE POLICY "System can insert operation logs" 
  ON operation_logs FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read system metrics" 
  ON system_metrics FOR SELECT 
  USING (auth.role() = 'authenticated');

CREATE POLICY "System can insert metrics" 
  ON system_metrics FOR INSERT 
  WITH CHECK (true);

-- Stored procedures for analytics
CREATE OR REPLACE FUNCTION get_dashboard_metrics()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result jsonb;
  services_count integer;
  projects_count integer;
  clients_count integer;
  partners_count integer;
  submissions_count integer;
  recent_submissions integer;
BEGIN
  -- Get counts for all main tables
  SELECT COUNT(*) INTO services_count FROM services;
  SELECT COUNT(*) INTO projects_count FROM projects;
  SELECT COUNT(*) INTO clients_count FROM clients;
  SELECT COUNT(*) INTO partners_count FROM partners;
  SELECT COUNT(*) INTO submissions_count FROM contact_submissions;
  
  -- Get recent submissions (last 7 days)
  SELECT COUNT(*) INTO recent_submissions 
  FROM contact_submissions 
  WHERE created_at >= NOW() - INTERVAL '7 days';
  
  -- Build result JSON
  result := jsonb_build_object(
    'totalServices', services_count,
    'totalProjects', projects_count,
    'totalClients', clients_count,
    'totalPartners', partners_count,
    'totalSubmissions', submissions_count,
    'recentSubmissions', recent_submissions,
    'lastUpdated', NOW()
  );
  
  RETURN result;
END;
$$;

-- Function to get monthly growth statistics
CREATE OR REPLACE FUNCTION get_monthly_growth()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result jsonb;
  current_month_start date;
  last_month_start date;
  last_month_end date;
  current_services integer;
  last_month_services integer;
  current_projects integer;
  last_month_projects integer;
  current_clients integer;
  last_month_clients integer;
  current_submissions integer;
  last_month_submissions integer;
BEGIN
  -- Calculate date ranges
  current_month_start := date_trunc('month', CURRENT_DATE);
  last_month_start := date_trunc('month', CURRENT_DATE - INTERVAL '1 month');
  last_month_end := current_month_start - INTERVAL '1 day';
  
  -- Get current month counts
  SELECT COUNT(*) INTO current_services FROM services WHERE created_at >= current_month_start;
  SELECT COUNT(*) INTO current_projects FROM projects WHERE created_at >= current_month_start;
  SELECT COUNT(*) INTO current_clients FROM clients WHERE created_at >= current_month_start;
  SELECT COUNT(*) INTO current_submissions FROM contact_submissions WHERE created_at >= current_month_start;
  
  -- Get last month counts
  SELECT COUNT(*) INTO last_month_services FROM services 
  WHERE created_at >= last_month_start AND created_at <= last_month_end;
  SELECT COUNT(*) INTO last_month_projects FROM projects 
  WHERE created_at >= last_month_start AND created_at <= last_month_end;
  SELECT COUNT(*) INTO last_month_clients FROM clients 
  WHERE created_at >= last_month_start AND created_at <= last_month_end;
  SELECT COUNT(*) INTO last_month_submissions FROM contact_submissions 
  WHERE created_at >= last_month_start AND created_at <= last_month_end;
  
  -- Build result
  result := jsonb_build_object(
    'services', jsonb_build_object(
      'current', current_services,
      'previous', last_month_services,
      'growth', CASE 
        WHEN last_month_services = 0 THEN 
          CASE WHEN current_services > 0 THEN 100 ELSE 0 END
        ELSE ROUND(((current_services - last_month_services)::numeric / last_month_services) * 100, 2)
      END
    ),
    'projects', jsonb_build_object(
      'current', current_projects,
      'previous', last_month_projects,
      'growth', CASE 
        WHEN last_month_projects = 0 THEN 
          CASE WHEN current_projects > 0 THEN 100 ELSE 0 END
        ELSE ROUND(((current_projects - last_month_projects)::numeric / last_month_projects) * 100, 2)
      END
    ),
    'clients', jsonb_build_object(
      'current', current_clients,
      'previous', last_month_clients,
      'growth', CASE 
        WHEN last_month_clients = 0 THEN 
          CASE WHEN current_clients > 0 THEN 100 ELSE 0 END
        ELSE ROUND(((current_clients - last_month_clients)::numeric / last_month_clients) * 100, 2)
      END
    ),
    'submissions', jsonb_build_object(
      'current', current_submissions,
      'previous', last_month_submissions,
      'growth', CASE 
        WHEN last_month_submissions = 0 THEN 
          CASE WHEN current_submissions > 0 THEN 100 ELSE 0 END
        ELSE ROUND(((current_submissions - last_month_submissions)::numeric / last_month_submissions) * 100, 2)
      END
    )
  );
  
  RETURN result;
END;
$$;

-- Function to clean old logs
CREATE OR REPLACE FUNCTION cleanup_old_logs()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Delete activity logs older than 90 days
  DELETE FROM user_activity_logs 
  WHERE timestamp < NOW() - INTERVAL '90 days';
  
  -- Delete operation logs older than 30 days
  DELETE FROM operation_logs 
  WHERE timestamp < NOW() - INTERVAL '30 days';
  
  -- Delete system metrics older than 7 days
  DELETE FROM system_metrics 
  WHERE timestamp < NOW() - INTERVAL '7 days';
  
  -- Delete cache invalidation logs older than 7 days
  DELETE FROM cache_invalidation_logs 
  WHERE timestamp < NOW() - INTERVAL '7 days';
  
  -- Delete old rate limit records
  DELETE FROM api_rate_limits 
  WHERE window_end < NOW() - INTERVAL '24 hours';
END;
$$;

-- Trigger function for automatic operation logging
CREATE OR REPLACE FUNCTION log_operation()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Only log for authenticated users
  IF auth.role() = 'authenticated' THEN
    INSERT INTO operation_logs (
      user_id,
      table_name,
      operation,
      record_id,
      old_values,
      new_values,
      timestamp
    ) VALUES (
      auth.uid(),
      TG_TABLE_NAME,
      TG_OP,
      COALESCE(NEW.id::text, OLD.id::text),
      CASE WHEN TG_OP = 'DELETE' THEN to_jsonb(OLD) ELSE NULL END,
      CASE WHEN TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN to_jsonb(NEW) ELSE NULL END,
      NOW()
    );
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$;

-- Create triggers for operation logging on main tables
DROP TRIGGER IF EXISTS services_operation_log ON services;
CREATE TRIGGER services_operation_log
  AFTER INSERT OR UPDATE OR DELETE ON services
  FOR EACH ROW EXECUTE FUNCTION log_operation();

DROP TRIGGER IF EXISTS projects_operation_log ON projects;
CREATE TRIGGER projects_operation_log
  AFTER INSERT OR UPDATE OR DELETE ON projects
  FOR EACH ROW EXECUTE FUNCTION log_operation();

DROP TRIGGER IF EXISTS clients_operation_log ON clients;
CREATE TRIGGER clients_operation_log
  AFTER INSERT OR UPDATE OR DELETE ON clients
  FOR EACH ROW EXECUTE FUNCTION log_operation();

DROP TRIGGER IF EXISTS partners_operation_log ON partners;
CREATE TRIGGER partners_operation_log
  AFTER INSERT OR UPDATE OR DELETE ON partners
  FOR EACH ROW EXECUTE FUNCTION log_operation();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Create triggers for updated_at columns
DROP TRIGGER IF EXISTS services_updated_at ON services;
CREATE TRIGGER services_updated_at
  BEFORE UPDATE ON services
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS projects_updated_at ON projects;
CREATE TRIGGER projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS clients_updated_at ON clients;
CREATE TRIGGER clients_updated_at
  BEFORE UPDATE ON clients
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS partners_updated_at ON partners;
CREATE TRIGGER partners_updated_at
  BEFORE UPDATE ON partners
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS settings_updated_at ON settings;
CREATE TRIGGER settings_updated_at
  BEFORE UPDATE ON settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO authenticated;

-- Insert initial system metrics
INSERT INTO system_metrics (metric_name, metric_value, metric_unit) VALUES
('database_size', 0, 'MB'),
('active_connections', 1, 'count'),
('query_performance', 100, 'ms'),
('uptime', 0, 'seconds')
ON CONFLICT DO NOTHING;