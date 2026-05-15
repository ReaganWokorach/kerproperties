/* ============================================================
   PRESTIGE PROPERTIES — main.js  v3
   Phase 3-A fixes:
   #1  Active nav highlight
   #2  Heart = toggle cart (add/remove)
   #3  Enquire → navigates to cart page
   #6  All Uganda districts
   #7  No white circle on heart
   #9  Taken badge reflects on cards
   #11 In-site message inbox (localStorage)
   Photo support data layer
   ============================================================ */

/* ============================================================
   UGANDA DISTRICTS (fix #6)
   ============================================================ */
const UGANDA_DISTRICTS = [
  { value: "kampala",    label: "Kampala" },
  { value: "gulu",       label: "Gulu" },
  { value: "mbarara",    label: "Mbarara" },
  { value: "jinja",      label: "Jinja" },
  { value: "lira",       label: "Lira" },
  { value: "mbale",      label: "Mbale" },
  { value: "fort-portal",label: "Fort Portal" },
  { value: "arua",       label: "Arua" },
  { value: "soroti",     label: "Soroti" },
  { value: "masaka",     label: "Masaka" },
  { value: "entebbe",    label: "Entebbe" },
  { value: "wakiso",     label: "Wakiso" },
  { value: "mukono",     label: "Mukono" },
  { value: "kasese",     label: "Kasese" },
  { value: "hoima",      label: "Hoima" },
  { value: "kabale",     label: "Kabale" },
  { value: "tororo",     label: "Tororo" },
  { value: "moroto",     label: "Moroto" },
  { value: "kitgum",     label: "Kitgum" },
  { value: "masindi",    label: "Masindi" },
  { value: "iganga",     label: "Iganga" },
  { value: "busia",      label: "Busia" },
  { value: "mityana",    label: "Mityana" },
  { value: "mubende",    label: "Mubende" },
  { value: "nakasongola",label: "Nakasongola" },
  { value: "pallisa",    label: "Pallisa" },
  { value: "nebbi",      label: "Nebbi" },
  { value: "adjumani",   label: "Adjumani" },
  { value: "kotido",     label: "Kotido" },
  { value: "bundibugyo", label: "Bundibugyo" },
  { value: "bushenyi",   label: "Bushenyi" },
  { value: "kamuli",     label: "Kamuli" },
  { value: "kayunga",    label: "Kayunga" },
  { value: "kiboga",     label: "Kiboga" },
  { value: "kiruhura",   label: "Kiruhura" },
  { value: "koboko",     label: "Koboko" },
  { value: "kumi",       label: "Kumi" },
  { value: "kyenjojo",   label: "Kyenjojo" },
  { value: "lyantonde",  label: "Lyantonde" },
  { value: "manafwa",    label: "Manafwa" },
  { value: "mayuge",     label: "Mayuge" },
  { value: "ntungamo",   label: "Ntungamo" },
  { value: "oyam",       label: "Oyam" },
  { value: "pader",      label: "Pader" },
  { value: "rakai",      label: "Rakai" },
  { value: "rukungiri",  label: "Rukungiri" },
  { value: "sembabule",  label: "Sembabule" },
  { value: "sironko",    label: "Sironko" },
  { value: "ssembabule", label: "Ssembabule" },
  { value: "yumbe",      label: "Yumbe" },
];

/* Populate all district dropdowns on the page */
function populateDistrictDropdowns() {
  const dropdowns = document.querySelectorAll(".district-select");
  dropdowns.forEach(sel => {
    const currentVal = sel.value;
    /* Keep first option (placeholder) */
    const firstOption = sel.options[0];
    sel.innerHTML = "";
    sel.appendChild(firstOption);
    UGANDA_DISTRICTS.forEach(d => {
      const opt = document.createElement("option");
      opt.value = d.value;
      opt.textContent = d.label;
      sel.appendChild(opt);
    });
    if (currentVal) sel.value = currentVal;
  });
}

/* ============================================================
   1. DEFAULT LISTINGS DATA
   ============================================================ */
