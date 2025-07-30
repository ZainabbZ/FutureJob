// Simple authentication system using localStorage
const ADMIN_EMAIL = "admin@futureproof.com";
const ADMIN_PASSWORD = "admin123";

// Check if user is logged in
function checkAuth() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user && user.email === ADMIN_EMAIL) {
        document.getElementById('adminLink').style.display = 'block';
    }
}

// Login function
function login(email, password) {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        const user = { email, isAdmin: true };
        localStorage.setItem('currentUser', JSON.stringify(user));
        return true;
    }
    
    return false;
}

// Logout function
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

// Check auth on page load
document.addEventListener('DOMContentLoaded', checkAuth);