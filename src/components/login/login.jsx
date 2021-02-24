import React from 'react';
import Footer from '../footer/footer';
import Header from '../header/header';
import styles from './login.module.css';

const Login = ({authService}) => {
  const onLogin = (event) => {
    authService
    .login(event.currentTarget.textContent)
    .then(console.log());
  }

  return (
    <section className={styles.login}>
      <Header />
        <section>
          <h1>Login</h1>
          <ul className={styles.list}>
            <li className={styles.item}>
              <button onClick={onLogin} className={styles.button}>
                Google
              </button>
            </li>
            <li>
              <button onClick={onLogin} className={styles.button}>
                Github
              </button>
            </li>
          </ul>
        </section>
      <Footer />
    </section>
  );
};

export default Login;