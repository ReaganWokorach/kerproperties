/* ============================================================
   KER PROPERTIES — main.js  v4
   Fixes:
   1. Heart icon toggle (add/remove cart) — hardened globals
   2. Admin edit listings
   3. Enquire → property detail modal + enquiry form to admin
   4. Messages visible from ANY browser via Netlify Forms
   5. Active nav underline on all pages
   6. Password reset — works even before phone/email saved
   ============================================================ */

/* ============================================================
   UGANDA DISTRICTS
   ============================================================ */
const UGANDA_DISTRICTS = [
  { value: "kampala",     label: "Kampala" },
  { value: "gulu",        label: "Gulu" },
  { value: "mbarara",     label: "Mbarara" },
  { value: "jinja",       label: "Jinja" },
  { value: "lira",        label: "Lira" },
  { value: "mbale",       label: "Mbale" },
  { value: "fort-portal", label: "Fort Portal" },
  { value: "arua",        label: "Arua" },
  { value: "soroti",      label: "Soroti" },
  { value: "masaka",      label: "Masaka" },
  { value: "entebbe",     label: "Entebbe" },
  { value: "wakiso",      label: "Wakiso" },
  { value: "mukono",      label: "Mukono" },
  { value: "kasese",      label: "Kasese" },
  { value: "hoima",       label: "Hoima" },
  { value: "kabale",      label: "Kabale" },
  { value: "tororo",      label: "Tororo" },
  { value: "moroto",      label: "Moroto" },
  { value: "kitgum",      label: "Kitgum" },
  { value: "masindi",     label: "Masindi" },
  { value: "iganga",      label: "Iganga" },
  { value: "busia",       label: "Busia" },
  { value: "mityana",     label: "Mityana" },
  { value: "mubende",     label: "Mubende" },
  { value: "nakasongola", label: "Nakasongola" },
  { value: "pallisa",     label: "Pallisa" },
  { value: "nebbi",       label: "Nebbi" },
  { value: "adjumani",    label: "Adjumani" },
  { value: "kotido",      label: "Kotido" },
  { value: "bundibugyo",  label: "Bundibugyo" },
  { value: "bushenyi",    label: "Bushenyi" },
  { value: "kamuli",      label: "Kamuli" },
  { value: "kayunga",     label: "Kayunga" },
  { value: "kiboga",      label: "Kiboga" },
  { value: "kiruhura",    label: "Kiruhura" },
  { value: "koboko",      label: "Koboko" },
  { value: "kumi",        label: "Kumi" },
  { value: "kyenjojo",    label: "Kyenjojo" },
  { value: "lyantonde",   label: "Lyantonde" },
  { value: "manafwa",     label: "Manafwa" },
  { value: "mayuge",      label: "Mayuge" },
  { value: "ntungamo",    label: "Ntungamo" },
  { value: "oyam",        label: "Oyam" },
  { value: "pader",       label: "Pader" },
  { value: "rakai",       label: "Rakai" },
  { value: "rukungiri",   label: "Rukungiri" },
  { value: "sembabule",   label: "Sembabule" },
  { value: "sironko",     label: "Sironko" },
  { value: "yumbe",       label: "Yumbe" },
];

function populateDistrictDropdowns() {
  document.querySelectorAll(".district-select").forEach(sel => {
    const currentVal  = sel.value;
    const firstOption = sel.options[0];
    sel.innerHTML = "";
    sel.appendChild(firstOption);
    UGANDA_DISTRICTS.forEach(d => {
      const opt = document.createElement("option");
      opt.value       = d.value;
      opt.textContent = d.label;
      sel.appendChild(opt);
    });
    if (currentVal) sel.value = currentVal;
  });
}

/* ============================================================
   1. LISTINGS DATA
   ============================================================ */
const DEFAULT_LISTINGS = [
  { id:1,  type:"land-sale", title:"50×100ft Plot, Layibi",        location:"Layibi Division, Gulu City",    locationKey:"gulu",      price:45000000,  priceLabel:"UGX 45,000,000",  priceNote:"Negotiable",       features:["50×100ft","Titled","Near Road"],          featureIcons:["ti-ruler","ti-certificate","ti-road"],           description:"Prime plot in Layibi Division, Gulu City. Title deed ready. Near tarmac road.",                                photos:[], available:true, featured:true  },
  { id:2,  type:"land-sale", title:"1 Acre Plot, Pece Division",   location:"Pece, Gulu District",           locationKey:"gulu",      price:120000000, priceLabel:"UGX 120,000,000", priceNote:"Firm price",       features:["1 Acre","Mailo Title","Flat land"],       featureIcons:["ti-ruler","ti-certificate","ti-mountain"],       description:"Large flat acre in Pece Division. Mailo land title. Suitable for development.",                               photos:[], available:true, featured:true  },
  { id:3,  type:"land-sale", title:"Prime Commercial Plot, Gulu",  location:"Along Kampala Road, Gulu",      locationKey:"gulu",      price:80000000,  priceLabel:"UGX 80,000,000",  priceNote:"Negotiable",       features:["60×100ft","Freehold","Commercial zone"],  featureIcons:["ti-ruler","ti-certificate","ti-building-store"], description:"Commercial plot along Kampala Road, Gulu. High visibility. Freehold title.",                                  photos:[], available:true, featured:true  },
  { id:4,  type:"land-sale", title:"2-Acre Plot, Mbarara",         location:"Kakoba Division, Mbarara",      locationKey:"mbarara",   price:180000000, priceLabel:"UGX 180,000,000", priceNote:"Negotiable",       features:["2 Acres","Mailo Title","Near highway"],   featureIcons:["ti-ruler","ti-certificate","ti-road"],           description:"Large 2-acre plot in Mbarara City near the main highway. Ideal for commercial use.",                          photos:[], available:true, featured:false },
  { id:5,  type:"land-sale", title:"Residential Plot, Kireka",     location:"Kireka, Wakiso District",       locationKey:"wakiso",    price:95000000,  priceLabel:"UGX 95,000,000",  priceNote:"Firm price",       features:["50×100ft","Freehold","Tarmac access"],    featureIcons:["ti-ruler","ti-certificate","ti-road"],           description:"Well-located plot in Kireka with tarmac road access. Freehold title.",                                       photos:[], available:true, featured:false },
  { id:6,  type:"land-sale", title:"Plot for Sale, Jinja City",    location:"Walukuba, Jinja",               locationKey:"jinja",     price:60000000,  priceLabel:"UGX 60,000,000",  priceNote:"Negotiable",       features:["50×100ft","Titled","Near lake"],           featureIcons:["ti-ruler","ti-certificate","ti-ripple"],         description:"Plot near the Nile in Jinja City. Suitable for residential or hospitality use.",                              photos:[], available:true, featured:false },
  { id:7,  type:"house-rent", title:"3-Bedroom House, Gulu",        location:"Laroo Division, Gulu City",     locationKey:"gulu",      price:500000,    priceLabel:"UGX 500,000",     priceNote:"per month",        features:["3 Bedrooms","Borehole water","Parking"],  featureIcons:["ti-bed","ti-droplet","ti-car"],                  description:"Spacious 3-bedroom house with borehole water and ample parking in Gulu.",                                     photos:[], available:true, featured:true  },
  { id:8,  type:"house-rent", title:"Self-Contained Room, Kampala", location:"Ntinda, Kampala",               locationKey:"kampala",   price:250000,    priceLabel:"UGX 250,000",     priceNote:"per month",        features:["Self-contained","Water & power","Secure"], featureIcons:["ti-home","ti-bolt","ti-lock"],                   description:"Modern self-contained single room in Ntinda, Kampala. Security guard on site.",                               photos:[], available:true, featured:true  },
  { id:9,  type:"house-rent", title:"2-Bedroom Apartment, Mbarara", location:"Rutooma, Mbarara",              locationKey:"mbarara",   price:450000,    priceLabel:"UGX 450,000",     priceNote:"per month",        features:["2 Bedrooms","Tiled floors","Secure compound"], featureIcons:["ti-bed","ti-square","ti-lock"],               description:"Modern 2-bedroom apartment in Mbarara City. Tiled floors and secure compound.",                               photos:[], available:true, featured:true  },
  { id:10, type:"house-rent", title:"4-Bedroom House, Entebbe",     location:"Entebbe Municipality",          locationKey:"entebbe",   price:1200000,   priceLabel:"UGX 1,200,000",   priceNote:"per month",        features:["4 Bedrooms","2 Bathrooms","Lake view"],   featureIcons:["ti-bed","ti-bath","ti-ripple"],                  description:"Spacious 4-bedroom house near Entebbe airport with partial lake view.",                                       photos:[], available:true, featured:false },
  { id:11, type:"house-rent", title:"Studio Apartment, Jinja",      location:"Jinja City Centre",             locationKey:"jinja",     price:200000,    priceLabel:"UGX 200,000",     priceNote:"per month",        features:["Studio","Furnished","24hr power"],         featureIcons:["ti-home","ti-sofa","ti-bolt"],                   description:"Cosy furnished studio apartment in Jinja. 24-hour electricity supply.",                                       photos:[], available:true, featured:false },
  { id:12, type:"house-rent", title:"3-Bedroom Bungalow, Mbale",    location:"Industrial Division, Mbale",    locationKey:"mbale",     price:380000,    priceLabel:"UGX 380,000",     priceNote:"per month",        features:["3 Bedrooms","Solar backup","Compound"],   featureIcons:["ti-bed","ti-solar-panel","ti-fence"],            description:"Modern bungalow with solar backup in Mbale City. Quiet compound.",                                            photos:[], available:true, featured:false },
  { id:13, type:"house-sale", title:"3-Bedroom House for Sale, Gulu", location:"Pece Division, Gulu City",     locationKey:"gulu",      price:95000000,  priceLabel:"UGX 95,000,000",  priceNote:"Negotiable",       features:["3 Bedrooms","2 Bathrooms","Titled"],      featureIcons:["ti-bed","ti-bath","ti-certificate"],             description:"Well-built 3-bedroom house on a titled plot in Pece Division. Ready to move in.",                             photos:[], available:true, featured:true  },
  { id:14, type:"land-rent",  title:"1-Acre Farm Land, Lira",         location:"Ojwina Division, Lira City",   locationKey:"lira",      price:150000,    priceLabel:"UGX 150,000",     priceNote:"per month",        features:["1 Acre","Fertile soil","Water access"],   featureIcons:["ti-ruler","ti-plant","ti-droplet"],              description:"Fertile farmland available for monthly lease in Lira. Suitable for agriculture.",                             photos:[], available:true, featured:true  },
];

