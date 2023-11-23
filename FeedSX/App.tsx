import React from 'react';
import {KeyboardAvoidingView, Platform} from 'react-native';
import {Provider as ReduxProvider} from 'react-redux';
import store from './store/store';
import SwitchComponent from './navigation/SwitchComponent';

function App(): JSX.Element {
  return (
    <ReduxProvider store={store}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <SwitchComponent />
      </KeyboardAvoidingView>
    </ReduxProvider>
  );
}

export default App;
