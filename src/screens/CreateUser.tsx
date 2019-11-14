import React from 'react';
import { SafeAreaView, Platform } from 'react-native';
import { Layout, Text, withStyles, ThemedComponentProps } from 'react-native-ui-kitten';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { UserForm } from '../containers';

type CreateUserProps = ThemedComponentProps;

function CreateUser({ themedStyle }: CreateUserProps) {
  return (
    <SafeAreaView style={themedStyle.screen}>
      <KeyboardAwareScrollView
        enableOnAndroid
        contentContainerStyle={themedStyle.screenContainer}
        keyboardShouldPersistTaps={Platform.select({
          ios: 'never',
          android: 'handled',
        })}
      >
        <Layout style={themedStyle.item}>
          <Text category="h3" style={themedStyle.centerText}>
            Add New User
          </Text>
          <UserForm />
        </Layout>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default withStyles(CreateUser, () => ({
  centerText: {
    textAlign: 'center',
  },
  screen: {
    flex: 1,
  },
  screenContainer: {
    flexGrow: 1,
    paddingHorizontal: 15,
  },
  item: {
    paddingVertical: 15,
  },
}));
