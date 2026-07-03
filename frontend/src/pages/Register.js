import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/api';

function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    try {
      const response = await register({
        name, email, password });
      setMessage(response.data);

      // Go to login after 2 seconds
      setTimeout(() => navigate('/login'), 2000);

    } catch (err) {
      setMessage('Registration failed!');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>

        <h2 style={styles.title}>Create Account</h2>

        {message && (
          <p style={styles.message}>{message}</p>
        )}

        <input
          style={styles.input}
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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
          onClick={handleRegister}>
          Register
        </button>

        <p style={styles.link}>
          Already have an account?{' '}
          <span
            style={styles.linkText}
            onClick={() => navigate('/login')}>
            Login here
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
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer'
  },
  message: {
    color: 'green',
    textAlign: 'center',
    fontSize: '14px'
  },
  link: {
    textAlign: 'center',
    fontSize: '14px',
    color: '#666'
  },
  linkText: {
    color: '#2196F3',
    cursor: 'pointer',
    fontWeight: 'bold'
  }
};

export default Register;