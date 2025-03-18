import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { generateBubbles } from '../utils/bubbleGenerator';
import { generateFish } from '../utils/fishGenerator';
import styles from './styles.module.css';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    const interval = setInterval(generateBubbles, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(generateFish, 1500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let event = '';
    const isTouchSupported =
      'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;

    isTouchSupported ? (event = 'touchmove') : (event = 'mousemove');

    const onMove = (e) => {
      let clientEvent = e;

      if (isTouchSupported) {
        const touch = e.touches[0];
        clientEvent = touch;
      }

      Object.assign(document.documentElement, {
        style: `
        --move-x: ${((clientEvent.clientX - window.innerWidth / 2) * -0.007).toFixed(1)}deg;
        --move-y: ${((clientEvent.clientY - window.innerHeight / 2) * 0.015).toFixed(1)}deg;
      `,
      });
    };

    document.addEventListener(event, onMove);

    return () => document.removeEventListener(event, onMove);
  }, []);

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
      <div className={`aquarium ${styles.container}`}>
        <div className={styles.layer}></div>
        <div className={styles.coral_1}></div>
        <div className={styles.coral_2}></div>
        <div className={styles.coral_3}></div>
      </div>
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
        <footer className={styles.footer}>
          <button type='submit' className={styles.btn}>
            Login
          </button>
          <button type='button' onClick={handleRegisterRedirect} className={styles.btn}>
            Register
          </button>
        </footer>
        <p className={styles.message}>{error}</p>
      </form>
    </div>
  );
};

export default Login;
