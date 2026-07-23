import React, { useState } from 'react';
import API from './api';

function Login({ onLoginSuccess }) {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (isRegister) {
        await API.post('register/', { username, password });
        alert('Account created! Please sign in with your new credentials.');
        setIsRegister(false); // Switch view to Login mode
      } else {
        const res = await API.post('token/', { username, password });
        localStorage.setItem('access_token', res.data.access);
        localStorage.setItem('refresh_token', res.data.refresh);
        onLoginSuccess();
      }
    } catch (err) {
      // 1. Extract error response sent back by Django / Axios
      const serverError = err.response?.data;

      if (isRegister) {
        // Dynamic error handling for Registration
        if (serverError?.username) {
          setError(serverError.username[0]); // e.g., "A user with that username already exists."
        } else if (serverError?.password) {
          setError(serverError.password[0]);
        } else if (serverError?.detail) {
          setError(serverError.detail);
        } else {
          setError('Registration failed. Check backend endpoint / network.');
        }
      } else {
        // Specific error handling for Login
        setError('Invalid username or password.');
      }
    }
  };

  return (
    <div className="auth-card">
      <h2>{isRegister ? 'Create Account' : 'Welcome Back'}</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit">{isRegister ? 'Register' : 'Sign In'}</button>
      </form>
      <p 
        onClick={() => {
          setIsRegister(!isRegister);
          setError(''); 
        }} 
        className="toggle-auth"
      >
        {isRegister ? 'Already have an account? Sign In' : "Don't have an account? Register"}
      </p>
    </div>
  );
}

export default Login;