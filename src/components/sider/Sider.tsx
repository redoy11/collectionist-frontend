import { Button, Divider, Tooltip } from 'antd';
import React from 'react';
import SiderItem from '../siderItem/SiderItem';
import './Sider.scss';

const Sider: React.FC = () => {
  return (
    <React.Fragment>
      <div>
        <SiderItem title="Home" count="" location="/home" />
        <SiderItem title="Collections" count="10" location="" />
        <SiderItem title="Repositories" count="10" location="" />
      </div>
      <div className="Sider-dropdown-title-container">
        <div className="Sider-dropdown-title">Collections</div>
        <Tooltip title="Add new collection">
          <Button
            shape="circle"
            size="small"
            type="text"
            icon={<i className="fas fa-plus" />}
          />
        </Tooltip>
      </div>
      <Divider className="Sider-divider" />
    </React.Fragment>
  );
};

export default Sider;
