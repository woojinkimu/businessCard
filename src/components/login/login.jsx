import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../footer/footer';
import Header from '../header/header';
import styles from './login.module.css';

const Login = ({authService}) => {
  const history = useHistory();
  const goToMaker = (userId) => {
    history.push({
      pathname: '/maker',
      state: {
        id: userId
      }
    });
  }
  const onLogin = (event) => {
    authService
    .login(event.currentTarget.textContent)
    .then(data => goToMaker(data.user.uid));
  }

  // app 실행시(componentDidMount) 매번 로그인하지 않도록 하고
  // 로그아웃 시 해당 유저 data 를 null 로 초기화
  useEffect(() => {
    authService.onAuthChange(user => {
      user && goToMaker(user.uid);
    });
  })

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