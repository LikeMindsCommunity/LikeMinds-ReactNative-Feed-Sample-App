import {Alert, Linking, PermissionsAndroid, Platform} from 'react-native';
import {
  STORAGE_PERMISSION,
  STORAGE_PERMISSION_ALERT_DESCRIPTION,
  STORAGE_PERMISSION_ALERT_HEADING,
  STORAGE_PERMISSION_MESSAGE,
} from '../constants/Strings';

// function checks if we have access of storage in Android.
export async function requestStoragePermission() {
  if (Platform.OS === 'android') {
    const OSVersion = Platform.constants.Release;

    if (Number(OSVersion) < 13) {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: STORAGE_PERMISSION,
            message: STORAGE_PERMISSION_MESSAGE,
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          return true;
        } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
          Alert.alert(
            STORAGE_PERMISSION_ALERT_HEADING,
            STORAGE_PERMISSION_ALERT_DESCRIPTION,
            [
              {text: 'Cancel', style: 'cancel'},
              {text: 'Open Settings', onPress: Linking.openSettings},
            ],
          );
        } else {
          return false;
        }
      } catch (err) {
        return false;
      }
    } else {
      try {
        const grantedImageStorage = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
        ]);
        if (
          grantedImageStorage['android.permission.READ_MEDIA_IMAGES'] &&
          grantedImageStorage['android.permission.READ_MEDIA_VIDEO'] ===
            PermissionsAndroid.RESULTS.GRANTED
        ) {
          return true;
        } else if (
          grantedImageStorage['android.permission.READ_MEDIA_IMAGES'] ===
            PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN ||
          grantedImageStorage['android.permission.READ_MEDIA_VIDEO'] ===
            PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN
        ) {
          Alert.alert(
            STORAGE_PERMISSION_ALERT_HEADING,
            STORAGE_PERMISSION_ALERT_DESCRIPTION,
            [
              {text: 'Cancel', style: 'cancel'},
              {text: 'Open Settings', onPress: Linking.openSettings},
            ],
          );
          return false;
        } else {
          return false;
        }
      } catch (err) {
        return false;
      }
    }
  }
}
