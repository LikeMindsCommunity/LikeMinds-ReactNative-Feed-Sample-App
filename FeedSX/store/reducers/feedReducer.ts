import {
  PIN_POST_ID,
  PIN_THIS_POST,
  UNPIN_POST_ID,
  UNPIN_THIS_POST,
} from '../../constants/Strings';
import {convertUniversalFeedPosts} from '../../viewDataModels';
import {
  UNIVERSAL_FEED_SUCCESS,
  INITIATE_API_SUCCESS,
  MEMBER_STATE_SUCCESS,
  REPORT_TAGS_SUCCESS,
  POST_REPORT_SUCCESS,
  SAVE_POST_STATE,
  POST_DELETE_SUCCESS,
  LIKE_POST_SUCCESS,
  LIKE_POST_STATE,
  SAVE_POST_SUCCESS,
  PIN_POST_SUCCESS,
  PIN_POST_STATE,
  DELETE_POST_STATE,
  AUTO_PLAY_POST_VIDEO,
  CLEAR_FEED,
  CREATE_COMMENT_SUCCESS,
  DELETE_COMMENT_STATE,
} from '../types/types';

const initialState = {
  // todo: remove any and define its type
  community: {},
  users: {} as any,
  memberRights: [],
  member: {},
  feed: [] as any,
  reportTags: [],
  autoPlayVideoPostId: '',
};

export function feedReducer(state = initialState, action: any) {
  switch (action.type) {
    case INITIATE_API_SUCCESS: {
      const {community = {}} = action.body;
      return {...state, community: community};
    }
    case MEMBER_STATE_SUCCESS: {
      const {member = {}, memberRights = []} = action.body;
      return {...state, member: member, memberRights: memberRights, feed: []};
    }
    case UNIVERSAL_FEED_SUCCESS: {
      const {users = {}} = action.body;
      // model converter function
      let post = convertUniversalFeedPosts(action.body);
      // this handles pagination and appends new post data with previous data
      let feedData = state.feed;
      feedData = [...feedData, ...post];
      // this appends the new users data with previous data
      let usersData = state.users;
      usersData = {...usersData, ...users};
      return {...state, feed: feedData, users: usersData};
    }
    case LIKE_POST_SUCCESS: {
      return {...state};
    }
    case LIKE_POST_STATE: {
      let updatedFeed = state.feed;
      // this gets the index of post that is liked
      const likedPostIndex = updatedFeed.findIndex(
        (item: any) => item?.id === action.body,
      );
      // this updates the isLiked value
      updatedFeed[likedPostIndex]['isLiked'] =
        !updatedFeed[likedPostIndex]['isLiked'];
      if (updatedFeed[likedPostIndex]['isLiked']) {
        // increase the like count
        updatedFeed[likedPostIndex]['likesCount'] =
          updatedFeed[likedPostIndex]['likesCount'] + 1;
      } else {
        // decrease the like count
        updatedFeed[likedPostIndex]['likesCount'] =
          updatedFeed[likedPostIndex]['likesCount'] - 1;
      }
      return {...state, feed: updatedFeed};
    }
    case SAVE_POST_SUCCESS: {
      return {...state};
    }
    case SAVE_POST_STATE: {
      let updatedFeed = state.feed;
      // this gets the index of post that is saved
      const savedPostIndex = updatedFeed.findIndex(
        (item: any) => item?.id === action.body,
      );
      // this updates the isSaved value
      updatedFeed[savedPostIndex]['isSaved'] =
        !updatedFeed[savedPostIndex]['isSaved'];

      return {...state, feed: updatedFeed};
    }
    case PIN_POST_SUCCESS: {
      return {...state};
    }
    case PIN_POST_STATE: {
      let updatedFeed = state.feed;
      // this gets the index of post that is pinned
      const pinnedPostIndex = updatedFeed.findIndex(
        (item: any) => item?.id === action.body,
      );
      // this updates the isPinned value
      updatedFeed[pinnedPostIndex]['isPinned'] =
        !updatedFeed[pinnedPostIndex]['isPinned'];
      // this gets the index of pin/unpin from menu item
      let menuItemIndex = updatedFeed[pinnedPostIndex]['menuItems'].findIndex(
        (item: any) => item.id === PIN_POST_ID || item.id === UNPIN_POST_ID,
      );
      if (updatedFeed[pinnedPostIndex]['isPinned']) {
        //  this updates the menuItem title to unpin
        updatedFeed[pinnedPostIndex]['menuItems'][menuItemIndex].id =
          UNPIN_POST_ID;
        updatedFeed[pinnedPostIndex]['menuItems'][menuItemIndex].title =
          UNPIN_THIS_POST;
      } else {
        //  this updates the menuItem title to pin
        updatedFeed[pinnedPostIndex]['menuItems'][menuItemIndex].id =
          PIN_POST_ID;
        updatedFeed[pinnedPostIndex]['menuItems'][menuItemIndex].title =
          PIN_THIS_POST;
      }

      return {...state, feed: updatedFeed};
    }
    case REPORT_TAGS_SUCCESS: {
      const {reportTags = {}} = action.body;
      return {...state, reportTags: reportTags};
    }
    case POST_REPORT_SUCCESS: {
      return {...state};
    }
    case POST_DELETE_SUCCESS: {
      return {...state};
    }
    case DELETE_POST_STATE: {
      let updatedFeed = state.feed;
      // this gets the index of the post that is deleted
      const deletedPostIndex = updatedFeed.findIndex(
        (item: any) => item?.id === action.body,
      );
      // removes that post from the data
      updatedFeed.splice(deletedPostIndex, 1);
      return {...state, feed: updatedFeed};
    }
    case AUTO_PLAY_POST_VIDEO: {
      return {...state, autoPlayVideoPostId: action.body};
    }
    case CLEAR_FEED: {
      return {...state, feed: []};
    }
    case CREATE_COMMENT_SUCCESS: {
      const {comment} = action.body;
      let updatedFeed = state.feed;
      // finds the post in which new comment is added in post detail and manage its comment count
      updatedFeed.find((item: LMPostUI) => {
        if (item.id == comment.postId) {
          item.commentsCount = item?.commentsCount + 1;
        }
      });
      return {...state};
    }
    case DELETE_COMMENT_STATE: {
      let updatedFeed = state.feed;
      // finds the post whose comment is deleted in post detail and manage its comment count
      updatedFeed.find((item: LMPostUI) => {
        if (item.id == action.body.postId) {
          item.commentsCount = item?.commentsCount - 1;
        }
      });
      return {...state};
    }
    default:
      return state;
  }
}
