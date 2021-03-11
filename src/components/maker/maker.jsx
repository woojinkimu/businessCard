import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Editor from '../editor/editor';
import Footer from '../footer/footer';
import Header from '../header/header';
import Preview from '../preview/preview';
import styles from './maker.module.css';

const Maker = ({FileInput, authService, cardRepository}) => {
  const history = useHistory();
  const historyState = history?.location?.state;
  const [cards, setCards] = useState({});
  const [userId, setUserId] = useState(historyState && historyState.id);
  // const [cards, setCards] = useState({
  //   '1': {
  //     id: '1',
  //     name: 'wooreal1',
  //     company: 'com1',
  //     title: 'title1',
  //     theme: 'dark',
  //     email: 'hutjunei@gmail.com',
  //     message: 'hi',
  //     fileName: 'filename',
  //     fileURL: null,
  //   },
  //   '2': {
  //     id: '2',
  //     name: 'wooreal2',
  //     company: 'com2',
  //     title: 'title2',
  //     theme: 'light',
  //     email: 'hutjunei@gmail.com',
  //     message: 'hi',
  //     fileName: 'filename',
  //     fileURL: null,
  //   },
  //   '3': {
  //     id: '3',
  //     name: 'wooreal3',
  //     company: 'com3',
  //     title: 'title3',
  //     theme: 'colorful',
  //     email: 'hutjunei@gmail.com',
  //     message: 'hi',
  //     fileName: 'filename',
  //     fileURL: null,
  //   },
  // });

  // 함수형 컴포넌트가 계속 호출 되어도
  // (props 나 state 가 변경되어도)
  // 메모리에 저장되어있는 동일한 데이터를 사용하고 싶을때 작성
  // ,[authService] 를 작성하면
  // props 로 받은 authService 가 변경되면 해당 useCallback() 이 호출됨
  const onLogout = useCallback(() => {
    authService.logout();
  }, [authService]);

  // login 관련 useEffect
  useEffect(()=> {
    authService.onAuthChange(user => {
      if(user){
        setUserId(user.uid);
      }else{
        history.push('/');
      }
    })
  }, [authService, history]);
  // useEffect(()=> {
  //   authService.onAuthChange(user => {
  //     if(!user){
  //       history.push('/');
  //     }
  //   })
  // });

  // firebase sync 관련 useEffect
  // mount or update or userId 가 변경되었을 때 or cardRepository 가 다른것으로 변경되면
  useEffect(() => {
    // component 가 mount or update 시
    // userId 가 전달 되지 않있다면
    if(!userId){
      return;
    }
    // component 가 mount or update 시
    // userId 가 전달 되었다면
    // syncCards 에 전달할 두번째 인자는 콜백함수(onUpdate)
    const stopSync = cardRepository.syncCards(userId, cards => {
      setCards(cards);
    });
    // CardRepository.syncCards 안의 return 을 const 로 받아와 실행
    return () => stopSync();
  }, [userId, cardRepository]);

  const createOrUpdateCard = (card) => {
    // const updated = {...cards};
    // updated[card.id] = card;
    // setCards(updated);
    setCards(cards => {
      const updated = {...cards};
      updated[card.id] = card;
      return updated;
    });
    cardRepository.saveCard(userId, card);
  };
  // const createOrUpdateCard = (card) => {
  //   // const updated = {...cards};
  //   // updated[card.id] = card;
  //   // setCards(updated);
  //   setCards(cards => {
  //     const updated = {...cards};
  //     updated[card.id] = card;
  //     return updated;
  //   });
  // };

  const deleteCard = (card) => {
    setCards(cards => {
      const updated = {...cards};
      delete updated[card.id];
      return updated;
    });
    cardRepository.removeCard(userId, card);
  };
  // const deleteCard = (card) => {
  //   setCards(cards => {
  //     const updated = {...cards};
  //     delete updated[card.id];
  //     return updated;
  //   });
  // };

  return (
    <section className={styles.maker}>
      <Header onLogout={onLogout} />
      <div className={styles.container}>
        <Editor FileInput={FileInput} cards={cards} addCard={createOrUpdateCard} updateCard={createOrUpdateCard} deleteCard={deleteCard} />
        <Preview cards={cards} />
      </div>
      <Footer />
    </section>
  );
};

export default Maker;