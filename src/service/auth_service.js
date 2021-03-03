// import firebase from 'firebase';
// import firebaseApp from './firebase';
import { firebaseAuth, googleProvider, githubProvider } from './firebase';

class AuthService {
  // provider 의 이름(google? facebook? twiter?)을 받아와
  // firebase authentication 에 사용 (trick)
  login(providerName){
    // const authProvider = new firebase.auth[`${providerName}AuthProvider`]();
    const authProvider = this.getProvider(providerName);
    // popup 이용
    return firebaseAuth.signInWithPopup(authProvider);
  }

  // 로그인한 사용자에 대한 정보가 필요한 앱 페이지마다 전역 인증 객체에 관찰자를 연결
  // 사용자의 로그인 상태가 변경될 때마다 이 관찰자가 호출됨
  onAuthChange(onUserChanged) {
    firebaseAuth.onAuthStateChanged(user => {
      onUserChanged(user);
    })
  }

  logout(){
    firebaseAuth.signOut();
  }

  getProvider(providerName){
    switch(providerName){
      case 'Google':
        return googleProvider;
      case 'Github':
        return githubProvider;
      default:
        throw new Error(`not supported provider: ${providerName}`);
    }
  }
}

export default AuthService;