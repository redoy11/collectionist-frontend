import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Store } from 'redux';
import Login from '../containers/login/Login';
import {
  GITHUB_USER_ENDPOINT,
  LOCAL_AUTHORIZE_ENDPOINT,
  LOCAL_COLLECTIONS_ENDPOINT,
  LOCAL_HOME_ENDPOINT,
  LOCAL_LOGIN_ENDPOINT,
  LOCAL_REPOS_ENDPOINT,
  LOCAL_SEARCH_ENDPOINT,
  SERVER_COLLECTIONS_ENDPOINT,
  SERVER_REPOS_ENDPOINT,
} from '../configs/endpoints';
import ConnectedSessionAuthorize from '../containers/sessionAuthorize/SessionAuthorize';
import { axioService, GET } from '../services/axioService';
import { getSessionToken, setSessionUserInfo } from '../store/ducks/session';
import './App.scss';
import PrivateRoute from '../containers/privateRoute/PrivateRoute';
import Home from '../components/home/Home';
import { RepoObj, setRepos } from '../store/ducks/repos';
import { CollectionObj, setCollections } from '../store/ducks/collections';
import lodash from 'lodash';
import CollectionsPage from '../components/collectionsPage/CollectionsPage';
import ReposPage from '../components/reposPage/ReposPage';
import CollectionPage from '../components/collectionPage/CollectionPage';
import SearchPage from '../components/searchPage/SearchPage';

interface AppProps {
  token: string;
  setSessionUserInfoActionCreator: typeof setSessionUserInfo;
  setCollectionsActionCreator: typeof setCollections;
  setReposActionCreator: typeof setRepos;
}

const App: React.FC<AppProps> = (props: AppProps) => {
  const {
    token,
    setSessionUserInfoActionCreator,
    setCollectionsActionCreator,
    setReposActionCreator,
  } = props;

  React.useEffect(() => {
    /** fetch all collections associated with the user */
    const fetchCollections = async (userId: string) => {
      try {
        const response = await axioService(
          GET,
          `${SERVER_COLLECTIONS_ENDPOINT}/${userId}`,
          {},
          true
        );
        setCollectionsActionCreator(
          lodash.map(
            response.data as any,
            (iterCollection: any): CollectionObj => ({
              id: iterCollection.id.toString(),
              title: iterCollection.title,
              type: '',
              createdAt: iterCollection.created_at,
              updatedAt: iterCollection.updated_at,
            })
          )
        );
      } catch (exception) {
        /** console error the exception */
        console.error(exception);
      }
    };

    /** fetch all repos associated with the user */
    const fetchRepos = async (userId: string) => {
      try {
        const response = await axioService(
          GET,
          `${SERVER_REPOS_ENDPOINT}/${userId}`,
          {},
          true
        );
        setReposActionCreator(
          lodash.map(
            response.data as any,
            (iterRepo: any): RepoObj => ({
              id: iterRepo.repo_id,
              collectionId: iterRepo.collection_id.toString(),
            })
          )
        );
      } catch (exception) {
        /** console error the exception */
        console.error(exception);
      }
    };

    /** fetch the associated user profile */
    const fetchProfile = async () => {
      try {
        const response = await axioService(GET, GITHUB_USER_ENDPOINT, {}, true);
        setSessionUserInfoActionCreator(response.data);
        fetchCollections(response.data.id);
        fetchRepos(response.data.id);
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
        <PrivateRoute path={LOCAL_HOME_ENDPOINT} component={Home} />
        <PrivateRoute
          path={LOCAL_COLLECTIONS_ENDPOINT + '/:id'}
          component={CollectionPage}
        />
        <PrivateRoute
          path={LOCAL_COLLECTIONS_ENDPOINT}
          component={CollectionsPage}
        />
        <PrivateRoute path={LOCAL_REPOS_ENDPOINT} component={ReposPage} />
        <PrivateRoute path={LOCAL_COLLECTIONS_ENDPOINT} component={Home} />
        <PrivateRoute path={LOCAL_SEARCH_ENDPOINT} component={SearchPage} />
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
  setCollectionsActionCreator: setCollections,
  setReposActionCreator: setRepos,
};

/** connect App to the redux store */
const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

/** the default export */
export default ConnectedApp;
