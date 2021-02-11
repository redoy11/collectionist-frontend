import React from 'react';
import { Avatar, Dropdown, Input, Menu } from 'antd';
import './Header.scss';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Store } from 'redux';
import { getSessionUserInfo, resetSession } from '../../store/ducks/session';

/** Interface to describe Header props */
interface HeaderProps {
  userInfo: any;
  resetSessionActionCreator: typeof resetSession;
}

const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  const { userInfo, resetSessionActionCreator } = props;
  const history = useHistory();
  const [searchText, setSearchText] = React.useState<string>('');

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const searchHanlder = () => {
    if (searchText === '') return;
    /** TODO: fix the search */
    history.push(`/search/${searchText}`);
    setSearchText('');
  };

  const handleSignOut = () => {
    resetSessionActionCreator();
  };

  return (
    <div className="Header-container">
      <div className="Header-logo-container">
        <i className="fas fa-box-open"></i>
        <h4>Collectionist</h4>
      </div>
      <div className="Header-menu-container">
        <div className="Header-search-input-container">
          <div className="Header-search-input-inner-container">
            <Input
              className="Header-search-input"
              placeholder="Search"
              value={searchText}
              prefix={<i className="fas fa-search Header-search-icon"></i>}
              onPressEnter={searchHanlder}
              onChange={onChangeHandler}
            />
          </div>
        </div>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item onClick={handleSignOut} key="0">
                Sign Out
              </Menu.Item>
            </Menu>
          }
          placement="bottomRight"
        >
          <div className="Header-profile">
            <div>{userInfo?.name}</div>
            <Avatar src={userInfo.avatar_url}>
              <div>{userInfo?.name?.slice(0, 2)}</div>
            </Avatar>
          </div>
        </Dropdown>
      </div>
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
const mapDispatchToProps = {
  resetSessionActionCreator: resetSession,
};

/** connect Header to the redux store */
const ConnectedHeader = connect(mapStateToProps, mapDispatchToProps)(Header);

export default ConnectedHeader;
