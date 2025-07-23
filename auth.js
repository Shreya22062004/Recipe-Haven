// Utility: Show/hide auth controls
function updateAuthUI() {
  const signInBtn = document.querySelector('.sign-in-btn');
  const signUpBtn = document.querySelector('.sign-up-btn');
  const signOutBtn = document.querySelector('.signout-btn');
  const welcomeMsg = document.querySelector('.welcome-msg');
  const username = localStorage.getItem('loggedInUser');

  if (username) {
    signInBtn.style.display = 'none';
    signUpBtn.style.display = 'none';
    signOutBtn.style.display = '';
    welcomeMsg.style.display = '';
    welcomeMsg.textContent = `Welcome, ${username}!`;
  } else {
    signInBtn.style.display = '';
    signUpBtn.style.display = '';
    signOutBtn.style.display = 'none';
    welcomeMsg.style.display = 'none';
    welcomeMsg.textContent = '';
  }
}

// --- Show/Hide Auth Modals (unchanged) ---
document.querySelector('.sign-in-btn').onclick = function() {
  document.getElementById('signin-modal').style.display = 'flex';
};
document.querySelector('.sign-up-btn').onclick = function() {
  document.getElementById('signup-modal').style.display = 'flex';
};
document.getElementById('close-signup').onclick = function() {
  document.getElementById('signup-modal').style.display = 'none';
};
document.getElementById('close-signin').onclick = function() {
  document.getElementById('signin-modal').style.display = 'none';
};
window.onclick = function(e) {
  if (e.target === document.getElementById('signup-modal')) document.getElementById('signup-modal').style.display = 'none';
  if (e.target === document.getElementById('signin-modal')) document.getElementById('signin-modal').style.display = 'none';
};

// --- Sign Up Function (unchanged) ---
document.getElementById('signup-form').onsubmit = function(e) {
  e.preventDefault();
  const username = document.getElementById('signup-username').value.trim();
  const password = document.getElementById('signup-password').value;
  let users = JSON.parse(localStorage.getItem('users') || '[]');
  if (users.find(u => u.username === username)) {
    document.getElementById('signup-message').textContent = "Username already exists.";
    return;
  }
  users.push({ username, password });
  localStorage.setItem('users', JSON.stringify(users));
  document.getElementById('signup-message').textContent = "Sign up successful! You can now sign in.";
  this.reset();
};

// --- Sign In Function (MODIFIED) ---
document.getElementById('signin-form').onsubmit = function(e) {
  e.preventDefault();
  const username = document.getElementById('signin-username').value.trim();
  const password = document.getElementById('signin-password').value;
  let users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    document.getElementById('signin-message').textContent = "Sign in successful!";
    localStorage.setItem('loggedInUser', username);
    setTimeout(() => {
      document.getElementById('signin-modal').style.display = 'none';
      document.getElementById('signin-message').textContent = "";
      updateAuthUI();
    }, 1000);
  } else {
    document.getElementById('signin-message').textContent = "Invalid username or password.";
  }
};

// --- Sign Out Functionality (NEW) ---
document.querySelector('.signout-btn').onclick = function() {
  localStorage.removeItem('loggedInUser');
  updateAuthUI();
};

// --- On page load, update UI ---
updateAuthUI();


