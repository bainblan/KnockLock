-- ============================================
-- Migration: 001_username_table.sql
-- Purpose:
--   - Create Username table (1 row per user)
--   - Enforce ownership via Supabase Auth (auth.uid)
--   - Lock down access using Row Level Security (RLS)
-- ============================================


-- 1️⃣ Create the table
-- --------------------
-- This table stores ONE row per authenticated user.
-- The `id` column IS the user's auth ID.
CREATE TABLE IF NOT EXISTS public."Username" (
  id uuid PRIMARY KEY
    REFERENCES auth.users(id)
    ON DELETE CASCADE,

  username text NOT NULL,

  created_at timestamptz NOT NULL DEFAULT now()
);


-- 2️⃣ Ensure usernames are unique
-- -------------------------------
-- Prevent two users from choosing the same username.
ALTER TABLE public."Username"
ADD CONSTRAINT username_unique UNIQUE (username);


-- 3️⃣ Default ownership: id = auth.uid()
-- --------------------------------------
-- This allows inserts without specifying `id`.
-- The database automatically assigns ownership.
ALTER TABLE public."Username"
ALTER COLUMN id SET DEFAULT auth.uid();


-- 4️⃣ Enable Row Level Security
-- ----------------------------
-- Without this, policies do nothing.
ALTER TABLE public."Username"
ENABLE ROW LEVEL SECURITY;


-- 5️⃣ RLS Policies
-- ----------------
-- Rule: users can ONLY see / insert / update / delete THEIR OWN row.
-- Ownership is defined as: Username.id = auth.uid()


-- READ: user can view their own username
CREATE POLICY "read_own_username"
ON public."Username"
FOR SELECT
TO authenticated
USING (id = auth.uid());


-- INSERT: user can create their own username row
CREATE POLICY "insert_own_username"
ON public."Username"
FOR INSERT
TO authenticated
WITH CHECK (id = auth.uid());


-- UPDATE: user can update ONLY their own username
CREATE POLICY "update_own_username"
ON public."Username"
FOR UPDATE
TO authenticated
USING (id = auth.uid())
WITH CHECK (id = auth.uid());


-- DELETE: user can delete ONLY their own username
CREATE POLICY "delete_own_username"
ON public."Username"
FOR DELETE
TO authenticated
USING (id = auth.uid());


-- ============================================
-- End of migration
-- ============================================
