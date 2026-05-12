/* ============================================================
   PRESTIGE PROPERTIES — main.js  (shared across all pages)
   ============================================================ */

/* ============================================================
   1. LISTINGS DATA
   ============================================================ */
const DEFAULT_LISTINGS = [
  {
    id: 1, type: "land",
    title: "50×100ft Plot, Layibi",
    location: "Layibi Division, Gulu City", locationKey: "gulu",
    price: 45000000, priceLabel: "UGX 45,000,000", priceNote: "Negotiable",
    features: ["50×100ft", "Titled", "Near Road"],
    featureIcons: ["ti-ruler", "ti-certificate", "ti-road"],
    description: "Prime plot in Layibi Division, Gulu City. Title deed ready. Near tarmac road.",
    available: true, featured: true
  },
  {
    id: 2, type: "land",
    title: "1 Acre Plot, Pece Division",
    location: "Pece, Gulu District", locationKey: "gulu",
    price: 120000000, priceLabel: "UGX 120,000,000", priceNote: "Firm price",
    features: ["1 Acre", "Mailo Title", "Flat land"],
    featureIcons: ["ti-ruler", "ti-certificate", "ti-mountain"],
    description: "Large flat acre in Pece Division. Mailo land title. Suitable for development.",
    available: true, featured: true
  },
  {
    id: 3, type: "land",
    title: "Prime Plot, Kampala Road",
    location: "Along Kampala Road, Gulu", locationKey: "gulu",
    price: 80000000, priceLabel: "UGX 80,000,000", priceNote: "Negotiable",
    features: ["60×100ft", "Freehold", "Commercial zone"],
    featureIcons: ["ti-ruler", "ti-certificate", "ti-building-store"],
    description: "Commercial plot along Kampala Road, Gulu. High visibility. Freehold title.",
    available: true, featured: true
  },
  {
    id: 4, type: "land",
    title: "2-Acre Farm Plot, Bardege",
    location: "Bardege Division, Gulu", locationKey: "gulu",
    price: 200000000, priceLabel: "UGX 200,000,000", priceNote: "Firm price",
    features: ["2 Acres", "Customary Title", "Borehole"],
    featureIcons: ["ti-ruler", "ti-certificate", "ti-droplet"],
    description: "Large farm plot in Bardege Division with existing borehole.",
    available: true, featured: false
  },
  {
    id: 5, type: "land",
    title: "Commercial Plot, Kireka",
    location: "Kireka, Kampala", locationKey: "kampala",
    price: 350000000, priceLabel: "UGX 350,000,000", priceNote: "Firm price",
    features: ["50×100ft", "Freehold", "High traffic"],
    featureIcons: ["ti-ruler", "ti-certificate", "ti-traffic-lights"],
    description: "Commercial plot in Kireka, Kampala. High foot traffic area. Title available.",
    available: true, featured: false
  },
  {
    id: 6, type: "land",
    title: "Residential Plot, Lira",
    location: "Adyel Division, Lira", locationKey: "other",
    price: 35000000, priceLabel: "UGX 35,000,000", priceNote: "Negotiable",
    features: ["50×100ft", "Titled", "Near school"],
    featureIcons: ["ti-ruler", "ti-certificate", "ti-school"],
    description: "Affordable plot in Lira City, Adyel Division. Close to schools and market.",
    available: true, featured: false
  },
  {
    id: 7, type: "rent",
    title: "3-Bedroom House, Laroo",
    location: "Laroo Division, Gulu", locationKey: "gulu",
    price: 500000, priceLabel: "UGX 500,000", priceNote: "per month",
    features: ["3 Bedrooms", "Borehole water", "Parking"],
    featureIcons: ["ti-bed", "ti-droplet", "ti-car"],
    description: "Spacious 3-bedroom house with borehole water and ample parking.",
    available: true, featured: true
  },
  {
    id: 8, type: "rent",
    title: "Self-Contained Room, Kampala",
    location: "Ntinda, Kampala", locationKey: "kampala",
    price: 250000, priceLabel: "UGX 250,000", priceNote: "per month",
    features: ["Self-contained", "Water & power", "Secure"],
    featureIcons: ["ti-home", "ti-bolt", "ti-lock"],
    description: "Modern self-contained single room in Ntinda, Kampala. Security guard on site.",
    available: true, featured: true
  },
  {
    id: 9, type: "rent",
    title: "2-Bedroom Apartment, Gulu",
    location: "Pece Division, Gulu", locationKey: "gulu",
    price: 400000, priceLabel: "UGX 400,000", priceNote: "per month",
    features: ["2 Bedrooms", "Tiled floors", "Garden"],
    featureIcons: ["ti-bed", "ti-square", "ti-plant"],
    description: "Modern 2-bedroom apartment in Pece Division with tiled floors and garden space.",
    available: true, featured: true
  },
  {
    id: 10, type: "rent",
    title: "4-Bedroom House, Gulu",
    location: "Bardege Division, Gulu", locationKey: "gulu",
    price: 800000, priceLabel: "UGX 800,000", priceNote: "per month",
    features: ["4 Bedrooms", "2 Bathrooms", "Garage"],
    featureIcons: ["ti-bed", "ti-bath", "ti-car"],
    description: "Large family house in Bardege Division. 4 bedrooms, 2 bathrooms, spacious garage.",
    available: true, featured: false
  },
  {
    id: 11, type: "rent",
    title: "Studio Apartment, Kampala",
    location: "Mengo, Kampala", locationKey: "kampala",
    price: 200000, priceLabel: "UGX 200,000", priceNote: "per month",
    features: ["Studio", "Furnished", "24hr power"],
    featureIcons: ["ti-home", "ti-sofa", "ti-bolt"],
    description: "Cosy furnished studio apartment in Mengo, Kampala. 24-hour electricity supply.",
    available: true, featured: false
  },
  {
    id: 12, type: "rent",
    title: "3-Bedroom Bungalow, Lira",
    location: "Railway Division, Lira", locationKey: "other",
    price: 350000, priceLabel: "UGX 350,000", priceNote: "per month",
    features: ["3 Bedrooms", "Compound", "Solar"],
    featureIcons: ["ti-bed", "ti-fence", "ti-solar-panel"],
    description: "Modern bungalow with solar power backup. Quiet compound in Railway Division, Lira.",
    available: true, featured: false
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
   3. CART
   ============================================================ */
function getCart() {
  try { return JSON.parse(localStorage.getItem("pp_cart")) || []; }
  catch { return []; }
}
function saveCart(cart) {
  localStorage.setItem("pp_cart", JSON.stringify(cart));
  updateCartBadge();
}
function addToCart(id) {
  const listings = getListings();
  const item = listings.find(l => l.id === id);
  if (!item) return;
  const cart = getCart();
  if (cart.find(c => c.id === id)) {
    showToast("Already in your enquiry list!");
    return;
  }
  cart.push({ id: item.id, title: item.title, price: item.priceLabel, type: item.type });
  saveCart(cart);
  showToast(`"${item.title}" added to enquiry list!`);
  document.querySelectorAll(`[data-id="${id}"].prop-card__save`).forEach(btn => {
    btn.classList.add("saved");
    btn.innerHTML = '<i class="ti ti-heart-filled"></i>';
  });
}
function removeFromCart(id) {
  let cart = getCart();
  cart = cart.filter(c => c.id !== id);
  saveCart(cart);
}
function updateCartBadge() {
  const badge = document.getElementById("cartBadge");
  if (badge) {
    const count = getCart().length;
    badge.textContent = count;
    badge.style.display = count > 0 ? "flex" : "none";
  }
}

/* ============================================================
   4. RENDER PROPERTY CARDS
   ============================================================ */
function createCard(listing) {
  const cart   = getCart();
  const inCart = cart.find(c => c.id === listing.id);
  const features = listing.features.map((f, i) =>
    `<span class="prop-card__feat"><i class="ti ${listing.featureIcons[i]}"></i>${f}</span>`
  ).join("");

  return `
    <div class="prop-card fade-in" data-id="${listing.id}">
      <div class="prop-card__image">
        <i class="ti ${listing.type === "land" ? "ti-map-pin" : "ti-building"}"></i>
        <span class="prop-card__badge prop-card__badge--${listing.type}">
          ${listing.type === "land" ? "For Sale" : "For Rent"}
        </span>
        <button class="prop-card__save ${inCart ? "saved" : ""}"
          data-id="${listing.id}"
          onclick="addToCart(${listing.id})"
          title="${inCart ? "In enquiry list" : "Add to enquiry list"}"
          aria-label="Add to enquiry list">
          <i class="ti ti-heart${inCart ? "-filled" : ""}"></i>
        </button>
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
          <button class="prop-card__cta" onclick="addToCart(${listing.id})">
            <i class="ti ti-shopping-cart"></i> Enquire
          </button>
        </div>
      </div>
    </div>`;
}

/* Home page — render featured land + rent */
function renderHomeListings() {
  const listings = getListings();
  const landGrid = document.getElementById("landGrid");
  const rentGrid = document.getElementById("rentGrid");

  if (landGrid) {
    const items = listings.filter(l => l.type === "land" && l.featured).slice(0, 3);
    landGrid.innerHTML = items.length
      ? items.map(createCard).join("")
      : '<p style="color:var(--text-muted);padding:2rem 0">No land listings at the moment.</p>';
  }
  if (rentGrid) {
    const items = listings.filter(l => l.type === "rent" && l.featured).slice(0, 3);
    rentGrid.innerHTML = items.length
      ? items.map(createCard).join("")
      : '<p style="color:var(--text-muted);padding:2rem 0">No rental listings at the moment.</p>';
  }
  observeFadeIns();
}

/* Properties page — full list with filters */
function renderPropertyPage(results) {
  const grid    = document.getElementById("allPropertiesGrid");
  const countEl = document.getElementById("filterCount");
  if (!grid) return;
  if (!results) results = getListings();
  if (countEl) countEl.textContent = `${results.length} propert${results.length === 1 ? "y" : "ies"} found`;
  grid.innerHTML = results.length
    ? results.map(createCard).join("")
    : `<div class="no-results">
         <i class="ti ti-search-off"></i>
         <p>No properties match your filters. Try adjusting your search.</p>
       </div>`;
  observeFadeIns();
}

/* ============================================================
   5. SEARCH & FILTER
   ============================================================ */
function handleSearch(e) {
  if (e) e.preventDefault();
  const query      = (document.getElementById("searchInput")?.value || "").toLowerCase().trim();
  const typeFilter = document.getElementById("searchType")?.value  || "all";
  const locFilter  = document.getElementById("searchLocation")?.value || "all";

  const listings = getListings();
  let results = listings.filter(l => {
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
    if (query)             params.set("q",    query);
    if (typeFilter !== "all") params.set("type", typeFilter);
    if (locFilter  !== "all") params.set("loc",  locFilter);
    window.location.href = "properties.html?" + params.toString();
  }
}

function initPropertyFilters() {
  const grid = document.getElementById("allPropertiesGrid");
  if (!grid) return;

  const params = new URLSearchParams(window.location.search);
  const qParam = params.get("q")    || "";
  const tParam = params.get("type") || "all";
  const lParam = params.get("loc")  || "all";

  const searchInput = document.getElementById("searchInput");
  const searchType  = document.getElementById("searchType");
  const searchLoc   = document.getElementById("searchLocation");

  if (searchInput && qParam) searchInput.value = qParam;
  if (searchType  && tParam) searchType.value  = tParam;
  if (searchLoc   && lParam) searchLoc.value   = lParam;

  // Sync filter buttons with URL param
  document.querySelectorAll(".filter-btn[data-type]").forEach(btn => {
    if (btn.dataset.type === tParam) btn.classList.add("active");
    else btn.classList.remove("active");

    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn[data-type]").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      if (searchType) searchType.value = btn.dataset.type;
      handleSearch(null);
    });
  });

  const locSelect = document.getElementById("filterLocation");
  if (locSelect) {
    if (lParam) locSelect.value = lParam;
    locSelect.addEventListener("change", () => {
      if (searchLoc) searchLoc.value = locSelect.value;
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
   6. NAVBAR
   ============================================================ */
function initNavbar() {
  const navbar    = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const navLinks  = document.getElementById("navLinks");

  window.addEventListener("scroll", () => {
    if (navbar) navbar.classList.toggle("scrolled", window.scrollY > 40);
    const btt = document.getElementById("backToTop");
    if (btt) btt.classList.toggle("visible", window.scrollY > 400);
  }, { passive: true });

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

  // Active link
  const page = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-link").forEach(link => {
    const href = link.getAttribute("href");
    if (href && (href === page || (page === "" && href === "index.html"))) {
      link.classList.add("active");
    }
  });
}

/* ============================================================
   7. ANIMATED COUNTERS
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
   8. FADE-IN ON SCROLL
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
   9. CONTACT FORM (Netlify)
   ============================================================ */
function initContactForm() {
  const form      = document.getElementById("contactForm");
  const status    = document.getElementById("formStatus");
  const submitBtn = document.getElementById("contactSubmitBtn");
  if (!form) return;

  form.addEventListener("submit", async e => {
    e.preventDefault();
    const name  = form.querySelector('[name="name"]')?.value.trim();
    const phone = form.querySelector('[name="phone"]')?.value.trim();
    const msg   = form.querySelector('[name="message"]')?.value.trim();
    if (!name || !phone || !msg) {
      if (status) { status.textContent = "Please fill in all required fields."; status.className = "form-status error"; }
      return;
    }
    if (submitBtn) { submitBtn.disabled = true; submitBtn.innerHTML = '<i class="ti ti-loader-2 ti-spin"></i> Sending…'; }
    if (status) { status.textContent = ""; status.className = "form-status"; }
    try {
      const body = new URLSearchParams(new FormData(form)).toString();
      const res  = await fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body });
      if (res.ok) {
        form.reset();
        if (status) { status.textContent = "✓ Message sent! We'll be in touch shortly."; status.className = "form-status success"; }
        showToast("Message sent successfully!");
      } else { throw new Error("not ok"); }
    } catch {
      if (status) { status.textContent = "Something went wrong. Please call or WhatsApp us directly."; status.className = "form-status error"; }
    } finally {
      if (submitBtn) { submitBtn.disabled = false; submitBtn.innerHTML = '<i class="ti ti-send"></i> Send Message'; }
    }
  });
}

/* ============================================================
   10. TESTIMONIES — star picker + review form
   ============================================================ */
function initStarPicker() {
  const picker = document.querySelector(".star-picker");
  const input  = document.getElementById("ratingInput");
  if (!picker || !input) return;
  const stars = picker.querySelectorAll("span");
  let selected = 5;
  input.value = selected;
  stars.forEach((star, i) => {
    star.addEventListener("mouseenter", () => {
      stars.forEach((s, j) => s.classList.toggle("active", j <= i));
    });
    star.addEventListener("click", () => {
      selected = i + 1;
      input.value = selected;
    });
  });
  picker.addEventListener("mouseleave", () => {
    stars.forEach((s, i) => s.classList.toggle("active", i < selected));
  });
  stars.forEach((s, i) => s.classList.toggle("active", i < selected));
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
      const res  = await fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body });
      if (res.ok) {
        form.reset(); initStarPicker();
        if (status) { status.textContent = "✓ Thank you! Your review has been submitted."; status.className = "form-status success"; }
        showToast("Review submitted!");
      } else { throw new Error(); }
    } catch {
      if (status) { status.textContent = "Submission failed. Please try again."; status.className = "form-status error"; }
    } finally {
      if (btn) { btn.disabled = false; btn.innerHTML = '<i class="ti ti-send"></i> Submit Review'; }
    }
  });
}

