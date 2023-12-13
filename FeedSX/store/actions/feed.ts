import {Dispatch} from '@reduxjs/toolkit';
import {Alert} from 'react-native';
import {CALL_API} from '../apiMiddleware';
import {
  UNIVERSAL_FEED_DATA,
  UNIVERSAL_FEED_FAILED,
  UNIVERSAL_FEED_SUCCESS,
  INITIATE_API,
  INITIATE_API_FAILED,
  INITIATE_API_SUCCESS,
  MEMBER_STATE_DATA,
  MEMBER_STATE_FAILED,
  MEMBER_STATE_SUCCESS,
  REPORT_TAGS_SUCCESS,
  REPORT_TAGS_FAILED,
  REPORT_TAGS_DATA,
  POST_REPORT_SUCCESS,
  POST_REPORT_FAILED,
  POST_REPORT,
  POST_DELETE_SUCCESS,
  POST_DELETE_FAILED,
  POST_DELETE,
  LIKE_POST_SUCCESS,
  LIKE_POST,
  LIKE_POST_FAILED,
  LIKE_POST_STATE,
  SAVE_POST_SUCCESS,
  SAVE_POST,
  SAVE_POST_FAILED,
  SAVE_POST_STATE,
  PIN_POST_SUCCESS,
  PIN_POST,
  PIN_POST_FAILED,
  PIN_POST_STATE,
  DELETE_POST_STATE,
  AUTO_PLAY_POST_VIDEO,
  CLEAR_FEED,
  UNIVERSAL_FEED_REFRESH_SUCCESS,
} from '../types/types';
import {lmFeedClient} from '../../..';
import {InitiateUserRequest} from '@likeminds.community/feed-js';

// initiateUser API action
export const initiateUser = (payload?: any) => async (dispatch: Dispatch) => {
  const {userUniqueId, userName, isGuest} = payload;
  try {
    const initiateUserRequest = InitiateUserRequest.builder()
      .setUUID(userUniqueId)
      .setIsGuest(isGuest)
      .setUserName(userName)
      .build();
    return await dispatch({
      type: INITIATE_API_SUCCESS,
      [CALL_API]: {
        func: lmFeedClient?.initiateUser(initiateUserRequest),
        body: initiateUserRequest,
        types: [INITIATE_API, INITIATE_API_SUCCESS, INITIATE_API_FAILED],
        showLoader: true,
      },
    });
  } catch (error) {
    Alert.alert(`${error}`);
  }
};

// get memberState API action
export const getMemberState = (payload?: any) => async (dispatch: Dispatch) => {
  try {
    return await dispatch({
      type: MEMBER_STATE_SUCCESS,
      [CALL_API]: {
        func: lmFeedClient?.getMemberState(),
        body: payload,
        types: [MEMBER_STATE_DATA, MEMBER_STATE_SUCCESS, MEMBER_STATE_FAILED],
        showLoader: true,
      },
    });
  } catch (error) {
    Alert.alert(`${error}`);
  }
};

// get universal feed API action
export const getFeed = (payload?: any) => async (dispatch: Dispatch) => {
  try {
    return await dispatch({
      type: UNIVERSAL_FEED_SUCCESS,
      [CALL_API]: {
        func: lmFeedClient?.getFeed(payload),
        body: payload,
        types: [
          UNIVERSAL_FEED_DATA,
          UNIVERSAL_FEED_SUCCESS,
          UNIVERSAL_FEED_FAILED,
        ],
        showLoader: true,
      },
    });
  } catch (error) {
    Alert.alert(`${error}`);
  }
};

// refresh feed API action
export const refreshFeed = (payload?: any) => async (dispatch: Dispatch) => {
  try {
    return await dispatch({
      type: UNIVERSAL_FEED_REFRESH_SUCCESS,
      [CALL_API]: {
        func: lmFeedClient?.getFeed(payload),
        body: payload,
        types: [
          UNIVERSAL_FEED_DATA,
          UNIVERSAL_FEED_REFRESH_SUCCESS,
          UNIVERSAL_FEED_FAILED,
        ],
        showLoader: true,
      },
    });
  } catch (error) {
    Alert.alert(`${error}`);
  }
};

