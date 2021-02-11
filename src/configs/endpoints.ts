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

/** Server */

/** server endpoint */
export const SERVER_ENDPOINT =
  process.env.REACT_APP_SERVER_ENDPOINT || 'http://localhost:5000';

/** server authorized token endpoint */
export const SERVER_AUTHORIZE_ENDPOINT =
  process.env.REACT_APP_SERVER_AUTHORIZE_ENDPOINT ||
  `${SERVER_ENDPOINT}/authorize`;

/** Github */

/** Github authorize endpoint */
export const GITHUB_AUTHORIZE_ENDPOINT =
  process.env.REACT_APP_GITHUB_AUTHORIZE_ENDPOINT ||
  `https://github.com/login/oauth/authorize`;

/** Github user endpoint */
export const GITHUB_USER_ENDPOINT =
  process.env.REACT_APP_GITHUB_USER_ENDPOINT || `https://api.github.com/user`;