/* ============================================================
   11. CART PAGE
   ============================================================ */
function renderCartPage() {
  const itemsEl   = document.getElementById("cartItems");
  const emptyEl   = document.getElementById("cartEmpty");
  const summaryEl = document.getElementById("cartSummary");
  const countEl   = document.getElementById("cartItemCount");
  if (!itemsEl) return;

  const cart = getCart();
  if (cart.length === 0) {
    if (emptyEl)   emptyEl.style.display  = "block";
    if (summaryEl) summaryEl.style.display = "none";
    itemsEl.innerHTML = "";
    return;
  }
  if (emptyEl)   emptyEl.style.display  = "none";
  if (summaryEl) summaryEl.style.display = "block";
  if (countEl)   countEl.textContent    = cart.length;

  itemsEl.innerHTML = cart.map(item => `
    <div class="cart-item fade-in" data-id="${item.id}">
      <div class="cart-item__icon">
        <i class="ti ${item.type === "land" ? "ti-map-pin" : "ti-building"}"></i>
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
  removeFromCart(id);
  renderCartPage();
  showToast("Item removed from enquiry list.");
}

/* ============================================================
   12. ADMIN PAGE
   ============================================================ */
function initAdmin() {
  const tableBody = document.getElementById("adminTableBody");
  const addForm   = document.getElementById("addListingForm");
  if (!tableBody && !addForm) return;

  if (!localStorage.getItem("pp_admin")) {
    window.location.href = "login.html";
    return;
  }

  renderAdminTable();

  if (addForm) {
    addForm.addEventListener("submit", e => {
      e.preventDefault();
      const listings   = getListings();
      const newId      = Math.max(...listings.map(l => l.id), 0) + 1;
      const type       = addForm.querySelector('[name="type"]').value;
      const newListing = {
        id:           newId,
        type,
        title:        addForm.querySelector('[name="title"]').value.trim(),
        location:     addForm.querySelector('[name="location"]').value.trim(),
        locationKey:  addForm.querySelector('[name="locationKey"]').value,
        price:        parseInt(addForm.querySelector('[name="price"]').value, 10),
        priceLabel:   addForm.querySelector('[name="priceLabel"]').value.trim(),
        priceNote:    addForm.querySelector('[name="priceNote"]').value.trim(),
        features:     addForm.querySelector('[name="features"]').value.split(",").map(f => f.trim()),
        featureIcons: type === "land"
          ? ["ti-ruler", "ti-certificate", "ti-road"]
          : ["ti-bed", "ti-bath", "ti-home"],
        description:  addForm.querySelector('[name="description"]').value.trim(),
        available:    true,
        featured:     addForm.querySelector('[name="featured"]').checked
      };
      listings.push(newListing);
      saveListings(listings);
      addForm.reset();
      renderAdminTable();
      showToast("Listing added successfully!");
    });
  }
}

function renderAdminTable() {
  const tbody = document.getElementById("adminTableBody");
  if (!tbody) return;
  const listings  = getListings();
  const landCount = document.getElementById("adminLandCount");
  const rentCount = document.getElementById("adminRentCount");
  const totCount  = document.getElementById("adminTotalCount");
  if (landCount) landCount.textContent = listings.filter(l => l.type === "land").length;
  if (rentCount) rentCount.textContent = listings.filter(l => l.type === "rent").length;
  if (totCount)  totCount.textContent  = listings.length;

  tbody.innerHTML = listings.map(l => `
    <tr>
      <td>${l.id}</td>
      <td><strong>${l.title}</strong></td>
      <td>${l.location}</td>
      <td>
        <span class="prop-card__badge prop-card__badge--${l.type}" style="position:static;font-size:.67rem">
          ${l.type === "land" ? "Land" : "Rent"}
        </span>
      </td>
      <td>${l.priceLabel}</td>
      <td>
        <span class="status-badge status-badge--${l.available ? "available" : "sold"}">
          ${l.available ? "Available" : "Taken"}
        </span>
      </td>
      <td>
        <button class="btn btn--outline" style="padding:.3rem .75rem;font-size:.76rem"
          onclick="toggleAvailability(${l.id})">
          <i class="ti ti-refresh"></i> Toggle
        </button>
        <button class="btn btn--danger" style="padding:.3rem .75rem;font-size:.76rem;margin-left:4px"
          onclick="deleteListing(${l.id})">
          <i class="ti ti-trash"></i>
        </button>
      </td>
    </tr>`
  ).join("");
}

function toggleAvailability(id) {
  const listings = getListings();
  const item = listings.find(l => l.id === id);
  if (item) { item.available = !item.available; saveListings(listings); renderAdminTable(); }
}
function deleteListing(id) {
  if (!confirm("Delete this listing? This cannot be undone.")) return;
  const listings = getListings().filter(l => l.id !== id);
  saveListings(listings);
  renderAdminTable();
  showToast("Listing deleted.");
}

/* ============================================================
   13. LOGIN
   ============================================================ */
function initLogin() {
  const form   = document.getElementById("loginForm");
  const status = document.getElementById("loginStatus");
  if (!form) return;

  const ADMIN_USER = "admin";
  const ADMIN_PASS = "prestige2025";

  form.addEventListener("submit", e => {
    e.preventDefault();
    const user = form.querySelector('[name="username"]').value.trim();
    const pass = form.querySelector('[name="password"]').value;
    if (user === ADMIN_USER && pass === ADMIN_PASS) {
      localStorage.setItem("pp_admin", "true");
      showToast("Login successful! Redirecting…");
      setTimeout(() => window.location.href = "admin.html", 900);
    } else {
      if (status) { status.textContent = "Incorrect username or password."; status.className = "form-status error"; }
    }
  });
}

/* ============================================================
   14. TOAST
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
   15. BACK TO TOP
   ============================================================ */
function initBackToTop() {
  const btn = document.getElementById("backToTop");
  if (btn) btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

/* ============================================================
   16. INIT
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  updateCartBadge();
  initBackToTop();
  observeFadeIns();

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

/* Globals for inline onclick */
window.addToCart          = addToCart;
window.removeFromCart     = removeFromCart;
window.removeCartItem     = removeCartItem;
window.toggleAvailability = toggleAvailability;
window.deleteListing      = deleteListing;
window.getCart            = getCart;
window.getListings        = getListings;
window.showToast          = showToast;
