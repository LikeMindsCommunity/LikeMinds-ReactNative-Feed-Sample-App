import {Alert, Share} from 'react-native';

// this function invoke the share options for sharing the post link
export const postShare = async () => {
  try {
    const result = await Share.share({
      // todo: static data (replace with the deeplink)
      message: 'www.google.com',
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    Alert.alert((error as Error).message);
  }
};
