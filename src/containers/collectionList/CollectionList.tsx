import { List } from 'antd';
import lodash from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Store } from 'redux';
import { CollectionObj, getCollections } from '../../store/ducks/collections';
import ConnectedCollectionListItem from '../collectionListItem/CollectionListItem';
import './CollectionList.scss';

/** interface to describe CollectionList props */
interface CollectionList {
  collections: CollectionObj[];
}

const CollectionList: React.FC<CollectionList> = (props: CollectionList) => {
  const { collections } = props;
  return (
    <List
      itemLayout="horizontal"
      dataSource={lodash.orderBy(collections, ['createdAt'], ['asc'])}
      renderItem={(item) => (
        <ConnectedCollectionListItem collectionInfo={item} />
      )}
    />
  );
};

/** connect the component to the store */

/** Interface to describe props from mapStateToProps */
interface DispatchedStateProps {
  collections: CollectionObj[];
}

/** Map props to state  */
const mapStateToProps = (state: Partial<Store>): DispatchedStateProps => {
  const result = {
    collections: getCollections(state),
  };
  return result;
};

/** map props to actions */
const mapDispatchToProps = {};

/** connect CollectionList to the redux store */
const ConnectedCollectionList = connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionList);

export default ConnectedCollectionList;
