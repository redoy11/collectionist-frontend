import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Login from '../components/login/Login';
import {
  LOCAL_AUTHORIZE_ENDPOINT,
  LOCAL_HOME_ENDPOINT,
  LOCAL_LOGIN_ENDPOINT,
} from '../configs/endpoints';
import './App.scss';

const App: React.FC = () => {
  return (
    <React.Fragment>
      <Switch>
        <Route path={LOCAL_AUTHORIZE_ENDPOINT}>Authorize</Route>
        <Route path={LOCAL_LOGIN_ENDPOINT}>
          <Login />
        </Route>
        <Route path={LOCAL_HOME_ENDPOINT}>Home</Route>
        <Route>
          <Redirect to={LOCAL_HOME_ENDPOINT} />
        </Route>
      </Switch>
    </React.Fragment>
  );
};

export default App;
