import Reactotron, { trackGlobalErrors } from 'reactotron-react-native';
import AsyncStorage from '@react-native-community/async-storage';

const reactotron = Reactotron.setAsyncStorageHandler(AsyncStorage) // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from
  .configure({ name: 'Githapp' }) // controls connection & communication settings
  .useReactNative({
    networking: {
      // optionally, you can turn it off with false.
      ignoreUrls: /symbolicate/,
    },
  })
  // add all built-in react native plugins
  .use(trackGlobalErrors())
  .connect(); // let's connect!

Reactotron.clear();

// AsyncStorage.clear();

console.tron = Reactotron;
