/* ================================================================
   PIX.CITY CLIENT PORTAL — SHARED DATA & HELPERS
   Include this before page-specific scripts on every page.
================================================================ */

const MISSIONS = [
  {
    id: 0,
    name: "Le Fontaine",
    emoji: "🍽️",
    type: "Restaurant",
    color: { from: "#1230f5", to: "#2069F7", pale: "#EEF1FE" },
    quotation: {
      ref:        "QT-2025-047",
      date:       "Dec 15, 2025",
      monthly:    "€890",
      yearly:     "€10,680",
      inclusions: [
        "9 static posts / mo",
        "3 reels / mo",
        "Meta + Google Ads",
        "Quarterly photo shoots",
        "Monthly performance reports",
        "Story management",
      ]
    },
    franchises: [
      { id: "paris15",   label: "PARIS 15" },
      { id: "bx-lac",    label: "BORDEAUX LAC" },
      { id: "la-roche",  label: "LA ROCHELLE" },
      { id: "limoges",   label: "LIMOGES" },
      { id: "st-priest", label: "ST-PRIEST" },
      { id: "beauvai",   label: "BEAUVAI" },
    ],
    contracts: [
      {
        id: 1, label: "Contract 1",
        start: "Jan 2026", end: "Dec 2026",
        startKey: "2026-01", endKey: "2026-12",
        status: "active",
        monthly: "€890",
        months: [
          { key: "2026-01", label: "Jan", status: "paid" },
          { key: "2026-02", label: "Feb", status: "paid" },
          { key: "2026-03", label: "Mar", status: "paid" },
          { key: "2026-04", label: "Apr", status: "current" },
          { key: "2026-05", label: "May", status: "upcoming" },
          { key: "2026-06", label: "Jun", status: "upcoming" },
          { key: "2026-07", label: "Jul", status: "upcoming" },
          { key: "2026-08", label: "Aug", status: "upcoming" },
          { key: "2026-09", label: "Sep", status: "upcoming" },
          { key: "2026-10", label: "Oct", status: "upcoming" },
          { key: "2026-11", label: "Nov", status: "upcoming" },
          { key: "2026-12", label: "Dec", status: "upcoming" },
        ]
      }
    ],
    events: [
      { date: "2026-04-07", type: "CM",  task: "Writing",     title: "Weekly Post — Spring Menu",    status: "done",     franchise: "paris15" },
      { date: "2026-04-08", type: "CM",  task: "Design",      title: "Spring Menu Visual",           status: "done",     franchise: "bx-lac" },
      { date: "2026-04-10", type: "PA",  task: "Integration", title: "Google Ads Campaign Launch",   status: "done",     franchise: "la-roche" },
      { date: "2026-04-14", type: "CM",  task: "Writing",     title: "Weekend Special Post",         status: "done",     franchise: "limoges" },
      { date: "2026-04-15", type: "PS",  task: "Shoot",       title: "Easter Menu Photo Shoot",      status: "done",     franchise: "st-priest" },
      { date: "2026-04-17", type: "CM",  task: "Design",      title: "Easter Promo Visual",          status: "done",     franchise: "beauvai" },
      { date: "2026-04-21", type: "CM",  task: "Writing",     title: "Chef's Special Story",         status: "upcoming", franchise: "paris15" },
      { date: "2026-04-22", type: "PAC", task: "Integration", title: "Meta Challenge Campaign",      status: "upcoming", franchise: "bx-lac" },
      { date: "2026-04-24", type: "CM",  task: "QC",          title: "Monthly Content Review",       status: "upcoming", franchise: "la-roche" },
      { date: "2026-04-28", type: "CM",  task: "Design",      title: "May Preview Post",             status: "upcoming", franchise: "limoges" },
      { date: "2026-04-30", type: "PA",  task: "QC",          title: "April Ads Performance Review", status: "upcoming", franchise: "st-priest" },
      { date: "2026-05-01", type: "CM",  task: "Writing",     title: "Labour Day Special",           status: "upcoming", franchise: "paris15" },
      { date: "2026-05-05", type: "CM",  task: "Design",      title: "May Menu Visual",              status: "upcoming", franchise: "bx-lac" },
      { date: "2026-05-08", type: "PS",  task: "Shoot",       title: "Summer Menu Photo Shoot",      status: "upcoming", franchise: "beauvai" },
      { date: "2026-05-12", type: "CM",  task: "Writing",     title: "Mother's Day Post",            status: "upcoming", franchise: "la-roche" },
      { date: "2026-05-15", type: "PA",  task: "Integration", title: "May Campaign Launch",          status: "upcoming", franchise: "limoges" },
    ]
  },
  {
    id: 1,
    name: "Salon Luxe",
    emoji: "💈",
    type: "Beauty Salon",
    color: { from: "#ed5485", to: "#f97316", pale: "#FDEEF4" },
    quotation: {
      ref:        "QT-2026-051",
      date:       "Feb 20, 2026",
      monthly:    "€650",
      yearly:     "€3,900",
      inclusions: [
        "6 static posts / mo",
        "2 reels / mo",
        "Meta Ads management",
        "Bi-annual photo shoots",
        "Monthly reports",
      ]
    },
    franchises: [
      { id: "ixina-dax",     label: "IXINA DAX" },
      { id: "ixina-creteil", label: "IXINA CRÉTEIL" },
      { id: "paris15",       label: "PARIS 15" },
      { id: "limoges",       label: "LIMOGES" },
    ],
    contracts: [
      {
        id: 1, label: "Contract 1",
        start: "Mar 2026", end: "Aug 2026",
        startKey: "2026-03", endKey: "2026-08",
        status: "active",
        monthly: "€650",
        months: [
          { key: "2026-03", label: "Mar", status: "paid" },
          { key: "2026-04", label: "Apr", status: "current" },
          { key: "2026-05", label: "May", status: "upcoming" },
          { key: "2026-06", label: "Jun", status: "upcoming" },
          { key: "2026-07", label: "Jul", status: "upcoming" },
          { key: "2026-08", label: "Aug", status: "upcoming" },
        ]
      }
    ],
    events: [
      { date: "2026-04-06", type: "CM",  task: "Writing",     title: "Spring Hair Trends Post",     status: "done",     franchise: "ixina-dax" },
      { date: "2026-04-09", type: "CM",  task: "Design",      title: "Spring Promo Visual",         status: "done",     franchise: "ixina-creteil" },
      { date: "2026-04-13", type: "PA",  task: "Integration", title: "Meta Ads Launch",             status: "done",     franchise: "paris15" },
      { date: "2026-04-20", type: "PS",  task: "Shoot",       title: "New Collection Shoot",        status: "upcoming", franchise: "ixina-dax" },
      { date: "2026-04-23", type: "CM",  task: "Writing",     title: "Client Testimonial Story",    status: "upcoming", franchise: "limoges" },
      { date: "2026-04-27", type: "PAC", task: "Integration", title: "Spring Challenge Campaign",   status: "upcoming", franchise: "ixina-creteil" },
      { date: "2026-05-03", type: "CM",  task: "Writing",     title: "May Beauty Tips",             status: "upcoming", franchise: "ixina-dax" },
      { date: "2026-05-10", type: "PA",  task: "QC",          title: "Campaign Performance Review", status: "upcoming", franchise: "paris15" },
      { date: "2026-05-17", type: "PS",  task: "Shoot",       title: "Summer Looks Shoot",          status: "upcoming", franchise: "ixina-creteil" },
    ]
  }
];

