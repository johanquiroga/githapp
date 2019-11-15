import React, { useState, useCallback, useEffect } from 'react';
import { unionBy } from 'lodash';

import { Repo } from '../types';
import * as GithappService from '../services';

import { RepoList as RepoListComponent } from '../components';

import { PER_PAGE } from '../constants';

type Props = {
  username: string;
  onPress: (item: Repo) => void;
};

function RepoList({ username, onPress }: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loadMore, setLoadMore] = useState(true);

  const getRepos = useCallback(async () => {
    const response = await GithappService.getUserRepos(username, searchTerm, { params: { page } });

    if (response.success && response.data) {
      if (page === 1) {
        setData(response.data.repos);
      } else {
        setData(prevData => unionBy(prevData, response.data ? response.data.repos : [], 'id'));
      }
      setLoadMore(!(response.data.repos.length < PER_PAGE));
    }
  }, [username, searchTerm, page]);

  useEffect(() => {
    getRepos();
  }, [getRepos]);

  return (
    <RepoListComponent
      repos={data}
      onRefresh={async () => {
        setRefreshing(true);
        setPage(1);
        setSearchTerm('');
        await getRepos();
        setRefreshing(false);
      }}
      onLoadMore={async () => {
        if (loadMore) {
          setPage(prevPage => prevPage + 1);
          setLoadingMore(true);
          await getRepos();
          setLoadingMore(false);
        }
      }}
      refreshing={refreshing}
      loadingMore={loadingMore}
      onPress={onPress}
      onSearch={(text: string) => {
        setPage(1);
        setSearchTerm(text);
      }}
    />
  );
}

export default RepoList;