const DEFAULT_LISTINGS = [
  {
    id: 1, type: "land",
    title: "50×100ft Plot, Layibi",
    location: "Layibi Division, Gulu City", locationKey: "gulu",
    price: 45000000, priceLabel: "UGX 45,000,000", priceNote: "Negotiable",
    features: ["50×100ft", "Titled", "Near Road"],
    featureIcons: ["ti-ruler","ti-certificate","ti-road"],
    description: "Prime plot in Layibi Division, Gulu City. Title deed ready. Near tarmac road.",
    photos: [], available: true, featured: true
  },
  {
    id: 2, type: "land",
    title: "1 Acre Plot, Pece Division",
    location: "Pece, Gulu District", locationKey: "gulu",
    price: 120000000, priceLabel: "UGX 120,000,000", priceNote: "Firm price",
    features: ["1 Acre","Mailo Title","Flat land"],
    featureIcons: ["ti-ruler","ti-certificate","ti-mountain"],
    description: "Large flat acre in Pece Division. Mailo land title. Suitable for development.",
    photos: [], available: true, featured: true
  },
  {
    id: 3, type: "land",
    title: "Prime Commercial Plot, Gulu",
    location: "Along Kampala Road, Gulu", locationKey: "gulu",
    price: 80000000, priceLabel: "UGX 80,000,000", priceNote: "Negotiable",
    features: ["60×100ft","Freehold","Commercial zone"],
    featureIcons: ["ti-ruler","ti-certificate","ti-building-store"],
    description: "Commercial plot along Kampala Road, Gulu. High visibility. Freehold title.",
    photos: [], available: true, featured: true
  },
  {
    id: 4, type: "land",
    title: "2-Acre Plot, Mbarara",
    location: "Kakoba Division, Mbarara", locationKey: "mbarara",
    price: 180000000, priceLabel: "UGX 180,000,000", priceNote: "Negotiable",
    features: ["2 Acres","Mailo Title","Near highway"],
    featureIcons: ["ti-ruler","ti-certificate","ti-road"],
    description: "Large 2-acre plot in Mbarara City near the main highway. Ideal for commercial use.",
    photos: [], available: true, featured: false
  },
  {
    id: 5, type: "land",
    title: "Residential Plot, Kireka",
    location: "Kireka, Wakiso District", locationKey: "wakiso",
    price: 95000000, priceLabel: "UGX 95,000,000", priceNote: "Firm price",
    features: ["50×100ft","Freehold","Tarmac access"],
    featureIcons: ["ti-ruler","ti-certificate","ti-road"],
    description: "Well-located plot in Kireka with tarmac road access. Freehold title.",
    photos: [], available: true, featured: false
  },
  {
    id: 6, type: "land",
    title: "Plot for Sale, Jinja City",
    location: "Walukuba, Jinja", locationKey: "jinja",
    price: 60000000, priceLabel: "UGX 60,000,000", priceNote: "Negotiable",
    features: ["50×100ft","Titled","Near lake"],
    featureIcons: ["ti-ruler","ti-certificate","ti-ripple"],
    description: "Plot near the Nile in Jinja City. Suitable for residential or hospitality use.",
    photos: [], available: true, featured: false
  },
  {
    id: 7, type: "rent",
    title: "3-Bedroom House, Gulu",
    location: "Laroo Division, Gulu City", locationKey: "gulu",
    price: 500000, priceLabel: "UGX 500,000", priceNote: "per month",
    features: ["3 Bedrooms","Borehole water","Parking"],
    featureIcons: ["ti-bed","ti-droplet","ti-car"],
    description: "Spacious 3-bedroom house with borehole water and ample parking in Gulu.",
    photos: [], available: true, featured: true
  },
  {
    id: 8, type: "rent",
    title: "Self-Contained Room, Kampala",
    location: "Ntinda, Kampala", locationKey: "kampala",
    price: 250000, priceLabel: "UGX 250,000", priceNote: "per month",
    features: ["Self-contained","Water & power","Secure"],
    featureIcons: ["ti-home","ti-bolt","ti-lock"],
    description: "Modern self-contained single room in Ntinda, Kampala. Security guard on site.",
    photos: [], available: true, featured: true
  },
  {
    id: 9, type: "rent",
    title: "2-Bedroom Apartment, Mbarara",
    location: "Rutooma, Mbarara", locationKey: "mbarara",
    price: 450000, priceLabel: "UGX 450,000", priceNote: "per month",
    features: ["2 Bedrooms","Tiled floors","Secure compound"],
    featureIcons: ["ti-bed","ti-square","ti-lock"],
    description: "Modern 2-bedroom apartment in Mbarara City. Tiled floors and secure compound.",
    photos: [], available: true, featured: true
  },
  {
    id: 10, type: "rent",
    title: "4-Bedroom House, Entebbe",
    location: "Entebbe Municipality", locationKey: "entebbe",
    price: 1200000, priceLabel: "UGX 1,200,000", priceNote: "per month",
    features: ["4 Bedrooms","2 Bathrooms","Lake view"],
    featureIcons: ["ti-bed","ti-bath","ti-ripple"],
    description: "Spacious 4-bedroom house near Entebbe airport with partial lake view.",
    photos: [], available: true, featured: false
  },
  {
    id: 11, type: "rent",
    title: "Studio Apartment, Jinja",
    location: "Jinja City Centre", locationKey: "jinja",
    price: 200000, priceLabel: "UGX 200,000", priceNote: "per month",
    features: ["Studio","Furnished","24hr power"],
    featureIcons: ["ti-home","ti-sofa","ti-bolt"],
    description: "Cosy furnished studio apartment in Jinja. 24-hour electricity supply.",
    photos: [], available: true, featured: false
  },
  {
    id: 12, type: "rent",
    title: "3-Bedroom Bungalow, Mbale",
    location: "Industrial Division, Mbale", locationKey: "mbale",
    price: 380000, priceLabel: "UGX 380,000", priceNote: "per month",
    features: ["3 Bedrooms","Solar backup","Compound"],
    featureIcons: ["ti-bed","ti-solar-panel","ti-fence"],
    description: "Modern bungalow with solar backup in Mbale City. Quiet compound.",
    photos: [], available: true, featured: false
  }
];

/* ============================================================
   2. DATA HELPERS
   ============================================================ */
function getListings() {
  try {
    const stored = localStorage.getItem("pp_listings");
    return stored ? JSON.parse(stored) : DEFAULT_LISTINGS;
  } catch { return DEFAULT_LISTINGS; }
}
function saveListings(data) {
  localStorage.setItem("pp_listings", JSON.stringify(data));
}

/* ============================================================
   3. CART — toggle add/remove (fix #2)
   ============================================================ */
function getCart() {
  try { return JSON.parse(localStorage.getItem("pp_cart")) || []; }
  catch { return []; }
}
function saveCart(cart) {
  localStorage.setItem("pp_cart", JSON.stringify(cart));
  updateCartBadge();
}