const TYPE_META = {
  CM:  { color: "#1230f5", pale: "#EEF1FE", label: "Community Mgmt" },
  PA:  { color: "#12a25a", pale: "#E9FCF7", label: "Paid Ads" },
  PAC: { color: "#f97316", pale: "#FFF1E6", label: "Paid Ad Challenge" },
  PS:  { color: "#ed5485", pale: "#FDEEF4", label: "Photo Shoot" },
};

const MONTH_NAMES = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

/* ── URL param helpers ─────────────────────────────────────── */
function getParam(name, fallback = null) {
  const p = new URLSearchParams(window.location.search);
  return p.has(name) ? p.get(name) : fallback;
}

/* ── Live clock ─────────────────────────────────────────────── */
function startClock(selector = '.status-time') {
  function tick() {
    const now = new Date();
    const t = `${now.getHours()}:${String(now.getMinutes()).padStart(2,'0')}`;
    document.querySelectorAll(selector).forEach(el => el.textContent = t);
  }
  tick();
  setInterval(tick, 30000);
}

/* ── Drawer ─────────────────────────────────────────────────── */
function openDrawer() {
  document.getElementById('drawer').classList.add('open');
  document.getElementById('drawer-overlay').classList.add('open');
}
function closeDrawer() {
  document.getElementById('drawer').classList.remove('open');
  document.getElementById('drawer-overlay').classList.remove('open');
}

