import {DECODE_URL_SUCCESS, UPLOAD_ATTACHMENTS} from '../types/types';

const initialState = {
  ogTags: {},
  mediaAttachmemnts: [],
  linkAttachments: [],
  postContent: '',
};

export function createPostReducer(state = initialState, action: any) {
  switch (action.type) {
    case DECODE_URL_SUCCESS: {
      const {og_tags = {}} = action.body;
      return {...state, ogTags: og_tags};
    }
    case UPLOAD_ATTACHMENTS: {
      const {
        mediaAttachmentData = [],
        linkAttachmentData = [],
        postContentData = '',
      } = action.body;
      return {
        ...state,
        mediaAttachmemnts: mediaAttachmentData,
        linkAttachments: linkAttachmentData,
        postContent: postContentData,
      };
    }
    default:
      return state;
  }
}