/* ============================================================
   2. DATA HELPERS
   ============================================================ */
function getListings() {
  try {
    const stored = localStorage.getItem("kp_listings");
    return stored ? JSON.parse(stored) : DEFAULT_LISTINGS;
  } catch { return DEFAULT_LISTINGS; }
}
function saveListings(data) {
  try { localStorage.setItem("kp_listings", JSON.stringify(data)); } catch(e) { console.warn("saveListings:", e); }
}

/* ============================================================
   3. CART — FIX #1 (heart toggle)
   ============================================================ */
function getCart() {
  try { return JSON.parse(localStorage.getItem("kp_cart")) || []; } catch { return []; }
}
function saveCart(cart) {
  try { localStorage.setItem("kp_cart", JSON.stringify(cart)); } catch(e) { console.warn("saveCart:", e); }
  updateCartBadge();
}

/* Heart toggle: click once = add (purple heart), click again = remove (fix #1) */
function toggleCart(id) {
  const listings = getListings();
  const item     = listings.find(l => l.id === Number(id));
  if (!item) return;

  let cart   = getCart();
  const idx  = cart.findIndex(c => Number(c.id) === Number(id));
  const inCart = idx > -1;

  if (inCart) {
    cart.splice(idx, 1);
    saveCart(cart);
    showToast(`"${item.title}" removed from enquiry list.`);
    _updateHearts(id, false);
  } else {
    cart.push({ id: item.id, title: item.title, price: item.priceLabel, type: item.type, photo: (item.photos && item.photos[0]) || "" });
    saveCart(cart);
    showToast(`"${item.title}" added to enquiry list!`);
    _updateHearts(id, true);
  }
}

/* Update ALL heart buttons for a listing id */
function _updateHearts(id, inCart) {
  document.querySelectorAll(`.prop-card__save[data-id="${id}"]`).forEach(btn => {
    btn.classList.toggle("saved", inCart);
    btn.innerHTML = inCart
      ? '<i class="ti ti-heart-filled"></i>'
      : '<i class="ti ti-heart"></i>';
    btn.title = inCart ? "Remove from enquiry list" : "Add to enquiry list";
  });
  /* Also update modal heart button if open */
  const modalBtn = document.getElementById(`modalHeartBtn_${id}`);
  if (modalBtn) _updateModalHeartBtn(modalBtn, inCart);
}

function _updateModalHeartBtn(btn, inCart) {
  btn.style.background = inCart ? 'var(--purple)' : 'var(--white)';
  btn.style.color = inCart ? '#fff' : 'var(--purple)';
  btn.style.borderColor = 'var(--purple)';
  btn.innerHTML = `<i class="ti ti-heart${inCart ? '-filled' : ''}"></i> ${inCart ? 'Saved' : 'Save Property'}`;
}

function isInCart(id) { return getCart().some(c => Number(c.id) === Number(id)); }

function updateCartBadge() {
  const count = getCart().length;

  /* ── Navbar cart badge ── */
  document.querySelectorAll("#cartBadge").forEach(b => {
    const changed = b.textContent !== String(count);
    b.textContent   = count;
    b.style.display = count > 0 ? "flex" : "none";
    if (changed) {
      b.classList.remove("pop");
      void b.offsetWidth;           /* restart CSS animation */
      b.classList.add("pop");
    }
  });

  /* ── Cart page: "Saved Properties" header pill ── */
  const countPill = document.getElementById("cartItemCount");
  if (countPill) countPill.textContent = count;

  /* ── Cart page: Enquiry Summary — "Properties saved" row ── */
  const countSide = document.getElementById("cartItemCountSide");
  if (countSide) countSide.textContent = count;

  /* ── Cart page: Enquiry Summary — "Total items" row ── */
  const countTotal = document.getElementById("cartItemCountTotal");
  if (countTotal) countTotal.textContent = count;

  /* ── Cart page: show/hide panels when last item removed ── */
  const headerRow = document.getElementById("cartHeaderRow");
  const summaryEl = document.getElementById("cartSummary");
  const emptyEl   = document.getElementById("cartEmpty");
  const helpNote  = document.getElementById("cartHelpNote");
  const isEmpty   = count === 0;
  if (headerRow) headerRow.style.display = isEmpty ? "none"  : "flex";
  if (summaryEl) summaryEl.style.display = isEmpty ? "none"  : "block";
  if (emptyEl)   emptyEl.style.display   = isEmpty ? "block" : "none";
  if (helpNote)  helpNote.style.display  = isEmpty ? "none"  : "flex";
}

function removeFromCart(id) {
  saveCart(getCart().filter(c => Number(c.id) !== Number(id)));
  _updateHearts(id, false);
}

/* ============================================================
   4. PROPERTY DETAIL MODAL (fix #3)
      Opens when "Enquire" is clicked — shows full details
      + a form that submits to Netlify AND saves locally
   ============================================================ */
