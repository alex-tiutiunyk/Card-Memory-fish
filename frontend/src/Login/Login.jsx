import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './styles.module.css';
import Aquarium from '../components/Aquarium/Aquarium';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
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
      <Aquarium />
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>Login</h2>
        <input
          className={styles.input}
          type='text'
          placeholder='Username'
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
