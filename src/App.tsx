import React from 'react';
import { StatusBar } from 'react-native';
import { mapping, light as theme } from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider, IconRegistry } from 'react-native-ui-kitten';

import AppNavigator from './navigation';

if (__DEV__) {
  import('../ReactotronConfig').then(() => console.log('Reactotron Configured'));
}

export default function App() {
  return (
    <>
      <StatusBar animated barStyle="light-content" />
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider mapping={mapping} theme={theme}>
        <AppNavigator />
      </ApplicationProvider>
    </>
  );
}
