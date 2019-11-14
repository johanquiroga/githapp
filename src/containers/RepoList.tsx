import React, { useState, useCallback, useEffect } from 'react';

import { Repo } from 'src/types';
import * as GithappService from '../services';

import { RepoList as RepoListComponent } from '../components';

import { PER_PAGE } from '../constants';

type Props = {
  username: string;
  onPress: (item: Repo) => void;
};

function RepoList({ username, onPress }: Props) {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loadMore, setLoadMore] = useState(true);

  const getRepos = useCallback(async () => {
    const response = await GithappService.getUserRepos(username, { params: { page } });

    if (response.success && response.data) {
      if (page === 1) {
        setData(response.data.repos);
      } else {
        setData(prevData => [...prevData, ...response.data.repos]);
      }
      setLoadMore(!(response.data.repos.length < PER_PAGE));
    }
  }, [username, page]);

  useEffect(() => {
    getRepos();
  }, [getRepos]);

  return (
    <RepoListComponent
      repos={data}
      onRefresh={async () => {
        setPage(1);
        setRefreshing(true);
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
    />
  );
}

export default RepoList;