/* ── Status bar icons HTML (reuse on each page) ────────────── */
const STATUS_ICONS_HTML = `
  <svg width="15" height="11" viewBox="0 0 24 18" fill="var(--dark)">
    <rect x="0" y="9" width="4" height="9" rx="1"/>
    <rect x="6" y="6" width="4" height="12" rx="1"/>
    <rect x="12" y="3" width="4" height="15" rx="1"/>
    <rect x="18" y="0" width="4" height="18" rx="1"/>
  </svg>
  <svg width="14" height="11" viewBox="0 0 24 18" fill="none" stroke="var(--dark)" stroke-width="2.5">
    <path d="M1 3a15 15 0 0 1 22 0M5 7a10 10 0 0 1 14 0M9 11a5 5 0 0 1 6 0"/>
    <circle cx="12" cy="16" r="1.5" fill="var(--dark)" stroke="none"/>
  </svg>
  <svg width="22" height="11" viewBox="0 0 26 13">
    <rect x="1" y="1" width="21" height="11" rx="2.5" stroke="var(--dark)" stroke-width="1.5" fill="none"/>
    <rect x="3" y="3" width="14" height="7" rx="1.5" fill="var(--dark)"/>
    <path d="M23.5 4.5v4a2 2 0 0 0 0-4z" fill="var(--dark)" opacity="0.4"/>
  </svg>`;

/* ── Drawer HTML (same on all authenticated pages) ──────────── */
const DRAWER_HTML = `
<div id="drawer-overlay" onclick="closeDrawer()"></div>
<div id="drawer">
  <div class="drawer-top">
    <div class="drawer-avatar">TR</div>
    <div class="drawer-name">Thomas Renard</div>
    <div class="drawer-email">thomas@lefontaine.fr</div>
  </div>
  <nav class="drawer-nav">
    <div class="drawer-section-label">Main</div>
    <button class="drawer-item" onclick="location.href='dashboard.html';closeDrawer()">
      <div class="drawer-item-icon">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
          <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
        </svg>
      </div>
      <span class="drawer-item-text">Dashboard</span>
    </button>
    <button class="drawer-item" onclick="location.href='dashboard.html';closeDrawer()">
      <div class="drawer-item-icon">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
        </svg>
      </div>
      <span class="drawer-item-text">Missions</span>
      <span class="drawer-item-badge">2</span>
    </button>
    <button class="drawer-item" onclick="location.href='calendar.html?mission=0&contract=0';closeDrawer()">
      <div class="drawer-item-icon">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <rect x="3" y="4" width="18" height="18" rx="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
      </div>
      <span class="drawer-item-text">Calendar</span>
    </button>
    <div class="drawer-section-label">Finance</div>
    <button class="drawer-item" onclick="closeDrawer()">
      <div class="drawer-item-icon">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
        </svg>
      </div>
      <span class="drawer-item-text">Invoices</span>
    </button>
    <button class="drawer-item" onclick="closeDrawer()">
      <div class="drawer-item-icon">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M9 11l3 3L22 4"/>
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
        </svg>
      </div>
      <span class="drawer-item-text">Contracts</span>
    </button>
    <div class="drawer-section-label">Account</div>
    <button class="drawer-item" onclick="closeDrawer()">
      <div class="drawer-item-icon">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <circle cx="12" cy="8" r="4"/>
          <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
        </svg>
      </div>
      <span class="drawer-item-text">Profile</span>
    </button>
    <button class="drawer-item" onclick="closeDrawer()">
      <div class="drawer-item-icon">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <circle cx="12" cy="12" r="3"/>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
        </svg>
      </div>
      <span class="drawer-item-text">Settings</span>
    </button>
  </nav>
  <div class="drawer-footer">
    <button class="logout-btn" onclick="location.href='login.html'">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
        <polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
      </svg>
      Sign out
    </button>
  </div>
</div>`;

/* ── Inject drawer into page ─────────────────────────────────── */
function injectDrawer(activeItem) {
  document.getElementById('app').insertAdjacentHTML('afterbegin', DRAWER_HTML);
  if (activeItem) {
    document.querySelectorAll('.drawer-item').forEach(el => {
      if (el.querySelector('.drawer-item-text')?.textContent.trim() === activeItem) {
        el.classList.add('active');
      }
    });
  }
}

