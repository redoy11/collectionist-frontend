import { Button, List, Modal, Tooltip } from 'antd';
import moment from 'moment';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Store } from 'redux';
import {
  LOCAL_COLLECTIONS_ENDPOINT,
  SERVER_COLLECTIONS_ENDPOINT,
} from '../../configs/endpoints';
import { axioService, DELETE } from '../../services/axioService';
import {
  CollectionObj,
  deleteCollection,
  setCollection,
} from '../../store/ducks/collections';
import { deleteRepoOnCollection } from '../../store/ducks/repos';
import { getSessionUserInfo } from '../../store/ducks/session';
import ConnectedAddCollection from '../addCollection/AddCollection';
import './CollectionListItem.scss';

/** interface to describe collectionItem props */
interface CollectionListItemProps {
  userInfo: any;
  collectionInfo: CollectionObj;
  setCollectionActionCreator: typeof setCollection;
  deleteCollectionActionCreator: typeof deleteCollection;
  deleteRepoOnCollectionActionCreator: typeof deleteRepoOnCollection;
}

const CollectionListItem: React.FC<CollectionListItemProps> = (
  props: CollectionListItemProps
) => {
  const {
    collectionInfo,
    userInfo,
    deleteCollectionActionCreator,
    deleteRepoOnCollectionActionCreator,
  } = props;

  const { confirm } = Modal;

  /** manages the visibility of edit modal */
  const [visible, setVisible] = React.useState<boolean>(false);

  /** handles the collection edit request */
  const editHandler = () => {
    setVisible(true);
  };

  /** handles the collection edit modal close request */
  const modalCloseHandler = () => {
    setVisible(false);
  };

  /** handles the delete request of collection */
  const deleteRequest = async () => {
    await axioService(
      DELETE,
      `${SERVER_COLLECTIONS_ENDPOINT}/${userInfo.id}/${collectionInfo.id}`,
      {},
      true
    );
    deleteCollectionActionCreator(collectionInfo.id);
    deleteRepoOnCollectionActionCreator(collectionInfo.id);
  };

  /** confirms the delete request */
  const showDeleteConfirm = () => {
    confirm({
      title: 'Are you sure delete this collection?',
      icon: <i className="fas fa-delete" />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        deleteRequest();
      },
    });
  };

  return (
    <List.Item className="CollectionListItem-container">
      <List.Item.Meta
        title={
          <Link to={LOCAL_COLLECTIONS_ENDPOINT + '/' + collectionInfo.id}>
            {collectionInfo.title}
          </Link>
        }
        description={`Last edited at ${moment
          .utc(collectionInfo.updatedAt)
          .fromNow()}`}
      />
      <Tooltip title="Edit Collection">
        <Button
          shape="circle"
          size="small"
          type="text"
          icon={<i className="fas fa-edit" />}
          onClick={editHandler}
        />
      </Tooltip>
      <Tooltip title="Delete Collection">
        <Button
          shape="circle"
          size="small"
          type="text"
          icon={<i className="fas fa-trash" />}
          onClick={showDeleteConfirm}
        />
      </Tooltip>
      <ConnectedAddCollection
        visible={visible}
        closeHandler={modalCloseHandler}
        collectionId={collectionInfo.id}
      />
    </List.Item>
  );
};

/** connect the component to the store */

/** Interface to describe props from mapStateToProps */
interface DispatchedStateProps {
  userInfo: any;
}

/** Map props to state  */
const mapStateToProps = (state: Partial<Store>): DispatchedStateProps => {
  const result = {
    userInfo: getSessionUserInfo(state),
  };
  return result;
};

/** map props to actions */
const mapDispatchToProps = {
  setCollectionActionCreator: setCollection,
  deleteCollectionActionCreator: deleteCollection,
  deleteRepoOnCollectionActionCreator: deleteRepoOnCollection,
};

/** connect CollectionListItem to the redux store */
const ConnectedCollectionListItem = connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionListItem);

export default ConnectedCollectionListItem;
