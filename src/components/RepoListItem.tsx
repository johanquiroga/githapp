import React from 'react';
import { ListItem, withStyles, ThemedComponentProps } from 'react-native-ui-kitten';

import { Repo } from '../types';

type ReposListItemProps = {
  repo: Repo;
  onPress: () => void;
} & ThemedComponentProps;

const ReposListItem = ({ repo, onPress, themedStyle }: ReposListItemProps) => {
  return (
    <ListItem
      title={repo.name}
      description={`${repo.default_branch} - ${repo.language}`}
      onPress={onPress}
      style={themedStyle.item}
    />
  );
};

export default withStyles(ReposListItem, () => ({
  item: {
    margin: 10,
  },
}));
