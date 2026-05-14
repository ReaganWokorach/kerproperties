# 🏠 Prestige Properties

> **Uganda's Prestige Property Partner** — A full-featured, client-side real estate web application for buying land and renting homes across all districts of Uganda.

---

## 📌 Table of Contents

1. [Project Overview](#project-overview)
2. [Live Journey — What the Website Does](#live-journey)
3. [File Structure](#file-structure)
4. [Pages & Features](#pages--features)
   - [Home (`index.html`)](#1-home-indexhtml)
   - [Properties (`properties.html`)](#2-properties-propertieshtml)
   - [About (`about.html`)](#3-about-abouthtml)
   - [Contact (`contact.html`)](#4-contact-contacthtml)
   - [Testimonies (`testimonies.html`)](#5-testimonies-testimonieshtml)
   - [Cart / Enquiry (`cart.html`)](#6-cart--enquiry-carthtml)
   - [Admin (`admin.html`)](#7-admin-adminhtml)
5. [Design System](#design-system)
6. [JavaScript Architecture (`main.js`)](#javascript-architecture-mainjs)
7. [Data & Storage](#data--storage)
8. [Admin Panel — Full Guide](#admin-panel--full-guide)
9. [Deployment](#deployment)
10. [Customisation Checklist](#customisation-checklist)

---

## Project Overview

**Prestige Properties** is a pure front-end, no-backend real estate website built for a Ugandan property company. It requires no server, no database, and no build tools — just open the HTML files in a browser or host them on any static host (Netlify, GitHub Pages, Vercel, etc.).

All data (listings, cart items, contact messages, admin credentials) is stored in the user's browser `localStorage`, making the site fully functional offline.

**Tech Stack**

| Layer | Technology |
|---|---|
| Markup | HTML5 (semantic) |
| Styling | CSS3 — CSS custom properties (variables), Flexbox, Grid |
| Scripting | Vanilla JavaScript (ES6+) |
| Icons | Tabler Icons (CDN webfont) |
| Fonts | Google Fonts — Cormorant Garamond (serif) + DM Sans (sans-serif) |
| Storage | Browser `localStorage` |
| Hosting | Static (Netlify recommended — includes built-in form handling) |

---

## Live Journey

Here is the complete user and admin journey through the website:

```
Visitor lands on index.html
        │
        ▼
  [HERO SECTION]
  "Find Your Perfect Land & Home Across Uganda"
  → Search bar (keyword + type + district dropdown)
  → Click popular district tags (Kampala, Gulu, Mbarara…)
        │
        ▼
  [STATS BAR]   120+ Plots · 85+ Rentals · 200+ Clients · 50+ Districts
        │
        ▼
  [FEATURED LAND CARDS]
  → Heart icon → adds to enquiry list (cart)
  → "Enquire" button → adds to cart → goes to cart.html
  → "View All Land" → properties.html?type=land
        │
        ▼
  [MID BANNER CTA] → contact.html
        │
        ▼
  [FEATURED RENTALS CARDS]  (same card interactions as land)
        │
        ▼
  [TESTIMONIES PREVIEW]  → testimonies.html
        │
        ▼
  [CONTACT QUICK FORM]
  → Submits message → stored in localStorage inbox
  → Admin reads it in the Admin Panel inbox
        │
        ▼
  [FOOTER]  All pages · Services links · Social media links

═══════════════════════════════════════════════════════════

  properties.html  (full browsable catalogue)
        │
        ├── Filter Bar: All / Land / Rent buttons
        ├── District dropdown (all 50 Uganda districts)
        ├── Keyword search input
        └── Results grid → same card components

═══════════════════════════════════════════════════════════

  cart.html  (Enquiry List)
        │
        ├── Lists all saved/enquired properties
        ├── Remove individual items
        ├── WhatsApp "Send Enquiry" button
        │   → Opens WhatsApp with pre-filled message listing all properties
        └── "Clear All" option

═══════════════════════════════════════════════════════════

  admin.html  (Password-protected dashboard)
        │
        ├── LOGIN SCREEN  (username + password, stored in localStorage)
        │
        ├── DASHBOARD STATS
        │   Total Listings · Available · Taken/Sold · Unread Messages
        │
        ├── LISTINGS TABLE
        │   All properties with: Title · Type · Price · Photos count
        │   Featured star · Availability badge · Action buttons
        │   [Toggle Available] [Toggle Featured] [Delete]
        │
        ├── ADD NEW LISTING FORM
        │   Title · Type (Land/Rent) · District · Price · Notes
        │   Features list · Photo upload (multiple images)
        │   Featured toggle · Submit → saved to localStorage
        │
        ├── CHANGE CREDENTIALS
        │   Update admin username & password
        │
        └── INBOX  (contact form messages)
            Unread badge · Sender name · Phone · Email · Message body
            Mark all read · Delete individual messages
```

---

## File Structure

```
prestige-properties/
│
├── index.html          ← Home page (hero, featured listings, contact form)
├── properties.html     ← Full property catalogue with filters
├── about.html          ← About the company, team, services, values
├── contact.html        ← Dedicated contact page with form + map info
├── testimonies.html    ← Client reviews + star rating submission form
├── cart.html           ← Enquiry list (saved properties + WhatsApp CTA)
├── admin.html          ← Password-protected admin dashboard
│
├── style.css           ← All styling (design tokens, components, pages)
├── main.js             ← All JavaScript (data, rendering, interactions)
│
└── ppLogo.png          ← Company logo (used in navbar + footer)
```

---

## Pages & Features

### 1. Home (`index.html`)

The landing page. First impression. Converts visitors into enquiries.

**Sections:**
- **Navbar** — Fixed, blur-backdrop, scrolls to solid on scroll. Active link highlighted. Cart badge (count). Admin button.
- **Hero** — Full-screen dark gradient background with grid overlay. Main headline, subtext, search form (keyword + type select + district dropdown), popular district quick-tags.
- **Stats Bar** — Animated counters: Plots Listed, Houses for Rent, Happy Clients, Districts Covered.
- **Featured Land** — Up to 3 featured land listings rendered as cards. Each card has: photo slideshow (auto-rotates), For Sale badge, heart/save button, title, location, features, price, and Enquire button.
- **Mid Banner** — Purple CTA strip linking to Contact.
- **Featured Rentals** — Up to 3 featured rental listings (same card format).
- **Testimonies Preview** — 3 featured client review cards, link to full page.
- **Contact Quick Form** — Name, Phone, Email, Interest dropdown, Message. Submits to localStorage inbox AND Netlify forms (if deployed on Netlify).
- **Footer** — 4-column: Brand + socials, Quick Links, Services, Contact info.
- **Toast notification** — Slides up from bottom for cart actions.
- **Back to Top** — Purple circle button appears on scroll.

---

### 2. Properties (`properties.html`)

The full browsable catalogue of all listings.

**Features:**
- **Filter Bar** — Type buttons (All / Land / Rent), district dropdown (all Uganda districts), keyword search input, Search button, result count label.
- **URL Parameter Support** — `?type=land`, `?type=rent`, `?q=gulu`, `?loc=kampala` — all honoured on load (links from Home work instantly).
- **Property Grid** — All listings rendered with the same card component used on Home. Cards fade in as they scroll into view.
- **No Results State** — Friendly icon + message when filters return nothing.
- **Mid Banner** — "Can't find what you're looking for?" CTA.

---

### 3. About (`about.html`)

Company story, values, team, and services.

**Sections:** Page hero, story + image, values grid, services (Land Sale, Rentals, Consultation, Site Visits, Title Verification), team cards, CTA banner.

---

### 4. Contact (`contact.html`)

Dedicated contact page with full form and contact details.

**Features:** Same form as on Home (name, phone, email, interest, message). Messages saved to localStorage admin inbox. Netlify form-handling attributes included for zero-backend email delivery on Netlify hosting.

---

### 5. Testimonies (`testimonies.html`)

Client reviews and new review submission.

**Features:** Display all testimonies (from localStorage), star rating picker (click to select 1–5 stars), submit new review form (name, location, review text), reviews sorted newest first.

---

### 6. Cart / Enquiry (`cart.html`)

The enquiry list — properties the visitor has saved.

**Features:**
- Lists all saved properties with photo, title, type, price, remove button.
- Summary panel with count and subtotal context.
- **WhatsApp Enquiry Button** — generates a pre-filled WhatsApp message: "Hello, I am interested in: [list of properties with prices]" and opens `wa.me` with the company's number.
- Clear all items.
- Empty state with links back to properties.

---

### 7. Admin (`admin.html`)

Password-protected management dashboard. **This page must be designed and added to your project** — see the full design spec below.

---

## Design System

All design tokens are CSS custom properties in `style.css`:

```css
/* COLOURS */
--purple:       #5B0EA6   /* Primary brand colour */
--purple-deep:  #3A0870   /* Hover / dark variant */
--purple-mid:   #7B2FBE
--purple-light: #9B59D0
--purple-pale:  #F3EEFE   /* Tint backgrounds */
--purple-soft:  #E8DAFC

--black:        #0A0712
--dark:         #130E1E   /* Hero / dark sections bg */
--charcoal:     #2D2240

--white:        #FFFFFF
--off-white:    #FAF8FE   /* Body background */
--silver-light: #E4DFF0   /* Borders */

--text-primary: #1A1230
--text-mid:     #5A4E72
--text-muted:   #8A7FA0

/* STATUS COLOURS */
--green-tag / --green-bg   /* Available badge */
--red-tag / --red-bg       /* Taken/Sold badge */
--blue-tag / --blue-bg     /* Info */

/* TYPOGRAPHY */
--font-serif:   'Cormorant Garamond', Georgia, serif   /* headings */
--font-sans:    'DM Sans', sans-serif                  /* body */

/* RADII */
--radius-sm: 6px  |  --radius-md: 12px
--radius-lg: 20px |  --radius-xl: 32px

/* SHADOWS */
--shadow-sm / --shadow-md / --shadow-lg   /* purple-tinted */
--shadow-dark                              /* dark overlay */
```

**Button variants:** `.btn--primary` · `.btn--outline` · `.btn--ghost` · `.btn--white` · `.btn--danger` · `.btn--full`

---

## JavaScript Architecture (`main.js`)

All JavaScript lives in one file, organized into numbered sections:

| Section | Purpose |
|---|---|
| 1 | `UGANDA_DISTRICTS` array — all 50 districts |
| 2 | `populateDistrictDropdowns()` — fills every `<select class="district-select">` |
| 3 | `DEFAULT_LISTINGS` — 12 seed properties (6 land, 6 rent) |
| 4 | Data helpers: `getListings()`, `saveListings()` |
| 5 | Cart: `getCart()`, `saveCart()`, `toggleCart()`, `addToCartThenGo()`, `updateCartBadge()` |
| 6 | Card renderer: `createCard(listing)` — full HTML string |
| 7 | Photo slideshow: `initCardSlideshows()` — auto-rotate every 4 s |
| 8 | Home renderer: `renderHomeListings()` — featured land + rent |
| 9 | Properties page renderer: `renderPropertyPage(results)` |
| 10 | Search & filter: `handleSearch()`, `initPropertyFilters()` |
| 11 | Hero tags: `initHeroTags()` — quick-filter clicks |
| 12 | Animated counters: `initCounters()` |
| 13 | Fade-in on scroll: `observeFadeIns()` (IntersectionObserver) |
| 14 | Navbar: `initNavbar()` — scroll effect, hamburger, active link |
| 15 | Contact form: `initContactForm()` — validate, save to inbox |
| 16 | Messages: `getMessages()`, `saveMessages()`, `deleteMessage()`, `getUnreadCount()` |
| 17 | Reviews: `initStarPicker()`, `initReviewForm()`, review render |
| 18 | Cart page: `renderCartPage()` — list items + WhatsApp link |
| 19 | Admin login: `initLogin()`, `getAdminCreds()`, `saveAdminCreds()` |
| 20 | Admin init: `initAdmin()` — renders table, form, inbox |
| 21 | Admin table: `renderAdminTable()` — all listings as table rows |
| 22 | Admin actions: `toggleAvailability()`, `toggleFeatured()`, `deleteListing()`, `resetAllListings()` |
| 23 | Inbox render: `renderInbox()` — messages with unread state |
| 24 | Toast: `showToast(message)` |
| 25 | Back to top: `initBackToTop()` |
| 26 | `DOMContentLoaded` init — calls all page-specific functions |

---

## Data & Storage

All data is persisted in `localStorage` under these keys:

| Key | Contents |
|---|---|
| `pp_listings` | Array of all property listing objects |
| `pp_cart` | Array of saved/enquired property objects |
| `pp_messages` | Array of contact form submissions |
| `pp_reviews` | Array of client testimonies |
| `pp_admin_creds` | Object `{ username, password }` |

**Default behaviour:** If `pp_listings` is empty/missing, `DEFAULT_LISTINGS` (12 properties) is used automatically. The admin can delete all and start fresh.

**Listing object shape:**
```js
{
  id:           Number,       // unique integer
  type:         "land"|"rent",
  title:        String,
  location:     String,       // display string e.g. "Layibi Division, Gulu City"
  locationKey:  String,       // district slug e.g. "gulu"
  price:        Number,       // raw UGX amount
  priceLabel:   String,       // e.g. "UGX 45,000,000"
  priceNote:    String,       // e.g. "Negotiable" or "per month"
  features:     String[],     // e.g. ["50×100ft", "Titled", "Near Road"]
  featureIcons: String[],     // Tabler icon classes e.g. ["ti-ruler","ti-certificate"]
  description:  String,
  photos:       String[],     // base64 or URL strings
  available:    Boolean,
  featured:     Boolean
}
```

---

## Admin Panel — Full Guide

### File: `admin.html`

The Admin page is a **password-protected management dashboard**. It is linked from every page's navbar (`Admin` button, top right).

### Login Screen

When the admin page loads, it checks `localStorage` for saved credentials. If none exist, default credentials are used:

- **Default Username:** `admin`
- **Default Password:** `prestige2025`

The login screen shows:
- Prestige Properties logo + "Admin Login" heading
- Username input field
- Password input field (with show/hide toggle)
- "Login" button
- On wrong credentials → error message shown inline

### After Login — Dashboard Layout

The dashboard has a **top header bar** with:
- Page title "Admin Dashboard"
- Logged-in user label
- "Logout" button

Below the header, content is organized in tabs or stacked sections:

#### Section 1 — Stats Row
Four stat cards:
| Stat | Source |
|---|---|
| Total Listings | `getListings().length` |
| Available | listings where `available === true` |
| Taken / Sold | listings where `available === false` |
| Unread Messages | `getUnreadCount()` |

Each stat card: purple icon, large serif number, muted uppercase label.

#### Section 2 — Listings Table (`.admin-table-wrap`)

A scrollable table with columns:
`#` · `Title / Location` · `Type` · `Price` · `Photos` · `Featured` · `Status` · `Actions`

- **Type badge:** Land (blue) or Rent (green) pill
- **Photos:** count with camera icon, or "No photos" in muted colour
- **Featured:** filled gold star if featured, outline star if not
- **Status badge:** green "Available" or red "Taken" pill
- **Actions:**
  - 🔄 Toggle Available/Taken
  - ⭐ Toggle Featured/Unfeatured
  - 🗑 Delete listing (confirm dialog)

Below the table: a **"Reset All Listings"** danger button (prompts double confirmation).

#### Section 3 — Add New Listing Form (`.admin-form-section`)

Form fields:
```
Property Title         [text input]
Type                   [select: Land for Sale / House for Rent]
District               [select: all Uganda districts — auto-populated]
Location (full)        [text input — e.g. "Layibi Division, Gulu City"]
Price (UGX)            [number input]
Price Note             [text input — e.g. "Negotiable" / "per month"]
Description            [textarea]

Features (up to 4):
  Feature 1 text       [text input]   Icon  [select: common tabler icons]
  Feature 2 text       [text input]   Icon  [select]
  Feature 3 text       [text input]   Icon  [select]
  Feature 4 text       [text input]   Icon  [select]

Photos                 [file input, multiple, accept images]
  → Preview grid shown below (with × delete buttons on each thumb)

Mark as Featured       [checkbox]
Mark as Available      [checkbox, checked by default]

[Add Listing] button → saves to localStorage, refreshes table, shows toast
```

#### Section 4 — Change Admin Credentials

```
New Username           [text input]
New Password           [password input]
Confirm Password       [password input]
[Save Credentials]     button
```

Validates passwords match before saving. Shows success/error message.

#### Section 5 — Inbox (`.inbox-list`)

All contact form messages from visitors, newest first.

Each message card (`.inbox-msg`) shows:
- Sender name (bold) + timestamp (right)
- Subject / interest type (purple)
- Message body
- Tags: phone number, email address
- Delete button (removes from localStorage)
- Unread messages have a purple left border (`.inbox-msg.unread`)

Above the list: **"Mark All Read"** button + unread count badge.

Empty state: mail-off icon + "No messages yet."

### Admin CSS Classes (already in `style.css`)

All admin styles are already written in `style.css`. The key classes are:

```
.admin-page              Main page wrapper (padding-top for fixed navbar)
.admin-header            Flex row: title + logout button
.admin-header__title     Serif font, large
.admin-stats             CSS Grid of stat cards
.admin-stat              Individual stat card
.admin-stat__icon        Purple square icon
.admin-stat__val         Large serif number
.admin-stat__label       Muted uppercase label
.admin-table-wrap        Scroll container, white card
.admin-table             Full-width borderless table
.status-badge            Pill badge
.status-badge--available Green
.status-badge--sold      Red
.admin-form-section      White card with heading
.photo-upload-grid       Grid of photo thumbnails
.photo-thumb             Individual thumb with delete overlay
.inbox-list              Flex column of messages
.inbox-msg               Message card
.inbox-msg.unread        Purple left border (3px)
.inbox-msg__from         Bold sender name
.inbox-msg__subject      Purple interest line
.inbox-msg__tag          Purple pill: phone / email
.inbox-empty             Centred empty state
```

---

## Deployment

### Option A — Netlify (Recommended)

1. Push all files to a GitHub repository.
2. Connect the repo to [Netlify](https://netlify.com).
3. Deploy — Netlify auto-detects static files, no build command needed.
4. Contact form submissions will also be captured by Netlify Forms (no extra code needed — the `data-netlify="true"` attribute is already on the forms).

### Option B — GitHub Pages

1. Push to a GitHub repository.
2. Go to **Settings → Pages → Source → main branch / root**.
3. Your site will be live at `https://yourusername.github.io/repo-name/`.

### Option C — Any Static Host

Upload all files (HTML, CSS, JS, PNG) to any web host — Vercel, Firebase Hosting, Hostinger, etc.

---

## Customisation Checklist

Before going live, update the following placeholders:

- [ ] **Logo** — Replace `ppLogo.png` with your real logo file.
- [ ] **Phone number** — Search `+256 7XX XXX XXX` and replace with your real number (appears in navbar, footer, contact page, and WhatsApp link).
- [ ] **Email** — Search `info@prestigeproperties.ug` and replace.
- [ ] **Location** — Search `Gulu City` and replace with your actual head office location.
- [ ] **Social media links** — Update all `facebook.com/YOUR_PAGE`, `instagram.com/YOUR_HANDLE`, `wa.me/2567XXXXXXXX`, LinkedIn, TikTok links in the footer of every page.
- [ ] **Admin password** — After deployment, log in to `admin.html` and change credentials in the "Change Credentials" section immediately.
- [ ] **Default listings** — Remove or edit the 12 demo listings in `main.js` `DEFAULT_LISTINGS` array, or add real properties through the Admin panel (which overrides defaults).
- [ ] **Copyright year** — Footer shows `© 2025`. Update to current year if needed.
- [ ] **Meta descriptions** — Each page has a `<meta name="description">` tag. Customise for SEO.

---

## Browser Support

Works in all modern browsers: Chrome, Firefox, Edge, Safari. Requires JavaScript enabled. Uses `localStorage` — will not work in private/incognito mode on some browsers without a prompt.

---

## License

This project is proprietary to **Prestige Properties**. All rights reserved.

---

*Built with care for Uganda's property market. 🇺🇬*