// clear feed data action
export const clearFeed = () => async (dispatch: Dispatch) => {
  try {
    return await dispatch({
      type: CLEAR_FEED,
      body: [],
    });
  } catch (error) {
    Alert.alert(`${error}`);
  }
};

// like post API action
export const likePost = (payload?: any) => async (dispatch: Dispatch) => {
  try {
    return await dispatch({
      type: LIKE_POST_SUCCESS,
      [CALL_API]: {
        func: lmFeedClient?.likePost(payload),
        body: payload,
        types: [LIKE_POST, LIKE_POST_SUCCESS, LIKE_POST_FAILED],
        showLoader: true,
      },
    });
  } catch (error) {
    Alert.alert(`${error}`);
  }
};

// like post state managing action
export const likePostStateHandler =
  (payload?: any) => async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: LIKE_POST_STATE,
        body: payload,
      });
      return;
    } catch (error) {
      Alert.alert(`${error}`);
    }
  };

// save post API action
export const savePost = (payload?: any) => async (dispatch: Dispatch) => {
  try {
    return await dispatch({
      type: SAVE_POST_SUCCESS,
      [CALL_API]: {
        func: lmFeedClient?.savePost(payload),
        body: payload,
        types: [SAVE_POST, SAVE_POST_SUCCESS, SAVE_POST_FAILED],
        showLoader: true,
      },
    });
  } catch (error) {
    Alert.alert(`${error}`);
  }
};

// save post state managing action
export const savePostStateHandler =
  (payload?: any) => async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: SAVE_POST_STATE,
        body: payload,
      });
      return;
    } catch (error) {
      Alert.alert(`${error}`);
    }
  };

// get report tags API action
export const getReportTags = (payload?: any) => async (dispatch: Dispatch) => {
  try {
    return await dispatch({
      type: REPORT_TAGS_SUCCESS,
      [CALL_API]: {
        func: lmFeedClient?.getReportTags(payload),
        body: payload,
        types: [REPORT_TAGS_DATA, REPORT_TAGS_SUCCESS, REPORT_TAGS_FAILED],
        showLoader: true,
      },
    });
  } catch (error) {
    Alert.alert(`${error}`);
  }
};

// report post API action
export const postReport = (payload?: any) => async (dispatch: Dispatch) => {
  try {
    return await dispatch({
      type: POST_REPORT_SUCCESS,
      [CALL_API]: {
        func: lmFeedClient?.postReport(payload),
        body: payload,
        types: [POST_REPORT, POST_REPORT_SUCCESS, POST_REPORT_FAILED],
        showLoader: true,
      },
    });
  } catch (error) {
    Alert.alert(`${error}`);
  }
};

// delete post API action
export const deletePost = (payload?: any) => async (dispatch: Dispatch) => {
  try {
    return await dispatch({
      type: POST_DELETE_SUCCESS,
      [CALL_API]: {
        func: lmFeedClient?.deletePost(payload),
        body: payload,
        types: [POST_DELETE, POST_DELETE_SUCCESS, POST_DELETE_FAILED],
        showLoader: true,
      },
    });
  } catch (error) {
    Alert.alert(`${error}`);
  }
};

// delete post state managing action
export const deletePostStateHandler =
  (payload?: any) => async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: DELETE_POST_STATE,
        body: payload,
      });
      return;
    } catch (error) {
      Alert.alert(`${error}`);
    }
  };

// pin post API action
export const pinPost = (payload?: any) => async (dispatch: Dispatch) => {
  try {
    return await dispatch({
      type: PIN_POST_SUCCESS,
      [CALL_API]: {
        func: lmFeedClient?.pinPost(payload),
        body: payload,
        types: [PIN_POST, PIN_POST_SUCCESS, PIN_POST_FAILED],
        showLoader: true,
      },
    });
  } catch (error) {
    Alert.alert(`${error}`);
  }
};

// pin post state managing action
export const pinPostStateHandler =
  (payload?: any) => async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: PIN_POST_STATE,
        body: payload,
      });
      return;
    } catch (error) {
      Alert.alert(`${error}`);
    }
  };

// video auto play/pause handler action
export const autoPlayPostVideo =
  (payload?: any) => async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: AUTO_PLAY_POST_VIDEO,
        body: payload,
      });
      return;
    } catch (error) {
      Alert.alert(`${error}`);
    }
  };
