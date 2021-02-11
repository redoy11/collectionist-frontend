import { LOCAL_SECRET_KEY } from './constants';

/** local */

/** local login endpoint */
export const LOCAL_LOGIN_ENDPOINT = `/login`;

/** local logout endpoint */
export const LOCAL_LOGOUT_ENDPOINT = `/${LOCAL_SECRET_KEY}/logout`;

/** local authorize endpoint */
export const LOCAL_AUTHORIZE_ENDPOINT = `/${LOCAL_SECRET_KEY}/authorize`;

/** local home page */
export const LOCAL_HOME_ENDPOINT = `/home`;

/** Github */

/** Github authorize endpoint */
export const GITHUB_AUTHORIZE_ENDPOINT =
  process.env.REACT_APP_GITHUB_AUTHORIZE_ENDPOINT ||
  `https://github.com/login/oauth/authorize`;
