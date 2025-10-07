// This helper function reads a cookie's value
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        // Get the CSRF token using the helper function
        const csrfToken = getCookie('csrftoken');
        
        const API_LOGIN_URL = 'http://localhost:8000/api/login/';

        try {
            const response = await fetch(API_LOGIN_URL, {
                method: 'POST',
                credentials: 'include', // Essential for sending/receiving cookies
                headers: {
                    'Content-Type': 'application/json',
                    // Use the token read from the cookie
                    'X-CSRFToken': csrfToken
                },
                body: JSON.stringify({ username: username, password: password })
            });

            if (response.ok) {
                // On success, go to the to-do page
                window.location.href = '/todopage/';
            } else {
                // On failure, show an error
                errorMessage.textContent = 'Invalid username or password.';
            }
        } catch (error) {
            console.error('Login error:', error);
            errorMessage.textContent = 'An error occurred. Please try again.';
        }
    });
});