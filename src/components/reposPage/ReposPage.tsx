import React from 'react';
import ConnectedRepoList from '../../containers/repoList/RepoList';
import withLayout from '../../hocs/withLayout/withLayout';
import './ReposPage.scss';

const ReposPage = () => {
  return (
    <div className="ReposPage-container">
      <div className="ReposPage-title">Repositories</div>
      <ConnectedRepoList />
    </div>
  );
};

export default withLayout(ReposPage);
