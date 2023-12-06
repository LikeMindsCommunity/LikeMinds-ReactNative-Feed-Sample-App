// post attachment types
export const IMAGE_ATTACHMENT_TYPE = 1;
export const VIDEO_ATTACHMENT_TYPE = 2;
export const DOCUMENT_ATTACHMENT_TYPE = 3;
export const LINK_ATTACHMENT_TYPE = 4;

// post menu items id
export const DELETE_POST_MENU_ITEM = 1;
export const PIN_POST_MENU_ITEM = 2;
export const UNPIN_POST_MENU_ITEM = 3;
export const REPORT_POST_MENU_ITEM = 4;
export const EDIT_POST_MENU_ITEM = 5;
export const DELETE_COMMENT_MENU_ITEM = 6;
export const REPORT_COMMENT_MENU_ITEM = 7;
export const EDIT_COMMENT_MENU_ITEM = 8;

// report entity types
export const POST_REPORT_ENTITY_TYPE = 5;
export const COMMENT_REPORT_ENTITY_TYPE = 6;
export const REPLY_REPORT_ENTITY_TYPE = 7;

// post/comment/reply type
export const POST_TYPE = 'post';
export const COMMENT_TYPE = 'comment';
export const REPLY_TYPE = 'reply';

// toast messages
export const REPORTED_SUCCESSFULLY = 'Post Reported!';
export const COMMENT_REPORTED_SUCCESSFULLY = 'Comment Reported!';
export const SOMETHING_WENT_WRONG = 'Something Went Wrong';
export const REASON_FOR_DELETION_PLACEHOLDER =
  'Enter the reason for reporting this post';

// pin option in menu items
export const PIN_THIS_POST = 'Pin this Post';
export const UNPIN_THIS_POST = 'Unpin this Post';
export const PIN_POST_ID = 2;
export const UNPIN_POST_ID = 3;

// fetch tags type
export const DELETE_TAGS_TYPE = 0;
export const REPORT_TAGS_TYPE = 3;

// delete and report modal's text message
export const CONFIRM_DELETE = (type: string) =>
  `Are you sure you want to delete this ${type}. This action cannot be reversed.`;
export const REPORT_INSTRUSTION = (type: string) =>
  `You would be able to report this ${type} after selecting a problem`;
export const REPORT_PROBLEM = 'Please specify the problem to continue';
export const DELETION_REASON = 'Reason for deletion';

// app name
export const APP_TITLE = 'LikeMinds Sample App';

// uploading post processing text
export const POST_UPLOADING = 'Posting';

// selection types of media
export const SELECT_IMAGE = 'photo';
export const SELECT_BOTH = 'mixed';
export const SELECT_VIDEO = 'video';

// create post screen's text
export const ADD_FILES = 'Attach Files';
export const ADD_IMAGES = 'Add Photo';
export const ADD_VIDEOS = 'Add Video';
export const CREATE_POST_PLACEHOLDER_TEXT = 'Write something here...';
export const ADD_MORE_MEDIA = 'Add More';
export const ADD_POST_TEXT = 'POST';
export const SAVE_POST_TEXT = 'SAVE';

// android storage permession's text
export const STORAGE_PERMISSION = 'Storage Permission';
export const STORAGE_PERMISSION_MESSAGE =
  'App needs permission to access your storage';
export const STORAGE_PERMISSION_ALERT_HEADING = 'Storage Permission Required';
export const STORAGE_PERMISSION_ALERT_DESCRIPTION =
  'App needs access to your storage to read files. Please go to app settings and grant permission.';

// toast messages
export const POST_DELETE = 'Post Deleted!';
export const COMMENT_DELETE = 'Comment Deleted!';
export const REPORT_REASON_VALIDATION = 'Please enter a reason';
export const POST_UPLOADED = 'Your post was shared';
export const POST_PIN_SUCCESS = 'Post pinned to top!';
export const POST_UNPIN_SUCCESS = 'Post unpinned!';
export const POST_UPLOAD_INPROGRESS = 'A post is already uploading!';
export const CREATE_POST_PERMISSION =
  'You do not have permission to create a post.';
export const FILE_UPLOAD_SIZE_VALIDATION =
  'Files below 100 KB and above 100MB are not allowed';
export const MEDIA_UPLOAD_COUNT_VALIDATION = 'You can select upto 10 items!';
export const POST_SAVED_SUCCESS = 'Post saved!';
export const POST_UNSAVED_SUCCESS = 'Post unsaved!';

export const POST_LIKES = 'Post likes';
export const COMMENT_LIKES = 'Comment likes';

// file size validation
export const MAX_FILE_SIZE = 104857600; // 100MB in bytes
export const MIN_FILE_SIZE = 100000; // 100KB in bytes

export const NAVIGATED_FROM_POST = 'FROM_POST';
export const NAVIGATED_FROM_COMMENT = 'FROM_COMMENTS';
