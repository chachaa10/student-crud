document.addEventListener('DOMContentLoaded', () => {
  const studentId = sessionStorage.getItem('studentId');
  const adminId = sessionStorage.getItem('adminId');

  // Redirect logged-in users
  if (studentId) return (window.location.href = 'dashboard.html');
  if (adminId) return (window.location.href = 'admin.html');

  // Get DOM elements
  const mainContent = document.getElementById('mainContent');
  const loginForm = document.getElementById('loginForm');
  const loginErrorMessage = document.getElementById('loginError');

  // Make the login form visible
  mainContent.classList.remove('hidden');

  // Login functionality
  loginForm.addEventListener('submit', handleLogin);

  async function handleLogin(event) {
    event.preventDefault();
    loginErrorMessage.textContent = '';

    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    // Check for admin login
    if (email === 'admin@admin.com' && password === 'Admin123') {
      sessionStorage.setItem('adminId', 'true');
      window.location.href = 'admin.html';
      return;
    }

    try {
      const response = await fetch('/api/students/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      sessionStorage.setItem('studentId', data.student.student_id);
      window.location.href = 'dashboard.html';
    } catch (error) {
      console.error('Login error:', error);
      emailInput.classList.add('error-input');
      passwordInput.classList.add('error-input');
      loginErrorMessage.textContent = 'Invalid Email or Password';
      setTimeout(
        () => (
          (loginErrorMessage.textContent = ''),
          emailInput.classList.remove('error-input'),
          passwordInput.classList.remove('error-input')
        ),
        3000
      );
    }
  }
});
