import {Dispatch} from '@reduxjs/toolkit';
import {Alert} from 'react-native';
import {SHOW_TOAST} from '../types/loader';

// show toast message action
export const showToastMessage =
  (payload?: any) => async (dispatch: Dispatch) => {
    try {
      return await dispatch({
        type: SHOW_TOAST,
        body: payload,
      });
    } catch (error) {
      Alert.alert(`${error}`);
    }
  };
