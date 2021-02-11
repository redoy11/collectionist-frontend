import { Button, Divider, Tooltip } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { Store } from 'redux';
import SiderItem from '../../components/siderItem/SiderItem';
import { CollectionObj, getCollections } from '../../store/ducks/collections';
import { getSessionUserInfo } from '../../store/ducks/session';
import ConnectedAddCollection from '../addCollection/AddCollection';
import './Sider.scss';

/** interface to describe sider props */
interface SiderProps {
  collections: CollectionObj[];
  userInfo: any;
}

const Sider: React.FC<SiderProps> = (props: SiderProps) => {
  const { collections, userInfo } = props;

  const [visible, setVisible] = React.useState<boolean>(false);

  const closeHandler = () => {
    setVisible(false);
  };

  const openHandler = () => {
    setVisible(true);
  };

  return (
    <React.Fragment>
      <div>
        <SiderItem title="Home" count="" location="/home" />
        <SiderItem
          title="Collections"
          count={collections.length.toString()}
          location=""
        />
        <SiderItem
          title="Repositories"
          count={userInfo?.public_repos || '0'}
          location=""
        />
      </div>
      <div className="Sider-dropdown-title-container">
        <div className="Sider-dropdown-title">Collections</div>
        <Tooltip title="Add new collection">
          <Button
            shape="circle"
            size="small"
            type="text"
            icon={<i className="fas fa-plus" />}
            onClick={openHandler}
          />
        </Tooltip>
      </div>
      <Divider className="Sider-divider" />
      <div className="Sider-dropdown-body">
        {collections.map((iterCollection: CollectionObj) => (
          <SiderItem
            key={iterCollection.id}
            title={iterCollection.title}
            count="0"
            location=""
          />
        ))}
      </div>
      <ConnectedAddCollection visible={visible} closeHandler={closeHandler} />
    </React.Fragment>
  );
};

/** connect the component to the store */

/** Interface to describe props from mapStateToProps */
interface DispatchedStateProps {
  collections: CollectionObj[];
  userInfo: any;
}

/** Map props to state  */
const mapStateToProps = (state: Partial<Store>): DispatchedStateProps => {
  const result = {
    collections: getCollections(state),
    userInfo: getSessionUserInfo(state),
  };
  return result;
};

/** map props to actions */
const mapDispatchToProps = {};

/** connect Sider to the redux store */
const ConnectedSider = connect(mapStateToProps, mapDispatchToProps)(Sider);

export default ConnectedSider;
