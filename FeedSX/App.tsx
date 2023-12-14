import React from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet} from 'react-native';
import {Provider as ReduxProvider} from 'react-redux';
import store from './store/store';
import SwitchComponent from './navigation/SwitchComponent';

function LMFeedApp(): JSX.Element {
  return (
    <ReduxProvider store={store}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.mainContainer}>
        <SwitchComponent />
      </KeyboardAvoidingView>
    </ReduxProvider>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});
export default LMFeedApp;
