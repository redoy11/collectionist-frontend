import React from 'react';
import { useParams } from 'react-router-dom';
import SearchContent from '../../containers/searchContent/SearchContent';
import withLayout from '../../hocs/withLayout/withLayout';
import './SearchPage.scss';

const SearchPage = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <div className="SearchPage-container">
      <div className="SearchPage-title">
        Search <span>{id}</span>
      </div>
      <SearchContent searchText={id} />
    </div>
  );
};

export default withLayout(SearchPage);
