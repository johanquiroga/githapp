import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import {
  Layout,
  Text,
  Button,
  withStyles,
  ThemedComponentProps,
  List,
  ListItem,
  Icon,
} from 'react-native-ui-kitten';
import { NavigationStackScreenProps } from 'react-navigation-stack';

import * as GithappService from '../services';

type HomeProps = NavigationStackScreenProps & ThemedComponentProps;

function Home({ navigation, themedStyle }: HomeProps) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const response = await GithappService.getAllUsers();
      if (response.success && response.data) {
        setUsers(response.data.users);
      }
    };

    const listener = navigation.addListener('didFocus', () => {
      getUsers();
    });

    return () => {
      listener.remove();
    };
  }, [navigation]);

  const renderItem = ({ item }) => (
    <ListItem
      icon={style => <Icon {...style} name="person" />}
      title={item.name}
      description={item.username}
      onPress={() => navigation.navigate('User', { userId: item.id })}
      style={themedStyle.listItem}
    />
  );

  const renderEmpty = () => (
    <Layout style={themedStyle.emptyContainer}>
      <Text style={themedStyle.centerText}>You don't have created any users yet.</Text>
    </Layout>
  );

  const renderFooter = () => (
    <Button onPress={() => navigation.navigate('CreateUser')}>Add User</Button>
  );

  return (
    <SafeAreaView style={themedStyle.screen}>
      <List
        data={users}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={themedStyle.listContainer}
        ListEmptyComponent={renderEmpty}
        ListFooterComponent={renderFooter}
        ListFooterComponentStyle={themedStyle.listFooter}
      />
    </SafeAreaView>
  );
}

export default withStyles(Home, () => ({
  centerText: {
    textAlign: 'center',
  },
  screen: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    padding: 15,
  },
  item: {
    paddingVertical: 15,
  },
  listItem: {
    marginVertical: 10,
  },
  listFooter: {
    paddingTop: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
