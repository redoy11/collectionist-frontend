import { List } from 'antd';
import lodash from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Store } from 'redux';
import { GITHUB_USER_ENDPOINT } from '../../configs/endpoints';
import { axioGet } from '../../services/axioService';
import { getRepos, RepoObj } from '../../store/ducks/repos';
import { getSessionUserInfo } from '../../store/ducks/session';
import ConnectedRepoListItem from '../repoListItem/RepoListItem';
import './RepoList.scss';

/** interface to describe RepoList props */
interface RepoList {
  collectionId?: string;
  userInfo: any;
  collectedRepos: RepoObj[];
}

const RepoList: React.FC<RepoList> = (props: RepoList) => {
  const { collectionId, collectedRepos, userInfo } = props;
  const [totalRepos, setTotalRepos] = React.useState<any>([]);

  React.useEffect(() => {
    const fetchUserRepos = async () => {
      const response = await axioGet(
        `${GITHUB_USER_ENDPOINT}s/${userInfo.login}/repos`
      );
      setTotalRepos(response.data);
    };
    fetchUserRepos();
  }, []);

  const filteredRepos = lodash.filter(totalRepos, (iterRepo) => {
    return lodash.find(collectedRepos, {
      id: iterRepo.id.toString(),
      collectionId: collectionId,
    });
  });

  return (
    <List
      itemLayout="horizontal"
      dataSource={collectionId ? filteredRepos : totalRepos}
      renderItem={(item: any) => (
        <ConnectedRepoListItem repoInfo={{ ...item, id: item.id.toString() }} />
      )}
    />
  );
};

/** connect the component to the store */

/** Interface to describe props from mapStateToProps */
interface DispatchedStateProps {
  collectedRepos: RepoObj[];
  userInfo: any;
}

/** Map props to state  */
const mapStateToProps = (state: Partial<Store>): DispatchedStateProps => {
  const result = {
    collectedRepos: getRepos(state),
    userInfo: getSessionUserInfo(state),
  };
  return result;
};

/** map props to actions */
const mapDispatchToProps = {};

/** connect RepoList to the redux store */
const ConnectedRepoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(RepoList);

export default ConnectedRepoList;
