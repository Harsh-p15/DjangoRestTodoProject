// This helper function reads a cookie's value
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


document.addEventListener('DOMContentLoaded', () => {
    const todoListContainer = document.getElementById('todo-list-container');
    const todoForm = document.getElementById('todo-form');
    const titleInput = document.getElementById('title-input');
    const usernameDisplay = document.getElementById('username-display');
    const API_BASE_URL = 'http://localhost:8000/api';

    const renderTodos = (todos) => {
        // ... (this function does not need to change) ...
    };

    const fetchTodos = async () => {
        // ... (this function does not need to change) ...
    };

    todoForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = titleInput.value.trim();
        if (!title) return;
        
        // FIX: Get the CSRF token from the cookie
        const csrfToken = getCookie('csrftoken');

        try {
            const response = await fetch(`${API_BASE_URL}/todos/`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken // Use the correct token
                },
                body: JSON.stringify({ title: title })
            });
            if (response.ok) {
                titleInput.value = '';
                fetchTodos();
            }
        } catch (error) {
            console.error('Error creating todo:', error);
        }
    });
    
    todoListContainer.addEventListener('click', async (e) => {
        if (e.target.classList.contains('delete-btn')) {
            e.preventDefault();
            const todoId = e.target.dataset.id;

            // FIX: Get the CSRF token from the cookie
            const csrfToken = getCookie('csrftoken');
            
            if (confirm('Are you sure you want to delete this task?')) {
                 try {
                    const response = await fetch(`${API_BASE_URL}/todos/${todoId}/`, {
                        method: 'DELETE',
                        credentials: 'include',
                        headers: { 'X-CSRFToken': csrfToken } // Use the correct token
                    });
                    if (response.ok) {
                        fetchTodos();
                    }
                } catch (error) {
                    console.error('Error deleting todo:', error);
                }
            }
        }
    });

    fetchTodos();
});

// NOTE: I've only shown the functions that needed changing.
// You can copy the full todo.js from my previous response and just
// add the getCookie helper function and update where csrfToken is defined.