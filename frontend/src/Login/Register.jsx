import { useState } from 'react';
import axios from 'axios';
import Aquarium from '../components/Aquarium/Aquarium';
import styles from './styles.module.css';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/register', formData); // Add base URL
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data.message || 'Error registering');
    }
  };

  return (
    <div className={styles.wrapper}>
      <Aquarium />
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>Register</h2>
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
            Register
          </button>
        </footer>
        <p className={styles.message}>{message}</p>
      </form>
    </div>
  );
};

export default Register;