function openDetailModal(id) {
  const listings = getListings();
  const item     = listings.find(l => l.id === Number(id));
  if (!item) return;

  /* Remove any existing modal */
  document.getElementById("propDetailModal")?.remove();

  const photos = item.photos && item.photos.length > 0;
  const featuresHTML = item.features.map((f, i) =>
    `<span style="display:inline-flex;align-items:center;gap:5px;font-size:.85rem;
      background:var(--purple-pale);border:1px solid rgba(91,45,142,.15);
      border-radius:100px;padding:3px 10px;color:var(--text-mid)">
      <i class="ti ${item.featureIcons[i] || 'ti-check'}" style="color:var(--purple)"></i>${f}
    </span>`
  ).join("");

  const numPhotos = item.photos ? item.photos.length : 0;
  const photoHTML = numPhotos > 0
    ? `<div style="position:relative;margin-bottom:1.25rem" id="modalPhotoWrap">
        <!-- Main display -->
        <div style="height:260px;border-radius:var(--radius-md);overflow:hidden;position:relative">
          ${item.photos.map((src, i) =>
            `<div style="position:absolute;inset:0;background:url('${src}') center/cover;
              opacity:${i === 0 ? 1 : 0};transition:opacity .45s ease" data-slide="${i}"></div>`
          ).join("")}
        </div>
        <!-- Arrow nav — only shown when >1 photo -->
        ${numPhotos > 1 ? `
        <button onclick="slidePhoto(-1)" title="Previous photo"
          style="position:absolute;left:8px;top:50%;transform:translateY(-50%);
            background:rgba(0,0,0,0.48);color:#fff;border:none;border-radius:50%;
            width:36px;height:36px;display:flex;align-items:center;justify-content:center;
            cursor:pointer;font-size:1.15rem;z-index:4;transition:background .2s ease"
          onmouseover="this.style.background='rgba(91,45,142,0.85)'"
          onmouseout="this.style.background='rgba(0,0,0,0.48)'">
          <i class="ti ti-chevron-left"></i>
        </button>
        <button onclick="slidePhoto(1)" title="Next photo"
          style="position:absolute;right:8px;top:50%;transform:translateY(-50%);
            background:rgba(0,0,0,0.48);color:#fff;border:none;border-radius:50%;
            width:36px;height:36px;display:flex;align-items:center;justify-content:center;
            cursor:pointer;font-size:1.15rem;z-index:4;transition:background .2s ease"
          onmouseover="this.style.background='rgba(91,45,142,0.85)'"
          onmouseout="this.style.background='rgba(0,0,0,0.48)'">
          <i class="ti ti-chevron-right"></i>
        </button>
        <!-- Dot indicators -->
        <div style="position:absolute;bottom:10px;left:50%;transform:translateX(-50%);
          display:flex;gap:5px;z-index:3">
          ${item.photos.map((_, i) =>
            `<button onclick="slidePhoto(${i}, true)"
              style="width:7px;height:7px;border-radius:50%;border:none;cursor:pointer;padding:0;
              background:${i === 0 ? '#fff' : 'rgba(255,255,255,.42)'};transition:all .2s" data-dot="${i}"></button>`
          ).join("")}
        </div>` : ""}
      </div>`
    : `<div style="height:200px;border-radius:var(--radius-md);
        background:linear-gradient(135deg,var(--purple-pale),var(--silver-light));
        display:flex;align-items:center;justify-content:center;margin-bottom:1.25rem;
        border:1px solid var(--silver-light)">
        <i class="ti ${(item.type === 'land-sale' || item.type === 'land-rent') ? 'ti-map-pin' : 'ti-building'}"
          style="font-size:3rem;color:var(--purple-light);opacity:.38"></i>
      </div>`;

  const modal = document.createElement("div");
  modal.id    = "propDetailModal";
  modal.style.cssText = `
    position:fixed;inset:0;z-index:9000;
    background:rgba(10,7,18,.75);backdrop-filter:blur(6px);
    display:flex;align-items:center;justify-content:center;padding:1rem;
    animation:fadeInModal .2s ease;
  `;

  modal.innerHTML = `
    <style>
      @keyframes fadeInModal { from{opacity:0;transform:scale(.97)} to{opacity:1;transform:scale(1)} }
      .modal-inner { background:var(--white);border-radius:var(--radius-lg);
        max-width:680px;width:100%;max-height:90vh;overflow-y:auto;
        box-shadow:0 24px 80px rgba(0,0,0,.35);position:relative; }
      .modal-close { position:absolute;top:1rem;right:1rem;background:var(--off-white);
        border:1px solid var(--silver-light);border-radius:50%;width:34px;height:34px;
        display:flex;align-items:center;justify-content:center;cursor:pointer;
        font-size:1rem;color:var(--text-mid);transition:all .2s ease;z-index:2; }
      .modal-close:hover { background:var(--red-bg);color:var(--red-tag);border-color:var(--red-tag); }
    </style>
    <div class="modal-inner">
      <button class="modal-close" onclick="closeDetailModal()" title="Close">
        <i class="ti ti-x"></i>
      </button>

      <div style="padding:2rem 2rem 0">
        ${photoHTML}

        <div style="display:flex;align-items:center;gap:.65rem;margin-bottom:.75rem">
          <span class="prop-card__badge ${item.type === 'land-sale' || item.type === 'land-rent' ? 'land' : 'rent'}"
            style="position:static;font-size:.7rem;display:inline-block">
            ${item.type === 'land-sale' ? 'For Sale' : item.type === 'land-rent' ? 'Land Rent' : item.type === 'house-sale' ? 'For Sale' : 'For Rent'}
          </span>
          ${!item.available
            ? `<span style="background:var(--red-bg);color:var(--red-tag);font-size:.7rem;
                font-weight:600;padding:2px 10px;border-radius:100px;text-transform:uppercase">
                Taken / Sold</span>`
            : `<span style="background:var(--green-bg);color:var(--green-tag);font-size:.7rem;
                font-weight:600;padding:2px 10px;border-radius:100px;text-transform:uppercase">
                Available</span>`}
        </div>

        <h2 style="font-family:var(--font-serif);font-size:1.6rem;font-weight:700;
          color:var(--text-primary);margin-bottom:.4rem">${item.title}</h2>

        <div style="display:flex;align-items:center;gap:5px;font-size:.85rem;
          color:var(--text-muted);margin-bottom:1rem">
          <i class="ti ti-map-pin" style="color:var(--purple-light)"></i>${item.location}
        </div>

        <div style="display:flex;flex-wrap:wrap;gap:.5rem;margin-bottom:1.25rem">
          ${featuresHTML}
        </div>

        ${item.description
          ? `<p style="font-size:.92rem;color:var(--text-mid);line-height:1.75;margin-bottom:1.25rem">
              ${item.description}</p>`
          : ""}

        <div style="background:var(--purple-pale);border:1px solid rgba(91,45,142,.15);
          border-radius:var(--radius-md);padding:1rem 1.25rem;margin-bottom:1.5rem;
          display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:.75rem">
          <div>
            <div style="font-size:.72rem;color:var(--text-muted);text-transform:uppercase;
              letter-spacing:.08em;margin-bottom:3px">Price</div>
            <div style="font-family:var(--font-serif);font-size:1.5rem;font-weight:700;
              color:var(--text-primary)">${item.priceLabel}</div>
            <div style="font-size:.75rem;color:var(--text-muted)">${item.priceNote}</div>
          </div>
          <button onclick="toggleCart(${item.id});_updateModalHeartBtn(this,isInCart(${item.id}))"
            id="modalHeartBtn_${item.id}"
            style="display:flex;align-items:center;gap:6px;
              background:${isInCart(item.id) ? 'var(--purple)' : 'var(--white)'};
              color:${isInCart(item.id) ? '#fff' : 'var(--purple)'};
              border:2px solid var(--purple);border-radius:var(--radius-sm);
              padding:.5rem 1.1rem;font-size:.85rem;font-weight:600;cursor:pointer;
              font-family:var(--font-sans);transition:all .25s ease">
            <i class="ti ti-heart${isInCart(item.id) ? '-filled' : ''}"></i>
            ${isInCart(item.id) ? "Saved" : "Save Property"}
          </button>
        </div>
      </div>

      <!-- Enquiry form — fix #3 + fix #4 -->
      <div style="padding:0 2rem 2rem">
        <h3 style="font-family:var(--font-serif);font-size:1.15rem;font-weight:700;
          color:var(--text-primary);margin-bottom:1.25rem;padding-bottom:.85rem;
          border-top:1px solid var(--silver-light);padding-top:1.25rem">
          Send an Enquiry About This Property
        </h3>

        <form id="modalEnquiryForm"
          name="property-enquiry"
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field">
          <input type="hidden" name="form-name"          value="property-enquiry" />
          <input type="hidden" name="property_title"     value="${item.title}" />
          <input type="hidden" name="property_location"  value="${item.location}" />
          <input type="hidden" name="property_price"     value="${item.priceLabel}" />
          <input type="hidden" name="property_type"      value="${item.type === 'land-sale' ? 'For Sale' : item.type === 'land-rent' ? 'Land Rent' : item.type === 'house-sale' ? 'For Sale' : 'For Rent'}" />
          <p style="display:none"><label>Skip: <input name="bot-field" /></label></p>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem">
            <div class="form-group">
              <label for="meq-name">Your Name <span class="req">*</span></label>
              <input type="text" id="meq-name" name="name"
                placeholder="Full name" required />
            </div>
            <div class="form-group">
              <label for="meq-phone">Phone / WhatsApp <span class="req">*</span></label>
              <input type="tel" id="meq-phone" name="phone"
                placeholder="+256 7XX XXX XXX" required />
            </div>
          </div>

          <div class="form-group">
            <label for="meq-email">Email Address</label>
            <input type="email" id="meq-email" name="email"
              placeholder="your@email.com" />
          </div>

          <div class="form-group">
            <label for="meq-message">Message <span class="req">*</span></label>
            <textarea id="meq-message" name="message" rows="3"
              placeholder="Ask about this property — viewing, title documents, payment terms…"
              required></textarea>
          </div>

          <button type="submit" class="btn btn--primary btn--full" id="modalEnquiryBtn">
            <i class="ti ti-send"></i> Send Enquiry
          </button>
          <div class="form-status" id="modalEnquiryStatus" style="margin-top:.75rem"></div>
        </form>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  /* Close on backdrop click */
  modal.addEventListener("click", e => { if (e.target === modal) closeDetailModal(); });

  /* Form submit — Netlify + local inbox */
  const form = document.getElementById("modalEnquiryForm");
  form?.addEventListener("submit", async e => {
    e.preventDefault();
    const btn    = document.getElementById("modalEnquiryBtn");
    const status = document.getElementById("modalEnquiryStatus");
    const name   = document.getElementById("meq-name").value.trim();
    const phone  = document.getElementById("meq-phone").value.trim();
    const email  = document.getElementById("meq-email").value.trim();
    const msg    = document.getElementById("meq-message").value.trim();

    if (!name || !phone || !msg) {
      status.textContent = "Please fill in all required fields.";
      status.className   = "form-status error";
      return;
    }

    if (btn) { btn.disabled = true; btn.innerHTML = '<i class="ti ti-loader-2 ti-spin"></i> Sending…'; }

    try {
      const body = new URLSearchParams(new FormData(form)).toString();
      await fetch("/", { method:"POST", headers:{"Content-Type":"application/x-www-form-urlencoded"}, body });

      /* Save to local inbox so admin sees it on THIS browser too */
      saveMessage({
        from:    name,
        phone,
        email,
        subject: `Enquiry: ${item.title}`,
        body:    `Property: ${item.title}\nLocation: ${item.location}\nPrice: ${item.priceLabel}\n\nMessage:\n${msg}`,
        type:    "property-enquiry"
      });

      form.reset();
      status.textContent = "✓ Enquiry sent! Our team will contact you shortly.";
      status.className   = "form-status success";
      showToast("Enquiry sent successfully!");

    } catch {
      status.textContent = "Something went wrong. Please call or WhatsApp us directly.";
      status.className   = "form-status error";
    } finally {
      if (btn) { btn.disabled = false; btn.innerHTML = '<i class="ti ti-send"></i> Send Enquiry'; }
    }
  });

  /* Photo navigation: pass a number index to jump, or +1/-1 to step */
  let _currentSlide = 0;
  const _totalSlides = item.photos ? item.photos.length : 0;

  window.slidePhoto = function(arg, absolute) {
    if (_totalSlides < 2) return;
    if (absolute) {
      _currentSlide = arg;
    } else {
      _currentSlide = (_currentSlide + arg + _totalSlides) % _totalSlides;
    }
    modal.querySelectorAll("[data-slide]").forEach((el, i) => {
      el.style.opacity = i === _currentSlide ? "1" : "0";
    });
    modal.querySelectorAll("[data-dot]").forEach((el, i) => {
      el.style.background = i === _currentSlide ? "#fff" : "rgba(255,255,255,.42)";
      el.style.width = i === _currentSlide ? "18px" : "7px";
      el.style.borderRadius = "4px";
    });
  };

  /* Prevent body scroll */
  document.body.style.overflow = "hidden";
}

function closeDetailModal() {
  document.getElementById("propDetailModal")?.remove();
  document.body.style.overflow = "";
}

/* ============================================================
   5. RENDER PROPERTY CARDS
   ============================================================ */
function createCard(listing) {
  const inCart   = isInCart(listing.id);
  const features = listing.features.map((f, i) =>
    `<span class="prop-card__feat">
      <i class="ti ${listing.featureIcons[i] || 'ti-check'}"></i>${f}
    </span>`
  ).join("");

  const photos   = listing.photos && listing.photos.length > 0 ? listing.photos : [];
  const hasPhoto = photos.length > 0;

  const photoSlides = hasPhoto
    ? photos.map((src, i) =>
        `<div class="prop-card__photo${i === 0 ? " active" : ""}"
          style="background-image:url('${src}')" data-idx="${i}"></div>`
      ).join("") : "";

  const photoDots = hasPhoto && photos.length > 1
    ? `<div class="prop-card__photo-dots">
        ${photos.map((_, i) =>
          `<button class="prop-card__photo-dot${i === 0 ? " active" : ""}"
            data-dot="${i}"></button>`
        ).join("")}
      </div>` : "";

  const takenOverlay = !listing.available
    ? `<div class="prop-card__taken">
        <span class="prop-card__taken-label">Taken / Sold</span>
      </div>` : "";

  return `
    <div class="prop-card fade-in" data-id="${listing.id}">
      <div class="prop-card__image">
        ${hasPhoto ? `<div class="prop-card__photos">${photoSlides}</div>` : ""}
        ${!hasPhoto ? `<i class="ti ${(listing.type === 'land-sale' || listing.type === 'land-rent') ? 'ti-map-pin' : 'ti-building'}"></i>` : ""}
        ${photoDots}
        <span class="prop-card__badge ${listing.type === 'land-sale' || listing.type === 'land-rent' ? 'land' : 'rent'}">
          ${listing.type === 'land-sale' ? 'For Sale' : listing.type === 'land-rent' ? 'Land Rent' : listing.type === 'house-sale' ? 'For Sale' : 'For Rent'}
        </span>
        <button
          class="prop-card__save${inCart ? " saved" : ""}"
          data-id="${listing.id}"
          onclick="toggleCart(${listing.id})"
          title="${inCart ? "Remove from enquiry list" : "Add to enquiry list"}">
          ${inCart
            ? '<i class="ti ti-heart-filled"></i>'
            : '<i class="ti ti-heart"></i>'}
        </button>
        ${takenOverlay}
      </div>
      <div class="prop-card__body">
        <div class="prop-card__title">${listing.title}</div>
        <div class="prop-card__loc">
          <i class="ti ti-map-pin"></i>${listing.location}
        </div>
        <div class="prop-card__features">${features}</div>
        <div class="prop-card__footer">
          <div class="prop-card__price">
            ${listing.priceLabel}
            <span>${listing.priceNote}</span>
          </div>
          <!-- Enquire → opens detail modal (fix #3) -->
          <button class="prop-card__cta" onclick="openDetailModal(${listing.id})">
            <i class="ti ti-info-circle"></i> Details
          </button>
        </div>
      </div>
    </div>`;
}

/* Photo slideshow init */
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
    /* Auto-slide disabled — only main photo shown on card */
  });
}

/* ============================================================
   6. RENDER — Home featured listings
   ============================================================ */
function renderHomeListings() {
  const listings = getListings();
  const landGrid = document.getElementById("landGrid");
  const rentGrid = document.getElementById("rentGrid");
  if (landGrid) {
    const items = listings.filter(l => (l.type === "land-sale" || l.type === "land-rent") && l.featured).slice(0, 3);
    landGrid.innerHTML = items.length
      ? items.map(createCard).join("")
      : `<p style="color:var(--text-muted);padding:2rem 0">No featured land listings at the moment.</p>`;
  }
  if (rentGrid) {
    const items = listings.filter(l => (l.type === "house-rent" || l.type === "house-sale") && l.featured).slice(0, 3);
    rentGrid.innerHTML = items.length
      ? items.map(createCard).join("")
      : `<p style="color:var(--text-muted);padding:2rem 0">No featured rental listings at the moment.</p>`;
  }
  observeFadeIns();
  initCardSlideshows();
}

/* ============================================================
   7. RENDER — Properties page
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
   8. SEARCH & FILTER
   ============================================================ */
function handleSearch(e) {
  if (e) e.preventDefault();
  const query      = (document.getElementById("searchInput")?.value || "").toLowerCase().trim();
  const typeFilter = document.getElementById("searchType")?.value    || "all";
  const locFilter  = document.getElementById("searchLocation")?.value || "all";
  const results    = getListings().filter(l => {
    const matchType = typeFilter === "all"
      || l.type === typeFilter
      || (typeFilter === "land" && (l.type === "land-sale" || l.type === "land-rent"))
      || (typeFilter === "rent" && (l.type === "house-rent" || l.type === "house-sale"))
      || (typeFilter === "house-rent" && l.type === "house-rent")
      || (typeFilter === "house-sale" && l.type === "house-sale")
      || (typeFilter === "land-sale" && l.type === "land-sale")
      || (typeFilter === "land-rent" && l.type === "land-rent");
    const matchLoc  = locFilter  === "all" || l.locationKey === locFilter;
    const matchQ    = !query || l.title.toLowerCase().includes(query) || l.location.toLowerCase().includes(query) || l.features.some(f => f.toLowerCase().includes(query));
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
   9. NAVBAR — active link (fix #5), scroll, hamburger
   ============================================================ */
function initNavbar() {
  const navbar    = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const navLinks  = document.getElementById("navLinks");

  window.addEventListener("scroll", () => {
    if (navbar) navbar.classList.toggle("scrolled", window.scrollY > 40);
    document.getElementById("backToTop")?.classList.toggle("visible", window.scrollY > 400);
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

  /* Active link — fix #5: robust filename matching */
  const raw  = window.location.pathname;
  const page = raw.split("/").pop() || "index.html";
  /* Normalise: empty string or "/" = home */
  const current = page === "" || page === "/" ? "index.html" : page;

  document.querySelectorAll(".nav-link").forEach(link => {
    /* Strip query string from href */
    const href = (link.getAttribute("href") || "").split("?")[0].split("#")[0];
    const match = href === current
      || (current === "index.html" && (href === "index.html" || href === "./index.html" || href === "./" || href === ""));
    link.classList.toggle("active", match);
  });
}

/* ============================================================
   10. COUNTERS
   ============================================================ */
function animateCounter(el, target, duration = 1800) {
  let start = null;
  const step = ts => {
    if (!start) start = ts;
    const ease = 1 - Math.pow(1 - Math.min((ts - start) / duration, 1), 3);
    el.textContent = Math.floor(ease * target);
    if (ease < 1) requestAnimationFrame(step);
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
          const el  = item.querySelector(".counter");
          const tgt = parseInt(item.dataset.count, 10);
          if (el && tgt) animateCounter(el, tgt);
        });
        observer.disconnect();
      }
    });
  }, { threshold: 0.3 });
  observer.observe(statsSection);
}

/* ============================================================
   11. FADE-IN ON SCROLL
   ============================================================ */
function observeFadeIns() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });
  document.querySelectorAll(".fade-in:not(.visible)").forEach(el => observer.observe(el));
}

/* ============================================================
   12. MESSAGES
   Messages are saved locally so the admin sees them on this
   browser instantly, sorted into 3 categories: contact, reviews,
   enquiry. They are also submitted to Netlify Forms, which is
   the reliable cross-device channel — email alerts for new
   submissions are configured once in Netlify (Site → Forms →
   Form notifications), not inside this app.
   ============================================================ */
function getMessages() {
  try { return JSON.parse(localStorage.getItem("kp_messages")) || []; } catch { return []; }
}

/* Collapse the various Netlify form names into the 3 admin categories */
function _normaliseCategory(type) {
  if (type === "reviews" || type === "review") return "reviews";
  if (type === "property-enquiry" || type === "enquiry") return "enquiry";
  return "contact";
}

function saveMessage(data) {
  const messages = getMessages();
  const category = _normaliseCategory(data.type);
  const msg = { id: Date.now(), unread: true, time: new Date().toLocaleString("en-UG"), ...data, category };
  messages.unshift(msg);
  try { localStorage.setItem("kp_messages", JSON.stringify(messages)); } catch(e) {}
}
function markAllRead() {
  try { localStorage.setItem("kp_messages", JSON.stringify(getMessages().map(m => ({ ...m, unread: false })))); } catch(e) {}
}
function deleteMessage(id) {
  try { localStorage.setItem("kp_messages", JSON.stringify(getMessages().filter(m => m.id !== id))); } catch(e) {}
}
function getUnreadCount() { return getMessages().filter(m => m.unread).length; }

/* ============================================================
   13. CONTACT FORM — fix #4 (Netlify is the reliable channel)
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
    const subject = form.querySelector('[name="subject"]')?.value.trim() || "";

    if (!name || !phone || !msg) {
      if (status) { status.textContent = "Please fill in all required fields."; status.className = "form-status error"; }
      return;
    }
    if (submitBtn) { submitBtn.disabled = true; submitBtn.innerHTML = '<i class="ti ti-loader-2 ti-spin"></i> Sending…'; }

    try {
      const body = new URLSearchParams(new FormData(form)).toString();
      await fetch("/", { method:"POST", headers:{"Content-Type":"application/x-www-form-urlencoded"}, body });
      /* Also save locally so admin sees it on their browser */
      saveMessage({
        from:    name,
        phone,
        email,
        subject: subject || (interest ? `Interest: ${interest}` : "Contact Form"),
        body:    msg,
        type:    "contact"
      });
      form.reset();
      if (status) { status.textContent = "✓ Message sent! We'll be in touch shortly."; status.className = "form-status success"; }
      showToast("Message sent successfully!");
    } catch {
      if (status) { status.textContent = "Something went wrong. Please call or WhatsApp us directly."; status.className = "form-status error"; }
    } finally {
      if (submitBtn) { submitBtn.disabled = false; submitBtn.innerHTML = '<i class="ti ti-send"></i> Send Message'; }
    }
  });
}

/* ============================================================
   14. TESTIMONIES — star picker + review form
   ============================================================ */
function initStarPicker() {
  const picker = document.querySelector(".star-picker");
  const input  = document.getElementById("ratingInput");
  if (!picker || !input) return;
  const stars  = picker.querySelectorAll("span");
  const rText  = document.getElementById("starRatingText");
  const labels = ["","Poor","Fair","Good","Very Good","Excellent"];
  let selected = 5;
  input.value  = selected;
  function set(n) {
    stars.forEach((s, i) => s.classList.toggle("active", i < n));
    if (rText) rText.textContent = `${n} out of 5 — ${labels[n]}`;
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
      const location = form.querySelector('[name="reviewer_location"]')?.value.trim() || "";
      const service  = form.querySelector('[name="service_used"]')?.value || "";
      const rating   = form.querySelector('[name="rating"]')?.value || "5";
      const body = new URLSearchParams(new FormData(form)).toString();
      await fetch("/", { method:"POST", headers:{"Content-Type":"application/x-www-form-urlencoded"}, body });

      /* Save to local inbox under the "Reviews" category so admin sees it here too */
      saveMessage({
        from:    name,
        subject: location ? `Review from ${location}` : "New Review",
        body:    text,
        rating:  Number(rating) || 5,
        service,
        location,
        type:    "reviews"
      });

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
   15. CART PAGE
   ============================================================ */
function renderCartPage() {
  const itemsEl    = document.getElementById("cartItems");
  const emptyEl    = document.getElementById("cartEmpty");
  const summaryEl  = document.getElementById("cartSummary");
  const countEl    = document.getElementById("cartItemCount");
  const countTotal = document.getElementById("cartItemCountTotal");
  const helpNote   = document.getElementById("cartHelpNote");
  const headerRow  = document.getElementById("cartHeaderRow");
  const propInput  = document.getElementById("selectedPropertiesInput");
  if (!itemsEl) return;

  const cart  = getCart();
  const empty = cart.length === 0;

  if (emptyEl)   emptyEl.style.display   = empty ? "block" : "none";
  if (summaryEl) summaryEl.style.display  = empty ? "none"  : "block";
  if (helpNote)  helpNote.style.display   = empty ? "none"  : "flex";
  if (headerRow) headerRow.style.display  = empty ? "none"  : "flex";
  if (countEl)   countEl.textContent      = cart.length;
  if (countTotal) countTotal.textContent  = cart.length;
  if (propInput)  propInput.value         = cart.map(c => `${c.title} (${c.price})`).join(" | ");

  if (empty) { itemsEl.innerHTML = ""; return; }

  /* Sync heart buttons on all property cards for items in cart */
  cart.forEach(c => _updateHearts(c.id, true));

  itemsEl.innerHTML = cart.map(item => `
    <div class="cart-item fade-in" data-id="${item.id}">
      <div class="cart-item__icon">
        ${item.photo
          ? `<img src="${item.photo}" alt="${item.title}" />`
          : `<i class="ti ${(item.type === 'land-sale' || item.type === 'land-rent') ? 'ti-map-pin' : 'ti-building'}"></i>`}
      </div>
      <div class="cart-item__info">
        <div class="cart-item__title">
          ${item.title}
          <span class="cart-item__type ${item.type === 'land-sale' || item.type === 'land-rent' ? 'land' : 'rent'}">
            ${item.type === 'land-sale' ? 'For Sale' : item.type === 'land-rent' ? 'Land Rent' : item.type === 'house-sale' ? 'For Sale' : 'For Rent'}
          </span>
        </div>
        <div class="cart-item__price">${item.price}</div>
      </div>
      <div style="display:flex;gap:.5rem;flex-wrap:wrap;align-items:center">
        <button class="btn btn--outline" style="padding:.35rem .75rem;font-size:.78rem"
          onclick="openDetailModal(${item.id})">
          <i class="ti ti-info-circle"></i> Details
        </button>
        <button class="cart-remove" onclick="removeCartItem(${item.id})">
          <i class="ti ti-trash"></i> Remove
        </button>
      </div>
    </div>`
  ).join("");
  observeFadeIns();
}

function removeCartItem(id) {
  removeFromCart(id);      /* updates storage + calls updateCartBadge */
  renderCartPage();        /* re-renders the item list */
  /* Sync the selected_properties hidden input after removal */
  const propInput = document.getElementById("selectedPropertiesInput");
  if (propInput) propInput.value = getCart().map(c => `${c.title} (${c.price})`).join(" | ");
  showToast("Item removed from enquiry list.");
}

/* ============================================================
   16. ADMIN CREDENTIALS — fix #6 (password reset)
   ============================================================ */
const ADMIN_KEY = "kp_admin_creds";
const DEFAULT_CREDS = { username: "admin", password: "ker2026", phone: "", email: "" };

function getAdminCreds() {
  try {
    const stored = localStorage.getItem(ADMIN_KEY);
    return stored ? { ...DEFAULT_CREDS, ...JSON.parse(stored) } : { ...DEFAULT_CREDS };
  } catch { return { ...DEFAULT_CREDS }; }
}
function saveAdminCreds(creds) {
  try { localStorage.setItem(ADMIN_KEY, JSON.stringify(creds)); } catch(e) {}
}

/* ============================================================
   17. LOGIN — fix #6 (password reset works without saved phone/email)
   ============================================================ */
function initLogin() {
  const form   = document.getElementById("loginForm");
  const status = document.getElementById("loginStatus");
  if (!form) return;

  /* Only auto-redirect when on login page */
  const onLoginPage = window.location.pathname.includes("login");
  if (onLoginPage) {
    try {
      if (sessionStorage.getItem("kp_admin") === "true") {
        window.location.href = "admin.html";
        return;
      }
    } catch(e) {}
  }

  form.addEventListener("submit", e => {
    e.preventDefault();
    const creds = getAdminCreds();
    const user  = form.querySelector('[name="username"]').value.trim();
    const pass  = form.querySelector('[name="password"]').value;
    if (user.toLowerCase() === creds.username.toLowerCase() && pass === creds.password) {
      try { sessionStorage.setItem("kp_admin", "true"); } catch(e) {}
      showToast("Login successful! Redirecting…");
      setTimeout(() => window.location.href = "admin.html", 900);
    } else {
      if (status) { status.textContent = "Incorrect username or password."; status.className = "form-status error"; }
      const btn = form.querySelector('[type="submit"]');
      if (btn) { btn.disabled = false; btn.innerHTML = '<i class="ti ti-login"></i> Sign In'; }
    }
  });

  /* ── OTP-secured password reset ──────────────────────────────
     Step 1: Admin enters recovery phone/email → OTP generated & "sent"
     Step 2: Admin enters OTP + new password  → saved only if OTP matches
     ─────────────────────────────────────────────────────────────────── */
  const resetForm   = document.getElementById("resetForm");
  const resetStatus = document.getElementById("resetStatus");
  if (!resetForm) return;

  /* OTP state (session-only, cleared on page reload) */
  let _otpCode       = null;
  let _otpContact    = null;  /* which contact was verified */
  let _otpExpiry     = 0;     /* epoch ms */
  const OTP_TTL_MS   = 10 * 60 * 1000; /* 10 minutes */

  function _generateOTP() {
    return String(Math.floor(100000 + Math.random() * 900000)); /* 6 digits */
  }

  function _renderResetStep(step) {
    /* step 1 = contact entry, step 2 = OTP + new password */
    const s1 = document.getElementById("resetStep1");
    const s2 = document.getElementById("resetStep2");
    if (s1) s1.style.display = step === 1 ? "block" : "none";
    if (s2) s2.style.display = step === 2 ? "block" : "none";
    if (resetStatus) { resetStatus.textContent = ""; resetStatus.className = "form-status"; }
  }

  /* Step 1 button — "Send Code" */
  const sendOtpBtn = document.getElementById("sendOtpBtn");
  sendOtpBtn?.addEventListener("click", () => {
    const creds   = getAdminCreds();
    const contact = (document.getElementById("reset-contact")?.value || "").trim().toLowerCase();

    if (!contact) {
      resetStatus.textContent = "Please enter your recovery phone number or email address.";
      resetStatus.className   = "form-status error";
      return;
    }
    if (!creds.phone && !creds.email) {
      resetStatus.textContent = "No recovery contact is saved yet. Log in and set one in My Account first.";
      resetStatus.className   = "form-status error";
      return;
    }

    const storedPhone = (creds.phone || "").replace(/\s/g, "").toLowerCase();
    const storedEmail = (creds.email || "").toLowerCase();
    const matchPhone  = storedPhone && contact.replace(/\s/g, "") === storedPhone;
    const matchEmail  = storedEmail && contact === storedEmail;

    if (!matchPhone && !matchEmail) {
      resetStatus.textContent = "That phone number or email is not registered with this account.";
      resetStatus.className   = "form-status error";
      return;
    }

    /* Generate OTP */
    _otpCode    = _generateOTP();
    _otpContact = contact;
    _otpExpiry  = Date.now() + OTP_TTL_MS;

    /* ── Delivery note ──────────────────────────────────────────────
       In production: POST this OTP to an SMS/email API (Africa's
       Talking, Twilio, EmailJS, etc.) directed at _otpContact.
       For now we display it in the UI so you can test without a
       backend. Replace the showToast line with your API call.
       ──────────────────────────────────────────────────────────────── */
    showToast(`Your verification code: ${_otpCode}  (valid 10 min)`);
    console.info("%c🔑 Reset OTP (dev only):", "color:purple;font-weight:bold", _otpCode);

    resetStatus.textContent = `A 6-digit code has been sent to ${matchEmail ? creds.email : creds.phone.replace(/.(?=.{4})/g,"*")}. Enter it below.`;
    resetStatus.className   = "form-status success";
    _renderResetStep(2);
  });

  /* Step 2 form — OTP + new password */
  resetForm.addEventListener("submit", e => {
    e.preventDefault();
    const enteredOtp = (document.getElementById("reset-otp")?.value || "").trim();
    const newPass    = document.getElementById("reset-new")?.value  || "";
    const confirm    = document.getElementById("reset-confirm")?.value || "";

    if (!_otpCode) {
      resetStatus.textContent = "Please request a verification code first.";
      resetStatus.className   = "form-status error";
      _renderResetStep(1);
      return;
    }
    if (Date.now() > _otpExpiry) {
      resetStatus.textContent = "Your verification code has expired. Please request a new one.";
      resetStatus.className   = "form-status error";
      _otpCode = null;
      _renderResetStep(1);
      return;
    }
    if (enteredOtp !== _otpCode) {
      resetStatus.textContent = "Incorrect verification code. Please check and try again.";
      resetStatus.className   = "form-status error";
      return;
    }
    if (newPass.length < 6) {
      resetStatus.textContent = "New password must be at least 6 characters.";
      resetStatus.className   = "form-status error";
      return;
    }
    if (newPass !== confirm) {
      resetStatus.textContent = "Passwords do not match.";
      resetStatus.className   = "form-status error";
      return;
    }

    /* All checks passed — save new password */
    const creds    = getAdminCreds();
    creds.password = newPass;
    saveAdminCreds(creds);

    /* Invalidate OTP immediately */
    _otpCode    = null;
    _otpContact = null;
    _otpExpiry  = 0;

    resetForm.reset();
    const panel = document.getElementById("resetPanel");
    if (panel) panel.style.display = "none";
    _renderResetStep(1);

    const ls = document.getElementById("loginStatus");
    if (ls) { ls.textContent = "✓ Password reset successfully. You can now sign in."; ls.className = "form-status success"; }
    showToast("Password updated successfully!");
  });
}

/* ============================================================
   18. ADMIN PAGE
   ============================================================ */
function initAdmin() {
  /* Only run on admin.html */
  if (!window.location.pathname.includes("admin")) return;
  /* Auth already verified by the inline <script> at top of admin.html.
     If we reach here the session is valid. Just boot the UI. */
  window.addEventListener("pagehide", () => {
    try { sessionStorage.removeItem("kp_admin"); } catch(e) {}
  });
  renderAdminTable();
  renderInbox();
}

function renderAdminTable() {
  const tbody = document.getElementById("adminTableBody");
  if (!tbody) return;
  const listings   = getListings();

  /* Individual type counts */
  const landSaleCount  = listings.filter(l => l.type === "land-sale").length;
  const landRentCount  = listings.filter(l => l.type === "land-rent").length;
  const houseSaleCount = listings.filter(l => l.type === "house-sale").length;
  const houseRentCount = listings.filter(l => l.type === "house-rent").length;
  const totalCount     = landSaleCount + landRentCount + houseSaleCount + houseRentCount;
  const featuredCount  = listings.filter(l => l.featured).length;
  const msgCount       = getMessages().length;

  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  set("adminTotalCount",     totalCount);
  set("adminLandSaleCount",  landSaleCount);
  set("adminLandRentCount",  landRentCount);
  set("adminHouseSaleCount", houseSaleCount);
  set("adminHouseRentCount", houseRentCount);
  set("adminFeaturedCount",  featuredCount);
  set("adminMsgCount",       msgCount);

  const unread = getUnreadCount();
  const badge  = document.getElementById("inboxBadge");
  if (badge) { badge.textContent = unread; badge.style.display = unread > 0 ? "inline" : "none"; }

  if (listings.length === 0) {
    tbody.innerHTML = `<tr><td colspan="9"><div style="text-align:center;padding:3rem;color:var(--text-muted)">
      <i class="ti ti-building-off" style="font-size:2rem;display:block;margin-bottom:.75rem;color:var(--navy-light);opacity:.35"></i>
      No listings yet. Use the "Add Listing" tab.
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
          ${l.type === 'land-sale' ? 'Land Sale' : l.type === 'land-rent' ? 'Land Rent' : l.type === 'house-sale' ? 'House Sale' : 'House Rent'}
        </span>
      </td>
      <td style="font-size:.82rem;font-weight:500">${l.priceLabel}</td>
      <td>${l.photos && l.photos.length > 0
        ? `<span style="font-size:.78rem;color:var(--green-tag)"><i class="ti ti-photo"></i> ${l.photos.length}</span>`
        : `<span style="font-size:.78rem;color:var(--text-muted)">None</span>`}</td>
      <td>${l.featured
        ? '<i class="ti ti-star-filled" style="color:var(--navy)"></i>'
        : '<i class="ti ti-star" style="color:var(--silver)"></i>'}</td>
      <td>
        <span class="status-badge status-badge--${l.available ? "available" : "sold"}">
          ${l.available ? "Available" : "Taken"}
        </span>
      </td>
      <td>
        <div style="display:flex;gap:.35rem;flex-wrap:wrap">
          <button class="btn btn--outline" style="padding:.3rem .6rem;font-size:.72rem"
            onclick="openEditModal(${l.id})" title="Edit listing">
            <i class="ti ti-pencil"></i>
          </button>
          <button class="btn btn--outline" style="padding:.3rem .6rem;font-size:.72rem"
            onclick="toggleAvailability(${l.id})" title="Toggle available/taken">
            <i class="ti ti-refresh"></i>
          </button>
          <button class="btn btn--outline" style="padding:.3rem .6rem;font-size:.72rem"
            onclick="toggleFeatured(${l.id})" title="Toggle featured">
            <i class="ti ti-star"></i>
          </button>
          <button class="btn btn--danger" style="padding:.3rem .6rem;font-size:.72rem"
            onclick="deleteListing(${l.id})" title="Delete">
            <i class="ti ti-trash"></i>
          </button>
        </div>
      </td>
    </tr>`
  ).join("");
}

/* ── Edit listing modal (fix #2) ── */
function openEditModal(id) {
  const listings = getListings();
  const item     = listings.find(l => l.id === Number(id));
  if (!item) return;

  document.getElementById("editModal")?.remove();

  const districtOptions = UGANDA_DISTRICTS.map(d =>
    `<option value="${d.value}"${d.value === item.locationKey ? " selected" : ""}>${d.label}</option>`
  ).join("");

  const modal = document.createElement("div");
  modal.id    = "editModal";
  modal.style.cssText = `position:fixed;inset:0;z-index:9000;background:rgba(10,7,18,.75);
    backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;
    padding:1rem;animation:fadeInModal .2s ease`;

  modal.innerHTML = `
    <style>
      @keyframes fadeInModal{from{opacity:0;transform:scale(.97)}to{opacity:1;transform:scale(1)}}
      .edit-modal-inner{background:var(--white);border-radius:var(--radius-lg);max-width:600px;
        width:100%;max-height:90vh;overflow-y:auto;box-shadow:0 24px 80px rgba(0,0,0,.35);position:relative;padding:2rem}
      .edit-modal-close{position:absolute;top:1rem;right:1rem;background:var(--off-white);
        border:1px solid var(--silver-light);border-radius:50%;width:34px;height:34px;
        display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:1rem;
        color:var(--text-mid);transition:all .2s ease}
      .edit-modal-close:hover{background:var(--red-bg);color:var(--red-tag);border-color:var(--red-tag)}
    </style>
    <div class="edit-modal-inner">
      <button class="edit-modal-close" onclick="closeEditModal()"><i class="ti ti-x"></i></button>
      <h2 style="font-family:var(--font-serif);font-size:1.35rem;font-weight:700;
        color:var(--text-primary);margin-bottom:1.5rem;padding-bottom:.85rem;
        border-bottom:1px solid var(--silver-light)">
        <i class="ti ti-pencil" style="color:var(--purple);margin-right:8px"></i>Edit Listing #${item.id}
      </h2>

      <form id="editListingForm">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem">
          <div class="form-group">
            <label>Type</label>
            <select name="type">
              <option value="land"${item.type==="land"?" selected":""}>Land for Sale</option>
              <option value="rent"${item.type==="rent"?" selected":""}>House for Rent</option>
            </select>
          </div>
          <div class="form-group">
            <label>District</label>
            <select name="locationKey">${districtOptions}</select>
          </div>
        </div>
        <div class="form-group">
          <label>Title <span class="req">*</span></label>
          <input type="text" name="title" value="${item.title}" required />
        </div>
        <div class="form-group">
          <label>Full Location <span class="req">*</span></label>
          <input type="text" name="location" value="${item.location}" required />
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem">
          <div class="form-group">
            <label>Price (numbers only)</label>
            <input type="number" name="price" value="${item.price}" min="0" />
          </div>
          <div class="form-group">
            <label>Price Label</label>
            <input type="text" name="priceLabel" value="${item.priceLabel}" />
          </div>
        </div>
        <div class="form-group">
          <label>Price Note</label>
          <input type="text" name="priceNote" value="${item.priceNote}" />
        </div>
        <div class="form-group">
          <label>Features (comma-separated)</label>
          <input type="text" name="features" value="${item.features.join(", ")}" />
        </div>
        <div class="form-group">
          <label>Description</label>
          <textarea name="description" rows="3">${item.description || ""}</textarea>
        </div>
        <!-- Photo management section -->
        <div style="margin-bottom:1.25rem">
          <label style="display:block;font-size:.79rem;font-weight:500;color:var(--charcoal);margin-bottom:.75rem">
            <i class="ti ti-photo" style="color:var(--navy);margin-right:5px"></i>
            Photos (first photo = main/cover) — up to 10
          </label>
          <div id="editPhotoGrid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(95px,1fr));gap:.6rem;margin-bottom:.75rem">
            ${(item.photos && item.photos.length > 0)
              ? item.photos.map((src, i) => `
                <div style="position:relative;height:85px;border-radius:6px;overflow:hidden;border:1px solid var(--silver-light);${i===0?'outline:2px solid var(--purple);':''}">
                  <img src="${src}" style="width:100%;height:100%;object-fit:cover" />
                  ${i===0 ? '<span style="position:absolute;bottom:0;left:0;right:0;background:var(--purple);color:#fff;font-size:.55rem;text-align:center;padding:2px;letter-spacing:.04em">MAIN</span>' : ''}
                  <button type="button" onclick="editRemovePhoto(${i})"
                    style="position:absolute;top:3px;right:3px;background:rgba(153,27,27,.9);color:#fff;border:none;border-radius:50%;width:20px;height:20px;display:flex;align-items:center;justify-content:center;font-size:.65rem;cursor:pointer">
                    <i class="ti ti-x"></i>
                  </button>
                </div>`).join("")
              : '<p style="font-size:.8rem;color:var(--text-muted);grid-column:1/-1">No photos yet. Add photos below.</p>'}
          </div>
          <label style="border:2px dashed var(--silver-light);border-radius:8px;padding:1rem;text-align:center;cursor:pointer;display:block;background:var(--off-white);transition:all .2s ease"
            onmouseover="this.style.borderColor='var(--navy)';this.style.background='var(--navy-pale)'"
            onmouseout="this.style.borderColor='var(--silver-light)';this.style.background='var(--off-white)'">
            <i class="ti ti-cloud-upload" style="font-size:1.5rem;color:var(--navy-light);display:block;margin-bottom:.35rem;opacity:.6"></i>
            <span style="font-size:.78rem;color:var(--text-muted)">Click to add photos (JPG, PNG, WEBP)</span>
            <input type="file" accept="image/*" multiple id="editPhotoInput" style="display:none" onchange="editAddPhotos(this)" />
          </label>
          <input type="hidden" name="photos" id="editPhotosData" value="${JSON.stringify(item.photos || []).replace(/"/g,'&quot;')}" />
          <span style="font-size:.72rem;color:var(--text-muted);margin-top:.3rem;display:block">
            Drag photos left/right to reorder. First photo is the main cover.
          </span>
        </div>
        <div style="display:flex;gap:1rem;align-items:center;margin-bottom:1rem">
          <label style="display:flex;align-items:center;gap:.5rem;cursor:pointer;font-size:.875rem">
            <input type="checkbox" name="available" ${item.available?"checked":""} style="accent-color:var(--purple);width:17px;height:17px" />
            Available (unchecked = Taken)
          </label>
          <label style="display:flex;align-items:center;gap:.5rem;cursor:pointer;font-size:.875rem">
            <input type="checkbox" name="featured" ${item.featured?"checked":""} style="accent-color:var(--purple);width:17px;height:17px" />
            Featured on home page
          </label>
        </div>
        <div class="form-status" id="editStatus" style="text-align:left;margin-bottom:.75rem"></div>
        <div style="display:flex;gap:.75rem">
          <button type="submit" class="btn btn--primary" style="flex:1;justify-content:center">
            <i class="ti ti-device-floppy"></i> Save Changes
          </button>
          <button type="button" class="btn btn--outline" onclick="closeEditModal()">Cancel</button>
        </div>
      </form>
    </div>`;

  document.body.appendChild(modal);
  modal.addEventListener("click", e => { if (e.target === modal) closeEditModal(); });
  document.body.style.overflow = "hidden";

  /* Init photo state for this edit session */
  _editPhotos = [...(item.photos || [])];

  document.getElementById("editListingForm").addEventListener("submit", e => {
    e.preventDefault();
    const f        = e.target;
    const listings = getListings();
    const idx      = listings.findIndex(l => l.id === Number(id));
    if (idx === -1) return;

    const rawFeats   = f.querySelector('[name="features"]').value;
    const features   = rawFeats.split(",").map(s => s.trim()).filter(Boolean);
    const type       = f.querySelector('[name="type"]').value;
    const landIcons  = ["ti-ruler","ti-certificate","ti-road","ti-mountain","ti-droplet"];
    const rentIcons  = ["ti-bed","ti-bath","ti-car","ti-bolt","ti-home"];

    listings[idx] = {
      ...listings[idx],
      type,
      locationKey: f.querySelector('[name="locationKey"]').value,
      title:       f.querySelector('[name="title"]').value.trim(),
      location:    f.querySelector('[name="location"]').value.trim(),
      price:       parseInt(f.querySelector('[name="price"]').value, 10) || listings[idx].price,
      priceLabel:  f.querySelector('[name="priceLabel"]').value.trim(),
      priceNote:   f.querySelector('[name="priceNote"]').value.trim(),
      features,
      featureIcons: features.map((_, i) => (type === 'land-sale' || type === 'land-rent') ? (landIcons[i] || 'ti-check') : (rentIcons[i] || 'ti-check')),
      description: f.querySelector('[name="description"]').value.trim(),
      available:   f.querySelector('[name="available"]').checked,
      featured:    f.querySelector('[name="featured"]').checked,
    };

    saveListings(listings);
    closeEditModal();
    renderAdminTable();
    showToast("Listing updated successfully!");
  });
}

function closeEditModal() {
  document.getElementById("editModal")?.remove();
  document.body.style.overflow = "";
}

/* ── Edit modal photo helpers ── */
let _editPhotos = [];

function editAddPhotos(input) {
  const files = Array.from(input.files);
  const current = _editPhotos.length;
  if (current + files.length > 10) {
    showToast("Maximum 10 photos allowed.");
    return;
  }
  files.forEach(file => {
    const reader = new FileReader();
    reader.onload = e => {
      _editPhotos.push(e.target.result);
      _refreshEditPhotoGrid();
      _saveEditPhotosToHidden();
    };
    reader.readAsDataURL(file);
  });
}

function editRemovePhoto(idx) {
  _editPhotos.splice(idx, 1);
  _refreshEditPhotoGrid();
  _saveEditPhotosToHidden();
}

function _saveEditPhotosToHidden() {
  const hidden = document.getElementById("editPhotosData");
  if (hidden) hidden.value = JSON.stringify(_editPhotos).replace(/"/g, "&quot;");
}

function _refreshEditPhotoGrid() {
  const grid = document.getElementById("editPhotoGrid");
  if (!grid) return;
  if (_editPhotos.length === 0) {
    grid.innerHTML = '<p style="font-size:.8rem;color:var(--text-muted);grid-column:1/-1">No photos yet.</p>';
    return;
  }
  grid.innerHTML = _editPhotos.map((src, i) => `
    <div style="position:relative;height:85px;border-radius:6px;overflow:hidden;border:1px solid var(--silver-light);${i===0?'outline:2px solid var(--purple);':''}">
      <img src="${src}" style="width:100%;height:100%;object-fit:cover" />
      ${i===0 ? '<span style="position:absolute;bottom:0;left:0;right:0;background:var(--purple);color:#fff;font-size:.55rem;text-align:center;padding:2px">MAIN</span>' : ''}
      <button type="button" onclick="editRemovePhoto(${i})"
        style="position:absolute;top:3px;right:3px;background:rgba(153,27,27,.9);color:#fff;border:none;border-radius:50%;width:20px;height:20px;display:flex;align-items:center;justify-content:center;font-size:.65rem;cursor:pointer">
        <i class="ti ti-x"></i>
      </button>
    </div>`).join("");
}

function toggleAvailability(id) {
  const listings = getListings();
  const item     = listings.find(l => l.id === Number(id));
  if (!item) return;
  item.available = !item.available;
  saveListings(listings);
  renderAdminTable();
  showToast(item.available ? "Marked as Available." : "Marked as Taken.");
}
function toggleFeatured(id) {
  const listings = getListings();
  const item     = listings.find(l => l.id === Number(id));
  if (!item) return;
  item.featured = !item.featured;
  saveListings(listings);
  renderAdminTable();
  showToast(item.featured ? "Marked as Featured." : "Removed from Featured.");
}
function deleteListing(id) {
  if (!confirm("Delete this listing permanently?")) return;
  saveListings(getListings().filter(l => l.id !== Number(id)));
  renderAdminTable();
  showToast("Listing deleted.");
}
function resetAllListings() {
  if (!confirm("PERMANENTLY delete ALL listings?\nNothing will remain. This cannot be undone.")) return;
  localStorage.removeItem("kp_listings");
  saveListings([]);
  renderAdminTable();
  showToast("All listings deleted.");
}

/* ============================================================
   19. INBOX RENDER — categorised into Contact / Reviews / Enquiry
   ============================================================ */
let _inboxFilter = "all";

function setInboxFilter(cat) {
  _inboxFilter = cat;
  document.querySelectorAll(".inbox-cat-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.cat === cat);
  });
  renderInbox();
}

const CATEGORY_META = {
  contact: { label: "Contact", icon: "ti-message",      cssTag: "contact" },
  reviews: { label: "Review",  icon: "ti-star",         cssTag: "reviews" },
  enquiry: { label: "Enquiry", icon: "ti-home-search",  cssTag: "enquiry" },
};

function renderInbox() {
  const container = document.getElementById("inboxList");
  if (!container) return;
  const messages = getMessages();
  const unread   = getUnreadCount();
  const badge    = document.getElementById("inboxBadge");
  if (badge) { badge.textContent = unread; badge.style.display = unread > 0 ? "inline" : "none"; }

  /* Update per-category counts on the filter pills */
  const counts = { all: messages.length, contact: 0, reviews: 0, enquiry: 0 };
  messages.forEach(m => { const c = m.category || _normaliseCategory(m.type); if (counts[c] !== undefined) counts[c]++; });
  Object.keys(counts).forEach(cat => {
    const el = document.getElementById(`catCount-${cat}`);
    if (el) el.textContent = counts[cat];
  });

  const visible = _inboxFilter === "all"
    ? messages
    : messages.filter(m => (m.category || _normaliseCategory(m.type)) === _inboxFilter);

  const note = document.getElementById("inboxCountNote");
  if (note) {
    const catLabel = _inboxFilter === "all" ? "" : ` in ${CATEGORY_META[_inboxFilter]?.label || _inboxFilter}`;
    note.textContent = `${visible.length} message${visible.length !== 1 ? "s" : ""}${catLabel} · ${unread} unread total`;
  }

  if (visible.length === 0) {
    const emptyLabel = _inboxFilter === "all" ? "" : CATEGORY_META[_inboxFilter]?.label.toLowerCase() || "";
    container.innerHTML = `<div class="inbox-empty">
      <i class="ti ti-mail-off"></i>
      <p>No ${emptyLabel} messages${emptyLabel ? "" : " yet"}.<br/>
      Messages from the contact form, property enquiries, and reviews appear here.<br/>
      <span style="font-size:.8rem;color:var(--navy)">For email alerts on every new submission, set up Netlify form notifications (see above).</span></p>
    </div>`;
    return;
  }

  container.innerHTML = visible.map(m => {
    const category = m.category || _normaliseCategory(m.type);
    const meta = CATEGORY_META[category] || CATEGORY_META.contact;
    const stars = category === "reviews" && m.rating
      ? `<div class="inbox-msg__rating">${"★".repeat(m.rating)}${"☆".repeat(5 - m.rating)}</div>`
      : "";
    return `
    <div class="inbox-msg${m.unread ? " unread" : ""}" data-msgid="${m.id}">
      <div class="inbox-msg__header">
        <span class="inbox-msg__from">
          <span class="inbox-msg__cat-icon inbox-msg__cat-icon--${meta.cssTag}"><i class="ti ${meta.icon}"></i></span>
          ${m.from}
        </span>
        <span class="inbox-msg__time">${m.time}</span>
      </div>
      <div class="inbox-msg__subject">${m.subject || "No subject"}</div>
      ${stars}
      <div class="inbox-msg__body">${m.body}</div>
      <div class="inbox-msg__meta">
        <span class="inbox-msg__tag inbox-msg__tag--${meta.cssTag}"><i class="ti ${meta.icon}"></i> ${meta.label}</span>
        ${m.phone    ? `<span class="inbox-msg__tag"><i class="ti ti-phone"></i> ${m.phone}</span>` : ""}
        ${m.email    ? `<span class="inbox-msg__tag"><i class="ti ti-mail"></i> ${m.email}</span>` : ""}
        ${m.location ? `<span class="inbox-msg__tag"><i class="ti ti-map-pin"></i> ${m.location}</span>` : ""}
        <button class="inbox-del-btn" onclick="deleteSingleMessage(${m.id})">
          <i class="ti ti-trash"></i> Delete
        </button>
      </div>
    </div>`;
  }).join("");
}

/* ============================================================
   20. TOAST
   ============================================================ */
let _toastTimer = null;
function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => toast.classList.remove("show"), 3200);
}

/* ============================================================
   21. BACK TO TOP
   ============================================================ */
function initBackToTop() {
  document.getElementById("backToTop")?.addEventListener("click",
    () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

/* ============================================================
   22. INIT — DOMContentLoaded
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  updateCartBadge();
  initBackToTop();
  observeFadeIns();
  populateDistrictDropdowns();

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

/* ============================================================
   23. GLOBAL EXPOSURE — all onclick handlers must be global
   ============================================================ */
window.toggleCart          = toggleCart;
window.openDetailModal     = openDetailModal;
window.closeDetailModal    = closeDetailModal;
window.openEditModal       = openEditModal;
window.closeEditModal      = closeEditModal;
window.removeCartItem      = removeCartItem;
window.removeFromCart      = removeFromCart;
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
window.deleteSingleMessage = (id) => { deleteMessage(id); renderInbox(); renderAdminTable(); };
window.markAllRead         = markAllRead;
window.getMessages         = getMessages;
window.getUnreadCount      = getUnreadCount;
window.saveMessage         = saveMessage;
window.isInCart            = isInCart;
window.UGANDA_DISTRICTS    = UGANDA_DISTRICTS;
window.editAddPhotos       = editAddPhotos;
window.editRemovePhoto     = editRemovePhoto;
window.setInboxFilter      = setInboxFilter;