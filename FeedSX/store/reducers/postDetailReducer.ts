import {Alert} from 'react-native';
import {
  PIN_POST_ID,
  PIN_THIS_POST,
  UNPIN_POST_ID,
  UNPIN_THIS_POST,
} from '../../constants/Strings';
import {convertToLMCommentUI, convertToLMPostUI} from '../../viewDataModels';
import {
  CLEAR_COMMENT,
  CLEAR_POST,
  COMMENT_DELETE_SUCCESS,
  DELETE_COMMENT_STATE,
  LIKE_POST_STATE,
  LIKE_POST_SUCCESS,
  PIN_POST_STATE,
  PIN_POST_SUCCESS,
  POST_COMMENTS_SUCCESS,
  POST_DATA_SUCCESS,
} from '../types/types';

const initialState = {
  postDetail: {} as LMPostUI,
};

export function postDetailReducer(state = initialState, action: any) {
  switch (action.type) {
    case POST_DATA_SUCCESS: {
      const {post = {}, users = {}} = action.body;
      let updated = state.postDetail;
      let converterPostData = convertToLMPostUI(post, users);
      let newReplies = converterPostData.replies || []; // Use an empty array if replies is undefined

      newReplies = [...(updated.replies || []), ...newReplies];

      return {
        ...state,
        postDetail: {...converterPostData, replies: newReplies},
      };
    }
    case POST_COMMENTS_SUCCESS: {
      let updatedDetail = state.postDetail;
      updatedDetail?.replies &&
        updatedDetail.replies.find((item, index) => {
          if (item.id === action.body.comment.Id) {
            let commentData = convertToLMCommentUI(
              action.body.comment?.postId,
              action.body.comment.replies,
              action.body.users,
            );
            let newReplies = commentData || [];
            newReplies = [...(item.replies || []), ...newReplies];
            console.log('fgg', newReplies);
            item.replies = newReplies;
            // item.replies = [...updatedDetail.replies[index].replies, commentData];
          }
        });
      return {...state, postDetail: updatedDetail};
    }
    case CLEAR_COMMENT: {
      let updatedDetail = state.postDetail;

      updatedDetail?.replies &&
        updatedDetail.replies.find(item => {
          if (item.id === action.body) {
            item.replies = [];
          }
        });
      return {...state, postDetail: updatedDetail};
    }
    case CLEAR_POST: {
     
      return{...state, postDetail: {} as LMPostUI}
    }
    case DELETE_COMMENT_STATE: {
      let updatedFeed = state.postDetail;
      // this gets the index of the post that is deleted
      const deletedPostIndex =
        updatedFeed?.replies &&
        updatedFeed.replies.findIndex((item: any) => item?.id === action.body);
      // removes that post from the data
      if (
        updatedFeed?.replies &&
        deletedPostIndex !== undefined &&
        deletedPostIndex !== -1
      ) {
        updatedFeed?.replies.splice(deletedPostIndex, 1);
        updatedFeed.commentsCount = updatedFeed.commentsCount - 1;
        return {...state, postDetail: updatedFeed};
      } else {
        if (updatedFeed?.replies) {
          for (let i = 0; i <= updatedFeed?.replies?.length - 1; i++) {
            const deletedPostIndexChild =
              updatedFeed?.replies &&
              updatedFeed.replies[i].replies.findIndex(
                (item: any) => item?.id === action.body,
              );
            // removes that post from the data

            if (
              updatedFeed?.replies[i].replies &&
              deletedPostIndexChild !== undefined &&
              deletedPostIndexChild !== -1
            ) {
              // updatedFeed?.replies[i].replies.splice(deletedPostIndexChild, 1);
              // updatedFeed.replies[i].repliesCount =
              //   updatedFeed.replies[i].repliesCount - 1;
              updatedFeed.replies[i].replies.splice(deletedPostIndexChild, 1);

              updatedFeed.replies[i] = {
                ...updatedFeed.replies[i],
                replies: updatedFeed.replies[i].replies,
                repliesCount: updatedFeed.replies[i].repliesCount - 1,
              } as LMCommentUI;
              // return {...state, postDetail: updatedFeed};
            }
          }
        }
      }
      return {...state, postDetail: {...updatedFeed}};
    }
    case COMMENT_DELETE_SUCCESS: {
      return {...state};
    }
    case PIN_POST_SUCCESS: {
      return {...state};
    }
    case PIN_POST_STATE: {
      let updatedFeed = state.postDetail;
      if (updatedFeed != undefined) {
        // this updates the isPinned value
        updatedFeed.isPinned = !updatedFeed.isPinned;

        // this gets the index of pin/unpin from menu item
        let menuItemIndex = updatedFeed?.menuItems?.findIndex(
          (item: any) => item.id === PIN_POST_ID || item.id === UNPIN_POST_ID,
        );
        if (updatedFeed.isPinned) {
          //  this updates the menuItem title to unpin
          updatedFeed.menuItems[menuItemIndex].id = UNPIN_POST_ID;
          updatedFeed.menuItems[menuItemIndex].title = UNPIN_THIS_POST;
        } else {
          //  this updates the menuItem title to pin
          updatedFeed.menuItems[menuItemIndex].id = PIN_POST_ID;
          updatedFeed.menuItems[menuItemIndex].title = PIN_THIS_POST;
        }
      }

      return {...state, postDetail: updatedFeed};
    }
    case LIKE_POST_SUCCESS: {
      return {...state};
    }
    case LIKE_POST_STATE: {
      console.log('hj', state.postDetail.isLiked);
      let updatedFeed = state.postDetail;
      // this updates the isLiked value
      updatedFeed.isLiked = !updatedFeed.isLiked;
      if (updatedFeed.isLiked) {
        // increase the like count
        updatedFeed.likesCount = updatedFeed.likesCount + 1;
      } else {
        // decrease the like count
        updatedFeed.likesCount = updatedFeed.likesCount - 1;
      }
      return {...state, postDetail: updatedFeed};
    }
    default:
      return state;
  }
}