/* ── Kickoff (KO) todos ─────────────────────────────────────── */
const KICKOFFS = [
  {
    id: "ko-lf-cm-apr",
    missionId: 0,
    missionName: "Le Fontaine",
    missionEmoji: "🍽️",
    color: { from: "#1230f5", to: "#2069F7", pale: "#EEF1FE" },
    type: "CM",
    month: "April 2026",
    title: "Community Management — April Kickoff",
    status: "pending",
    dueDate: "2026-04-27",
    initiatedDate: "2026-04-24",
    queries: [
      { id: 1, text: "What key themes or seasonal topics should we focus on for April content?", answer: null },
      { id: 2, text: "Do you have any upcoming promotions, events or specials to highlight?", answer: null },
      { id: 3, text: "Any posts from last month you'd like us to continue or evolve?", answer: null },
    ],
    files: [],
    completedAt: null
  },
  {
    id: "ko-lf-pa-apr",
    missionId: 0,
    missionName: "Le Fontaine",
    missionEmoji: "🍽️",
    color: { from: "#1230f5", to: "#2069F7", pale: "#EEF1FE" },
    type: "PA",
    month: "April 2026",
    title: "Paid Ads — April Budget Review",
    status: "active",
    dueDate: "2026-04-26",
    initiatedDate: "2026-04-23",
    queries: [
      { id: 1, text: "Please confirm the ad budget allocation for April (Meta vs. Google).", answer: "Meta: €400, Google: €200" },
      { id: 2, text: "Any new products or offers to promote via paid campaigns this month?", answer: null },
      { id: 3, text: "Any geographic targeting adjustments for this month?", answer: null },
    ],
    files: [],
    completedAt: null
  },
  {
    id: "ko-sl-cm-apr",
    missionId: 1,
    missionName: "Salon Luxe",
    missionEmoji: "💈",
    color: { from: "#ed5485", to: "#f97316", pale: "#FDEEF4" },
    type: "CM",
    month: "April 2026",
    title: "Community Management — April Kickoff",
    status: "pending",
    dueDate: "2026-04-27",
    initiatedDate: "2026-04-24",
    queries: [
      { id: 1, text: "What new services or treatments should we highlight this month?", answer: null },
      { id: 2, text: "Do you have any client testimonials or before/after photos to share?", answer: null },
      { id: 3, text: "Any team members to feature or spotlight this month?", answer: null },
    ],
    files: [],
    completedAt: null
  },
  {
    id: "ko-lf-ps-may",
    missionId: 0,
    missionName: "Le Fontaine",
    missionEmoji: "🍽️",
    color: { from: "#1230f5", to: "#2069F7", pale: "#EEF1FE" },
    type: "PS",
    month: "May 2026",
    title: "Photo Shoot — May Planning",
    status: "pending",
    dueDate: "2026-04-28",
    initiatedDate: "2026-04-25",
    queries: [
      { id: 1, text: "What dishes or menu items should we focus on for the May shoot?", answer: null },
      { id: 2, text: "Preferred shoot date — we have availability May 6–8. Which works best?", answer: null },
      { id: 3, text: "Any mood/style references or inspiration images to share?", answer: null },
    ],
    files: [],
    completedAt: null
  },
  {
    id: "ko-sl-pa-apr",
    missionId: 1,
    missionName: "Salon Luxe",
    missionEmoji: "💈",
    color: { from: "#ed5485", to: "#f97316", pale: "#FDEEF4" },
    type: "PA",
    month: "April 2026",
    title: "Paid Ads — April Setup",
    status: "completed",
    dueDate: "2026-04-20",
    initiatedDate: "2026-04-17",
    queries: [
      { id: 1, text: "Please confirm the April ad budget (Meta only).", answer: "€300 for Meta." },
      { id: 2, text: "Target audience — any changes from last month?", answer: "Women 25–45, Paris region. Same as before." },
      { id: 3, text: "Key service to promote for April?", answer: "Spring hair colour treatments and balayage." },
    ],
    files: ["brief_april_salon.pdf"],
    completedAt: "2026-04-21"
  }
];

