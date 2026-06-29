/* ================================================================
   main.js  —  Ker Properties
   Backend: Supabase (Auth + Postgres)
   All data (listings, messages, cart) syncs globally in real-time.
   ================================================================ */

/* ── Uganda Districts ─────────────────────────────────────── */
const UGANDA_DISTRICTS = [
  { value:"kampala",     label:"Kampala" },
  { value:"gulu",        label:"Gulu" },
  { value:"mbarara",     label:"Mbarara" },
  { value:"jinja",       label:"Jinja" },
  { value:"lira",        label:"Lira" },
  { value:"mbale",       label:"Mbale" },
  { value:"fort-portal", label:"Fort Portal" },
  { value:"arua",        label:"Arua" },
  { value:"soroti",      label:"Soroti" },
  { value:"masaka",      label:"Masaka" },
  { value:"entebbe",     label:"Entebbe" },
  { value:"wakiso",      label:"Wakiso" },
  { value:"mukono",      label:"Mukono" },
  { value:"kasese",      label:"Kasese" },
  { value:"hoima",       label:"Hoima" },
  { value:"kabale",      label:"Kabale" },
  { value:"tororo",      label:"Tororo" },
  { value:"moroto",      label:"Moroto" },
  { value:"kitgum",      label:"Kitgum" },
  { value:"masindi",     label:"Masindi" },
  { value:"iganga",      label:"Iganga" },
  { value:"busia",       label:"Busia" },
  { value:"mityana",     label:"Mityana" },
  { value:"mubende",     label:"Mubende" },
  { value:"nakasongola", label:"Nakasongola" },
  { value:"pallisa",     label:"Pallisa" },
  { value:"nebbi",       label:"Nebbi" },
  { value:"adjumani",    label:"Adjumani" },
  { value:"kotido",      label:"Kotido" },
  { value:"bundibugyo",  label:"Bundibugyo" },
  { value:"bushenyi",    label:"Bushenyi" },
  { value:"kamuli",      label:"Kamuli" },
  { value:"kayunga",     label:"Kayunga" },
  { value:"kiboga",      label:"Kiboga" },
  { value:"kiruhura",    label:"Kiruhura" },
  { value:"koboko",      label:"Koboko" },
  { value:"kumi",        label:"Kumi" },
  { value:"kyenjojo",    label:"Kyenjojo" },
  { value:"lyantonde",   label:"Lyantonde" },
  { value:"manafwa",     label:"Manafwa" },
  { value:"mayuge",      label:"Mayuge" },
  { value:"ntungamo",    label:"Ntungamo" },
  { value:"oyam",        label:"Oyam" },
  { value:"pader",       label:"Pader" },
  { value:"rakai",       label:"Rakai" },
  { value:"rukungiri",   label:"Rukungiri" },
  { value:"sembabule",   label:"Sembabule" },
  { value:"sironko",     label:"Sironko" },
  { value:"yumbe",       label:"Yumbe" },
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

/* ================================================================
   SUPABASE HELPERS
   All reads/writes go through these thin wrappers.
   ================================================================ */

/* ── Listings ─────────────────────────────────────────────── */

async function getListings() {
  const { data, error } = await _supabase
    .from("listings")
    .select("*")
    .order("id", { ascending: true });
  if (error) { console.error("getListings:", error); return []; }
  return data || [];
}

async function saveListing(listing) {
  /* Upsert by id — inserts if new, updates if existing */
  const { error } = await _supabase
    .from("listings")
    .upsert(listing, { onConflict: "id" });
  if (error) console.error("saveListing:", error);
}

async function updateListingField(id, fields) {
  const { error } = await _supabase
    .from("listings")
    .update(fields)
    .eq("id", id);
  if (error) console.error("updateListingField:", error);
}

async function deleteListing(id) {
  if (!confirm("Delete this listing permanently?")) return;
  const { error } = await _supabase
    .from("listings")
    .delete()
    .eq("id", id);
  if (error) { console.error("deleteListing:", error); showToast("Delete failed."); return; }
  await renderAdminTable();
  showToast("Listing deleted.");
}

async function resetAllListings() {
  if (!confirm("PERMANENTLY delete ALL listings?\nThis cannot be undone.")) return;
  const { error } = await _supabase.from("listings").delete().neq("id", 0);
  if (error) { console.error("resetAllListings:", error); return; }
  await renderAdminTable();
  showToast("All listings deleted.");
}

/* ── Messages ─────────────────────────────────────────────── */

async function getMessages() {
  const { data, error } = await _supabase
    .from("messages")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) { console.error("getMessages:", error); return []; }
  return data || [];
}

async function saveMessage(data) {
  const category = _normaliseCategory(data.type);
  const { error } = await _supabase.from("messages").insert({
    sender_name: data.from,
    phone:       data.phone  || null,
    email:       data.email  || null,
    subject:     data.subject || null,
    body:        data.body,
    category,
    rating:      data.rating || null,
    service:     data.service || null,
    location:    data.location || null,
    unread:      true,
  });
  if (error) console.error("saveMessage:", error);
}

async function markAllRead() {
  const { error } = await _supabase
    .from("messages")
    .update({ unread: false })
    .eq("unread", true);
  if (error) console.error("markAllRead:", error);
}

async function markOneRead(id) {
  const { error } = await _supabase
    .from("messages")
    .update({ unread: false })
    .eq("id", id);
  if (error) console.error("markOneRead:", error);
  await renderInbox();
  await renderAdminTable();
}

async function deleteMessage(id) {
  const { error } = await _supabase
    .from("messages")
    .delete()
    .eq("id", id);
  if (error) console.error("deleteMessage:", error);
}

async function getUnreadCount() {
  const { count, error } = await _supabase
    .from("messages")
    .select("id", { count: "exact", head: true })
    .eq("unread", true);
  if (error) return 0;
  return count || 0;
}

/* ── Cart (stored in Supabase if logged-in; sessionStorage as fallback) ── */
/* For public visitors the cart is session-only. Admins don't use the cart. */

function getCart() {
  try { return JSON.parse(sessionStorage.getItem("kp_cart")) || []; }
  catch { return []; }
}

function saveCart(cart) {
  try { sessionStorage.setItem("kp_cart", JSON.stringify(cart)); }
  catch(e) { console.warn("saveCart:", e); }
  updateCartBadge();
}

/* ================================================================
   AUTH — Supabase email/password (replaces localStorage credentials)
   ================================================================ */

async function signIn(email, password) {
  const { data, error } = await _supabase.auth.signInWithPassword({ email, password });
  return { data, error };
}

async function signOut() {
  await _supabase.auth.signOut();
}

async function getSession() {
  const { data: { session } } = await _supabase.auth.getSession();
  return session;
}

async function updateAdminPassword(newPassword) {
  const { error } = await _supabase.auth.updateUser({ password: newPassword });
  return error;
}

