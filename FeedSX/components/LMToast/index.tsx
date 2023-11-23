import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {styles} from './styles';
import {useAppSelector} from '../../store/store';
import Toast from 'react-native-toast-message';
import {useDispatch} from 'react-redux';
import {showToastMessage} from '../../store/actions/toast';

const LMToast = () => {
  const dispatch = useDispatch();
  const {message} = useAppSelector(state => state.loader);

  // handles the visibility of the toast
  useEffect(() => {
    showToast();
  }, []);

  // this functions makes the toast visible
  const showToast = () => {
    Toast.show({
      position: 'bottom',
      type: 'toastView',
      autoHide: true,
      visibilityTime: 1500,
      onHide: () =>
        dispatch(
          showToastMessage({
            isToast: false,
          }) as any,
        ),
    });
  };

  // toast UI config
  const toastConfig = {
    toastView: () => (
      <View>
        <View>
          <View style={styles.modalView}>
            <Text style={styles.filterText}>{message}</Text>
          </View>
        </View>
      </View>
    ),
  };

  return (
    // toast component
    <Toast config={toastConfig} />
  );
};

export default LMToast;
