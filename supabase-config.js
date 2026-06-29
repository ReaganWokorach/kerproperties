/* ============================================================
   supabase-config.js  —  Ker Properties · Supabase Client
   ============================================================
   IMPORTANT: Replace BOTH values below with your own project.
   These are the only two public values you expose in the browser.
   They are safe to include here — Supabase Row Level Security
   enforces who can read/write what, NOT the key itself.
   ============================================================ */

const SUPABASE_URL  = "https://YOUR_PROJECT_REF.supabase.co";
const SUPABASE_ANON = "YOUR_ANON_PUBLIC_KEY";

/* ── Create a single shared client (imported by main.js) ── */
const { createClient } = supabase;
const _supabase = createClient(SUPABASE_URL, SUPABASE_ANON, {
  auth: {
    persistSession: true,       /* keeps the session across tabs/machines */
    autoRefreshToken: true,
    detectSessionInUrl: false,  /* we don't use magic-link redirects */
  }
});

window._supabase = _supabase;  /* expose to main.js */
