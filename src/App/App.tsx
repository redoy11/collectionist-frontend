import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Store } from 'redux';
import Login from '../containers/login/Login';
import {
  GITHUB_USER_ENDPOINT,
  LOCAL_AUTHORIZE_ENDPOINT,
  LOCAL_HOME_ENDPOINT,
  LOCAL_LOGIN_ENDPOINT,
} from '../configs/endpoints';
import ConnectedSessionAuthorize from '../containers/sessionAuthorize/SessionAuthorize';
import { axioService, GET } from '../services/axioService';
import { getSessionToken, setSessionUserInfo } from '../store/ducks/session';
import './App.scss';

interface AppProps {
  token: string;
  setSessionUserInfoActionCreator: typeof setSessionUserInfo;
}

const App: React.FC<AppProps> = (props: AppProps) => {
  const { token, setSessionUserInfoActionCreator } = props;

  React.useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axioService(GET, GITHUB_USER_ENDPOINT, {}, true);
        setSessionUserInfoActionCreator(response.data);
      } catch (exception) {
        /** console error the exception */
        console.error(exception);
      }
    };

    if (token !== '') {
      fetchProfile();
    }
  }, [token]);

  return (
    <React.Fragment>
      <Switch>
        <Route path={LOCAL_AUTHORIZE_ENDPOINT}>
          <ConnectedSessionAuthorize />
        </Route>
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

/** Interface to describe props from mapStateToProps */
interface DispatchedStateProps {
  token: string;
}

/** Map props to state  */
const mapStateToProps = (state: Partial<Store>): DispatchedStateProps => {
  const result = {
    token: getSessionToken(state),
  };
  return result;
};

/** map props to actions */
const mapDispatchToProps = {
  setSessionUserInfoActionCreator: setSessionUserInfo,
};

/** connect App to the redux store */
const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

/** the default export */
export default ConnectedApp;
