import React from 'react';
import './withLayout.scss';
import Header from '../../containers/header/Header';
import Sider from '../../components/sider/Sider';

/**
 * withLayout hoc method wraps the passing component with header and sider
 * @param {React.ComponentType<ComponentPropsType>} Component - a component that needs the layout
 * @returns a component containing all the layout components as well as the passed component
 */
function withLayout<ComponentPropsType>(
  Component: React.ComponentType<ComponentPropsType>
) {
  return (props: ComponentPropsType) => {
    {
      return (
        <div className="withLayout-layout-container">
          <div className="withLayout-header">
            <Header />
          </div>
          <div className="withLayout-content-background">
            <div className="withLayout-sider">
              <div className="withLayout-sider-inner">
                <Sider />
              </div>
            </div>
            <div className="withLayout-content">
              <Component {...props} />
            </div>
          </div>
        </div>
      );
    }
  };
}

export default withLayout;
