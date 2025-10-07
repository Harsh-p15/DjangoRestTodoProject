document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');
    const errorMessage = document.getElementById('error-message');

    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const username = document.getElementById('username-input').value;
        const email = document.getElementById('email-input').value;
        const password = document.getElementById('password-input').value;
        const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
        
        // This is your backend's registration endpoint
        const API_REGISTER_URL = 'http://localhost:8000/api/register/';

        try {
            const response = await fetch(API_REGISTER_URL, {
                method: 'POST',
                // We don't need credentials for a public registration page
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken
                },
                body: JSON.stringify({
                    username: username,
                    email: email,
                    password: password
                })
            });

            if (response.status === 201) { // 201 Created is the success status
                // If signup is successful, redirect to the login page
                window.location.href = '/login/';
            } else {
                // If signup fails, display the error from the API
                const data = await response.json();
                // This will show errors like "A user with that username already exists."
                errorMessage.textContent = Object.values(data).join(' ');
            }
        } catch (error) {
            console.error('Signup error:', error);
            errorMessage.textContent = 'An error occurred. Please try again.';
        }
    });
});