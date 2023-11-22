import {
  Attachment,
  AttachmentMeta,
  GetFeedResponse,
  IMenuItem,
  IOgTag,
  IPost,
  IUser,
} from '@likeminds.community/feed-js';
import {GetPostLikesResponse} from '@likeminds.community/feed-js/dist/post/model/GetPostLikesResponse';
import Like from '@likeminds.community/feed-js/dist/post/model/Like';
import {DocumentMetaData, ImageVideoMetaData} from '../models/addPostMetaData';
import {
  DOCUMENT_ATTACHMENT_TYPE,
  IMAGE_ATTACHMENT_TYPE,
  LINK_ATTACHMENT_TYPE,
  VIDEO_ATTACHMENT_TYPE,
} from '../constants/Strings';
import {IComment} from '@likeminds.community/feed-js-beta';

/**
 * @param data: [GetFeedResponse]
 * @returns list of [LMPostUI]
 */
export function convertUniversalFeedPosts(data: GetFeedResponse): LMPostUI[] {
  const postData = data.posts;
  const userData = data.users;
  return postData?.map((item: IPost) => {
    return convertToLMPostUI(item, userData);
  });
}

/**
 * @param post: [IPost]
 * @param user: [Map] of String to User
 * @returns LMPostUI
 */
export function convertToLMPostUI(
  post: IPost,
  user: {[key: string]: LMUserUI},
): LMPostUI {
  const postData: LMPostUI = {
    id: post.Id,
    attachments: post.attachments
      ? convertToLMAttachmentsUI(post.attachments)
      : [],
    commentsCount: post.commentsCount,
    communityId: post.communityId,
    createdAt: post.createdAt,
    isEdited: post.isEdited,
    isLiked: post.isLiked,
    isPinned: post.isPinned,
    isSaved: post.isSaved,
    likesCount: post.likesCount,
    menuItems: convertToLMMenuItemsUI(post.menuItems),
    replies: post?.replies
      ? convertToLMCommentUI(post.Id, post.replies, user)
      : [],
    text: post.text,
    updatedAt: post.updatedAt,
    userId: post.userId,
    uuid: post.uuid,
    user: convertToLMUserUI(user[post.userId]),
  };
  return postData;
}

/**
 * @param data: [Attachment]
 * @returns list of [LMAttachmentUI]
 */
export function convertToLMAttachmentsUI(data: Attachment[]): LMAttachmentUI[] {
  return data?.map((item: Attachment) => {
    return {
      attachmentMeta: convertToLMAttachmentMetaUI(item.attachmentMeta),
      attachmentType: item.attachmentType,
    };
  });
}

/**
 * @param data: AttachmentMeta
 * @returns LMAttachmentMetaUI
 */
export function convertToLMAttachmentMetaUI(
  data: AttachmentMeta,
): LMAttachmentMetaUI {
  const attachmentMetaData: LMAttachmentMetaUI = {
    duration: data.duration,
    format: data.format,
    name: data.name,
    ogTags: convertToLMOgTagsUI(data.ogTags),
    pageCount: data.pageCount,
    size: data.size,
    url: data.url,
  };
  return attachmentMetaData;
}

/**
 * @param data: IOgTag
 * @returns LMOGTagsUI
 */
export function convertToLMOgTagsUI(data: IOgTag): LMOGTagsUI {
  const ogTagsData: LMOGTagsUI = {
    title: data.title,
    description: data.description,
    url: data.url,
    image: data.image,
  };
  return ogTagsData;
}

/**
 * @param data: [IMenuItem]
 * @returns [LMMenuItemsUI]
 */
export function convertToLMMenuItemsUI(data: IMenuItem[]): LMMenuItemsUI[] {
  return data?.map(item => {
    return {
      title: item.title,
      id: item.id,
    };
  });
}

/**
 * @param data: IUser
 * @returns LMUserUI
 */
export function convertToLMUserUI(data: IUser): LMUserUI {
  const userData: LMUserUI = {
    customTitle: data?.customTitle,
    id: data?.id,
    imageUrl: data?.imageUrl,
    isGuest: data?.isGuest,
    name: data?.name,
    organisationName: data?.organisationName,
    sdkClientInfo: convertToLMSDKClientInfoUI(data),
    updatedAt: data?.updatedAt,
    userUniqueId: data?.userUniqueId,
    uuid: data?.uuid,
  };
  return userData;
}

/**
 * @param data: IUser
 * @returns LMSDKClientInfoUI
 */
