import React, { memo } from 'react';
import styles from './header.module.css';

// const Header = memo(({onLogout}) => (
//   <header className={styles.header}>
//     {
//       onLogout && 
//       <button onClick={onLogout}
//       className={styles.logout}>Logout</button>
//     }
//     <img className={styles.logo} src="/images/logo.png" alt="logo"/>
//     <h1 className={styles.title}>Business Card Maker</h1>
//   </header>
// ));

// header component 가 rerender 되는지 확인하기 위한 console log class
const Header = memo(({onLogout}) => {
  console.log('header');
  return(
    <header className={styles.header}>
      {
        onLogout && 
        <button onClick={onLogout}
        className={styles.logout}>Logout</button>
      }
      <img className={styles.logo} src="/images/logo.png" alt="logo"/>
      <h1 className={styles.title}>Business Card Maker</h1>
    </header>
  )
});

export default Header;