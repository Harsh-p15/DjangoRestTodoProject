alert("This is the new JS file!");
document.addEventListener('DOMContentLoaded', () => {

    const todoListContainer = document.getElementById('todo-list-container');
    const todoForm = document.getElementById('todo-form');
    const titleInput = document.getElementById('title-input');
    const usernameDisplay = document.getElementById('username-display');
    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;

    const API_BASE_URL = 'http://localhost:8000/api';

    const renderTodos = (todos) => {
        todoListContainer.innerHTML = '';
        if (todos.length > 0) {
            usernameDisplay.textContent = todos[0].user;
        } else {
            usernameDisplay.textContent = 'User';
        }

        todos.forEach(todo => {
            const todoDiv = document.createElement('div');
            const statusClass = 'todo-red';
            todoDiv.className = `Todo clickable-div ${statusClass}`;
            todoDiv.innerHTML = `
                <p class="">${todo.title}</p>
                <div>
                    <a href="/edit_todo/${todo.srno}" class="icon">&#9998; Edit</a>
                    <a href="#" class="icon delete-btn" data-id="${todo.srno}">&#128465; Delete</a>
                </div>
            `;
            todoListContainer.appendChild(todoDiv);
        });
    };

    const fetchTodos = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/todos/`, {
                credentials: 'include' // <-- UPDATE: Send cookies with this request
            });
            
            if (response.status === 403) {
                window.location.href = '/login/'; 
                return;
            }
            const todos = await response.json();
            renderTodos(todos);
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };

    todoForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = titleInput.value.trim();
        if (!title) return;

        try {
            const response = await fetch(`${API_BASE_URL}/todos/`, {
                method: 'POST',
                credentials: 'include', // <-- UPDATE: Send cookies with this request
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken
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
            
            if (confirm('Are you sure you want to delete this task?')) {
                 try {
                    const response = await fetch(`${API_BASE_URL}/todos/${todoId}/`, 
                      {
                        method: 'DELETE',
                        credentials: 'include', // <-- UPDATE: Send cookies with this request
                        headers: { 'X-CSRFToken': csrfToken }
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