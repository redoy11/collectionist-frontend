import { List } from 'antd';
import lodash from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Store } from 'redux';
import { GITHUB_USER_ENDPOINT } from '../../configs/endpoints';
import { axioGet } from '../../services/axioService';
import { getSessionUserInfo } from '../../store/ducks/session';
import ConnectedSearchContentItem from '../repoListItem/RepoListItem';
import './SearchContent.scss';

/** interface to describe SearchContent props */
interface SearchContent {
  userInfo: any;
  searchText: string;
}

const SearchContent: React.FC<SearchContent> = (props: SearchContent) => {
  const { searchText, userInfo } = props;
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
    return iterRepo.name.includes(searchText);
  });

  return (
    <List
      itemLayout="horizontal"
      dataSource={filteredRepos}
      renderItem={(item: any) => (
        <ConnectedSearchContentItem
          repoInfo={{ ...item, id: item.id.toString() }}
        />
      )}
    />
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
const mapDispatchToProps = {};

/** connect SearchContent to the redux store */
const ConnectedSearchContent = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchContent);

export default ConnectedSearchContent;
