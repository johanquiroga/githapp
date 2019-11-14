import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Text } from 'react-native-ui-kitten';

// Screens
import { Home, User, CreateUser } from '../screens';

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        title: 'Home',
      },
    },
    CreateUser: {
      screen: CreateUser,
      navigationOptions: {
        title: 'Add User',
      },
    },
    User: {
      screen: User,
      navigationOptions: ({ navigation }) => ({
        title: navigation.getParam('title', 'User'),
      }),
    },
  },
  {
    defaultNavigationOptions: {
      headerTitle: Object.assign(({ children }) => <Text>{children}</Text>, {
        displayName: 'HeaderTitle',
      }),
    },
  },
);

export default createAppContainer(AppNavigator);
