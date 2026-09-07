/* auth.js - Authentication, Route Protection & Validation */
import { getUsers, saveUsers, getSession, saveSession, clearSession } from './storage.js';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

document.addEventListener('DOMContentLoaded', () => {
  protectRoute();

  const loginForm = document.querySelector('.login-container form');
  const signupForm = document.querySelector('.signup-container form');

  if (loginForm) loginForm.addEventListener('submit', handleLogin);
  if (signupForm) signupForm.addEventListener('submit', handleSignup);

  setupLogoutListener();
});

function protectRoute() {
  const session = getSession();
  const path = window.location.pathname;
  const isAuthPage = path.endsWith('index.html') || path.endsWith('/') || path.endsWith('register.html');

  if (session && isAuthPage) {
    window.location.href = 'dashboard.html';
  } else if (!session && !isAuthPage) {
    window.location.href = 'index.html';
  }
}

function handleLogin(e) {
  e.preventDefault();
  const form = e.target;
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  clearFormErrors(form);
  let hasError = false;

  if (!email) {
    showError(emailInput, 'Email address is required.');
    hasError = true;
  } else if (!EMAIL_REGEX.test(email)) {
    showError(emailInput, 'Please enter a valid email address.');
    hasError = true;
  }

  if (!password) {
    showError(passwordInput, 'Password is required.');
    hasError = true;
  }

  if (hasError) return;

  const users = getUsers();
  const matchedUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());

  if (!matchedUser || matchedUser.password !== password) {
    showError(emailInput, 'Invalid email or password.');
    return;
  }

  saveSession({ id: matchedUser.id, name: matchedUser.name, email: matchedUser.email });
  window.location.href = 'dashboard.html';
}

function handleSignup(e) {
  e.preventDefault();
  const form = e.target;
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirm-password');

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const confirmPassword = confirmPasswordInput.value.trim();

  clearFormErrors(form);
  let hasError = false;

  if (!name) {
    showError(nameInput, 'Name is required.');
    hasError = true;
  }

  if (!email) {
    showError(emailInput, 'Email is required.');
    hasError = true;
  } else if (!EMAIL_REGEX.test(email)) {
    showError(emailInput, 'Please enter a valid email address.');
    hasError = true;
  }

  if (!password) {
    showError(passwordInput, 'Password is required.');
    hasError = true;
  } else if (password.length < 6) {
    showError(passwordInput, 'Password must be at least 6 characters long.');
    hasError = true;
  }

  if (!confirmPassword) {
    showError(confirmPasswordInput, 'Please confirm your password.');
    hasError = true;
  } else if (password !== confirmPassword) {
    showError(confirmPasswordInput, 'Passwords do not match.');
    hasError = true;
  }

  if (hasError) return;

  const users = getUsers();
  if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
    showError(emailInput, 'An account with this email already exists.');
    return;
  }

  const newUser = { id: 'u_' + Date.now(), name, email, password };
  users.push(newUser);
  saveUsers(users);

  saveSession({ id: newUser.id, name: newUser.name, email: newUser.email });
  alert('Registration successful! Redirecting to Dashboard.');
  window.location.href = 'dashboard.html';
}

function showError(inputElement, message) {
  if (!inputElement) return;
  inputElement.classList.add('error');
  let errorMsg = inputElement.parentElement.querySelector('.input-error-message');
  if (!errorMsg) {
    errorMsg = document.createElement('div');
    errorMsg.className = 'input-error-message';
    inputElement.parentElement.appendChild(errorMsg);
  }
  errorMsg.textContent = message;
}

function clearFormErrors(formElement) {
  if (!formElement) return;
  formElement.querySelectorAll('.input-field.error').forEach(el => el.classList.remove('error'));
  formElement.querySelectorAll('.input-error-message').forEach(el => el.remove());
}

function setupLogoutListener() {
  document.querySelectorAll('a[href="index.html"]').forEach(link => {
    if (link.textContent.includes('Logout') || link.querySelector('.fa-sign-out-alt')) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        if (confirm('Are you sure you want to log out?')) {
          clearSession();
          window.location.href = 'index.html';
        }
      });
    }
  });
}
