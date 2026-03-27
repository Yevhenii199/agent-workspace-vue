/*
  # Secure automation_rules table
  - Change created_by from text to uuid with auth.uid() default
  - Replace permissive RLS with owner-based policies
*/

DELETE FROM automation_rules WHERE created_by IS NOT NULL AND created_by !~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$';

DROP POLICY IF EXISTS "Users can view all automation rules" ON automation_rules;
DROP POLICY IF EXISTS "Users can create automation rules" ON automation_rules;
DROP POLICY IF EXISTS "Users can update automation rules" ON automation_rules;
DROP POLICY IF EXISTS "Users can delete automation rules" ON automation_rules;

ALTER TABLE automation_rules
  ALTER COLUMN created_by TYPE uuid USING nullif(created_by, '')::uuid,
  ALTER COLUMN created_by SET DEFAULT auth.uid(),
  ALTER COLUMN created_by SET NOT NULL;

ALTER TABLE automation_rules
  ADD CONSTRAINT automation_rules_created_by_fkey
  FOREIGN KEY (created_by) REFERENCES auth.users(id) ON DELETE CASCADE;

CREATE POLICY "automation_rules_select_own" ON automation_rules FOR SELECT TO authenticated USING (auth.uid() = created_by);
CREATE POLICY "automation_rules_insert_own" ON automation_rules FOR INSERT TO authenticated WITH CHECK (auth.uid() = created_by);
CREATE POLICY "automation_rules_update_own" ON automation_rules FOR UPDATE TO authenticated USING (auth.uid() = created_by) WITH CHECK (auth.uid() = created_by);
CREATE POLICY "automation_rules_delete_own" ON automation_rules FOR DELETE TO authenticated USING (auth.uid() = created_by);
