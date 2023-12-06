import {Dispatch} from '@reduxjs/toolkit';
import {Alert} from 'react-native';
import {
  DECODE_URL_SUCCESS,
  DECODE_URL_DATA,
  DECODE_URL_FAILED,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILED,
  CREATE_POST,
  UPLOAD_ATTACHMENTS,
  EDIT_POST_SUCCESS,
  EDIT_POST,
  EDIT_POST_FAILED,
} from '../types/types';
import {CALL_API} from '../apiMiddleware';
import {lmFeedClient} from '../../..';

// get decoded url data api action
export const getDecodedUrl = (payload?: any) => async (dispatch: Dispatch) => {
  try {
    return await dispatch({
      type: DECODE_URL_SUCCESS,
      [CALL_API]: {
        func: lmFeedClient.decodeURL(payload),
        body: payload,
        types: [DECODE_URL_DATA, DECODE_URL_SUCCESS, DECODE_URL_FAILED],
        showLoader: true,
      },
    });
  } catch (error) {
    Alert.alert(`${error}`);
  }
};

// add post api action
export const addPost = (payload?: any) => async (dispatch: Dispatch) => {
  try {
    return await dispatch({
      type: CREATE_POST_SUCCESS,
      [CALL_API]: {
        func: lmFeedClient.addPost(payload),
        body: payload,
        types: [CREATE_POST, CREATE_POST_SUCCESS, CREATE_POST_FAILED],
        showLoader: true,
      },
    });
  } catch (error) {
    Alert.alert(`${error}`);
  }
};

// selected media to be uploaded action
export const setUploadAttachments =
  (payload?: any) => async (dispatch: Dispatch) => {
    try {
      return await dispatch({
        type: UPLOAD_ATTACHMENTS,
        body: payload,
      });
    } catch (error) {
      Alert.alert(`${error}`);
    }
  };

// edit post api action
export const editPost = (payload?: any) => async (dispatch: Dispatch) => {
  try {
    return await dispatch({
      type: EDIT_POST_SUCCESS,
      [CALL_API]: {
        func: lmFeedClient.editPost(payload),
        body: payload,
        types: [EDIT_POST, EDIT_POST_SUCCESS, EDIT_POST_FAILED],
        showLoader: true,
      },
    });
  } catch (error) {
    Alert.alert(`${error}`);
  }
};
