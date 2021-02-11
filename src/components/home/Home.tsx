import React from 'react';
import ConnectedDashboard from '../../containers/dashboard/Dashboard';
import withLayout from '../../hocs/withLayout/withLayout';
import './Home.scss';

const Home = () => {
  return (
    <div className="Home-container">
      <ConnectedDashboard />
    </div>
  );
};

export default withLayout(Home);
