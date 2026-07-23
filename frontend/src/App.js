import React, { useState, useEffect } from 'react';
import API from './api';
import Login from './Login';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      setIsAuthenticated(true);
      fetchTodos();
    }
  }, [isAuthenticated]);

  const fetchTodos = async () => {
    try {
      const res = await API.get('todos/');
      setTodos(res.data);
    } catch (err) {
      console.error('Error fetching tasks:', err.response?.data || err);
      if (err.response?.status === 401) logout();
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const res = await API.post('todos/', {
        title: title,
        description: description,
        completed: false,
      });
      setTodos([res.data, ...todos]);
      setTitle('');
      setDescription('');
    } catch (err) {
      // This will display the exact Django DRF validation error in F12 Console
      console.error('Error adding task:', err.response?.data || err);
    }
  };

  const toggleComplete = async (todo) => {
    try {
      const res = await API.patch(`todos/${todo.id}/`, { completed: !todo.completed });
      setTodos(todos.map((t) => (t.id === todo.id ? res.data : t)));
    } catch (err) {
      console.error('Error updating task:', err.response?.data || err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await API.delete(`todos/${id}/`);
      setTodos(todos.filter((t) => t.id !== id));
    } catch (err) {
      console.error('Error deleting task:', err.response?.data || err);
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setIsAuthenticated(false);
    setTodos([]);
  };

  if (!isAuthenticated) {
    return <Login onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="container">
      <div className="header">
        <h1>Task Dashboard</h1>
        <button className="logout-btn" onClick={logout}>
          Sign Out
        </button>
      </div>

      <form onSubmit={addTodo} className="todo-form">
        <input
          type="text"
          placeholder="Task title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Details (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            <div>
              <h3>{todo.title}</h3>
              {todo.description && <p>{todo.description}</p>}
            </div>
            <div className="actions">
              <button onClick={() => toggleComplete(todo)}>
                {todo.completed ? 'Undo' : 'Done'}
              </button>
              <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;