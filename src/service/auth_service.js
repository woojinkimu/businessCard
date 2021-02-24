import firebase from 'firebase';
import firebaseApp from './firebase';

class AuthService {
  // provider 의 이름(google? facebook? twiter?)을 받아와
  // firebase authentication 에 사용 (trick)
  login(providerName){
    const authProvider = new firebase.auth[`${providerName}AuthProvider`]();
    // popup 이용
    return firebaseApp.auth().signInWithPopup(authProvider);
  }

  // 로그인한 사용자에 대한 정보가 필요한 앱 페이지마다 전역 인증 객체에 관찰자를 연결
  // 사용자의 로그인 상태가 변경될 때마다 이 관찰자가 호출됨
  onAuthChange(onUserChanged) {
    firebase.auth().onAuthStateChanged(user => {
      onUserChanged(user);
    })
  }

  logout(){
    firebaseApp.auth().signOut();
  }
}

export default AuthService;