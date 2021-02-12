import { Button, Dropdown, Menu, Tooltip } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { Store } from 'redux';
import SiderItem from '../../components/siderItem/SiderItem';
import { CollectionObj, setCollection } from '../../store/ducks/collections';
import { getSessionUserInfo } from '../../store/ducks/session';
import ConnectedAddCollection from '../addCollection/AddCollection';
import './CollectionSiderItem.scss';

/** interface to describe collectionItem props */
interface CollectionSiderItemProps {
  collectionInfo: CollectionObj;
  setCollectionActionCreator: typeof setCollection;
}

const CollectionSiderItem: React.FC<CollectionSiderItemProps> = (
  props: CollectionSiderItemProps
) => {
  const { collectionInfo } = props;

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

  return (
    <div className="CollectionSiderItem-container">
      <SiderItem title={collectionInfo.title} count="0" location="" />
      <Dropdown
        overlay={
          <Menu className="CollectionSiderItem-dropdown">
            <Menu.Item
              onClick={editHandler}
              key="0"
              icon={<i className="fas fa-edit" />}
            >
              Edit
            </Menu.Item>
            <Menu.Item key="1" icon={<i className="fas fa-trash" />}>
              Delete
            </Menu.Item>
          </Menu>
        }
        placement="bottomRight"
        trigger={['click']}
      >
        <Tooltip title="More">
          <Button
            shape="circle"
            size="small"
            type="text"
            icon={<i className="fas fa-ellipsis-v" />}
          />
        </Tooltip>
      </Dropdown>
      <ConnectedAddCollection
        visible={visible}
        closeHandler={modalCloseHandler}
        collectionId={collectionInfo.id}
      />
    </div>
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
const mapDispatchToProps = { setCollectionActionCreator: setCollection };

/** connect CollectionSiderItem to the redux store */
const ConnectedCollectionSiderItem = connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionSiderItem);

export default ConnectedCollectionSiderItem;
