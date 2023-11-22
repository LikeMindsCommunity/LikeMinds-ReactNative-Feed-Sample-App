import { convertToLMLikesList } from '../../viewDataModels';
import {COMMENT_LIKES_SUCCESS, POST_LIKES_CLEAR, POST_LIKES_SUCCESS} from '../types/types';

const initialState = {
  postLike: [] as any,
  totalLikes: 0,
  user: {},
};

export function postLikesReducer(state = initialState, action: any) {
  switch (action.type) {
    case POST_LIKES_SUCCESS: {
      const {likes = {}, totalCount, users = {}} = action.body;
      let postLikesData = convertToLMLikesList(action?.body)
      return {...state, postLike: postLikesData, totalLikes: totalCount, user: users};
    }
    case POST_LIKES_CLEAR: {
      return {...state, postLike: []};
    }
    case COMMENT_LIKES_SUCCESS: {
      const {likes = {}, totalCount, users = {}} = action.body;
      let postLikesData = convertToLMLikesList(action?.body)
      return {...state, postLike: postLikesData, totalLikes: totalCount, user: users};
    }
    default:
      return state;
  }
}
