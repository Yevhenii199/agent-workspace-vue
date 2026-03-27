import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type AutomationRule = {
  id: string;
  name: string;
  event: string;
  action: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  created_by: string; // uuid referencing auth.users
};
