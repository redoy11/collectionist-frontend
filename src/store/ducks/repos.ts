import { AnyAction, Store } from 'redux';
import SeamlessImmutable from 'seamless-immutable';
import lodash from 'lodash';

/** interface for RepoObj object */
export interface RepoObj {
  id: string;
  collectionId: string;
}

/** The reducer name */
export const reducerName = 'repos';

// actions
/** action types */
export const SET_REPOS = 'collectionist/reducer/repos/SET_REPOS';
export const UPDATE_REPOS = 'collectionist/reducer/repos/UPDATE_REPOS';
export const SET_REPO = 'collectionist/reducer/repos/SET_REPO';

/** interface for SET_REPOS action */
export interface SetReposAction extends AnyAction {
  repos: RepoObj[];
  type: typeof SET_REPOS;
}

/** interface for UPDATE_REPOS action */
export interface UpdateReposAction extends AnyAction {
  repos: RepoObj[];
  type: typeof UPDATE_REPOS;
  ids: string[];
}

/** interface for SET_REPO action */
export interface SetRepoAction extends AnyAction {
  repo: RepoObj;
  type: typeof SET_REPO;
}

/** Create type for repo reducer actions */
export type ReposActionTypes =
  | SetReposAction
  | UpdateReposAction
  | SetRepoAction
  | AnyAction;

// action creators

/** set repos action creator
 * @param {RepoObj} repos - an array of repo items
 * @returns {SetReposAction} - an action to set repos in store
 */
export const setRepos = (repos: RepoObj[]): SetReposAction => ({
  repos,
  type: SET_REPOS,
});

/** update repos action creator
 * @param {RepoObj} repos - an array of repo items
 * @returns {UpdateReposAction} - an action to update repos in store
 */
export const updateRepos = (repos: RepoObj[]): UpdateReposAction => {
  const ids = repos.map((repo: RepoObj) => repo.id);
  return {
    repos,
    type: UPDATE_REPOS,
    ids,
  };
};

/** set repos action creator
 * @param {RepoObj} repo - a repo object
 * @returns {SetRepoAction} - an action to set repo in store
 */
export const setRepo = (repo: RepoObj): SetRepoAction => ({
  repo,
  type: SET_REPO,
});

// the reducer

/** interface for repos state in redux store */
type ReposState = RepoObj[];

/** Create an immutable repos state */
export type ImmutableReposState = SeamlessImmutable.ImmutableArray<ReposState>;

/** initial repos state */
const initialState: ImmutableReposState = SeamlessImmutable([]);

/** the repos reducer function */
export default function reducer(
  state: ImmutableReposState = initialState,
  action: ReposActionTypes
): ImmutableReposState {
  switch (action.type) {
    case SET_REPOS:
      return SeamlessImmutable(action.repos);
    case UPDATE_REPOS:
      return SeamlessImmutable([
        ...lodash.filter(
          state.asMutable({ deep: true }),
          (iterateProj: RepoObj) => !action.ids.includes(iterateProj.id)
        ),
        ...action.repos,
      ]);
    case SET_REPO:
      return SeamlessImmutable([
        ...lodash.filter(
          state.asMutable({ deep: true }),
          (iterateRepo: RepoObj) => iterateRepo.id !== action.repo.id
        ),
        action.repo,
      ]);
    default:
      return state;
  }
}

// selectors

/** returns the repos list
 * @param {Partial<Store>} state - the redux store
 * @return { RepoObj[] } - the existing repos
 */
export function getRepos(state: Partial<Store>): RepoObj[] {
  return (state as any)[reducerName];
}

/** returns the repos list length
 * @param {Partial<Store>} state - the redux store
 * @return { number } - the existing repos length
 */
export function getReposLength(state: Partial<Store>): number {
  return (state as any)[reducerName].length;
}

/** returns the repo obj given repo id if exists; otherwise, null
 * @param {Partial<Store>} state - the redux store
 * @param {string} repoId - the repo id
 * @return { RepoObj | null } - the existing repo or null
 */
export function getRepoById(state: Partial<Store>, repoId: string): RepoObj {
  return lodash.find((state as any)[reducerName], { id: repoId }) || null;
}