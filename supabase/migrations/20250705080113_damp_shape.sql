/*
  # Fix operation logs constraint

  1. Problem
    - The operation_logs table has a check constraint that expects lowercase operation values
    - Database triggers are inserting uppercase values like 'INSERT', 'UPDATE', 'DELETE'
    - This causes constraint violations when logging operations

  2. Solution
    - Update the check constraint to accept both lowercase and uppercase operation values
    - Ensure the log_operation function normalizes operation values to lowercase
    - Add proper handling for all CRUD operations

  3. Changes
    - Drop and recreate the operation_logs_operation_check constraint
    - Update constraint to accept both cases
    - Ensure triggers use consistent lowercase values
*/

-- Drop the existing constraint
ALTER TABLE operation_logs DROP CONSTRAINT IF EXISTS operation_logs_operation_check;

-- Add updated constraint that accepts the correct operation values
ALTER TABLE operation_logs ADD CONSTRAINT operation_logs_operation_check 
  CHECK (operation = ANY (ARRAY['create'::text, 'update'::text, 'delete'::text, 'select'::text, 'insert'::text]));

-- Update the log_operation function to normalize operation values
CREATE OR REPLACE FUNCTION log_operation()
RETURNS TRIGGER AS $$
BEGIN
  -- Normalize TG_OP to lowercase operation names
  INSERT INTO operation_logs (
    user_id,
    table_name,
    operation,
    record_id,
    old_values,
    new_values,
    timestamp,
    success
  ) VALUES (
    COALESCE(auth.uid(), NULL),
    TG_TABLE_NAME,
    CASE 
      WHEN TG_OP = 'INSERT' THEN 'create'
      WHEN TG_OP = 'UPDATE' THEN 'update'
      WHEN TG_OP = 'DELETE' THEN 'delete'
      ELSE lower(TG_OP)
    END,
    CASE 
      WHEN TG_OP = 'DELETE' THEN OLD.id::text
      ELSE NEW.id::text
    END,
    CASE 
      WHEN TG_OP = 'UPDATE' THEN to_jsonb(OLD)
      WHEN TG_OP = 'DELETE' THEN to_jsonb(OLD)
      ELSE NULL
    END,
    CASE 
      WHEN TG_OP = 'INSERT' THEN to_jsonb(NEW)
      WHEN TG_OP = 'UPDATE' THEN to_jsonb(NEW)
      ELSE NULL
    END,
    now(),
    true
  );
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;