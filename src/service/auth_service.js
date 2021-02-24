import firebase from 'firebase';

class AuthService {
  // provider 의 이름(google? facebook? twiter?)을 받아와
  // firebase authentication 에 사용 (trick)
  login(providerName){
    const authProvider = new firebase.auth[`${providerName}AuthProvider`]();
    // popup 이용
    return firebase.auth().signInWithPopup(authProvider);
  }
}

export default AuthService;