/* ============================================================
   UPAY NGO Finance Portal — Auth
============================================================ */

// ── Session ─────────────────────────────────────────────────
function getSession() {
  try {
    const raw = localStorage.getItem('upay_session');
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function setSession(user) {
  localStorage.setItem('upay_session', JSON.stringify(user));
}

function clearSession() {
  localStorage.removeItem('upay_session');
}

// ── Login ────────────────────────────────────────────────────
function login(email, password, role) {
  const users = getData('USERS') || [];
  const user  = users.find(u =>
    u.email.toLowerCase() === email.toLowerCase() &&
    u.password === password &&
    u.role === role
  );
  if (!user) return { success: false, message: 'Invalid credentials or role. Please try again.' };
  setSession(user);
  return { success: true, user };
}

// ── Logout ───────────────────────────────────────────────────
function logout() {
  clearSession();
  window.location.href = 'index.html';
}

// ── Page Guard ───────────────────────────────────────────────
// Call on every protected page. If no session → redirect to login.
function guardPage() {
  const session = getSession();
  if (!session) {
    window.location.href = 'index.html';
    return null;
  }
  return session;
}

// ── Populate Sidebar with current user ───────────────────────
function populateSidebarUser() {
  const session = getSession();
  if (!session) return;

  const nameEl     = document.getElementById('sidebar-user-name');
  const emailEl    = document.getElementById('sidebar-user-email');
  const avatarEl   = document.getElementById('sidebar-user-avatar');
  const roleEl     = document.getElementById('sidebar-role-text');
  const roleDotEl  = document.getElementById('sidebar-role-dot');

  if (nameEl)    nameEl.textContent    = session.name;
  if (emailEl)   emailEl.textContent   = session.email;
  if (avatarEl)  avatarEl.textContent  = session.initials || session.name.slice(0,2).toUpperCase();
  if (roleEl)    roleEl.innerHTML      = `Logged in as <strong>${session.role}</strong>`;

  // colour dot by role
  if (roleDotEl) {
    roleDotEl.style.background = session.role === 'Admin' ? '#F59E0B' : '#10B981';
  }
}

// ── Bind logout buttons ──────────────────────────────────────
function bindLogout() {
  document.querySelectorAll('.btn-logout, [data-action="logout"]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (confirm('Are you sure you want to logout?')) logout();
    });
  });
}

// ── isAdmin helper ───────────────────────────────────────────
function isAdmin() {
  const s = getSession();
  return s && s.role === 'Admin';
}

// ── Show/hide admin-only elements ────────────────────────────
function applyRoleVisibility() {
  const admin = isAdmin();
  document.querySelectorAll('[data-role="admin"]').forEach(el => {
    el.style.display = admin ? '' : 'none';
  });
  document.querySelectorAll('[data-role="volunteer"]').forEach(el => {
    el.style.display = admin ? 'none' : '';
  });
}

// ── Boot: run on every protected page ────────────────────────
function authBoot() {
  initData();
  const session = guardPage();
  if (!session) return;

  populateSidebarUser();
  bindLogout();
  applyRoleVisibility();
  initSidebar();
  initTopbarDate();

  return session;
}
