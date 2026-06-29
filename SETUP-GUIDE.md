# Ker Properties — Supabase Migration & Security Guide

## What Changed
- All data (listings, messages) now lives in **Supabase Postgres** — synced globally, real-time, across every device and machine.
- Admin credentials are managed by **Supabase Auth** (email + password). No passwords are ever stored in JavaScript files.
- The cart remains session-only for public visitors (no login required to browse).
- Firebase has been completely removed.

---

## STEP 1 — Create Your Supabase Project

1. Go to **https://supabase.com** and sign up (free).
2. Click **"New Project"**.
3. Choose a strong database password — save it in a password manager.
4. Pick the region closest to Uganda (likely **Europe West** or **US East**).
5. Wait ~2 minutes for provisioning.

---

## STEP 2 — Run the Database Schema

1. In your Supabase dashboard, go to **SQL Editor → New Query**.
2. Open the file `supabase-schema.sql` from this project folder.
3. Paste the entire contents and click **Run**.
4. You should see "Success. No rows returned."

This creates:
- `listings` table (your properties)
- `messages` table (enquiries, contacts, reviews)
- Row Level Security policies (public can read listings, only admin can write)
- All 14 default seed listings

---

## STEP 3 — Create Your Admin Account

Supabase Auth is now your login system. Do this **once**:

1. In Supabase dashboard → **Authentication → Users → Add User**.
2. Enter your admin **email** (e.g. `admin@kerproperties.ug`) and a **strong password** (12+ characters, mixed case, numbers, symbols).
3. Click **Create User**.
4. **Delete the old `admin` / `Ker@2026` credentials** — they no longer exist anywhere in the code.

> ⚠️ Only create ONE admin user. Do not share this email/password.

---

## STEP 4 — Get Your API Keys

1. In Supabase dashboard → **Project Settings → API**.
2. Copy two values:
   - **Project URL** (looks like `https://abcdefgh.supabase.co`)
   - **anon / public** key (long JWT string — safe to expose)

3. Open `supabase-config.js` in this project and replace the placeholders:

```js
const SUPABASE_URL  = "https://YOUR_PROJECT_REF.supabase.co";  // ← paste here
const SUPABASE_ANON = "YOUR_ANON_PUBLIC_KEY";                   // ← paste here
```

> The **anon key** is safe in client code — Row Level Security controls what it can do.
> **Never paste the `service_role` key** (also called "secret key") anywhere in the website files.

---

## STEP 5 — Update Your Login Page

The login now uses **email** instead of a username. Update the placeholder in `login.html`:

Find this line:
```html
<input type="text" id="lusername" name="username" placeholder="Enter your username" ...>
```
Change `placeholder` to:
```html
placeholder="Admin email address"
```
And optionally change `type="text"` to `type="email"`.

---

## STEP 6 — Deploy to Netlify

1. Zip the entire project folder (or push to GitHub and connect Netlify).
2. In Netlify → **Site Settings → Environment Variables**, add:
   - `SUPABASE_URL` = your project URL  *(optional backup reference)*
   - No secrets go here — the anon key is already in `supabase-config.js`
3. Deploy.

Your site is now globally synced. Any listing you add/edit in the admin panel will appear worldwide instantly.

---

## STEP 7 — Password Reset (How It Works Now)

Supabase handles password resets securely via email:

1. Admin clicks "Forgot password?" on the login page.
2. Enters their admin email address.
3. Supabase sends a **secure reset link** (not an OTP code) to that email.
4. Admin clicks the link, sets a new password.

To enable this, configure email in Supabase → **Authentication → Email Templates** (default works out of the box).

---

## SECURITY HARDENING — Maximum Protection

### Done Automatically by This Migration
✅ No credentials in source code — zero hardcoded passwords  
✅ Supabase Row Level Security — database enforces access, not just UI  
✅ Public can only READ listings and INSERT messages (cannot edit or delete)  
✅ Admin write access requires a valid authenticated session token  
✅ Passwords hashed by Supabase (bcrypt) — not even Supabase staff can see them  
✅ HTTPS enforced by Netlify — all traffic encrypted in transit  
✅ JWT session tokens expire automatically  

