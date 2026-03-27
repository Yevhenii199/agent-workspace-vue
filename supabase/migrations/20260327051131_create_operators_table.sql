/*
  # Create Operators Table

  1. New Tables
    - `operators`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `name` (text) - Operator's full name
      - `email` (text) - Operator's email
      - `avatar_initials` (text) - Avatar initials (auto-generated)
      - `created_at` (timestamptz) - Account creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on `operators` table
    - Add policy for authenticated users to read own profile
    - Add policy for authenticated users to update own profile
    - Add policy for authenticated users to insert own profile
*/

CREATE TABLE IF NOT EXISTS operators (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  avatar_initials text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE operators ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Operators can view own profile"
  ON operators
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Operators can update own profile"
  ON operators
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Operators can insert own profile"
  ON operators
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);
