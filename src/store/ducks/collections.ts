import { AnyAction, Store } from 'redux';
import SeamlessImmutable from 'seamless-immutable';
import lodash from 'lodash';

/** interface for CollectionObj object */
export interface CollectionObj {
  id: string;
  title: string;
  type: string;
  createdAt: string;
  updatedAt: string;
}

/** The reducer name */
export const reducerName = 'collections';

// actions
/** action types */
export const SET_COLLECTIONS =
  'collectionist/reducer/collections/SET_COLLECTIONS';
export const UPDATE_COLLECTIONS =
  'collectionist/reducer/collections/UPDATE_COLLECTIONS';
export const SET_COLLECTION =
  'collectionist/reducer/collections/SET_COLLECTION';
export const DELETE_COLLECTION =
  'collectionist/reducer/collections/DELETE_COLLECTION';

/** interface for SET_COLLECTIONS action */
export interface SetCollectionsAction extends AnyAction {
  collections: CollectionObj[];
  type: typeof SET_COLLECTIONS;
}

/** interface for UPDATE_COLLECTIONS action */
export interface UpdateCollectionsAction extends AnyAction {
  collections: CollectionObj[];
  type: typeof UPDATE_COLLECTIONS;
  ids: string[];
}

/** interface for SET_COLLECTION action */
export interface SetCollectionAction extends AnyAction {
  collection: CollectionObj;
  type: typeof SET_COLLECTION;
}

/** interface for DELETE_COLLECTION action */
export interface DeleteCollectionAction extends AnyAction {
  id: string;
  type: typeof DELETE_COLLECTION;
}

/** Create type for collection reducer actions */
export type CollectionsActionTypes =
  | SetCollectionsAction
  | UpdateCollectionsAction
  | SetCollectionAction
  | DeleteCollectionAction
  | AnyAction;

// action creators

/** set collections action creator
 * @param {CollectionObj} collections - an array of collection items
 * @returns {SetCollectionsAction} - an action to set collections in store
 */
export const setCollections = (
  collections: CollectionObj[]
): SetCollectionsAction => ({
  collections,
  type: SET_COLLECTIONS,
});

/** update collections action creator
 * @param {CollectionObj} collections - an array of collection items
 * @returns {UpdateCollectionsAction} - an action to update collections in store
 */
export const updateCollections = (
  collections: CollectionObj[]
): UpdateCollectionsAction => {
  const ids = collections.map((collection: CollectionObj) => collection.id);
  return {
    collections,
    type: UPDATE_COLLECTIONS,
    ids,
  };
};

/** set collection action creator
 * @param {CollectionObj} collection - a collection object
 * @returns {SetCollectionAction} - an action to set collection in store
 */
export const setCollection = (
  collection: CollectionObj
): SetCollectionAction => ({
  collection,
  type: SET_COLLECTION,
});

/** delete collection action creator
 * @param {id} collection - an id of a collection
 * @returns {DeleteCollectionAction} - an action to delete collection in store based on id
 */
export const deleteCollection = (id: string): DeleteCollectionAction => ({
  id,
  type: DELETE_COLLECTION,
});

// the reducer

/** interface for collections state in redux store */
type CollectionsState = CollectionObj[];

/** Create an immutable collections state */
export type ImmutableCollectionsState = SeamlessImmutable.ImmutableArray<CollectionsState>;

/** initial collections state */
const initialState: ImmutableCollectionsState = SeamlessImmutable([]);

/** the collections reducer function */
export default function reducer(
  state: ImmutableCollectionsState = initialState,
  action: CollectionsActionTypes
): ImmutableCollectionsState {
  switch (action.type) {
    case SET_COLLECTIONS:
      return SeamlessImmutable(action.collections);
    case UPDATE_COLLECTIONS:
      return SeamlessImmutable([
        ...lodash.filter(
          state.asMutable({ deep: true }),
          (iterateProj: CollectionObj) => !action.ids.includes(iterateProj.id)
        ),
        ...action.collections,
      ]);
    case SET_COLLECTION:
      return SeamlessImmutable([
        ...lodash.filter(
          state.asMutable({ deep: true }),
          (iterateCollection: CollectionObj) =>
            iterateCollection.id !== action.collection.id
        ),
        action.collection,
      ]);
    case DELETE_COLLECTION:
      return SeamlessImmutable([
        ...(lodash.filter(
          state.asMutable({ deep: true }),
          (iterateCollection: CollectionObj) =>
            iterateCollection.id !== action.id
        ) as any),
      ]);
    default:
      return state;
  }
}

// selectors

/** returns the collections list
 * @param {Partial<Store>} state - the redux store
 * @return { CollectionObj[] } - the existing collections
 */
export function getCollections(state: Partial<Store>): CollectionObj[] {
  return (state as any)[reducerName];
}

/** returns the collections list length
 * @param {Partial<Store>} state - the redux store
 * @return { number } - the existing collections length
 */
export function getCollectionsLength(state: Partial<Store>): number {
  return (state as any)[reducerName].length;
}

/** returns the collection obj given collection id if exists; otherwise, null
 * @param {Partial<Store>} state - the redux store
 * @param {string} collectionId - the collection id
 * @return { CollectionObj | null } - the existing collection or null
 */
export function getCollectionById(
  state: Partial<Store>,
  collectionId: string
): CollectionObj {
  return lodash.find((state as any)[reducerName], { id: collectionId }) || null;
}
