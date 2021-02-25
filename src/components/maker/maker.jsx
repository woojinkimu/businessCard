import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Editor from '../editor/editor';
import Footer from '../footer/footer';
import Header from '../header/header';
import Preview from '../preview/preview';
import styles from './maker.module.css';

const Maker = ({authService}) => {
  const [cards, setCards] = useState([
    {
      id: '1',
      name: 'wooreal1',
      company: 'none',
      theme: 'dark',
      email: 'hutjunei@gmail.com',
      message: 'hi',
      fileName: 'filename',
      fileURL: null,
    },
    {
      id: '2',
      name: 'wooreal2',
      company: 'none',
      theme: 'light',
      email: 'hutjunei@gmail.com',
      message: 'hi',
      fileName: 'filename',
      fileURL: null,
    },
    {
      id: '3',
      name: 'wooreal3',
      company: 'none',
      theme: 'colorful',
      email: 'hutjunei@gmail.com',
      message: 'hi',
      fileName: 'filename',
      fileURL: null,
    },
  ]);
  const history = useHistory();
  const onLogout = () => {
    authService.logout();
  }

  useEffect(()=> {
    authService.onAuthChange(user => {
      if(!user){
        history.push('/');
      }
    })
  });

  const addCard = (card) => {
    const updated = [...cards, card];
    setCards(updated);
  }

  return (
    <section className={styles.maker}>
      <Header onLogout={onLogout} />
      <div className={styles.container}>
        <Editor cards={cards} addCard={addCard} />
        <Preview cards={cards} />
      </div>
      <Footer />
    </section>
  );
};

export default Maker;