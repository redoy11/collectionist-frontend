import React from 'react';
import { useParams } from 'react-router-dom';
import CollectionContent from '../../containers/collectionContent/CollectionContent';
import withLayout from '../../hocs/withLayout/withLayout';
import './CollectionPage.scss';

const CollectionPage = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <div className="CollectionPage-container">
      <CollectionContent collectionId={id} />
    </div>
  );
};

export default withLayout(CollectionPage);
