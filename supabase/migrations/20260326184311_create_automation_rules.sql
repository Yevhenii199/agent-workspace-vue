/*
  # Create Automation Rules Table

  1. New Tables
    - `automation_rules`
      - `id` (uuid, primary key)
      - `name` (text) - User-friendly name for the rule
      - `event` (text) - Trigger event type
      - `action` (text) - Action to perform
      - `is_active` (boolean) - Whether the rule is enabled
      - `created_at` (timestamptz) - When the rule was created
      - `updated_at` (timestamptz) - Last update timestamp
      - `created_by` (text) - User who created the rule

  2. Security
    - Enable RLS on `automation_rules` table
    - Add policy for authenticated users to read all rules
    - Add policy for authenticated users to create rules
    - Add policy for authenticated users to update rules
    - Add policy for authenticated users to delete rules
*/

CREATE TABLE IF NOT EXISTS automation_rules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  event text NOT NULL,
  action text NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by text DEFAULT 'system'
);

ALTER TABLE automation_rules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all automation rules"
  ON automation_rules
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create automation rules"
  ON automation_rules
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update automation rules"
  ON automation_rules
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Users can delete automation rules"
  ON automation_rules
  FOR DELETE
  TO authenticated
  USING (true);

-- Insert some example rules
INSERT INTO automation_rules (name, event, action, is_active, created_by) VALUES
  ('Auto-escalate urgent tickets', 'New Ticket Received', 'Tag as Urgent', true, 'Sarah Chen'),
  ('Assign escalated tickets to seniors', 'Ticket Escalated', 'Assign to Senior Agent', true, 'Sarah Chen'),
  ('Send offline message', 'Customer Offline', 'Send Template Message', false, 'Admin')
ON CONFLICT DO NOTHING;