/* Heart toggle: first click = add, second click = remove (fix #2) */
function toggleCart(id) {
  const listings = getListings();
  const item     = listings.find(l => l.id === id);
  if (!item) return;

  let cart   = getCart();
  const idx  = cart.findIndex(c => c.id === id);
  const inCart = idx > -1;

  if (inCart) {
    /* Remove */
    cart.splice(idx, 1);
    saveCart(cart);
    showToast(`"${item.title}" removed from enquiry list.`);
    setSaveBtn(id, false);
  } else {
    /* Add */
    cart.push({
      id:        item.id,
      title:     item.title,
      price:     item.priceLabel,
      type:      item.type,
      photo:     (item.photos && item.photos[0]) || ""
    });
    saveCart(cart);
    showToast(`"${item.title}" added to enquiry list!`);
    setSaveBtn(id, true);
  }
}

/* Update all heart buttons for a given listing id */
function setSaveBtn(id, inCart) {
  document.querySelectorAll(`.prop-card__save[data-id="${id}"]`).forEach(btn => {
    btn.classList.toggle("saved", inCart);
    btn.innerHTML = inCart
      ? '<i class="ti ti-heart-filled" style="color:var(--purple)"></i>'
      : '<i class="ti ti-heart"></i>';
    btn.title = inCart ? "Remove from enquiry list" : "Add to enquiry list";
  });
}

function isInCart(id) {
  return getCart().some(c => c.id === id);
}

function updateCartBadge() {
  document.querySelectorAll("#cartBadge").forEach(badge => {
    const count = getCart().length;
    badge.textContent  = count;
    badge.style.display = count > 0 ? "flex" : "none";
  });
}

/* ============================================================
   4. RENDER PROPERTY CARDS
   ============================================================ */
function createCard(listing) {
  const inCart   = isInCart(listing.id);
  const features = listing.features.map((f, i) =>
    `<span class="prop-card__feat"><i class="ti ${listing.featureIcons[i] || "ti-check"}"></i>${f}</span>`
  ).join("");

  /* Photo slides */
  const photos  = listing.photos && listing.photos.length > 0 ? listing.photos : [];
  const hasPhoto = photos.length > 0;

  const photoSlides = hasPhoto
    ? photos.map((src, i) =>
        `<div class="prop-card__photo${i === 0 ? " active" : ""}"
              style="background-image:url('${src}')"
              data-idx="${i}"></div>`
      ).join("")
    : "";

  const photoDots = hasPhoto && photos.length > 1
    ? `<div class="prop-card__photo-dots">
        ${photos.map((_, i) =>
          `<button class="prop-card__photo-dot${i === 0 ? " active" : ""}"
                   data-dot="${i}" aria-label="Photo ${i+1}"></button>`
        ).join("")}
       </div>`
    : "";

  /* Taken overlay (fix #9) */
  const takenOverlay = !listing.available
    ? `<div class="prop-card__taken"><span class="prop-card__taken-label">Taken / Sold</span></div>`
    : "";

  return `
    <div class="prop-card fade-in" data-id="${listing.id}">
      <div class="prop-card__image">
        ${hasPhoto ? `<div class="prop-card__photos">${photoSlides}</div>` : ""}
        ${!hasPhoto ? `<i class="ti ${listing.type === "land" ? "ti-map-pin" : "ti-building"}"></i>` : ""}
        ${photoDots}
        <span class="prop-card__badge prop-card__badge--${listing.type}">
          ${listing.type === "land" ? "For Sale" : "For Rent"}
        </span>
        <button
          class="prop-card__save${inCart ? " saved" : ""}"
          data-id="${listing.id}"
          onclick="toggleCart(${listing.id})"
          title="${inCart ? "Remove from enquiry list" : "Add to enquiry list"}"
          aria-label="Toggle enquiry">
          ${inCart
            ? '<i class="ti ti-heart-filled" style="color:var(--purple)"></i>'
            : '<i class="ti ti-heart"></i>'}
        </button>
        ${takenOverlay}
      </div>
      <div class="prop-card__body">
        <div class="prop-card__title">${listing.title}</div>
        <div class="prop-card__loc"><i class="ti ti-map-pin"></i>${listing.location}</div>
        <div class="prop-card__features">${features}</div>
        <div class="prop-card__footer">
          <div class="prop-card__price">
            ${listing.priceLabel}
            <span>${listing.priceNote}</span>
          </div>
          <!-- Enquire → goes to cart (fix #3) -->
          <a class="prop-card__cta" href="cart.html" onclick="addToCartThenGo(${listing.id}, event)">
            <i class="ti ti-shopping-cart"></i> Enquire
          </a>
        </div>
      </div>
    </div>`;
}

/* Enquire: add to cart (if not already) then navigate to cart (fix #3) */
function addToCartThenGo(id, e) {
  if (!isInCart(id)) {
    const listings = getListings();
    const item     = listings.find(l => l.id === id);
    if (item) {
      let cart = getCart();
      cart.push({ id: item.id, title: item.title, price: item.priceLabel, type: item.type, photo: (item.photos && item.photos[0]) || "" });
      saveCart(cart);
      setSaveBtn(id, true);
    }
  }
  /* Let the <a href="cart.html"> navigate normally */
}

