import {Dispatch} from '@reduxjs/toolkit';
import {Alert} from 'react-native';
import {
  POST_DATA,
  POST_DATA_SUCCESS,
  POST_DATA_FAILED,
  POST_COMMENTS_SUCCESS,
  POST_COMMENTS_FAILED,
  POST_COMMENTS,
  LIKE_COMMENT,
  LIKE_COMMENT_SUCCESS,
  LIKE_COMMENT_FAILED,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT,
  CREATE_COMMENT_FAILED,
  COMMENT_DELETE_SUCCESS,
  COMMENT_DELETE_FAILED,
  COMMENT_DELETE,
  DELETE_COMMENT_STATE,
  CLEAR_COMMENT,
  CLEAR_POST,
  CREATE_COMMENT_STATE,
  CREATE_REPLY_SUCCESS,
  CREATE_REPLY,
  CREATE_REPLY_FAILED,
  CREATE_REPLY_STATE,
  EDIT_COMMENT_SUCCESS,
  EDIT_COMMENT_FAILED,
  EDIT_COMMENT,
  EDIT_COMMENT_STATE,
  POST_DATA_REFRESH_SUCCESS,
  POST_DATA_REFRESH,
  POST_DATA_REFRESH_FAILED,
} from '../types/types';
import {CALL_API} from '../apiMiddleware';
import {lmFeedClient} from '../../..';

// get post api action
export const getPost = (payload?: any) => async (dispatch: Dispatch) => {
  try {
    return await dispatch({
      type: POST_DATA_SUCCESS,
      [CALL_API]: {
        func: lmFeedClient?.getPost(payload),
        body: payload,
        types: [POST_DATA, POST_DATA_SUCCESS, POST_DATA_FAILED],
        showLoader: true,
      },
    });
  } catch (error) {
    Alert.alert(`${error}`);
  }
};

// get comments api action
export const getComments = (payload?: any) => async (dispatch: Dispatch) => {
  try {
    return await dispatch({
      type: POST_COMMENTS_SUCCESS,
      [CALL_API]: {
        func: lmFeedClient?.getComments(
          payload.postId,
          payload,
          payload.commentId,
          payload.page,
        ),
        body: payload,
        types: [POST_COMMENTS, POST_COMMENTS_SUCCESS, POST_COMMENTS_FAILED],
        showLoader: true,
      },
    });
  } catch (error) {
    Alert.alert(`${error}`);
  }
};
// clear comments data action
export const clearComments = (payload?: any) => async (dispatch: Dispatch) => {
  try {
    return await dispatch({
      type: CLEAR_COMMENT,
      body: payload,
    });
  } catch (error) {
    Alert.alert(`${error}`);
  }
};

// clear post detail data action
export const clearPostDetail = () => async (dispatch: Dispatch) => {
  try {
    return await dispatch({
      type: CLEAR_POST,
    });
  } catch (error) {
    Alert.alert(`${error}`);
  }
};

// like comment api action
export const likeComment = (payload?: any) => async (dispatch: Dispatch) => {
  try {
    return await dispatch({
      type: LIKE_COMMENT_SUCCESS,
      [CALL_API]: {
        func: lmFeedClient?.likeComment(payload),
        body: payload,
        types: [LIKE_COMMENT, LIKE_COMMENT_SUCCESS, LIKE_COMMENT_FAILED],
        showLoader: true,
      },
    });
  } catch (error) {
    Alert.alert(`${error}`);
  }
};

// add comment api action
export const addComment = (payload?: any) => async (dispatch: Dispatch) => {
  try {
    return await dispatch({
      type: CREATE_COMMENT_SUCCESS,
      [CALL_API]: {
        func: lmFeedClient?.addComment(payload),
        body: payload,
        types: [CREATE_COMMENT, CREATE_COMMENT_SUCCESS, CREATE_COMMENT_FAILED],
        showLoader: true,
      },
    });
  } catch (error) {
    Alert.alert(`${error}`);
  }
};

// add comment state handler action
export const addCommentStateHandler =
  (payload?: any) => async (dispatch: Dispatch) => {
    try {
      return await dispatch({
        type: CREATE_COMMENT_STATE,
        body: payload,
      });
    } catch (error) {
      Alert.alert(`${error}`);
    }
  };

// add reply api action
export const replyComment = (payload?: any) => async (dispatch: Dispatch) => {
  try {
    return await dispatch({
      type: CREATE_REPLY_SUCCESS,
      [CALL_API]: {
        func: lmFeedClient?.replyComment(payload),
        body: payload,
        types: [CREATE_REPLY, CREATE_REPLY_SUCCESS, CREATE_REPLY_FAILED],
        showLoader: true,
      },
    });
  } catch (error) {
    Alert.alert(`${error}`);
  }
};

// add reply state handler action
export const replyCommentStateHandler =
  (payload?: any) => async (dispatch: Dispatch) => {
    try {
      return await dispatch({
        type: CREATE_REPLY_STATE,
        body: payload,
      });
    } catch (error) {
      Alert.alert(`${error}`);
    }
  };

// delete comment api action
export const deleteComment = (payload?: any) => async (dispatch: Dispatch) => {
  try {
    return await dispatch({
      type: COMMENT_DELETE_SUCCESS,
      [CALL_API]: {
        func: lmFeedClient?.deleteComment(payload),
        body: payload,
        types: [COMMENT_DELETE, COMMENT_DELETE_SUCCESS, COMMENT_DELETE_FAILED],
        showLoader: true,
      },
    });
  } catch (error) {
    Alert.alert(`${error}`);
  }
};

// delete post state handler action
export const deleteCommentStateHandler =
  (payload?: any) => async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: DELETE_COMMENT_STATE,
        body: payload,
      });
      return;
    } catch (error) {
      Alert.alert(`${error}`);
    }
  };

// edit comment api action
export const editComment = (payload?: any) => async (dispatch: Dispatch) => {
  try {
    return await dispatch({
      type: EDIT_COMMENT_SUCCESS,
      [CALL_API]: {
        func: lmFeedClient.editComment(payload),
        body: payload,
        types: [EDIT_COMMENT, EDIT_COMMENT_SUCCESS, EDIT_COMMENT_FAILED],
        showLoader: true,
      },
    });
  } catch (error) {
    Alert.alert(`${error}`);
  }
};

// delete post state handler action
export const editCommentStateHandler =
  (payload?: any) => async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: EDIT_COMMENT_STATE,
        body: payload,
      });
      return;
    } catch (error) {
      Alert.alert(`${error}`);
    }
  };
// refresh post detail API action
export const refreshPostDetail =
  (payload?: any) => async (dispatch: Dispatch) => {
    try {
      return await dispatch({
        type: POST_DATA_REFRESH_SUCCESS,
        [CALL_API]: {
          func: lmFeedClient?.getPost(payload),
          body: payload,
          types: [
            POST_DATA_REFRESH,
            POST_DATA_REFRESH_SUCCESS,
            POST_DATA_REFRESH_FAILED,
          ],
          showLoader: true,
        },
      });
    } catch (error) {
      Alert.alert(`${error}`);
    }
  };
