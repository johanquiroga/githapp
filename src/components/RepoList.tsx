import React from 'react';
import { List, Spinner, Layout, withStyles, ThemedComponentProps } from 'react-native-ui-kitten';

import RepoListItem from './RepoListItem';

import { Repo } from '../types';

type RepoListProps = {
  repos: Repo[];
  onRefresh: () => void;
  onLoadMore: () => void;
  refreshing: boolean;
  loadingMore: boolean;
  onPress: (item: Repo) => void;
} & ThemedComponentProps;

const RepoList = ({
  repos,
  onRefresh,
  onLoadMore,
  refreshing,
  loadingMore,
  onPress,
  themedStyle,
}: RepoListProps) => {
  const renderItem = ({ item }) => (
    <RepoListItem
      repo={item}
      onPress={() => {
        onPress(item);
      }}
    />
  );

  const renderFooter = () => {
    if (!loadingMore) {
      return null;
    }

    return (
      <Layout style={themedStyle.listFooter}>
        <Spinner animating />
      </Layout>
    );
  };

  return (
    <List
      data={repos}
      keyExtractor={item => item.id}
      renderItem={renderItem}
      onRefresh={onRefresh}
      refreshing={refreshing}
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.5}
      initialNumToRender={5}
      ListFooterComponent={renderFooter}
    />
  );
};

export default withStyles(RepoList, () => ({
  listFooter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