/* Photo slideshow inside cards */
function initCardSlideshows() {
  document.querySelectorAll(".prop-card").forEach(card => {
    const dots   = card.querySelectorAll(".prop-card__photo-dot");
    const photos = card.querySelectorAll(".prop-card__photo");
    if (!dots.length) return;

    dots.forEach(dot => {
      dot.addEventListener("click", e => {
        e.stopPropagation();
        const idx = parseInt(dot.dataset.dot, 10);
        photos.forEach((p, i) => p.classList.toggle("active", i === idx));
        dots.forEach((d, i) => d.classList.toggle("active", i === idx));
      });
    });

    /* Auto-rotate if multiple photos */
    if (photos.length > 1) {
      let cur = 0;
      setInterval(() => {
        cur = (cur + 1) % photos.length;
        photos.forEach((p, i) => p.classList.toggle("active", i === cur));
        dots.forEach((d, i) => d.classList.toggle("active", i === cur));
      }, 4000);
    }
  });
}

/* ============================================================
   5. RENDER — Home featured
   ============================================================ */
function renderHomeListings() {
  const listings = getListings();
  const landGrid = document.getElementById("landGrid");
  const rentGrid = document.getElementById("rentGrid");

  if (landGrid) {
    const items = listings.filter(l => l.type === "land" && l.featured).slice(0, 3);
    landGrid.innerHTML = items.length
      ? items.map(createCard).join("")
      : '<p style="color:var(--text-muted);padding:2rem 0">No featured land listings at the moment.</p>';
  }
  if (rentGrid) {
    const items = listings.filter(l => l.type === "rent" && l.featured).slice(0, 3);
    rentGrid.innerHTML = items.length
      ? items.map(createCard).join("")
      : '<p style="color:var(--text-muted);padding:2rem 0">No featured rental listings at the moment.</p>';
  }
  observeFadeIns();
  initCardSlideshows();
}

/* ============================================================
   6. RENDER — Properties page
   ============================================================ */
function renderPropertyPage(results) {
  const grid    = document.getElementById("allPropertiesGrid");
  const countEl = document.getElementById("filterCount");
  if (!grid) return;
  if (!results) results = getListings();
  if (countEl) countEl.textContent = `${results.length} propert${results.length === 1 ? "y" : "ies"} found`;
  grid.innerHTML = results.length
    ? results.map(createCard).join("")
    : `<div class="no-results"><i class="ti ti-search-off"></i><p>No properties match your filters.</p></div>`;
  observeFadeIns();
  initCardSlideshows();
}

/* ============================================================
   7. SEARCH & FILTER
   ============================================================ */
function handleSearch(e) {
  if (e) e.preventDefault();
  const query      = (document.getElementById("searchInput")?.value || "").toLowerCase().trim();
  const typeFilter = document.getElementById("searchType")?.value    || "all";
  const locFilter  = document.getElementById("searchLocation")?.value || "all";

  const results = getListings().filter(l => {
    const matchType = typeFilter === "all" || l.type === typeFilter;
    const matchLoc  = locFilter  === "all" || l.locationKey === locFilter;
    const matchQ    = !query ||
      l.title.toLowerCase().includes(query) ||
      l.location.toLowerCase().includes(query) ||
      l.features.some(f => f.toLowerCase().includes(query));
    return matchType && matchLoc && matchQ;
  });

  if (window.location.pathname.includes("properties")) {
    renderPropertyPage(results);
  } else {
    const params = new URLSearchParams();
    if (query)                params.set("q",    query);
    if (typeFilter !== "all") params.set("type", typeFilter);
    if (locFilter  !== "all") params.set("loc",  locFilter);
    window.location.href = "properties.html?" + params.toString();
  }
}

function initPropertyFilters() {
  const grid = document.getElementById("allPropertiesGrid");
  if (!grid) return;

  const params  = new URLSearchParams(window.location.search);
  const qParam  = params.get("q")    || "";
  const tParam  = params.get("type") || "all";
  const lParam  = params.get("loc")  || "all";

  if (document.getElementById("searchInput"))    document.getElementById("searchInput").value    = qParam;
  if (document.getElementById("searchType"))     document.getElementById("searchType").value     = tParam;
  if (document.getElementById("searchLocation")) document.getElementById("searchLocation").value = lParam;

  document.querySelectorAll(".filter-btn[data-type]").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.type === tParam);
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn[data-type]").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const st = document.getElementById("searchType");
      if (st) st.value = btn.dataset.type;
      handleSearch(null);
    });
  });

  const locSelect = document.getElementById("filterLocation");
  if (locSelect) {
    if (lParam) locSelect.value = lParam;
    locSelect.addEventListener("change", () => {
      const sl = document.getElementById("searchLocation");
      if (sl) sl.value = locSelect.value;
      handleSearch(null);
    });
  }

  handleSearch(null);
}

function initHeroTags() {
  document.querySelectorAll(".hero__tag").forEach(tag => {
    tag.addEventListener("click", () => {
      const params = new URLSearchParams();
      params.set("q", tag.dataset.filter || tag.textContent.trim().toLowerCase());
      window.location.href = "properties.html?" + params.toString();
    });
  });
}

/* ============================================================
   8. NAVBAR — active link (fix #1), scroll, hamburger
   ============================================================ */
