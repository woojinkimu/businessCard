import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Editor from '../editor/editor';
import Footer from '../footer/footer';
import Header from '../header/header';
import Preview from '../preview/preview';
import styles from './maker.module.css';

const Maker = ({authService}) => {
  const [cards, setCards] = useState({
    '1': {
      id: '1',
      name: 'wooreal1',
      company: 'com1',
      title: 'title1',
      theme: 'dark',
      email: 'hutjunei@gmail.com',
      message: 'hi',
      fileName: 'filename',
      fileURL: null,
    },
    '2': {
      id: '2',
      name: 'wooreal2',
      company: 'com2',
      title: 'title2',
      theme: 'light',
      email: 'hutjunei@gmail.com',
      message: 'hi',
      fileName: 'filename',
      fileURL: null,
    },
    '3': {
      id: '3',
      name: 'wooreal3',
      company: 'com3',
      title: 'title3',
      theme: 'colorful',
      email: 'hutjunei@gmail.com',
      message: 'hi',
      fileName: 'filename',
      fileURL: null,
    },
  });
  const history = useHistory();
  const onLogout = () => {
    authService.logout();
  };

  useEffect(()=> {
    authService.onAuthChange(user => {
      if(!user){
        history.push('/');
      }
    })
  });

  const createOrUpdateCard = (card) => {
    // const updated = {...cards};
    // updated[card.id] = card;
    // setCards(updated);
    setCards(cards => {
      const updated = {...cards};
      updated[card.id] = card;
      return updated;
    });
  };

  const deleteCard = (card) => {
    setCards(cards => {
      const updated = {...cards};
      delete updated[card.id];
      return updated;
    });
  };

  return (
    <section className={styles.maker}>
      <Header onLogout={onLogout} />
      <div className={styles.container}>
        <Editor cards={cards} addCard={createOrUpdateCard} updateCard={createOrUpdateCard} deleteCard={deleteCard} />
        <Preview cards={cards} />
      </div>
      <Footer />
    </section>
  );
};

export default Maker;