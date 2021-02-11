import { Button, Input, Modal } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { Store } from 'redux';
import {
  CollectionObj,
  getCollectionById,
  setCollection,
} from '../../store/ducks/collections';
import { v4 as uuid } from 'uuid';
import './AddCollection.scss';

/** interface to describe AddCollection props */
interface AddCollectionProps {
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
  } = props;
  const [title, setTitle] = React.useState<string>('');

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

  const okHandler = () => {
    if (title === '') return;
    if (collectionInfo) {
      setCollectionActionCreator({
        ...collectionInfo,
        title,
      });
    } else {
      setCollectionActionCreator({
        id: uuid(),
        title,
        type: '',
        createdAt: '',
        updatedAt: '',
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
