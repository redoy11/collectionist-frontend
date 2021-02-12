import React from 'react';
import { connect } from 'react-redux';
import { Store } from 'redux';
import {
  CollectionObj,
  getCollectionById,
} from '../../store/ducks/collections';
import ConnectedRepoList from '../repoList/RepoList';
import './CollectionContent.scss';

interface CollectionContentProps {
  collectionId: string;
  collectionInfo: CollectionObj | null;
}

const CollectionContent: React.FC<CollectionContentProps> = (
  props: CollectionContentProps
) => {
  const { collectionInfo } = props;
  return collectionInfo ? (
    <React.Fragment>
      <div className="CollectionsPage-title">{collectionInfo.title}</div>
      <ConnectedRepoList collectionId={collectionInfo.id} />
    </React.Fragment>
  ) : (
    <div />
  );
};

/** connect the component to the store */

/** Interface to describe props from mapStateToProps */
interface DispatchedStateProps {
  collectionInfo: CollectionObj | null;
}

/** Map props to state  */
const mapStateToProps = (
  state: Partial<Store>,
  parentProps: Omit<
    Omit<CollectionContentProps, keyof DispatchedStateProps>,
    keyof typeof mapDispatchToProps
  >
): DispatchedStateProps => {
  const result = {
    collectionInfo: getCollectionById(state, parentProps?.collectionId || ''),
  };
  return result;
};

/** map props to actions */
const mapDispatchToProps = {};

/** connect CollectionContent to the redux store */
const ConnectedCollectionContent = connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionContent);

export default ConnectedCollectionContent;
