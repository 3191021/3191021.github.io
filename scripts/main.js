// ===== CONFIG =====
const CORRECT_PASSWORD_HASH = "81f650e89d54717de91973d7094324a1f2c24f2a"; 
// SHA-1 for "password123" — CHANGE THIS using https://www.sha1-online.com/

// ===== EMERGENCY EXIT =====
function emergencyExit() {
  window.location.href = "https://classroom.google.com";
}

// ===== TAB CLOAKING =====
document.addEventListener('keydown', (e) => {
  if (e.key === "Escape") {
    document.title = "Math Resources";
    document.querySelector("link[rel='icon']").href = "https://www.google.com/favicon.ico";
  }
});

// ===== PASSWORD MODAL =====
function showPasswordPrompt() {
  document.getElementById('passwordModal').style.display = 'flex';
  document.getElementById('passwordInput').value = '';
  document.getElementById('errorMessage').innerText = '';
}

function closeModal() {
  document.getElementById('passwordModal').style.display = 'none';
}

// SHA-1 Hash function
function sha1(str) {
  const buffer = new TextEncoder("utf-8").encode(str);
  return crypto.subtle.digest("SHA-1", buffer).then(hash => {
    return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
  });
}

async function checkPassword() {
  const entered = document.getElementById('passwordInput').value;
  const hash = await sha1(entered);

  if (hash === CORRECT_PASSWORD_HASH) {
    localStorage.setItem('breakroomAccess', 'granted');
    window.location.href = "games.html";
  } else {
    document.getElementById('errorMessage').innerText = "Incorrect password!";
  }
}

function verifyAccess() {
  const access = localStorage.getItem('breakroomAccess');
  if (access !== 'granted') {
    window.location.href = "index.html";
  }
}
