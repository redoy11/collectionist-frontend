import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import {
  createStateSyncMiddleware,
  initStateWithPrevTab,
  withReduxStateSync,
} from 'redux-state-sync';
import SeamlessImmutable from 'seamless-immutable';
import { loadState, saveState } from '../services/localStorageSync';
import session, { reducerName as sessionReducer } from './ducks/session';

// reducers
/** Initial reducers in the reducer registry */
const defaultReducers: any = {};

/** Add session reducer to registry */
defaultReducers[sessionReducer] = session;

/** Create reducers from default reducers obj */
const reducers = withReduxStateSync(
  combineReducers(defaultReducers) as any,
  (state: any) => SeamlessImmutable(state)
);

// middleware
const config = {};
const middlewares = [createStateSyncMiddleware(config)];

/** Create composer for redux dev tools */
const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// store
/** The initial store */
const persistedState = loadState();
const immutablePersistedState = SeamlessImmutable(persistedState);
const store = createStore(
  reducers,
  immutablePersistedState,
  composeEnhancers(applyMiddleware(...middlewares))
);

/** Keep saving the store on local storage */
store.subscribe(() => {
  saveState({
    [sessionReducer]: (store as any).getState()[sessionReducer],
  });
});
initStateWithPrevTab(store);

export default store;
