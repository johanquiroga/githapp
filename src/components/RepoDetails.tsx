import React from 'react';
import { Modal, withStyles, ThemedComponentProps, Text, Layout } from 'react-native-ui-kitten';
import Color from 'color';
import Hyperlink from 'react-native-hyperlink';

import { Repo } from '../types';

type RepoDetailsProps = {
  visible: boolean;
  data?: Repo;
  onDismiss: () => void;
} & ThemedComponentProps;

function RepoDetails({ visible, data, onDismiss, themedStyle }: RepoDetailsProps) {
  return (
    <Modal
      visible={visible}
      allowBackdrop
      onBackdropPress={onDismiss}
      backdropStyle={themedStyle.backdrop}
    >
      <Layout style={themedStyle.modalContainer}>
        {data && (
          <>
            <Text category="h3" style={themedStyle.title}>
              {data.name}
            </Text>
            <Text style={themedStyle.item}>{data.description || ''}</Text>
            <Text category="label" style={themedStyle.item}>
              Language:
              <Text category="c1">&nbsp;{data.language}</Text>
            </Text>
            <Text category="label" style={themedStyle.item}>
              Branch:
              <Text category="c1">&nbsp;{data.default_branch}</Text>
            </Text>
            <Hyperlink linkDefault>
              <Text category="label" style={themedStyle.item}>
                URL:
                <Text category="c1">&nbsp;{data.clone_url}</Text>
              </Text>
            </Hyperlink>
          </>
        )}
      </Layout>
    </Modal>
  );
}
export default withStyles(RepoDetails, theme => ({
  backdrop: {
    backgroundColor: Color(theme['color-basic-900'])
      .alpha(0.7)
      .rgb()
      .string(),
  },
  modalContainer: {
    padding: 30,
    margin: 10,
    borderRadius: 10,
  },
  title: {
    textAlign: 'center',
  },
  item: {
    marginVertical: 10,
  },
}));
