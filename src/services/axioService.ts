import axios from 'axios';
import store from '../store';
import { getSessionToken, resetSession } from '../store/ducks/session';

/** Interface to describe a flexible object */
interface FlexObj {
  [key: string]: any;
}

// Request types
/** GET REQUEST TYPE */
export const GET = 'GET';
type GET = typeof GET;

/** POST REQUEST TYPE */
export const POST = 'POST';
type POST = typeof POST;

/** DELETE REQUEST TYPE */
export const DELETE = 'DELETE';
type DELETE = typeof DELETE;

/**
 * axioGet makes a get request using the axio libary
 * @param {string} url - the url where the get request will be made
 * @param {FlexObj | FlexObj[]} params - the parameters that will be passed
 * @param {boolean} isProtected - if true, access token will be included in header; otherwise, not.
 * @returns {any} - response returned by the server if successful
 */
export const axioGet = async (
  url: string,
  params: FlexObj | FlexObj[] = {},
  isProtected = false
) => {
  /** retrieve the access token from redux store */
  const token = getSessionToken((store as any).getState());

  const config = isProtected
    ? {
        headers: {
          Accept: `application/json`,
          Authorization: `token ${token}`,
        },
      }
    : { headers: { Accept: `application/json` } };
  const response = await axios.get(url, {
    ...config,
    params,
  });
  return await response;
};

/**
 * axioPost makes a post request using the axio libary
 * @param {string} url - the url where the post request will be made
 * @param {FlexObj | FlexObj[]} params - the parameters that will be passed
 * @param {boolean} isProtected - if true, access token will be included in header; otherwise, not.
 * @returns {any} - response returned by the server if successful
 */
export const axioPost = async (
  url: string,
  params: FlexObj | FlexObj[] = {},
  isProtected = false
) => {
  /** retrieve the access token from redux store */
  const token = getSessionToken((store as any).getState());

  const config = isProtected
    ? {
        headers: {
          Accept: `application/json`,
          Authorization: `token ${token}`,
        },
      }
    : { headers: { Accept: `application/json` } };
  const response = await axios.post(url, params, config);
  return await response;
};

/**
 * axioDelete makes a delete request using the axio libary
 * @param {string} url - the url where the delete request will be made
 * @param {boolean} isProtected - if true, access token will be included in header; otherwise, not.
 * @returns {any} - response returned by the server if successful
 */
export const axioDelete = async (url: string, isProtected = false) => {
  /** retrieve the access token from redux store */
  const token = getSessionToken((store as any).getState());

  const config = isProtected
    ? {
        headers: {
          Accept: `application/json`,
          Authorization: `token ${token}`,
        },
      }
    : { headers: { Accept: `application/json` } };
  const response = await axios.delete(url, config);
  return await response;
};

/**
 * axioService makes a server request using the axio libary
 * @param {GET|POST|DELETE} type - the type of request
 * @param {string} url - the url where the request will be made
 * @param {FlexObj | FlexObj[]} params - the parameters that will be passed
 * @param {boolean} isProtected - if true, access token will be included in header; otherwise, not.
 * @returns {any} - response returned by the server if successful; otherwise, error object
 */
export const axioService = async (
  type: GET | POST | DELETE,
  url: string,
  params: FlexObj | FlexObj[] = {},
  isProtected = false
) => {
  let response;
  try {
    if (type === POST) {
      response = await axioPost(url, params, isProtected);
    } else if (type === DELETE) {
      response = await axioDelete(url, isProtected);
    } else {
      response = await axioGet(url, params, isProtected);
    }
    return await response;
  } catch (e) {
    if (e.response.status === 401) {
      /** resets the session if there is a token */
      const token = getSessionToken((store as any).getState());
      if (token !== '') {
        (store as any).dispatch(resetSession());
        throw e;
      } else {
        throw e;
      }
    } else {
      throw e;
    }
  }
};