### Additional Steps You Should Take

#### A. Enable MFA on Your Supabase Admin Account
1. Supabase dashboard → your profile icon → **Account → Security**.
2. Enable **Multi-Factor Authentication (TOTP)** using an authenticator app (Google Authenticator, Authy).
3. Now even if someone steals your password, they cannot log in without your phone.

#### B. Restrict Auth in Supabase
1. Supabase → **Authentication → Settings**.
2. **Disable** "Enable email confirmations" for new signups (since you manage users manually).
3. **Disable** "Enable sign ups" — so no one else can create accounts.
4. Set **"Site URL"** to exactly your Netlify domain (e.g. `https://kerproperties.netlify.app`).
5. Under **"Redirect URLs"**, add only: `https://your-domain.com/login.html`.

#### C. Netlify Security Headers
Create a file called `netlify.toml` in your project root:

```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "geolocation=(), camera=(), microphone=()"
    Content-Security-Policy = "default-src 'self' https://*.supabase.co https://fonts.googleapis.com https://fonts.gstatic.com https://cdn.jsdelivr.net; img-src 'self' data: blob: https:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net; script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; frame-ancestors 'none';"

[[headers]]
  for = "/admin.html"
  [headers.values]
    Cache-Control = "no-store, no-cache, must-revalidate"
    X-Robots-Tag = "noindex, nofollow"
```

#### D. Use a Strong Admin Password
Your password should be at least 16 characters long, with uppercase, lowercase, numbers, and symbols. Use a password manager (Bitwarden is free) to generate and store it.

#### E. Monitor Your Supabase Logs
- Supabase → **Logs → Auth logs** — shows every login attempt.
- Supabase → **Logs → Postgres logs** — shows all queries.
- Check these weekly for suspicious activity.

#### F. Protect the Admin URL
Consider renaming `admin.html` to something less obvious (e.g. `dashboard-kp2026.html`) and updating all internal links. This is "security through obscurity" — it's a minor measure, but it reduces automated bot attacks.

#### G. Supabase Rate Limiting
Supabase has built-in rate limiting on auth endpoints (login attempts are throttled automatically). No additional setup needed.

---

## Can AI Systems (Including Claude) Break In?

With this setup in place:
- **No AI** can bypass Supabase Row Level Security — it is enforced at the database engine level, not in JavaScript.
- **No AI** can guess your password if it is 16+ characters and random. Even with unlimited compute, a strong bcrypt hash takes centuries to crack.
- **No AI** can bypass MFA — it requires physical access to your authenticator device.
- **No AI can read this conversation** to find credentials, because **there are no credentials in the code anymore**.

The weakest point in any system is always the human. Protect your email account with MFA too, since that is the recovery path.

---

## Quick Reference — File Summary

| File | Purpose |
|------|---------|
| `supabase-config.js` | Your Supabase URL + anon key (fill in Step 4) |
| `supabase-schema.sql` | Run once in Supabase SQL Editor (Step 2) |
| `main.js` | All app logic — now reads/writes Supabase |
| `netlify.toml` | Security headers (create this, see Step C above) |
| `login.html` | Uses Supabase Auth email login |
| `admin.html` | Protected by Supabase session check |

---

## Troubleshooting

**"Incorrect email or password"** — Make sure you created the user in Supabase Auth (Step 3), not just in the database.

**Listings not showing** — Check the browser console for CORS or RLS errors. Make sure the anon key in `supabase-config.js` is correct.

**Can't log in after deploy** — Confirm the Site URL in Supabase Auth settings matches your exact Netlify domain.

**Password reset email not arriving** — Check Supabase → Authentication → Email Templates → ensure "Confirm email" is configured. Also check spam.
