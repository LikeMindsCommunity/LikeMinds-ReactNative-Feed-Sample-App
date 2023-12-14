import {createNavigationContainerRef} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}
function goBack() {
  if (navigationRef.canGoBack()) {
    navigationRef.goBack();
  }
}

export {navigate, goBack};
