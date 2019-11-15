import React from 'react';
import { Input, Icon, Layout, withStyles, ThemedComponentProps } from 'react-native-ui-kitten';

type SearchbarProps = { onSearch: (text: string) => void } & ThemedComponentProps;

const Searchbar = ({ onSearch, themedStyle }: SearchbarProps) => {
  const [val, setVal] = React.useState('');

  const searchFunc = () => {
    if (onSearch) {
      onSearch(val.toLowerCase());
    }
  };

  return (
    <Layout style={themedStyle.searchbarContainer}>
      <Input
        icon={() => <Icon name="search" />}
        value={val}
        onChangeText={text => setVal(text)}
        onBlur={searchFunc}
        onSubmitEditing={searchFunc}
        returnKeyType="search"
      />
    </Layout>
  );
};

export default withStyles(Searchbar, () => ({
  searchbarContainer: {
    padding: 10,
  },
}));