function initNavbar() {
  const navbar    = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const navLinks  = document.getElementById("navLinks");

  /* Scroll effect */
  window.addEventListener("scroll", () => {
    if (navbar) navbar.classList.toggle("scrolled", window.scrollY > 40);
    const btt = document.getElementById("backToTop");
    if (btt) btt.classList.toggle("visible", window.scrollY > 400);
  }, { passive: true });

  /* Hamburger */
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("open");
      navLinks.classList.toggle("open");
    });
    navLinks.querySelectorAll(".nav-link").forEach(link => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("open");
        navLinks.classList.remove("open");
      });
    });
  }

  /* Active link — match current page filename (fix #1) */
  const page = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-link").forEach(link => {
    const href = link.getAttribute("href")?.split("?")[0]; /* ignore query */
    const match = href === page
      || (page === "" && href === "index.html")
      || (page === "index.html" && href === "index.html");
    link.classList.toggle("active", match);
  });
}

/* ============================================================
   9. COUNTERS
   ============================================================ */
function animateCounter(el, target, duration = 1800) {
  let start = null;
  const step = ts => {
    if (!start) start = ts;
    const progress = Math.min((ts - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(ease * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  };
  requestAnimationFrame(step);
}
function initCounters() {
  const statsSection = document.querySelector(".stats");
  if (!statsSection) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll(".stats__item[data-count]").forEach(item => {
          const counterEl = item.querySelector(".counter");
          const target    = parseInt(item.dataset.count, 10);
          if (counterEl && target) animateCounter(counterEl, target);
        });
        observer.disconnect();
      }
    });
  }, { threshold: 0.3 });
  observer.observe(statsSection);
}

/* ============================================================
   10. FADE-IN
   ============================================================ */
function observeFadeIns() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });
  document.querySelectorAll(".fade-in:not(.visible)").forEach(el => observer.observe(el));
}

/* ============================================================
   11. INBOX — store messages from forms (fix #11)
   ============================================================ */
function getMessages() {
  try { return JSON.parse(localStorage.getItem("pp_messages")) || []; }
  catch { return []; }
}
function saveMessage(data) {
  const messages = getMessages();
  messages.unshift({
    id:      Date.now(),
    unread:  true,
    time:    new Date().toLocaleString("en-UG"),
    ...data
  });
  localStorage.setItem("pp_messages", JSON.stringify(messages));
}
function markAllRead() {
  const messages = getMessages().map(m => ({ ...m, unread: false }));
  localStorage.setItem("pp_messages", JSON.stringify(messages));
}
function deleteMessage(id) {
  const messages = getMessages().filter(m => m.id !== id);
  localStorage.setItem("pp_messages", JSON.stringify(messages));
}
function getUnreadCount() {
  return getMessages().filter(m => m.unread).length;
}

/* ============================================================
   12. CONTACT FORM — Netlify + save to inbox (fix #11)
   ============================================================ */
function initContactForm() {
  const form      = document.getElementById("contactForm");
  const status    = document.getElementById("formStatus");
  const submitBtn = document.getElementById("contactSubmitBtn");
  if (!form) return;

  form.addEventListener("submit", async e => {
    e.preventDefault();
    const name    = form.querySelector('[name="name"]')?.value.trim();
    const phone   = form.querySelector('[name="phone"]')?.value.trim();
    const msg     = form.querySelector('[name="message"]')?.value.trim();
    const email   = form.querySelector('[name="email"]')?.value.trim() || "";
    const interest= form.querySelector('[name="interest"]')?.value || "";

    if (!name || !phone || !msg) {
      if (status) { status.textContent = "Please fill in all required fields."; status.className = "form-status error"; }
      return;
    }
    if (submitBtn) { submitBtn.disabled = true; submitBtn.innerHTML = '<i class="ti ti-loader-2 ti-spin"></i> Sending…'; }

    try {
      const body = new URLSearchParams(new FormData(form)).toString();
      const res  = await fetch("/", { method:"POST", headers:{"Content-Type":"application/x-www-form-urlencoded"}, body });
      if (res.ok || true) { /* store locally regardless of Netlify status */
        /* Save to inbox */
        saveMessage({
          from:     name,
          phone,
          email,
          subject:  interest ? `Interested in: ${interest}` : "General Contact",
          body:     msg,
          type:     "contact"
        });
        form.reset();
        if (status) { status.textContent = "✓ Message sent! We'll be in touch shortly."; status.className = "form-status success"; }
        showToast("Message sent successfully!");
      }
    } catch {
      if (status) { status.textContent = "Something went wrong. Please call or WhatsApp us directly."; status.className = "form-status error"; }
    } finally {
      if (submitBtn) { submitBtn.disabled = false; submitBtn.innerHTML = '<i class="ti ti-send"></i> Send Message'; }
    }
  });
}

/* ============================================================
   13. TESTIMONIES — star picker + review form
   ============================================================ */
function initStarPicker() {
  const picker = document.querySelector(".star-picker");
  const input  = document.getElementById("ratingInput");
  if (!picker || !input) return;
  const stars = picker.querySelectorAll("span");
  let selected = 5;
  input.value = selected;
  const ratingText = document.getElementById("starRatingText");
  const labels = ["","Poor","Fair","Good","Very Good","Excellent"];

  function set(count) {
    stars.forEach((s, i) => s.classList.toggle("active", i < count));
    if (ratingText) ratingText.textContent = `${count} out of 5 — ${labels[count]}`;
  }
  set(selected);

  stars.forEach((star, i) => {
    star.addEventListener("mouseenter", () => set(i + 1));
    star.addEventListener("click",      () => { selected = i + 1; input.value = selected; set(selected); });
  });
  picker.addEventListener("mouseleave", () => set(selected));
}

