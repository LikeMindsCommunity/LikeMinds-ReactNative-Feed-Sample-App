/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './FeedSX/App';
import {LMFeedClient} from '@likeminds.community/feed-js-beta';

export const lmFeedClient = LMFeedClient.Builder()
  .setApiKey('69edd43f-4a5e-4077-9c50-2b7aa740acce')
  .setPlatformCode('rn')
  .setVersionCode(9999)
  .build();

AppRegistry.registerComponent(appName, () => App);
