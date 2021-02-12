import React from 'react';
import ConnectedCollectionList from '../../containers/collectionList/CollectionList';
import withLayout from '../../hocs/withLayout/withLayout';
import './CollectionsPage.scss';

const CollectionsPage = () => {
  return (
    <div className="CollectionsPage-container">
      <div className="CollectionsPage-title">Collections</div>
      <ConnectedCollectionList />
    </div>
  );
};

export default withLayout(CollectionsPage);