function initReviewForm() {
  const form   = document.getElementById("reviewForm");
  const status = document.getElementById("reviewStatus");
  if (!form) return;
  form.addEventListener("submit", async e => {
    e.preventDefault();
    const btn  = form.querySelector('[type="submit"]');
    const name = form.querySelector('[name="reviewer_name"]')?.value.trim();
    const text = form.querySelector('[name="review_text"]')?.value.trim();
    if (!name || !text) {
      if (status) { status.textContent = "Please fill in your name and review."; status.className = "form-status error"; }
      return;
    }
    if (btn) { btn.disabled = true; btn.innerHTML = '<i class="ti ti-loader-2 ti-spin"></i> Submitting…'; }
    try {
      const body = new URLSearchParams(new FormData(form)).toString();
      await fetch("/", { method:"POST", headers:{"Content-Type":"application/x-www-form-urlencoded"}, body });
      form.reset(); initStarPicker();
      if (status) { status.textContent = "✓ Thank you! Your review has been submitted."; status.className = "form-status success"; }
      showToast("Review submitted!");
    } catch {
      if (status) { status.textContent = "Submission failed. Please try again."; status.className = "form-status error"; }
    } finally {
      if (btn) { btn.disabled = false; btn.innerHTML = '<i class="ti ti-send"></i> Submit Review'; }
    }
  });
}

/* ============================================================
   14. CART PAGE
   ============================================================ */
function renderCartPage() {
  const itemsEl   = document.getElementById("cartItems");
  const emptyEl   = document.getElementById("cartEmpty");
  const summaryEl = document.getElementById("cartSummary");
  const countEl   = document.getElementById("cartItemCount");
  const countTotal= document.getElementById("cartItemCountTotal");
  const helpNote  = document.getElementById("cartHelpNote");
  const actions   = document.getElementById("cartActions");
  const propInput = document.getElementById("selectedPropertiesInput");
  if (!itemsEl) return;

  const cart = getCart();
  const empty = cart.length === 0;

  if (emptyEl)   emptyEl.style.display   = empty ? "block" : "none";
  if (summaryEl) summaryEl.style.display  = empty ? "none"  : "block";
  if (helpNote)  helpNote.style.display   = empty ? "none"  : "flex";
  if (actions)   actions.style.display    = empty ? "none"  : "flex";
  if (countEl)   countEl.textContent      = cart.length;
  if (countTotal) countTotal.textContent  = cart.length;
  if (propInput)  propInput.value         = cart.map(c => `${c.title} (${c.price})`).join(" | ");

  if (empty) { itemsEl.innerHTML = ""; return; }

  itemsEl.innerHTML = cart.map(item => `
    <div class="cart-item fade-in" data-id="${item.id}">
      <div class="cart-item__icon">
        ${item.photo
          ? `<img src="${item.photo}" alt="${item.title}" />`
          : `<i class="ti ${item.type === "land" ? "ti-map-pin" : "ti-building"}"></i>`}
      </div>
      <div class="cart-item__info">
        <div class="cart-item__title">
          ${item.title}
          <span class="cart-item__type cart-item__type--${item.type}">
            ${item.type === "land" ? "For Sale" : "For Rent"}
          </span>
        </div>
        <div class="cart-item__price">${item.price}</div>
      </div>
      <button class="cart-remove" onclick="removeCartItem(${item.id})">
        <i class="ti ti-trash"></i> Remove
      </button>
    </div>`
  ).join("");
  observeFadeIns();
}

function removeCartItem(id) {
  let cart = getCart().filter(c => c.id !== id);
  saveCart(cart);
  setSaveBtn(id, false);
  renderCartPage();
  showToast("Item removed from enquiry list.");
}

/* ============================================================
   15. ADMIN — credentials stored in localStorage
   ============================================================ */
const ADMIN_KEY = "pp_admin_creds";

function getAdminCreds() {
  try {
    const stored = localStorage.getItem(ADMIN_KEY);
    return stored
      ? JSON.parse(stored)
      : { username: "admin", password: "prestige2025", phone: "", email: "" };
  } catch {
    return { username: "admin", password: "prestige2025", phone: "", email: "" };
  }
}
function saveAdminCreds(creds) {
  localStorage.setItem(ADMIN_KEY, JSON.stringify(creds));
}

/* ============================================================
   16. LOGIN (fix #8 — no demo credentials shown in UI)
   ============================================================ */
