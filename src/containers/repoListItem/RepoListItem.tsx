import { List, Select } from 'antd';
import lodash from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Store } from 'redux';
import { SERVER_REPOS_ENDPOINT } from '../../configs/endpoints';
import { axioService, DELETE, POST } from '../../services/axioService';
import { CollectionObj, getCollections } from '../../store/ducks/collections';
import {
  deleteRepo,
  getRepos,
  RepoObj,
  setRepo,
} from '../../store/ducks/repos';
import { getSessionUserInfo } from '../../store/ducks/session';
import './RepoListItem.scss';

/** interface to describe RepoListItem props */
interface RepoListItemProps {
  userInfo: any;
  collections: CollectionObj[];
  repos: RepoObj[];
  repoInfo: any;
  setRepoActionCreator: typeof setRepo;
  deleteRepoActionCreator: typeof deleteRepo;
}

const RepoListItem: React.FC<RepoListItemProps> = (
  props: RepoListItemProps
) => {
  const {
    repoInfo,
    collections,
    repos,
    userInfo,
    setRepoActionCreator,
    deleteRepoActionCreator,
  } = props;

  const isAssigned = lodash.find(repos, { id: repoInfo.id });
  const { Option } = Select;

  const onChange = async (value: string) => {
    if (value === '') {
      await axioService(
        DELETE,
        `${SERVER_REPOS_ENDPOINT}/${userInfo.id}/${repoInfo.id}`
      );
      deleteRepoActionCreator(repoInfo.id);
    } else {
      await axioService(
        POST,
        `${SERVER_REPOS_ENDPOINT}/${userInfo.id}`,
        { repo_id: repoInfo.id, collection_id: value },
        true
      );
      setRepoActionCreator({ id: repoInfo.id, collectionId: value });
    }
  };

  return (
    <List.Item className="RepoListItem-container">
      <List.Item.Meta
        title={<a href={repoInfo.html_url}>{repoInfo.name}</a>}
        description=""
      />
      <Select
        showSearch
        style={{ width: 200 }}
        optionFilterProp="children"
        value={isAssigned ? isAssigned.collectionId : ''}
        onChange={onChange}
        filterOption={(input, option: any) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        <Option value="">-----</Option>
        {collections.map((iterCollection: CollectionObj) => (
          <Option key={iterCollection.id} value={iterCollection.id}>
            {iterCollection.title}
          </Option>
        ))}
      </Select>
    </List.Item>
  );
};

/** connect the component to the store */

/** Interface to describe props from mapStateToProps */
interface DispatchedStateProps {
  userInfo: any;
  collections: CollectionObj[];
  repos: RepoObj[];
}

/** Map props to state  */
const mapStateToProps = (state: Partial<Store>): DispatchedStateProps => {
  const result = {
    userInfo: getSessionUserInfo(state),
    collections: getCollections(state),
    repos: getRepos(state),
  };
  return result;
};

/** map props to actions */
const mapDispatchToProps = {
  setRepoActionCreator: setRepo,
  deleteRepoActionCreator: deleteRepo,
};

/** connect RepoListItem to the redux store */
const ConnectedRepoListItem = connect(
  mapStateToProps,
  mapDispatchToProps
)(RepoListItem);

export default ConnectedRepoListItem;
