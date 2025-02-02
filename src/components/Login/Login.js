import React, { useState } from 'react';
import styles from './Login.module.css'; // Importowanie stylów CSS Modules

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('yourdomain/api/Account/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('userId', data.userId);

      window.location.href = '/';
    } catch (err) {
      setError('Błędny e-mail lub hasło');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Logowanie</h2>
      <form onSubmit={handleLogin}>
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
        {error && <p className={styles.error}>{error}</p>}
        <button className={styles.button} type="submit">Zaloguj się</button>
      </form>
    </div>
  );
};

export default Login;