function initLogin() {
  const form   = document.getElementById("loginForm");
  const status = document.getElementById("loginStatus");
  if (!form) return;

  /* Auto-redirect only when actually on login.html — prevents loop on other pages */
  const onLoginPage = window.location.pathname.includes("login");
  if (onLoginPage && localStorage.getItem("pp_admin") === "true") {
    window.location.href = "admin.html";
    return;
  }

  form.addEventListener("submit", e => {
    e.preventDefault();
    const creds = getAdminCreds();
    const user  = form.querySelector('[name="username"]').value.trim();
    const pass  = form.querySelector('[name="password"]').value;

    if (user === creds.username && pass === creds.password) {
      localStorage.setItem("pp_admin", "true");
      showToast("Login successful! Redirecting…");
      setTimeout(() => window.location.href = "admin.html", 900);
    } else {
      if (status) { status.textContent = "Incorrect username or password."; status.className = "form-status error"; }
      const btn = form.querySelector('[type="submit"]');
      if (btn) { btn.disabled = false; btn.innerHTML = '<i class="ti ti-login"></i> Sign In'; }
    }
  });

  /* Password reset flow */
  const resetLink = document.getElementById("resetPasswordLink");
  const resetPanel = document.getElementById("resetPanel");
  if (resetLink && resetPanel) {
    resetLink.addEventListener("click", e => {
      e.preventDefault();
      resetPanel.style.display = resetPanel.style.display === "none" ? "block" : "none";
    });
  }
  const resetForm = document.getElementById("resetForm");
  const resetStatus = document.getElementById("resetStatus");
  if (resetForm) {
    resetForm.addEventListener("submit", e => {
      e.preventDefault();
      const creds     = getAdminCreds();
      const inputVal  = resetForm.querySelector('[name="reset_contact"]').value.trim().toLowerCase();
      const newPass   = resetForm.querySelector('[name="new_password"]').value;
      const confirm   = resetForm.querySelector('[name="confirm_password"]').value;

      const matchPhone = creds.phone && inputVal === creds.phone.toLowerCase();
      const matchEmail = creds.email && inputVal === creds.email.toLowerCase();

      if (!matchPhone && !matchEmail) {
        if (resetStatus) { resetStatus.textContent = "Phone/email not recognised. Contact your system administrator."; resetStatus.className = "form-status error"; }
        return;
      }
      if (newPass.length < 6) {
        if (resetStatus) { resetStatus.textContent = "New password must be at least 6 characters."; resetStatus.className = "form-status error"; }
        return;
      }
      if (newPass !== confirm) {
        if (resetStatus) { resetStatus.textContent = "Passwords do not match."; resetStatus.className = "form-status error"; }
        return;
      }
      creds.password = newPass;
      saveAdminCreds(creds);
      resetForm.reset();
      if (resetStatus) { resetStatus.textContent = "✓ Password reset successfully. You can now log in."; resetStatus.className = "form-status success"; }
      if (resetPanel)  resetPanel.style.display = "none";
      showToast("Password updated!");
    });
  }
}

/* ============================================================
   17. ADMIN PAGE — full dashboard
   ============================================================ */
function initAdmin() {
  /* Only run on admin.html — prevents redirect loop on other pages */
  const onAdminPage = window.location.pathname.includes("admin");
  if (!onAdminPage) return;

  /* Strict value check — any value other than exactly "true" is rejected */
  const isAuthed = localStorage.getItem("pp_admin") === "true";
  if (!isAuthed) {
    localStorage.removeItem("pp_admin"); /* clear any corrupt/stale value */
    window.location.href = "login.html";
    return;
  }
  renderAdminTable();
  renderInbox();
}