/* ── Client requests (exceptional projects) ─────────────────── */
const REQUESTS = [
  {
    id: "req-001",
    missionId: 0, missionName: "Le Fontaine", missionEmoji: "🍽️",
    color: { from: "#1230f5", to: "#2069F7", pale: "#EEF1FE" },
    franchise: "paris15", franchiseLabel: "PARIS 15",
    type: "Story", icon: "📱",
    requirement: "Need an Instagram story for our 5th anniversary celebration on June 15th. Should feel celebratory and warm — maybe with a golden colour palette.",
    targetDate: "2026-06-15",
    submittedDate: "2026-04-20",
    status: "in-progress",
    files: [],
    tasks: [
      { id: "t1", label: "W",  title: "Creative Brief",  status: "done",        date: "2026-04-22" },
      { id: "t2", label: "D",  title: "Visual Concept",  status: "in-progress", date: "2026-04-26" },
      { id: "t3", label: "QC", title: "Client Review",   status: "pending",     date: "2026-04-28" },
      { id: "t4", label: "I",  title: "Final Delivery",  status: "pending",     date: "2026-05-02" },
    ]
  },
  {
    id: "req-002",
    missionId: 1, missionName: "Salon Luxe", missionEmoji: "💈",
    color: { from: "#ed5485", to: "#f97316", pale: "#FDEEF4" },
    franchise: "ixina-dax", franchiseLabel: "IXINA DAX",
    type: "Reels", icon: "🎬",
    requirement: "Promotional reels for our new summer hair colour range launch. Fast-paced, trendy music, vibrant before/after shots.",
    targetDate: "2026-05-01",
    submittedDate: "2026-04-10",
    status: "completed",
    files: ["brief_summer.pdf"],
    tasks: [
      { id: "t1", label: "W",  title: "Script Writing",  status: "done", date: "2026-04-12" },
      { id: "t2", label: "D",  title: "Shoot Day",        status: "done", date: "2026-04-16" },
      { id: "t3", label: "D",  title: "Editing",          status: "done", date: "2026-04-20" },
      { id: "t4", label: "I",  title: "Published",        status: "done", date: "2026-04-22" },
    ]
  },
  {
    id: "req-003",
    missionId: 0, missionName: "Le Fontaine", missionEmoji: "🍽️",
    color: { from: "#1230f5", to: "#2069F7", pale: "#EEF1FE" },
    franchise: "bx-lac", franchiseLabel: "BORDEAUX LAC",
    type: "Post", icon: "📸",
    requirement: "A special Mother's Day post highlighting our Sunday brunch menu — something elegant with flowers and table-setting details.",
    targetDate: "2026-05-11",
    submittedDate: "2026-04-18",
    status: "pending",
    files: [],
    tasks: [
      { id: "t1", label: "W", title: "Brief Review", status: "pending", date: "2026-04-25" },
    ]
  }
];

const REQUEST_STATUS_META = {
  "pending":     { label: "Pending Review", color: "#f97316", pale: "#FFF1E6" },
  "in-progress": { label: "In Progress",    color: "#1230f5", pale: "#EEF1FE" },
  "completed":   { label: "Completed",      color: "#12a25a", pale: "#E9FCF7" },
};

const TASK_STATUS_META = {
  "done":        { color: "#12a25a", label: "Done" },
  "in-progress": { color: "#1230f5", label: "In Progress" },
  "pending":     { color: "#9ca3af", label: "Pending" },
};

function koDaysLeft(ko) {
  const due   = new Date(ko.dueDate);
  const today = new Date('2026-04-24');
  return Math.ceil((due - today) / 86400000);
}

function koAnsweredCount(ko) {
  return ko.queries.filter(q => q.answer && q.answer.trim()).length;
}

/* ── Task breakdown definitions ──────────────────────────────── */
function getTaskBreakdown(taskName, isDone) {
  const p = isDone ? 100 : 0;
  const defs = {
    "Writing":     [{ n:"Brief", p: isDone?100:85 }, { n:"Draft", p: isDone?100:55 }, { n:"Review", p }],
    "Design":      [{ n:"Brief", p: 100 }, { n:"Design", p: isDone?100:50 }, { n:"QC", p }],
    "Integration": [{ n:"Setup", p: 100 }, { n:"Test", p: isDone?100:65 }, { n:"Live", p }],
    "QC":          [{ n:"Check", p: isDone?100:75 }, { n:"Report", p }],
    "Shoot":       [{ n:"Prep", p: 100 }, { n:"Shoot", p }, { n:"Edit", p }],
  };
  return defs[taskName] || defs["Writing"];
}