async function sendPasswordResetEmail(email) {
  const { error } = await _supabase.auth.resetPasswordForEmail(email, {
    redirectTo: window.location.origin + "/login.html",
  });
  return error;
}

/* ================================================================
   ADD / TOGGLE CART
   ================================================================ */

async function toggleCart(id) {
  const listings = await getListings();
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
    cart.push({ id: item.id, title: item.title, price: item.price_label, type: item.type, photo: (item.photos && item.photos[0]) || "" });
    saveCart(cart);
    showToast(`"${item.title}" added to enquiry list!`);
    _updateHearts(id, true);
  }
}

function _updateHearts(id, inCart) {
  document.querySelectorAll(`.prop-card__save[data-id="${id}"]`).forEach(btn => {
    btn.classList.toggle("saved", inCart);
    btn.innerHTML = inCart
      ? '<i class="ti ti-heart-filled"></i>'
      : '<i class="ti ti-heart"></i>';
    btn.title = inCart ? "Remove from enquiry list" : "Add to enquiry list";
  });
  const modalBtn = document.getElementById(`modalHeartBtn_${id}`);
  if (modalBtn) _updateModalHeartBtn(modalBtn, inCart);
}

function _updateModalHeartBtn(btn, inCart) {
  btn.style.background  = inCart ? "var(--purple)" : "var(--white)";
  btn.style.color       = inCart ? "#fff"         : "var(--purple)";
  btn.style.borderColor = "var(--purple)";
  btn.innerHTML = `<i class="ti ti-heart${inCart ? "-filled" : ""}"></i> ${inCart ? "Saved" : "Save Property"}`;
}

function isInCart(id) { return getCart().some(c => Number(c.id) === Number(id)); }

