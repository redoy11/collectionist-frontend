import { Button, Input, Modal } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { Store } from 'redux';
import {
  CollectionObj,
  getCollectionById,
  setCollection,
} from '../../store/ducks/collections';
import './AddCollection.scss';
import { axioService, POST, PUT } from '../../services/axioService';
import { SERVER_COLLECTIONS_ENDPOINT } from '../../configs/endpoints';
import { getSessionUserInfo } from '../../store/ducks/session';

/** interface to describe AddCollection props */
interface AddCollectionProps {
  userInfo: any;
  visible: boolean;
  setCollectionActionCreator: typeof setCollection;
  closeHandler: () => void;
  collectionId?: string;
  collectionInfo: CollectionObj | null;
}

const MODAL_TITLE = 'Add Collection';

const AddCollection: React.FC<AddCollectionProps> = (
  props: AddCollectionProps
) => {
  const {
    visible,
    closeHandler,
    setCollectionActionCreator,
    collectionInfo,
    userInfo,
  } = props;

  /** manages the title input state */
  const [title, setTitle] = React.useState<string>('');

  /** initialize modal on visible */
  React.useEffect(() => {
    if (collectionInfo) {
      setTitle(collectionInfo.title);
    } else {
      setTitle('');
    }
  }, [visible]);

  /**
   * titleChangeHandler updates user's title state on change
   * @param {React.ChangeEvent<HTMLInputElement>} event - the on change event
   */
  const titleChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  /** manages the create/edit request  */
  const okHandler = async () => {
    if (title === '') return;
    if (collectionInfo) {
      const response = await axioService(
        PUT,
        `${SERVER_COLLECTIONS_ENDPOINT}/${userInfo.id}/${collectionInfo.id}`,
        { title },
        true
      );
      setCollectionActionCreator({
        ...collectionInfo,
        updatedAt: response.data[0].updated_at || '',
        title,
      });
    } else {
      const response = await axioService(
        POST,
        `${SERVER_COLLECTIONS_ENDPOINT}/${userInfo.id}`,
        { title },
        true
      );
      setCollectionActionCreator({
        id: response.data[0].id.toString(),
        title,
        type: '',
        createdAt: response.data[0].created_at,
        updatedAt: response.data[0].updated_at,
      });
    }
    closeHandler();
  };

  return (
    <Modal
      title={MODAL_TITLE}
      visible={visible}
      onOk={okHandler}
      onCancel={closeHandler}
      width={600}
      footer={[
        <Button key="back" onClick={closeHandler}>
          Close
        </Button>,
        <Button
          key="submit"
          type="primary"
          disabled={title === ''}
          onClick={okHandler}
        >
          Done
        </Button>,
      ]}
    >
      <div className="AddCollection-title-container">
        <Input
          value={title}
          size="large"
          placeholder="Collection Name"
          onChange={titleChangeHandler}
          onPressEnter={okHandler}
        />
      </div>
    </Modal>
  );
};

/** connect the component to the store */

/** Interface to describe props from mapStateToProps */
interface DispatchedStateProps {
  userInfo: any;
  collectionInfo: CollectionObj | null;
}

/** Map props to state  */
const mapStateToProps = (
  state: Partial<Store>,
  parentProps: Omit<
    Omit<AddCollectionProps, keyof DispatchedStateProps>,
    keyof typeof mapDispatchToProps
  >
): DispatchedStateProps => {
  const result = {
    collectionInfo: getCollectionById(state, parentProps?.collectionId || ''),
    userInfo: getSessionUserInfo(state),
  };
  return result;
};

/** map props to actions */
const mapDispatchToProps = {
  setCollectionActionCreator: setCollection,
};

/** connect AddCollection to the redux store */
const ConnectedAddCollection = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCollection);

export default ConnectedAddCollection;