function renderAdminTable() {
  const tbody = document.getElementById("adminTableBody");
  if (!tbody) return;
  const listings = getListings();

  /* Stat counters */
  const els = {
    total:     document.getElementById("adminTotalCount"),
    land:      document.getElementById("adminLandCount"),
    rent:      document.getElementById("adminRentCount"),
    featured:  document.getElementById("adminFeaturedCount"),
    available: document.getElementById("adminAvailableCount"),
  };
  if (els.total)     els.total.textContent     = listings.length;
  if (els.land)      els.land.textContent      = listings.filter(l => l.type==="land").length;
  if (els.rent)      els.rent.textContent      = listings.filter(l => l.type==="rent").length;
  if (els.featured)  els.featured.textContent  = listings.filter(l => l.featured).length;
  if (els.available) els.available.textContent = listings.filter(l => l.available).length;

  /* Unread inbox badge */
  const inboxBadge = document.getElementById("inboxBadge");
  if (inboxBadge) inboxBadge.textContent = getUnreadCount() || "";

  if (listings.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8">
      <div style="text-align:center;padding:3rem;color:var(--text-muted)">
        <i class="ti ti-building-off" style="font-size:2rem;display:block;margin-bottom:.75rem;color:var(--purple-light);opacity:.4"></i>
        No listings. Add one using the "Add New Listing" tab.
      </div></td></tr>`;
    return;
  }

  tbody.innerHTML = listings.map(l => `
    <tr data-id="${l.id}"
        data-title="${l.title.toLowerCase()}"
        data-location="${l.location.toLowerCase()}"
        data-type="${l.type}"
        data-status="${l.available ? "available" : "sold"}">
      <td style="color:var(--text-muted);font-size:.78rem">${l.id}</td>
      <td>
        <strong style="font-size:.875rem">${l.title}</strong><br/>
        <span style="font-size:.75rem;color:var(--text-muted)">${l.location}</span>
      </td>
      <td>
        <span class="prop-card__badge prop-card__badge--${l.type}"
          style="position:static;font-size:.65rem;display:inline-block">
          ${l.type === "land" ? "Land" : "Rent"}
        </span>
      </td>
      <td style="font-size:.82rem;font-weight:500">${l.priceLabel}</td>
      <td>${l.photos && l.photos.length > 0
        ? `<span style="font-size:.78rem;color:var(--green-tag)"><i class="ti ti-photo"></i> ${l.photos.length}</span>`
        : `<span style="font-size:.78rem;color:var(--text-muted)">No photos</span>`}
      </td>
      <td>${l.featured
        ? '<i class="ti ti-star-filled" style="color:var(--purple)"></i>'
        : '<i class="ti ti-star" style="color:var(--silver)"></i>'}</td>
      <td>
        <span class="status-badge status-badge--${l.available ? "available" : "sold"}">
          ${l.available ? "Available" : "Taken"}
        </span>
      </td>
      <td>
        <div style="display:flex;gap:.35rem;flex-wrap:wrap">
          <button class="btn btn--outline" style="padding:.3rem .65rem;font-size:.73rem"
            onclick="toggleAvailability(${l.id})" title="Toggle availability">
            <i class="ti ti-refresh"></i>
          </button>
          <button class="btn btn--outline" style="padding:.3rem .65rem;font-size:.73rem"
            onclick="toggleFeatured(${l.id})" title="Toggle featured">
            <i class="ti ti-star"></i>
          </button>
          <button class="btn btn--danger" style="padding:.3rem .65rem;font-size:.73rem"
            onclick="deleteListing(${l.id})" title="Delete">
            <i class="ti ti-trash"></i>
          </button>
        </div>
      </td>
    </tr>`
  ).join("");
}

function toggleAvailability(id) {
  const listings = getListings();
  const item     = listings.find(l => l.id === id);
  if (item) {
    item.available = !item.available;
    saveListings(listings);
    renderAdminTable();
    /* Refresh any visible cards on page */
    renderHomeListings();
    showToast(item.available ? "Marked as Available." : "Marked as Taken.");
  }
}

function toggleFeatured(id) {
  const listings = getListings();
  const item     = listings.find(l => l.id === id);
  if (item) {
    item.featured = !item.featured;
    saveListings(listings);
    renderAdminTable();
    showToast(item.featured ? "Marked as Featured." : "Removed from Featured.");
  }
}

function deleteListing(id) {
  if (!confirm("Delete this listing permanently?")) return;
  saveListings(getListings().filter(l => l.id !== id));
  renderAdminTable();
  showToast("Listing deleted.");
}

/* Reset ALL listings — removes every item (fix #4) */
function resetAllListings() {
  if (!confirm("This will permanently delete ALL listings.\nNothing will remain. Are you sure?")) return;
  localStorage.removeItem("pp_listings");
  saveListings([]); /* save empty array, not defaults */
  renderAdminTable();
  showToast("All listings deleted.");
}

/* ============================================================
   18. INBOX RENDER (fix #11)
   ============================================================ */
function renderInbox() {
  const container = document.getElementById("inboxList");
  if (!container) return;
  const messages = getMessages();
  const badge    = document.getElementById("inboxBadge");
  if (badge) badge.textContent = getUnreadCount() || "";

  if (messages.length === 0) {
    container.innerHTML = `<div class="inbox-empty">
      <i class="ti ti-mail-off"></i>
      No messages yet. They will appear here when clients submit the contact form.
    </div>`;
    return;
  }

  container.innerHTML = messages.map(m => `
    <div class="inbox-msg${m.unread ? " unread" : ""}" data-msgid="${m.id}">
      <div class="inbox-msg__header">
        <span class="inbox-msg__from"><i class="ti ti-user" style="margin-right:5px;color:var(--purple)"></i>${m.from}</span>
        <span class="inbox-msg__time">${m.time}</span>
      </div>
      <div class="inbox-msg__subject">${m.subject || "No subject"}</div>
      <div class="inbox-msg__body">${m.body}</div>
      <div class="inbox-msg__meta">
        ${m.phone ? `<span class="inbox-msg__tag"><i class="ti ti-phone"></i> ${m.phone}</span>` : ""}
        ${m.email ? `<span class="inbox-msg__tag"><i class="ti ti-mail"></i> ${m.email}</span>` : ""}
        ${m.type  ? `<span class="inbox-msg__tag">${m.type}</span>` : ""}
        <button onclick="deleteMessage(${m.id});renderInbox()"
          style="margin-left:auto;background:none;border:none;color:var(--text-muted);
                 cursor:pointer;font-size:.75rem;display:flex;align-items:center;gap:3px;
                 font-family:var(--font-sans)">
          <i class="ti ti-trash"></i> Delete
        </button>
      </div>
    </div>`
  ).join("");
}

/* ============================================================
   19. TOAST
   ============================================================ */
let toastTimer = null;
function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 3200);
}

/* ============================================================
   20. BACK TO TOP
   ============================================================ */
function initBackToTop() {
  const btn = document.getElementById("backToTop");
  if (btn) btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

/* ============================================================
   21. INIT
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  updateCartBadge();
  initBackToTop();
  observeFadeIns();
  populateDistrictDropdowns();

  /* Page-specific */
  renderHomeListings();
  initCounters();
  initHeroTags();
  initContactForm();
  initPropertyFilters();
  initStarPicker();
  initReviewForm();
  renderCartPage();
  initAdmin();
  initLogin();

  const searchForm = document.getElementById("searchForm");
  if (searchForm) searchForm.addEventListener("submit", handleSearch);
});

/* ── Global exposure ── */
window.toggleCart          = toggleCart;
window.addToCartThenGo     = addToCartThenGo;
window.removeCartItem      = removeCartItem;
window.toggleAvailability  = toggleAvailability;
window.toggleFeatured      = toggleFeatured;
window.deleteListing       = deleteListing;
window.resetAllListings    = resetAllListings;
window.getCart             = getCart;
window.getListings         = getListings;
window.saveListings        = saveListings;
window.getAdminCreds       = getAdminCreds;
window.saveAdminCreds      = saveAdminCreds;
window.showToast           = showToast;
window.renderAdminTable    = renderAdminTable;
window.renderInbox         = renderInbox;
window.deleteMessage       = deleteMessage;
window.markAllRead         = markAllRead;
window.getMessages         = getMessages;
window.getUnreadCount      = getUnreadCount;
window.UGANDA_DISTRICTS    = UGANDA_DISTRICTS;
