import React, { useCallback, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { Text, withStyles, ThemedComponentProps } from 'react-native-ui-kitten';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import Spinner from 'react-native-loading-spinner-overlay';

import { User as UserType, Repo } from '../types';

import * as GithappService from '../services';

import { RepoList } from '../containers';
import { RepoDetails } from '../components';

type UserProps = NavigationStackScreenProps<{ userId: string }> & ThemedComponentProps;

function User({ navigation, themedStyle }: UserProps) {
  const userId = navigation.getParam('userId');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState<Repo>();

  const getUser = useCallback(async () => {
    setLoading(true);
    const result = await GithappService.getUser(userId);
    setLoading(false);

    if (result.success && result.data) {
      setUser(result.data.user);
    }
  }, [userId]);

  React.useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <SafeAreaView style={themedStyle.screen}>
      <RepoDetails
        visible={modalVisible}
        data={modalData}
        onDismiss={() => {
          setModalVisible(false);
        }}
      />
      <Spinner visible={loading} />
      {user ? (
        <RepoList
          username={user.username}
          onPress={(item: Repo) => {
            setModalData(item);
            setModalVisible(true);
          }}
        />
      ) : (
        <Text>No User Has Been Found</Text>
      )}
    </SafeAreaView>
  );
}

export default withStyles(User, () => ({
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
