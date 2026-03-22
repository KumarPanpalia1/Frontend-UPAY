/* ============================================================
   UPAY NGO Finance Portal — Utils
============================================================ */

// ── Toast Notifications ─────────────────────────────────────
const TOAST_ICONS = {
  success: '✅',
  error:   '❌',
  info:    'ℹ️',
  warning: '⚠️',
};

const TOAST_LABELS = {
  success: 'Success',
  error:   'Error',
  info:    'Info',
  warning: 'Warning',
};

function showToast(message, type = 'info', duration = 3500) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <div class="toast-icon">${TOAST_ICONS[type] || 'ℹ️'}</div>
    <div class="toast-body">
      <strong>${TOAST_LABELS[type] || 'Notice'}</strong>
      <p>${message}</p>
    </div>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('out');
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// ── Currency Formatting ─────────────────────────────────────
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// ── Date Formatting ─────────────────────────────────────────
function formatDate(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

function todayISO() {
  return new Date().toISOString().split('T')[0];
}

// ── Form Validation ─────────────────────────────────────────
// fields: array of { el: HTMLInputElement, rules: { required?, min?, max?, pattern?, label? } }
function validateForm(fields) {
  let valid = true;

  fields.forEach(({ el, rules }) => {
    const errorEl = el.parentElement.querySelector('.form-error');
    const val = el.value.trim();
    let msg = '';

    if (rules.required && !val) {
      msg = `${rules.label || 'This field'} is required.`;
    } else if (val && rules.min !== undefined && Number(val) < rules.min) {
      msg = `${rules.label || 'Value'} must be at least ${rules.min}.`;
    } else if (val && rules.max !== undefined && Number(val) > rules.max) {
      msg = `${rules.label || 'Value'} must not exceed ${rules.max}.`;
    } else if (val && rules.pattern && !rules.pattern.test(val)) {
      msg = rules.patternMsg || `${rules.label || 'Value'} is invalid.`;
    }

    if (msg) {
      valid = false;
      el.classList.add('error');
      if (errorEl) { errorEl.textContent = msg; errorEl.classList.add('show'); }
    } else {
      el.classList.remove('error');
      if (errorEl) { errorEl.textContent = ''; errorEl.classList.remove('show'); }
    }
  });

  return valid;
}

function clearFormErrors(form) {
  form.querySelectorAll('.form-control').forEach(el => el.classList.remove('error'));
  form.querySelectorAll('.form-error').forEach(el => { el.textContent = ''; el.classList.remove('show'); });
}

// ── Unique ID Generator ─────────────────────────────────────
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

// ── Sidebar / Hamburger wiring ──────────────────────────────
function initSidebar() {
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.sidebar-overlay');
  const hamburger = document.querySelector('.hamburger');

  if (!sidebar) return;

  function openSidebar()  { sidebar.classList.add('open');  overlay && overlay.classList.add('open'); }
  function closeSidebar() { sidebar.classList.remove('open'); overlay && overlay.classList.remove('open'); }

  hamburger && hamburger.addEventListener('click', openSidebar);
  overlay   && overlay.addEventListener('click', closeSidebar);

  // Active nav link
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href === current || (current === '' && href === 'dashboard.html')) {
      link.classList.add('active');
    }
  });
}

// ── Topbar date ─────────────────────────────────────────────
function initTopbarDate() {
  const el = document.getElementById('topbar-date');
  if (!el) return;
  el.textContent = new Date().toLocaleDateString('en-IN', {
    weekday: 'short', day: 'numeric', month: 'long', year: 'numeric'
  });
}
