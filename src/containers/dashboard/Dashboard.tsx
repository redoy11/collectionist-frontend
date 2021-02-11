import { Card } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { Store } from 'redux';
import { CollectionObj, getCollections } from '../../store/ducks/collections';
import { getSessionUserInfo } from '../../store/ducks/session';
import './Dashboard.scss';

/** Interface to describe Dashboard props */
interface DashboardProps {
  userInfo: any;
  collections: CollectionObj[];
}

const Dashboard: React.FC<DashboardProps> = (props: DashboardProps) => {
  const { userInfo, collections } = props;
  return (
    <div className="Dashboard-container">
      <Card title={collections.length || '0'}>Collections</Card>
      <Card title={userInfo.public_repos || '0'}>Public repositories</Card>
      <Card title={userInfo.followers || '0'}>Followers</Card>
      <Card title={userInfo.following || '0'}>Following</Card>
    </div>
  );
};

/** connect the component to the store */

/** Interface to describe props from mapStateToProps */
interface DispatchedStateProps {
  userInfo: any;
  collections: CollectionObj[];
}

/** Map props to state  */
const mapStateToProps = (state: Partial<Store>): DispatchedStateProps => {
  const result = {
    userInfo: getSessionUserInfo(state),
    collections: getCollections(state),
  };
  return result;
};

/** map props to actions */
const mapDispatchToProps = {};

/** connect Dashboard to the redux store */
const ConnectedDashboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);

export default ConnectedDashboard;
