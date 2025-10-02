// In TodoProject/static/js/login.js

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
        const API_LOGIN_URL = 'http://localhost:8000/api-auth/login/';

        try {
            const response = await fetch(API_LOGIN_URL, {
                method: 'POST',
                credentials: 'include', // ESSENTIAL for sending/receiving cookies
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken
                },
                body: JSON.stringify({ username: username, password: password })
            });

            if (response.ok) {
                // If login is successful, redirect to the to-do page
                window.location.href = '/todopage/';
            } else {
                // If login fails, show an error
                errorMessage.textContent = 'Invalid username or password.';
            }
        } catch (error) {
            console.error('Login error:', error);
            errorMessage.textContent = 'An error occurred. Please try again.';
        }
    });
});