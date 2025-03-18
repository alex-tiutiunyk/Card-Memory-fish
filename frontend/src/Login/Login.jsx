import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './styles.module.css';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate(); // For navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userID', response.data.userID); // Save the userID
      onLogin();
      navigate('/play');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError('User not found. Please register first.');
      } else {
        setError(error.response?.data.message || 'Error logging in');
      }
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register'); // Redirect to the Register page
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.coral_1}></div>
      <div className={styles.coral_2}></div>
      <div className={styles.coral_3}></div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>Login</h2>
        <input
          className={styles.input}
          type='text'
          placeholder='Username'
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        />
        <input
          className={styles.input}
          type='password'
          placeholder='Password'
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        <div style={{ display: 'flex', gap: '10px' }}>
          <button type='submit'>Login</button>
          <button type='button' onClick={handleRegisterRedirect}>
            Register
          </button>
        </div>
        <p style={{ color: 'red' }}>{error}</p>
      </form>
    </div>
  );
};

export default Login;
