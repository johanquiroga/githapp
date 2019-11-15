import React from 'react';
import {
  List,
  Text,
  Spinner,
  Layout,
  withStyles,
  ThemedComponentProps,
} from 'react-native-ui-kitten';

import RepoListItem from './RepoListItem';
import Searchbar from './Searchbar';

import { Repo } from '../types';

type RepoListProps = {
  repos: Repo[];
  onRefresh: () => void;
  onLoadMore: () => void;
  refreshing: boolean;
  loadingMore: boolean;
  onPress: (item: Repo) => void;
  onSearch: (text: string) => void;
} & ThemedComponentProps;

const RepoList = ({
  repos,
  onRefresh,
  onLoadMore,
  refreshing,
  loadingMore,
  onPress,
  onSearch,
  themedStyle,
}: RepoListProps) => {
  const renderHeader = () => <Searchbar onSearch={onSearch} />;

  const renderItem = ({ item }) => (
    <RepoListItem
      repo={item}
      onPress={() => {
        onPress(item);
      }}
    />
  );

  const renderEmpty = () => (
    <Layout style={themedStyle.emptyContainer}>
      <Text style={themedStyle.centerText}>We couldn't find any repos.</Text>
    </Layout>
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
      ListHeaderComponent={renderHeader}
      ListEmptyComponent={renderEmpty}
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
  centerText: {
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
