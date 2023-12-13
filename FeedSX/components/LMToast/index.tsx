import {View, Text} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {styles} from './styles';
import {useAppSelector} from '../../store/store';
import Toast from 'react-native-toast-message';
import {useDispatch} from 'react-redux';
import {showToastMessage} from '../../store/actions/toast';

const LMToast = () => {
  const dispatch = useDispatch();
  const {message} = useAppSelector(state => state.loader);

  // this functions makes the toast visible
  const showToast = useCallback(() => {
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
  }, [dispatch]);

  // handles the visibility of the toast
  useEffect(() => {
    showToast();
  }, [showToast]);

  const renderToastView = () => {
    return (
      <View>
        <View>
          <View style={styles.modalView}>
            <Text style={styles.filterText}>{message}</Text>
          </View>
        </View>
      </View>
    );
  };

  // toast UI config
  const toastConfig = {
    toastView: () => renderToastView(),
  };

  return (
    // toast component
    <Toast config={toastConfig} />
  );
};

export default LMToast;
