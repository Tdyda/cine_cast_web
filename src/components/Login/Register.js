import React, { useState } from 'react';
import styles from './Login.module.css';
import api from '../axiosConfig';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Hasła nie są zgodne!');
      return;
    }

    try {
      const response = await api.post('/Account/register', {
        email,
        password,
      });
      setSuccess("Rejestracja zakończona sukcesem! Możesz się zalogować.");
      return response;
    } catch (err) {
      setError(err.response?.data?.message || "Wystąpił problem podczas rejestracji.");
    }
  };

  return (
    <div className={styles.container}> 
      <h2 className={styles.title}>Rejestracja</h2> 
      <form onSubmit={handleSubmit}>
        <div className={styles.formDiv}> 
          <label className={styles.label}>Email:</label> 
          <input
            className={styles.input}  
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.formDiv}> 
          <label className={styles.label}>Hasło:</label> 
          <input
            className={styles.input}  
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className={styles.formDiv}> 
          <label className={styles.label}>Potwierdź hasło:</label> 
          <input
            className={styles.input}
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button className={styles.button} type="submit">Zarejestruj się</button> 
        {error && <p className={styles.error}>{error}</p>} 
        {success && <p className={styles.success}>{success}</p>} 
      </form>
    </div>
  );
};

export default Register;