function updateCartBadge() {
  const count = getCart().length;
  document.querySelectorAll("#cartBadge").forEach(b => {
    const changed = b.textContent !== String(count);
    b.textContent   = count;
    b.style.display = count > 0 ? "flex" : "none";
    if (changed) {
      b.classList.remove("pop");
      void b.offsetWidth;
      b.classList.add("pop");
    }
  });
  const countPill  = document.getElementById("cartItemCount");
  if (countPill)  countPill.textContent  = count;
  const countSide  = document.getElementById("cartItemCountSide");
  if (countSide)  countSide.textContent  = count;
  const countTotal = document.getElementById("cartItemCountTotal");
  if (countTotal) countTotal.textContent = count;

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

/* ================================================================
   PROPERTY DETAIL MODAL
   ================================================================ */

async function openDetailModal(id) {
  const listings = await getListings();
  const item     = listings.find(l => l.id === Number(id));
  if (!item) return;

  document.getElementById("propDetailModal")?.remove();

  /* normalise field names from DB snake_case */
  const photos       = item.photos || [];
  const features     = item.features || [];
  const featureIcons = item.feature_icons || [];
  const priceLabel   = item.price_label || "";
  const priceNote    = item.price_note  || "";
  const numPhotos    = photos.length;

  const featuresHTML = features.map((f, i) =>
    `<span style="display:inline-flex;align-items:center;gap:5px;font-size:.85rem;
      background:var(--purple-pale);border:1px solid rgba(91,45,142,.15);
      border-radius:100px;padding:3px 10px;color:var(--text-mid)">
      <i class="ti ${featureIcons[i] || "ti-check"}" style="color:var(--purple)"></i>${f}
    </span>`
  ).join("");

  const photoHTML = numPhotos > 0
    ? `<div style="position:relative;margin-bottom:1.25rem" id="modalPhotoWrap">
        <div style="height:260px;border-radius:var(--radius-md);overflow:hidden;position:relative">
          ${photos.map((src, i) =>
            `<div style="position:absolute;inset:0;background:url('${src}') center/cover;
              opacity:${i === 0 ? 1 : 0};transition:opacity .45s ease" data-slide="${i}"></div>`
          ).join("")}
        </div>
        ${numPhotos > 1 ? `
        <button onclick="slidePhoto(-1)" title="Previous photo"
          style="position:absolute;left:8px;top:50%;transform:translateY(-50%);
            background:rgba(0,0,0,0.48);color:#fff;border:none;border-radius:50%;
            width:36px;height:36px;display:flex;align-items:center;justify-content:center;
            cursor:pointer;font-size:1.15rem;z-index:4"
          onmouseover="this.style.background='rgba(91,45,142,0.85)'"
          onmouseout="this.style.background='rgba(0,0,0,0.48)'">
          <i class="ti ti-chevron-left"></i>
        </button>
        <button onclick="slidePhoto(1)" title="Next photo"
          style="position:absolute;right:8px;top:50%;transform:translateY(-50%);
            background:rgba(0,0,0,0.48);color:#fff;border:none;border-radius:50%;
            width:36px;height:36px;display:flex;align-items:center;justify-content:center;
            cursor:pointer;font-size:1.15rem;z-index:4"
          onmouseover="this.style.background='rgba(91,45,142,0.85)'"
          onmouseout="this.style.background='rgba(0,0,0,0.48)'">
          <i class="ti ti-chevron-right"></i>
        </button>
        <div style="position:absolute;bottom:10px;left:50%;transform:translateX(-50%);
          display:flex;gap:5px;z-index:3">
          ${photos.map((_, i) =>
            `<button onclick="slidePhoto(${i}, true)"
              style="width:7px;height:7px;border-radius:50%;border:none;cursor:pointer;padding:0;
              background:${i === 0 ? "#fff" : "rgba(255,255,255,.42)"};transition:all .2s" data-dot="${i}"></button>`
          ).join("")}
        </div>` : ""}
      </div>`
    : `<div style="height:200px;border-radius:var(--radius-md);
        background:linear-gradient(135deg,var(--purple-pale),var(--silver-light));
        display:flex;align-items:center;justify-content:center;margin-bottom:1.25rem;
        border:1px solid var(--silver-light)">
        <i class="ti ${(item.type === "land-sale" || item.type === "land-rent") ? "ti-map-pin" : "ti-building"}"
          style="font-size:3rem;color:var(--purple-light);opacity:.38"></i>
      </div>`;

  const modal = document.createElement("div");
  modal.id    = "propDetailModal";
  modal.style.cssText = `position:fixed;inset:0;z-index:9000;
    background:rgba(10,7,18,.75);backdrop-filter:blur(6px);
    display:flex;align-items:center;justify-content:center;padding:1rem;
    animation:fadeInModal .2s ease;`;

  const typeLabel = item.type === "land-sale" ? "For Sale"
                  : item.type === "land-rent" ? "Land Rent"
                  : item.type === "house-sale" ? "For Sale" : "For Rent";
  const inCart = isInCart(item.id);

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
          <span class="prop-card__badge ${item.type === "land-sale" || item.type === "land-rent" ? "land" : "rent"}"
            style="position:static;font-size:.7rem;display:inline-block">${typeLabel}</span>
          ${!item.available
            ? `<span style="background:var(--red-bg);color:var(--red-tag);font-size:.7rem;font-weight:600;padding:2px 10px;border-radius:100px;text-transform:uppercase">Taken / Sold</span>`
            : `<span style="background:var(--green-bg);color:var(--green-tag);font-size:.7rem;font-weight:600;padding:2px 10px;border-radius:100px;text-transform:uppercase">Available</span>`}
        </div>
        <h2 style="font-family:var(--font-serif);font-size:1.6rem;font-weight:700;color:var(--text-primary);margin-bottom:.4rem">${item.title}</h2>
        <div style="display:flex;align-items:center;gap:5px;font-size:.85rem;color:var(--text-muted);margin-bottom:1rem">
          <i class="ti ti-map-pin" style="color:var(--purple-light)"></i>${item.location}
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:.5rem;margin-bottom:1.25rem">${featuresHTML}</div>
        ${item.description ? `<p style="font-size:.92rem;color:var(--text-mid);line-height:1.75;margin-bottom:1.25rem">${item.description}</p>` : ""}
        <div style="background:var(--purple-pale);border:1px solid rgba(91,45,142,.15);border-radius:var(--radius-md);padding:1rem 1.25rem;margin-bottom:1.5rem;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:.75rem">
          <div>
            <div style="font-size:.72rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:.08em;margin-bottom:3px">Price</div>
            <div style="font-family:var(--font-serif);font-size:1.5rem;font-weight:700;color:var(--text-primary)">${priceLabel}</div>
            <div style="font-size:.75rem;color:var(--text-muted)">${priceNote}</div>
          </div>
          <button onclick="toggleCart(${item.id});_updateModalHeartBtn(this,isInCart(${item.id}))"
            id="modalHeartBtn_${item.id}"
            style="display:flex;align-items:center;gap:6px;
              background:${inCart ? "var(--purple)" : "var(--white)"};
              color:${inCart ? "#fff" : "var(--purple)"};
              border:2px solid var(--purple);border-radius:var(--radius-sm);
              padding:.5rem 1.1rem;font-size:.85rem;font-weight:600;cursor:pointer;
              font-family:var(--font-sans);transition:all .25s ease">
            <i class="ti ti-heart${inCart ? "-filled" : ""}"></i>
            ${inCart ? "Saved" : "Save Property"}
          </button>
        </div>
      </div>
      <div style="padding:0 2rem 2rem">
        <h3 style="font-family:var(--font-serif);font-size:1.15rem;font-weight:700;color:var(--text-primary);margin-bottom:1.25rem;padding-bottom:.85rem;border-top:1px solid var(--silver-light);padding-top:1.25rem">
          Send an Enquiry About This Property
        </h3>
        <form id="modalEnquiryForm">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem">
            <div class="form-group">
              <label for="meq-name">Your Name <span class="req">*</span></label>
              <input type="text" id="meq-name" placeholder="Full name" required />
            </div>
            <div class="form-group">
              <label for="meq-phone">Phone / WhatsApp <span class="req">*</span></label>
              <input type="tel" id="meq-phone" placeholder="+256 7XX XXX XXX" required />
            </div>
          </div>
          <div class="form-group">
            <label for="meq-email">Email Address</label>
            <input type="email" id="meq-email" placeholder="your@email.com" />
          </div>
          <div class="form-group">
            <label for="meq-message">Message <span class="req">*</span></label>
            <textarea id="meq-message" rows="3"
              placeholder="Ask about this property — viewing, title documents, payment terms…"
              required></textarea>
          </div>
          <button type="submit" class="btn btn--primary btn--full" id="modalEnquiryBtn">
            <i class="ti ti-send"></i> Send Enquiry
          </button>
          <div class="form-status" id="modalEnquiryStatus" style="margin-top:.75rem"></div>
        </form>
      </div>
    </div>`;

  document.body.appendChild(modal);
  modal.addEventListener("click", e => { if (e.target === modal) closeDetailModal(); });

  /* Photo navigation */
  let _currentSlide = 0;
  const _totalSlides = photos.length;
  window.slidePhoto = function(arg, absolute) {
    if (_totalSlides < 2) return;
    _currentSlide = absolute ? arg : (_currentSlide + arg + _totalSlides) % _totalSlides;
    modal.querySelectorAll("[data-slide]").forEach((el, i) => { el.style.opacity = i === _currentSlide ? "1" : "0"; });
    modal.querySelectorAll("[data-dot]").forEach((el, i) => {
      el.style.background  = i === _currentSlide ? "#fff" : "rgba(255,255,255,.42)";
      el.style.width       = i === _currentSlide ? "18px" : "7px";
      el.style.borderRadius = "4px";
    });
  };

  /* Enquiry form submit */
  document.getElementById("modalEnquiryForm").addEventListener("submit", async e => {
    e.preventDefault();
    const btn    = document.getElementById("modalEnquiryBtn");
    const status = document.getElementById("modalEnquiryStatus");
    const name   = document.getElementById("meq-name").value.trim();
    const phone  = document.getElementById("meq-phone").value.trim();
    const email  = document.getElementById("meq-email").value.trim();
    const msg    = document.getElementById("meq-message").value.trim();
    if (!name || !phone || !msg) {
      status.textContent = "Please fill in all required fields."; status.className = "form-status error"; return;
    }
    if (btn) { btn.disabled = true; btn.innerHTML = '<i class="ti ti-loader-2 ti-spin"></i> Sending…'; }
    try {
      await saveMessage({
        from: name, phone, email,
        subject: `Enquiry: ${item.title}`,
        body: `Property: ${item.title}\nLocation: ${item.location}\nPrice: ${priceLabel}\n\nMessage:\n${msg}`,
        type: "property-enquiry"
      });
      /* Also post to Netlify Forms for email notification */
      const fd = new URLSearchParams();
      fd.set("form-name",       "property-enquiry");
      fd.set("property_title",  item.title);
      fd.set("name", name); fd.set("phone", phone);
      fd.set("email", email); fd.set("message", msg);
      await fetch("/", { method:"POST", headers:{"Content-Type":"application/x-www-form-urlencoded"}, body: fd.toString() }).catch(()=>{});
      e.target.reset();
      status.textContent = "✓ Enquiry sent! Our team will contact you shortly."; status.className = "form-status success";
      showToast("Enquiry sent successfully!");
    } catch {
      status.textContent = "Something went wrong. Please call or WhatsApp us directly."; status.className = "form-status error";
    } finally {
      if (btn) { btn.disabled = false; btn.innerHTML = '<i class="ti ti-send"></i> Send Enquiry'; }
    }
  });

  document.body.style.overflow = "hidden";
}

function closeDetailModal() {
  document.getElementById("propDetailModal")?.remove();
  document.body.style.overflow = "";
}

/* ================================================================
   PROPERTY CARD
   ================================================================ */

function createCard(listing) {
  const inCart       = isInCart(listing.id);
  const photos       = listing.photos || [];
  const features     = listing.features || [];
  const featureIcons = listing.feature_icons || [];
  const priceLabel   = listing.price_label || "";
  const priceNote    = listing.price_note  || "";
  const hasPhoto     = photos.length > 0;

  const featuresHTML = features.map((f, i) =>
    `<span class="prop-card__feat">
      <i class="ti ${featureIcons[i] || "ti-check"}"></i>${f}
    </span>`
  ).join("");

  const photoSlides = hasPhoto
    ? photos.map((src, i) =>
        `<div class="prop-card__photo${i === 0 ? " active" : ""}" style="background-image:url('${src}')" data-idx="${i}"></div>`
      ).join("") : "";

  const photoDots = hasPhoto && photos.length > 1
    ? `<div class="prop-card__photo-dots">
        ${photos.map((_, i) => `<button class="prop-card__photo-dot${i === 0 ? " active" : ""}" data-dot="${i}"></button>`).join("")}
      </div>` : "";

  const takenOverlay = !listing.available
    ? `<div class="prop-card__taken"><span class="prop-card__taken-label">Taken / Sold</span></div>` : "";

  const typeLabel = listing.type === "land-sale" ? "For Sale"
                  : listing.type === "land-rent" ? "Land Rent"
                  : listing.type === "house-sale" ? "For Sale" : "For Rent";

  return `
    <div class="prop-card fade-in" data-id="${listing.id}">
      <div class="prop-card__image">
        ${hasPhoto ? `<div class="prop-card__photos">${photoSlides}</div>` : ""}
        ${!hasPhoto ? `<i class="ti ${(listing.type === "land-sale" || listing.type === "land-rent") ? "ti-map-pin" : "ti-building"}"></i>` : ""}
        ${photoDots}
        <span class="prop-card__badge ${listing.type === "land-sale" || listing.type === "land-rent" ? "land" : "rent"}">${typeLabel}</span>
        <button class="prop-card__save${inCart ? " saved" : ""}" data-id="${listing.id}"
          onclick="toggleCart(${listing.id})" title="${inCart ? "Remove from enquiry list" : "Add to enquiry list"}">
          ${inCart ? '<i class="ti ti-heart-filled"></i>' : '<i class="ti ti-heart"></i>'}
        </button>
        ${takenOverlay}
      </div>
      <div class="prop-card__body">
        <div class="prop-card__title">${listing.title}</div>
        <div class="prop-card__loc"><i class="ti ti-map-pin"></i>${listing.location}</div>
        <div class="prop-card__features">${featuresHTML}</div>
        <div class="prop-card__footer">
          <div class="prop-card__price">${priceLabel}<span>${priceNote}</span></div>
          <button class="prop-card__cta" onclick="openDetailModal(${listing.id})">
            <i class="ti ti-info-circle"></i> Details
          </button>
        </div>
      </div>
    </div>`;
}

function initCardSlideshows() {
  document.querySelectorAll(".prop-card").forEach(card => {
    const dots   = card.querySelectorAll(".prop-card__photo-dot");
    const slides = card.querySelectorAll(".prop-card__photo");
    if (!dots.length) return;
    dots.forEach(dot => {
      dot.addEventListener("click", e => {
        e.stopPropagation();
        const idx = parseInt(dot.dataset.dot, 10);
        slides.forEach((p, i) => p.classList.toggle("active", i === idx));
        dots.forEach((d, i) => d.classList.toggle("active", i === idx));
      });
    });
  });
}

/* ================================================================
   HOME PAGE
   ================================================================ */

async function renderHomeListings() {
  const listings = await getListings();
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

/* ================================================================
   PROPERTIES PAGE
   ================================================================ */

async function renderPropertyPage(results) {
  const grid    = document.getElementById("allPropertiesGrid");
  const countEl = document.getElementById("filterCount");
  if (!grid) return;
  if (!results) results = await getListings();
  if (countEl) countEl.textContent = `${results.length} propert${results.length === 1 ? "y" : "ies"} found`;
  grid.innerHTML = results.length
    ? results.map(createCard).join("")
    : `<div class="no-results"><i class="ti ti-search-off"></i><p>No properties match your filters.</p></div>`;
  observeFadeIns();
  initCardSlideshows();
}

async function handleSearch(e) {
  if (e) e.preventDefault();
  const query      = (document.getElementById("searchInput")?.value || "").toLowerCase().trim();
  const typeFilter = document.getElementById("searchType")?.value    || "all";
  const locFilter  = document.getElementById("searchLocation")?.value || "all";
  const listings   = await getListings();
  const results    = listings.filter(l => {
    const matchType = typeFilter === "all"
      || l.type === typeFilter
      || (typeFilter === "land"       && (l.type === "land-sale"  || l.type === "land-rent"))
      || (typeFilter === "rent"       && (l.type === "house-rent" || l.type === "house-sale"))
      || (typeFilter === "house-rent" && l.type === "house-rent")
      || (typeFilter === "house-sale" && l.type === "house-sale")
      || (typeFilter === "land-sale"  && l.type === "land-sale")
      || (typeFilter === "land-rent"  && l.type === "land-rent");
    const matchLoc = locFilter === "all" || l.location_key === locFilter;
    const matchQ   = !query || l.title.toLowerCase().includes(query)
                   || l.location.toLowerCase().includes(query)
                   || (l.features || []).some(f => f.toLowerCase().includes(query));
    return matchType && matchLoc && matchQ;
  });
  if (window.location.pathname.includes("properties")) {
    await renderPropertyPage(results);
  } else {
    const params = new URLSearchParams();
    if (query)                params.set("q",    query);
    if (typeFilter !== "all") params.set("type", typeFilter);
    if (locFilter  !== "all") params.set("loc",  locFilter);
    window.location.href = "properties.html?" + params.toString();
  }
}

async function initPropertyFilters() {
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
  await handleSearch(null);
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

/* ================================================================
   NAVBAR
   ================================================================ */

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
  const raw     = window.location.pathname;
  const page    = raw.split("/").pop() || "index.html";
  const current = page === "" || page === "/" ? "index.html" : page;
  document.querySelectorAll(".nav-link").forEach(link => {
    const href  = (link.getAttribute("href") || "").split("?")[0].split("#")[0];
    const match = href === current
      || (current === "index.html" && (href === "index.html" || href === "./" || href === ""));
    link.classList.toggle("active", match);
  });
}

/* ================================================================
   COUNTERS / FADE-INS
   ================================================================ */

function animateCounter(el, target, duration = 1800) {
  let start = null;
  const step = ts => {
    if (!start) start = ts;
    const ease = 1 - Math.pow(1 - Math.min((ts - start) / duration, 1), 3);
    el.textContent = Math.floor(ease * target);
    if (ease < 1) requestAnimationFrame(step); else el.textContent = target;
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

function observeFadeIns() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });
  document.querySelectorAll(".fade-in:not(.visible)").forEach(el => observer.observe(el));
}

/* ================================================================
   CONTACT FORM
   ================================================================ */

function initContactForm() {
  const form      = document.getElementById("contactForm");
  const status    = document.getElementById("formStatus");
  const submitBtn = document.getElementById("contactSubmitBtn");
  if (!form) return;
  form.addEventListener("submit", async e => {
    e.preventDefault();
    const name     = form.querySelector('[name="name"]')?.value.trim();
    const phone    = form.querySelector('[name="phone"]')?.value.trim();
    const msg      = form.querySelector('[name="message"]')?.value.trim();
    const email    = form.querySelector('[name="email"]')?.value.trim() || "";
    const interest = form.querySelector('[name="interest"]')?.value || "";
    const subject  = form.querySelector('[name="subject"]')?.value.trim() || "";
    if (!name || !phone || !msg) {
      if (status) { status.textContent = "Please fill in all required fields."; status.className = "form-status error"; }
      return;
    }
    if (submitBtn) { submitBtn.disabled = true; submitBtn.innerHTML = '<i class="ti ti-loader-2 ti-spin"></i> Sending…'; }
    try {
      await saveMessage({ from:name, phone, email, subject: subject || (interest ? `Interest: ${interest}` : "Contact Form"), body: msg, type:"contact" });
      const body = new URLSearchParams(new FormData(form)).toString();
      await fetch("/", { method:"POST", headers:{"Content-Type":"application/x-www-form-urlencoded"}, body }).catch(()=>{});
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

/* ================================================================
   TESTIMONIES / STAR PICKER
   ================================================================ */

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
    const btn      = form.querySelector('[type="submit"]');
    const name     = form.querySelector('[name="reviewer_name"]')?.value.trim();
    const text     = form.querySelector('[name="review_text"]')?.value.trim();
    if (!name || !text) {
      if (status) { status.textContent = "Please fill in your name and review."; status.className = "form-status error"; } return;
    }
    if (btn) { btn.disabled = true; btn.innerHTML = '<i class="ti ti-loader-2 ti-spin"></i> Submitting…'; }
    try {
      const location = form.querySelector('[name="reviewer_location"]')?.value.trim() || "";
      const service  = form.querySelector('[name="service_used"]')?.value || "";
      const rating   = form.querySelector('[name="rating"]')?.value || "5";
      await saveMessage({ from:name, subject: location ? `Review from ${location}` : "New Review", body:text, rating:Number(rating)||5, service, location, type:"reviews" });
      const body = new URLSearchParams(new FormData(form)).toString();
      await fetch("/", { method:"POST", headers:{"Content-Type":"application/x-www-form-urlencoded"}, body }).catch(()=>{});
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

/* ================================================================
   CART PAGE
   ================================================================ */

async function renderCartPage() {
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
  if (emptyEl)    emptyEl.style.display    = empty ? "block" : "none";
  if (summaryEl)  summaryEl.style.display  = empty ? "none"  : "block";
  if (helpNote)   helpNote.style.display   = empty ? "none"  : "flex";
  if (headerRow)  headerRow.style.display  = empty ? "none"  : "flex";
  if (countEl)    countEl.textContent      = cart.length;
  if (countTotal) countTotal.textContent   = cart.length;
  if (propInput)  propInput.value          = cart.map(c => `${c.title} (${c.price})`).join(" | ");
  if (empty) { itemsEl.innerHTML = ""; return; }

  cart.forEach(c => _updateHearts(c.id, true));
  itemsEl.innerHTML = cart.map(item => `
    <div class="cart-item fade-in" data-id="${item.id}">
      <div class="cart-item__icon">
        ${item.photo
          ? `<img src="${item.photo}" alt="${item.title}" />`
          : `<i class="ti ${(item.type === "land-sale" || item.type === "land-rent") ? "ti-map-pin" : "ti-building"}"></i>`}
      </div>
      <div class="cart-item__info">
        <div class="cart-item__title">
          ${item.title}
          <span class="cart-item__type ${item.type === "land-sale" || item.type === "land-rent" ? "land" : "rent"}">
            ${item.type === "land-sale" ? "For Sale" : item.type === "land-rent" ? "Land Rent" : item.type === "house-sale" ? "For Sale" : "For Rent"}
          </span>
        </div>
        <div class="cart-item__price">${item.price}</div>
      </div>
      <div style="display:flex;gap:.5rem;flex-wrap:wrap;align-items:center">
        <button class="btn btn--outline" style="padding:.35rem .75rem;font-size:.78rem"
          onclick="openDetailModal(${item.id})"><i class="ti ti-info-circle"></i> Details</button>
        <button class="cart-remove" onclick="removeCartItem(${item.id})">
          <i class="ti ti-trash"></i> Remove
        </button>
      </div>
    </div>`
  ).join("");
  observeFadeIns();
}

function removeCartItem(id) {
  removeFromCart(id);
  renderCartPage();
  const propInput = document.getElementById("selectedPropertiesInput");
  if (propInput) propInput.value = getCart().map(c => `${c.title} (${c.price})`).join(" | ");
  showToast("Item removed from enquiry list.");
}

/* ================================================================
   LOGIN (Supabase Auth — no hardcoded credentials)
   ================================================================ */

function initLogin() {
  const form   = document.getElementById("loginForm");
  const status = document.getElementById("loginStatus");
  if (!form) return;

  /* Already logged in → redirect */
  getSession().then(session => {
    if (session && window.location.pathname.includes("login")) {
      window.location.href = "admin.html";
    }
  });

  form.addEventListener("submit", async e => {
    e.preventDefault();
    const email = form.querySelector('[name="username"]').value.trim();
    const pass  = form.querySelector('[name="password"]').value;
    const btn   = form.querySelector('[type="submit"]');
    if (btn) { btn.disabled = true; btn.innerHTML = '<i class="ti ti-loader-2 ti-spin"></i> Signing in…'; }
    const { error } = await signIn(email, pass);
    if (error) {
      if (status) { status.textContent = "Incorrect email or password."; status.className = "form-status error"; }
      if (btn)    { btn.disabled = false; btn.innerHTML = '<i class="ti ti-login"></i> Sign In'; }
    } else {
      showToast("Login successful! Redirecting…");
      setTimeout(() => window.location.href = "admin.html", 900);
    }
  });

  /* Password reset via Supabase */
  const sendOtpBtn  = document.getElementById("sendOtpBtn");
  const resetStatus = document.getElementById("resetStatus");

  sendOtpBtn?.addEventListener("click", async function() {
    const contact = (document.getElementById("reset-contact")?.value || "").trim();
    if (!contact || !contact.includes("@")) {
      resetStatus.textContent = "Please enter the admin email address.";
      resetStatus.className   = "form-status error"; return;
    }
    this.disabled = true;
    this.innerHTML = '<i class="ti ti-loader-2 ti-spin"></i> Sending…';
    const error = await sendPasswordResetEmail(contact);
    this.disabled = false;
    this.innerHTML = '<i class="ti ti-send"></i> Send Reset Link';
    if (error) {
      resetStatus.textContent = "Could not send reset email. Check the address and try again.";
      resetStatus.className   = "form-status error";
    } else {
      const masked = contact.replace(/(.{2}).+(@.+)/, "$1***$2");
      resetStatus.textContent = `✓ A password reset link has been sent to ${masked}. Check your inbox.`;
      resetStatus.className   = "form-status success";
    }
  });
}

/* ================================================================
   ADMIN — guard + dashboard
   ================================================================ */

async function initAdmin() {
  if (!window.location.pathname.includes("admin")) return;

  /* Auth guard */
  const session = await getSession();
  if (!session) {
    window.location.replace("login.html");
    return;
  }

  await renderAdminTable();
  await renderInbox();
}

async function handleLogout() {
  await signOut();
  window.location.href = "login.html";
}

async function renderAdminTable() {
  const tbody = document.getElementById("adminTableBody");
  if (!tbody) return;
  const listings = await getListings();
  const messages = await getMessages();

  const landSaleCount  = listings.filter(l => l.type === "land-sale").length;
  const landRentCount  = listings.filter(l => l.type === "land-rent").length;
  const houseSaleCount = listings.filter(l => l.type === "house-sale").length;
  const houseRentCount = listings.filter(l => l.type === "house-rent").length;
  const featuredCount  = listings.filter(l => l.featured).length;
  const msgCount       = messages.length;
  const unread         = messages.filter(m => m.unread).length;

  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  set("adminTotalCount",     listings.length);
  set("adminLandSaleCount",  landSaleCount);
  set("adminLandRentCount",  landRentCount);
  set("adminHouseSaleCount", houseSaleCount);
  set("adminHouseRentCount", houseRentCount);
  set("adminFeaturedCount",  featuredCount);
  set("adminMsgCount",       msgCount);

  const badge = document.getElementById("inboxBadge");
  if (badge) { badge.textContent = unread; badge.style.display = unread > 0 ? "inline" : "none"; }

  if (listings.length === 0) {
    tbody.innerHTML = `<tr><td colspan="9"><div style="text-align:center;padding:3rem;color:var(--text-muted)">
      <i class="ti ti-building-off" style="font-size:2rem;display:block;margin-bottom:.75rem;opacity:.35"></i>
      No listings yet. Use the "Add Listing" tab.
    </div></td></tr>`;
    return;
  }

  tbody.innerHTML = listings.map(l => `
    <tr data-id="${l.id}" data-title="${(l.title||"").toLowerCase()}"
        data-location="${(l.location||"").toLowerCase()}" data-type="${l.type}"
        data-status="${l.available ? "available" : "sold"}">
      <td style="color:var(--text-muted);font-size:.78rem">${l.id}</td>
      <td>
        <strong style="font-size:.875rem">${l.title}</strong><br/>
        <span style="font-size:.75rem;color:var(--text-muted)">${l.location}</span>
      </td>
      <td>
        <span class="prop-card__badge prop-card__badge--${l.type}" style="position:static;font-size:.65rem;display:inline-block">
          ${l.type === "land-sale" ? "Land Sale" : l.type === "land-rent" ? "Land Rent" : l.type === "house-sale" ? "House Sale" : "House Rent"}
        </span>
      </td>
      <td style="font-size:.82rem;font-weight:500">${l.price_label||""}</td>
      <td>${(l.photos||[]).length > 0
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
          <button class="btn btn--outline" style="padding:.3rem .6rem;font-size:.72rem" onclick="openEditModal(${l.id})" title="Edit"><i class="ti ti-pencil"></i></button>
          <button class="btn btn--outline" style="padding:.3rem .6rem;font-size:.72rem" onclick="toggleAvailability(${l.id})" title="Toggle available"><i class="ti ti-refresh"></i></button>
          <button class="btn btn--outline" style="padding:.3rem .6rem;font-size:.72rem" onclick="toggleFeatured(${l.id})" title="Toggle featured"><i class="ti ti-star"></i></button>
          <button class="btn btn--danger"  style="padding:.3rem .6rem;font-size:.72rem" onclick="deleteListing(${l.id})" title="Delete"><i class="ti ti-trash"></i></button>
        </div>
      </td>
    </tr>`
  ).join("");
}

/* ── Edit listing modal ──────────────────────────────────────── */

async function openEditModal(id) {
  const listings = await getListings();
  const item     = listings.find(l => l.id === Number(id));
  if (!item) return;
  document.getElementById("editModal")?.remove();

  const districtOptions = UGANDA_DISTRICTS.map(d =>
    `<option value="${d.value}"${d.value === item.location_key ? " selected" : ""}>${d.label}</option>`
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
      <h2 style="font-family:var(--font-serif);font-size:1.35rem;font-weight:700;color:var(--text-primary);margin-bottom:1.5rem;padding-bottom:.85rem;border-bottom:1px solid var(--silver-light)">
        <i class="ti ti-pencil" style="color:var(--purple);margin-right:8px"></i>Edit Listing #${item.id}
      </h2>
      <form id="editListingForm">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem">
          <div class="form-group">
            <label>Type</label>
            <select name="type">
              <option value="land-sale"${item.type==="land-sale"?" selected":""}>Land for Sale</option>
              <option value="land-rent"${item.type==="land-rent"?" selected":""}>Land for Rent</option>
              <option value="house-sale"${item.type==="house-sale"?" selected":""}>House for Sale</option>
              <option value="house-rent"${item.type==="house-rent"?" selected":""}>House for Rent</option>
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
            <input type="number" name="price" value="${item.price||0}" min="0" />
          </div>
          <div class="form-group">
            <label>Price Label</label>
            <input type="text" name="priceLabel" value="${item.price_label||""}" />
          </div>
        </div>
        <div class="form-group">
          <label>Price Note</label>
          <input type="text" name="priceNote" value="${item.price_note||""}" />
        </div>
        <div class="form-group">
          <label>Features (comma-separated)</label>
          <input type="text" name="features" value="${(item.features||[]).join(", ")}" />
        </div>
        <div class="form-group">
          <label>Description</label>
          <textarea name="description" rows="3">${item.description||""}</textarea>
        </div>
        <div style="margin-bottom:1.25rem">
          <label style="display:block;font-size:.79rem;font-weight:500;color:var(--charcoal);margin-bottom:.75rem">
            <i class="ti ti-photo" style="color:var(--navy);margin-right:5px"></i>Photos (first = main cover) — up to 10
          </label>
          <div id="editPhotoGrid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(95px,1fr));gap:.6rem;margin-bottom:.75rem">
            ${(item.photos && item.photos.length > 0)
              ? item.photos.map((src, i) => `
                <div style="position:relative;height:85px;border-radius:6px;overflow:hidden;border:1px solid var(--silver-light);${i===0?"outline:2px solid var(--purple)":""}">
                  <img src="${src}" style="width:100%;height:100%;object-fit:cover" />
                  ${i===0?"<span style='position:absolute;bottom:0;left:0;right:0;background:var(--purple);color:#fff;font-size:.55rem;text-align:center;padding:2px'>MAIN</span>":""}
                  <button type="button" onclick="editRemovePhoto(${i})"
                    style="position:absolute;top:3px;right:3px;background:rgba(153,27,27,.9);color:#fff;border:none;border-radius:50%;width:20px;height:20px;display:flex;align-items:center;justify-content:center;font-size:.65rem;cursor:pointer">
                    <i class="ti ti-x"></i>
                  </button>
                </div>`).join("")
              : "<p style='font-size:.8rem;color:var(--text-muted);grid-column:1/-1'>No photos yet.</p>"}
          </div>
          <label style="border:2px dashed var(--silver-light);border-radius:8px;padding:1rem;text-align:center;cursor:pointer;display:block;background:var(--off-white)"
            onmouseover="this.style.borderColor='var(--navy)'"
            onmouseout="this.style.borderColor='var(--silver-light)'">
            <i class="ti ti-cloud-upload" style="font-size:1.5rem;color:var(--navy-light);display:block;margin-bottom:.35rem;opacity:.6"></i>
            <span style="font-size:.78rem;color:var(--text-muted)">Click to add photos (JPG, PNG, WEBP)</span>
            <input type="file" accept="image/*" multiple id="editPhotoInput" style="display:none" onchange="editAddPhotos(this)" />
          </label>
          <input type="hidden" name="photos" id="editPhotosData" value="${JSON.stringify(item.photos||[]).replace(/"/g,"&quot;")}" />
        </div>
        <div style="display:flex;gap:1rem;align-items:center;margin-bottom:1rem">
          <label style="display:flex;align-items:center;gap:.5rem;cursor:pointer;font-size:.875rem">
            <input type="checkbox" name="available" ${item.available?"checked":""} style="accent-color:var(--purple);width:17px;height:17px" />
            Available
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
  _editPhotos = [...(item.photos || [])];

  document.getElementById("editListingForm").addEventListener("submit", async e => {
    e.preventDefault();
    const f          = e.target;
    const statusEl   = document.getElementById("editStatus");
    const rawFeats   = f.querySelector('[name="features"]').value;
    const features   = rawFeats.split(",").map(s => s.trim()).filter(Boolean);
    const type       = f.querySelector('[name="type"]').value;
    const landIcons  = ["ti-ruler","ti-certificate","ti-road","ti-mountain","ti-droplet"];
    const rentIcons  = ["ti-bed","ti-bath","ti-car","ti-bolt","ti-home"];
    const featureIcons = features.map((_, i) => (type==="land-sale"||type==="land-rent") ? (landIcons[i]||"ti-check") : (rentIcons[i]||"ti-check"));

    const updated = {
      id:            item.id,
      type,
      location_key:  f.querySelector('[name="locationKey"]').value,
      title:         f.querySelector('[name="title"]').value.trim(),
      location:      f.querySelector('[name="location"]').value.trim(),
      price:         parseInt(f.querySelector('[name="price"]').value, 10) || item.price,
      price_label:   f.querySelector('[name="priceLabel"]').value.trim(),
      price_note:    f.querySelector('[name="priceNote"]').value.trim(),
      features,
      feature_icons: featureIcons,
      description:   f.querySelector('[name="description"]').value.trim(),
      available:     f.querySelector('[name="available"]').checked,
      featured:      f.querySelector('[name="featured"]').checked,
      photos:        _editPhotos,
    };

    const { error } = await _supabase.from("listings").update(updated).eq("id", item.id);
    if (error) {
      if (statusEl) { statusEl.textContent = "Save failed: " + error.message; statusEl.className = "form-status error"; }
      return;
    }
    closeEditModal();
    await renderAdminTable();
    showToast("Listing updated successfully!");
  });
}

function closeEditModal() {
  document.getElementById("editModal")?.remove();
  document.body.style.overflow = "";
}

/* Photo helpers for edit modal */
let _editPhotos = [];
function editAddPhotos(input) {
  const files   = Array.from(input.files);
  if (_editPhotos.length + files.length > 10) { showToast("Maximum 10 photos allowed."); return; }
  files.forEach(file => {
    const reader = new FileReader();
    reader.onload = e => { _editPhotos.push(e.target.result); _refreshEditPhotoGrid(); };
    reader.readAsDataURL(file);
  });
}
function editRemovePhoto(idx) { _editPhotos.splice(idx, 1); _refreshEditPhotoGrid(); }
function _refreshEditPhotoGrid() {
  const grid = document.getElementById("editPhotoGrid");
  if (!grid) return;
  if (_editPhotos.length === 0) { grid.innerHTML = "<p style='font-size:.8rem;color:var(--text-muted);grid-column:1/-1'>No photos yet.</p>"; return; }
  grid.innerHTML = _editPhotos.map((src, i) => `
    <div style="position:relative;height:85px;border-radius:6px;overflow:hidden;border:1px solid var(--silver-light);${i===0?"outline:2px solid var(--purple)":""}">
      <img src="${src}" style="width:100%;height:100%;object-fit:cover" />
      ${i===0?"<span style='position:absolute;bottom:0;left:0;right:0;background:var(--purple);color:#fff;font-size:.55rem;text-align:center;padding:2px'>MAIN</span>":""}
      <button type="button" onclick="editRemovePhoto(${i})"
        style="position:absolute;top:3px;right:3px;background:rgba(153,27,27,.9);color:#fff;border:none;border-radius:50%;width:20px;height:20px;display:flex;align-items:center;justify-content:center;font-size:.65rem;cursor:pointer">
        <i class="ti ti-x"></i>
      </button>
    </div>`).join("");
  const hidden = document.getElementById("editPhotosData");
  if (hidden) hidden.value = JSON.stringify(_editPhotos).replace(/"/g,"&quot;");
}

/* ── Availability / Featured / Delete ───────────────────────── */

async function toggleAvailability(id) {
  const listings = await getListings();
  const item     = listings.find(l => l.id === Number(id));
  if (!item) return;
  await updateListingField(id, { available: !item.available });
  await renderAdminTable();
  showToast(!item.available ? "Marked as Available." : "Marked as Taken.");
}

async function toggleFeatured(id) {
  const listings = await getListings();
  const item     = listings.find(l => l.id === Number(id));
  if (!item) return;
  await updateListingField(id, { featured: !item.featured });
  await renderAdminTable();
  showToast(!item.featured ? "Marked as Featured." : "Removed from Featured.");
}

/* ================================================================
   INBOX
   ================================================================ */

let _inboxFilter = "all";

function setInboxFilter(cat) {
  _inboxFilter = cat;
  document.querySelectorAll(".inbox-cat-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.cat === cat);
  });
  renderInbox();
}

const CATEGORY_META = {
  contact: { label:"Contact", icon:"ti-message",     cssTag:"contact" },
  reviews: { label:"Review",  icon:"ti-star",        cssTag:"reviews" },
  enquiry: { label:"Enquiry", icon:"ti-home-search", cssTag:"enquiry" },
};

function _normaliseCategory(type) {
  if (type === "reviews" || type === "review")             return "reviews";
  if (type === "property-enquiry" || type === "enquiry")   return "enquiry";
  return "contact";
}

async function renderInbox() {
  const container = document.getElementById("inboxList");
  if (!container) return;
  const messages    = await getMessages();
  const totalUnread = messages.filter(m => m.unread).length;

  const badge = document.getElementById("inboxBadge");
  if (badge) { badge.textContent = totalUnread; badge.style.display = totalUnread > 0 ? "inline" : "none"; }

  const unreadCounts = { all: totalUnread, contact: 0, reviews: 0, enquiry: 0 };
  messages.filter(m => m.unread).forEach(m => {
    const c = m.category;
    if (unreadCounts[c] !== undefined) unreadCounts[c]++;
  });
  Object.keys(unreadCounts).forEach(cat => {
    const el = document.getElementById(`catCount-${cat}`);
    if (!el) return;
    el.textContent   = unreadCounts[cat];
    el.style.display = unreadCounts[cat] > 0 ? "" : "none";
  });

  const visible = _inboxFilter === "all"
    ? messages
    : messages.filter(m => m.category === _inboxFilter);
  const visibleUnread = visible.filter(m => m.unread).length;
  const note = document.getElementById("inboxCountNote");
  if (note) {
    const catLabel = _inboxFilter === "all" ? "" : ` in ${CATEGORY_META[_inboxFilter]?.label || _inboxFilter}`;
    note.textContent = visibleUnread > 0
      ? `${visible.length} message${visible.length !== 1 ? "s" : ""}${catLabel} — ${visibleUnread} unread`
      : `${visible.length} message${visible.length !== 1 ? "s" : ""}${catLabel}`;
  }

  if (visible.length === 0) {
    const emptyLabel = _inboxFilter === "all" ? "" : (CATEGORY_META[_inboxFilter]?.label.toLowerCase() || "");
    container.innerHTML = `<div class="inbox-empty">
      <i class="ti ti-mail-off"></i>
      <p>No ${emptyLabel} messages${emptyLabel ? "" : " yet"}.</p>
    </div>`;
    return;
  }

  container.innerHTML = visible.map(m => {
    const meta  = CATEGORY_META[m.category] || CATEGORY_META.contact;
    const stars = m.category === "reviews" && m.rating
      ? `<div class="inbox-msg__rating">${"★".repeat(m.rating)}${"☆".repeat(5 - m.rating)}</div>` : "";
    const timeStr = m.created_at ? new Date(m.created_at).toLocaleString("en-UG") : "";
    return `
    <div class="inbox-msg${m.unread ? " unread" : ""}" data-msgid="${m.id}">
      <div class="inbox-msg__header">
        <span class="inbox-msg__from">
          <span class="inbox-msg__cat-icon inbox-msg__cat-icon--${meta.cssTag}"><i class="ti ${meta.icon}"></i></span>
          ${m.sender_name}
        </span>
        <span class="inbox-msg__time">${timeStr}</span>
      </div>
      <div class="inbox-msg__subject">${m.subject || "No subject"}</div>
      ${stars}
      <div class="inbox-msg__body">${m.body}</div>
      <div class="inbox-msg__meta">
        <span class="inbox-msg__tag inbox-msg__tag--${meta.cssTag}"><i class="ti ${meta.icon}"></i> ${meta.label}</span>
        ${m.phone    ? `<span class="inbox-msg__tag"><i class="ti ti-phone"></i> ${m.phone}</span>`      : ""}
        ${m.email    ? `<span class="inbox-msg__tag"><i class="ti ti-mail"></i> ${m.email}</span>`       : ""}
        ${m.location ? `<span class="inbox-msg__tag"><i class="ti ti-map-pin"></i> ${m.location}</span>` : ""}
        ${m.unread
          ? `<button class="inbox-read-btn" onclick="markOneRead('${m.id}')"><i class="ti ti-check"></i> Mark as Read</button>`
          : `<span class="inbox-msg__tag" style="color:var(--text-muted)"><i class="ti ti-eye"></i> Read</span>`}
        <button class="inbox-del-btn" onclick="deleteSingleMessage('${m.id}')"><i class="ti ti-trash"></i> Delete</button>
      </div>
    </div>`;
  }).join("");
}

/* ================================================================
   TOAST + BACK TO TOP
   ================================================================ */

let _toastTimer = null;
function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => toast.classList.remove("show"), 3200);
}

function initBackToTop() {
  document.getElementById("backToTop")?.addEventListener("click",
    () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

/* ================================================================
   BOOT
   ================================================================ */

document.addEventListener("DOMContentLoaded", async () => {
  initNavbar();
  updateCartBadge();
  initBackToTop();
  observeFadeIns();
  populateDistrictDropdowns();

  await renderHomeListings();
  initCounters();
  initHeroTags();
  initContactForm();
  await initPropertyFilters();
  initStarPicker();
  initReviewForm();
  await renderCartPage();
  await initAdmin();
  initLogin();

  const searchForm = document.getElementById("searchForm");
  if (searchForm) searchForm.addEventListener("submit", handleSearch);
});

/* ── Expose to inline onclick handlers ──────────────────────── */
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
window.getAdminCreds       = () => ({});           /* stub — no longer used */
window.saveAdminCreds      = () => {};             /* stub */
window.showToast           = showToast;
window.renderAdminTable    = renderAdminTable;
window.renderInbox         = renderInbox;
window.deleteMessage       = deleteMessage;
window.deleteSingleMessage = async (id) => { await deleteMessage(id); await renderInbox(); await renderAdminTable(); };
window.markAllRead         = markAllRead;
window.markOneRead         = markOneRead;
window.getMessages         = getMessages;
window.getUnreadCount      = getUnreadCount;
window.saveMessage         = saveMessage;
window.isInCart            = isInCart;
window.UGANDA_DISTRICTS    = UGANDA_DISTRICTS;
window.editAddPhotos       = editAddPhotos;
window.editRemovePhoto     = editRemovePhoto;
window.setInboxFilter      = setInboxFilter;
window.handleLogout        = handleLogout;
window._updateModalHeartBtn = _updateModalHeartBtn;
