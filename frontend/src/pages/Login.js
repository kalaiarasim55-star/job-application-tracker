import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';

function Login() {

  const navigate = useNavigate();

  // Store form values
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Handle login button click
  const handleLogin = async () => {
    try {
      const response = await login({ email, password });
      
      const token = response.data.token;
      const name = response.data.name;
      
      console.log('Token received:', token);
      
      if (token) {
        localStorage.setItem('token', token);
        localStorage.setItem('name', name);
        console.log('Token saved!');
        navigate('/dashboard');
      } else {
        setError('Login failed - no token received!');
      }

    } catch (err) {
      console.log('Login error:', err);
      setError('Invalid email or password!');
    }
};
      
      // Go to dashboard
        

  return (
    <div style={styles.container}>
      <div style={styles.card}>

        <h2 style={styles.title}>Job Tracker Login</h2>

        {error && (
          <p style={styles.error}>{error}</p>
        )}

        <input
          style={styles.input}
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          style={styles.button}
          onClick={handleLogin}>
          Login
        </button>

        <p style={styles.link}>
          Don't have an account?{' '}
          <span
            style={styles.linkText}
            onClick={() => navigate('/register')}>
            Register here
          </span>
        </p>

      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f2f5'
  },
  card: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    width: '380px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  title: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '10px'
  },
  input: {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '14px',
    outline: 'none'
  },
  button: {
    padding: '12px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer'
  },
  error: {
    color: 'red',
    textAlign: 'center',
    fontSize: '14px'
  },
  link: {
    textAlign: 'center',
    fontSize: '14px',
    color: '#666'
  },
  linkText: {
    color: '#4CAF50',
    cursor: 'pointer',
    fontWeight: 'bold'
  }
};

export default Login;