export function convertToLMSDKClientInfoUI(data: IUser): LMSDKClientInfoUI {
  const sdkClientInfo = data?.sdkClientInfo;
  const sdkClientInfoConverter: LMSDKClientInfoUI = {
    community: sdkClientInfo?.community,
    user: sdkClientInfo?.user,
    uuid: sdkClientInfo?.uuid,
    userUniqueId: sdkClientInfo?.userUniqueId,
  };
  return sdkClientInfoConverter;
}

/**
 * @param data: [GetPostLikesResponse]
 * @returns list of [LMLikeUI]
 */
export function convertToLMLikesList(data: GetPostLikesResponse): LMLikeUI[] {
  const likesListData = data?.likes;
  const userData = data?.users;
  return likesListData?.map((item: Like) => {
    return convertToLMLikeUI(item, userData);
  });
}

/**
 * @param likes: [Like]
 * @param users: [Map] of String to User
 * @returns LMLikeUI
 */
export function convertToLMLikeUI(
  likes: Like,
  users: {[key: string]: LMUserUI},
): LMLikeUI {
  const likesData: LMLikeUI = {
    id: likes?.id,
    createdAt: likes?.createdAt,
    updatedAt: likes?.updatedAt,
    userId: likes?.userId,
    uuid: likes?.uuid,
    user: convertToLMUserUI(users[likes?.userId]),
  };
  return likesData;
}

/**
 * @param data: [ImageVideoMetaData]
 * @returns list of [LMAttachmentUI]
 */
export function convertImageVideoMetaData(
  data: ImageVideoMetaData[],
): LMAttachmentUI[] {
  const convertedImageVideoMetaData = data?.map(item => {
    return {
      attachmentMeta: {
        entityId: '',
        format: item?.type,
        name: item?.fileName,
        ogTags: {
          description: '',
          title: '',
          url: '',
          image: '',
        },
        size: item?.fileSize,
        duration: Math.round(item?.duration ? item.duration : 0),
        pageCount: 0,
        url: item?.uri,
      },
      attachmentType: item?.duration
        ? VIDEO_ATTACHMENT_TYPE
        : IMAGE_ATTACHMENT_TYPE, // You need to specify the attachment type.
    };
  });
  return convertedImageVideoMetaData;
}

/**
 * @param data: [DocumentMetaData]
 * @returns list of [LMAttachmentUI]
 */
export function convertDocumentMetaData(
  data: DocumentMetaData[],
): LMAttachmentUI[] {
  const convertedDocumentMetaData = data?.map(item => {
    return {
      attachmentMeta: {
        entityId: '',
        format: item?.type,
        name: item?.name,
        ogTags: {
          description: '',
          title: '',
          url: '',
          image: '',
        },
        size: item?.size,
        duration: 0,
        pageCount: 0,
        url: item?.uri,
      },
      attachmentType: DOCUMENT_ATTACHMENT_TYPE, // You need to specify the attachment type.
    };
  });
  return convertedDocumentMetaData;
}

/**
 * @param data: [LMOGTagsUI]
 * @returns list of [LMAttachmentUI]
 */
export function convertLinkMetaData(data: LMOGTagsUI[]): LMAttachmentUI[] {
  const convertedLinkMetaData = data?.map(item => {
    return {
      attachmentMeta: {
        entityId: '',
        format: '',
        name: '',
        ogTags: {
          description: item?.description,
          title: item?.title,
          url: item?.url,
          image: item?.image,
        },
        size: 0,
        duration: 0,
        pageCount: 0,
        url: '',
      },
      attachmentType: LINK_ATTACHMENT_TYPE, // You need to specify the attachment type.
    };
  });
  return convertedLinkMetaData;
}

/**
 * @param postId: string
 * @param data: [IComment]
 * @param user: [Map] of String to User
 * @returns list of [LMCommentUI]
 */
export function convertToLMCommentUI(
  postId: string,
  data: IComment[],
  user: {[key: string]: LMUserUI},
): LMCommentUI[] {
  return data?.map((item: IComment) => {
    return {
      id: item.Id,
      postId: postId,
      repliesCount: item.commentsCount,
      level: item.level,
      createdAt: item.createdAt,
      isEdited: item.isEdited,
      isLiked: item.isLiked,
      likesCount: item.likesCount,
      menuItems: convertToLMMenuItemsUI(item.menuItems),
      text: item.text,
      replies: item?.replies ? item.replies : [],
      updatedAt: item.updatedAt,
      userId: item.userId,
      uuid: item.uuid,
      user: convertToLMUserUI(user[item.userId]),
    };
  });
}
