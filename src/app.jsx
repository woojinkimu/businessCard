// import logo from './logo.svg';
import Login from './components/login/login';
import Maker from './components/maker/maker';
import styles from './app.module.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App({FileInput, authService, cardRepository}) {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Login authService={authService} />
          </Route>
          <Route path="/maker">
            <Maker authService={authService} FileInput={FileInput} cardRepository={cardRepository} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App;
