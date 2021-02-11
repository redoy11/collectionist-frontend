import { AnyAction, Store } from 'redux';
import SeamlessImmutable from 'seamless-immutable';

/** interface for flexible object */
export interface FlexObj {
  [key: string]: any;
}

/** The reducer name */
export const reducerName = 'session';

// actions
/** action types */
export const SET_SESSION_TOKEN =
  'collectionist/reducer/session/SET_SESSION_TOKEN';
export const SET_SESSION_INFO =
  'collectionist/reducer/session/SET_SESSION_INFO';
export const RESET_SESSION = 'collectionist/reducer/session/RESET_SESSION';

/** interface for SET_SESSION_TOKEN action */
export interface SetSessionTokenAction extends AnyAction {
  token: string;
  type: typeof SET_SESSION_TOKEN;
}

/** interface for SET_SESSION_INFO action */
export interface SetSessionUserInfoAction extends AnyAction {
  userInfo: FlexObj;
  type: typeof SET_SESSION_INFO;
}

/** interface for RESET_SESSION action */
export interface ResetSessionAction extends AnyAction {
  type: typeof RESET_SESSION;
}

/** Create type for session reducer actions */
export type ListTableActionTypes =
  | SetSessionTokenAction
  | SetSessionUserInfoAction
  | ResetSessionAction
  | AnyAction;

// action creators

/** set session token action creator
 * @param {string} token - token to be set
 * @returns {SetSessionTokenAction} - an action to set session token in store
 */
export const setSessionToken = (token: string): SetSessionTokenAction => ({
  token,
  type: SET_SESSION_TOKEN,
});

/** set session info action creator
 * @param {FlexObj} userInfo - info about user to be set
 * @returns {SetSessionUserInfoAction} - an action to set session info in store
 */
export const setSessionUserInfo = (
  userInfo: FlexObj
): SetSessionUserInfoAction => ({
  type: SET_SESSION_INFO,
  userInfo,
});

/** reset session action creator
 * @returns {ResetSesssionAction} - an action to reset session in store
 */
export const resetSession = (): ResetSessionAction => ({
  type: RESET_SESSION,
});

// the reducer

/** interface for session state in redux store */
interface SessionState {
  token: string;
  userInfo: FlexObj;
}

/** Create an immutable session state */
export type ImmutableListTableState = SeamlessImmutable.ImmutableObject<SessionState>;

/** initial session state */
const initialState: ImmutableListTableState = SeamlessImmutable({
  token: '',
  userInfo: {},
});

/** the session reducer function */
export default function reducer(
  state: ImmutableListTableState = initialState,
  action: ListTableActionTypes
): ImmutableListTableState {
  switch (action.type) {
    case SET_SESSION_TOKEN:
      return SeamlessImmutable({
        ...state.asMutable({ deep: true }),
        token: action.token,
      });
    case SET_SESSION_INFO:
      return SeamlessImmutable({
        ...state.asMutable({ deep: true }),
        userInfo: action.userInfo,
      });
    case RESET_SESSION:
      return initialState;
    default:
      return state;
  }
}

// selectors

/** returns the session token
 * @param {Partial<Store>} state - the redux store
 * @return { string } - the existing session token
 */
export function getSessionToken(state: Partial<Store>): string {
  return (state as any)[reducerName].token;
}

/** returns the session user info
 * @param {Partial<Store>} state - the redux store
 * @return { FlexObj } - the existing user info
 */
export function getSessionUserInfo(state: Partial<Store>): FlexObj {
  return (state as any)[reducerName].userInfo;
}

/** checks user authentication
 * @param {Partial<Store>} state - the redux store
 * @return { boolean } - true if authenticated; otherwise, false
 */
export function isAuthenticated(state: Partial<Store>): boolean {
  return (state as any)[reducerName].token !== '';
}

/** returns the session user name if present
 * @param {Partial<Store>} state - the redux store
 * @return { string } - the existing user name or empty string
 */
export function getSessionUserName(state: Partial<Store>): string {
  return (state as any)[reducerName].userInfo.title || '';
}
