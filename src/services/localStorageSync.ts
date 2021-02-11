/** the local storage key name */
const LOCAL_STORAGE_KEY_NAME = 'state';

/**
 * loadState retrieves the store saved in local storage
 * @returns {any} - state that is previously stored in local storage; otherwise undefined
 */
export const loadState = (): any => {
  try {
    const serializedState = localStorage.getItem(LOCAL_STORAGE_KEY_NAME);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

/**
 * saveState saves the requested store state in local storage
 * @params {any} - state that is requested to be saved in local storage
 */
export const saveState = (state: any): void => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(LOCAL_STORAGE_KEY_NAME, serializedState);
  } catch (exception) {
    console.error(exception);
  }
};
