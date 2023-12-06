import {
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  LMCommentItem,
  LMCommentUI,
  LMHeader,
  LMInputText,
  LMPost,
  LMProfilePicture,
  LMUserUI,
} from '../../../LikeMinds-ReactNative-Feed-UI';
import {useDispatch} from 'react-redux';
import {
  addComment,
  addCommentStateHandler,
  clearComments,
  editComment,
  editCommentStateHandler,
  getComments,
  getPost,
  getTaggingList,
  likeComment,
  refreshPostDetail,
  replyComment,
  replyCommentStateHandler,
} from '../../store/actions/postDetail';
import {
  AddCommentRequest,
  EditCommentRequest,
  GetCommentRequest,
  GetPostRequest,
  GetTaggingListRequest,
  LikeCommentRequest,
  LikePostRequest,
  PinPostRequest,
  ReplyCommentRequest,
  SavePostRequest,
} from '@likeminds.community/feed-js-beta';
import {useAppSelector} from '../../store/store';
import {NavigationService} from '../../navigation';
import {
  CREATE_POST,
  LIKES_LIST,
  UNIVERSAL_FEED,
} from '../../constants/screenNames';
import {postLikesClear} from '../../store/actions/postLikes';
import {
  likePost,
  likePostStateHandler,
  pinPost,
  pinPostStateHandler,
  savePost,
  savePostStateHandler,
} from '../../store/actions/feed';
import {showToastMessage} from '../../store/actions/toast';
import {
  COMMENT_LIKES,
  COMMENT_TYPE,
  DELETE_COMMENT_MENU_ITEM,
  DELETE_POST_MENU_ITEM,
  EDIT_POST_MENU_ITEM,
  EDIT_COMMENT_MENU_ITEM,
  NAVIGATED_FROM_COMMENT,
  PIN_POST_MENU_ITEM,
  POST_LIKES,
  POST_PIN_SUCCESS,
  POST_SAVED_SUCCESS,
  POST_TYPE,
  POST_UNPIN_SUCCESS,
  POST_UNSAVED_SUCCESS,
  REPORT_COMMENT_MENU_ITEM,
  REPORT_POST_MENU_ITEM,
  UNPIN_POST_MENU_ITEM,
} from '../../constants/Strings';
import {DeleteModal, ReportModal} from '../../customModals';
import LMLoader from '../../../LikeMinds-ReactNative-Feed-UI/src/base/LMLoader';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {styles} from './styles';
import Layout from '../../constants/Layout';
import {FlashList} from '@shopify/flash-list';
import {
  detectMentions,
  extractPathfromRouteQuery,
  mentionToRouteConverter,
  replaceLastMention,
  replaceMentionValues,
  routeToMentionConverter,
} from '../../utils';
import {convertToMentionValues} from '../../../LikeMinds-ReactNative-Feed-UI/src/base/LMInputText/utils';

interface IProps {
  navigation: object;
  route: {
    key: string;
    name: string;
    params: Array<string>;
    path: undefined;
  };
}

const PostDetail = (props: IProps) => {
  const dispatch = useDispatch();
  const modalPosition = {x: 0, y: 0};
  const [showActionListModal, setShowActionListModal] = useState(false);
  const [selectedMenuItemPostId, setSelectedMenuItemPostId] = useState('');
  const [commentToAdd, setCommentToAdd] = useState('');
  const [selectedMenuItemCommentId, setSelectedMenuItemCommentId] =
    useState('');
  const [showDeleteModal, setDeleteModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const {postDetail} = useAppSelector(state => state.postDetail);
  const [commentPageNumber, setCommentPageNumber] = useState(1);
  const modalPositionComment = {
    x: 0,
    y: 0,
  };
  const loggedInUser = useAppSelector(state => state.feed.member);
  const [showCommentActionListModal, setShowCommentActionListModal] =
    useState(false);
  const [replyOnComment, setReplyOnComment] = useState({
    textInputFocus: false,
    commentId: '',
  });
  const [replyToUsername, setReplyToUsername] = useState('');
  const [localModalVisibility, setLocalModalVisibility] =
    useState(showDeleteModal);
  const [keyboardIsVisible, setKeyboardIsVisible] = useState(false);
  const [editCommentFocus, setEditCommentFocus] = useState(false);
  const myRef = useRef<TextInput>(null);
  const [taggedUserName, setTaggedUserName] = useState('');
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );
  const [page, setPage] = useState(1);
  const [userTaggingListHeight, setUserTaggingListHeight] =
    useState<number>(116);
  const [allTags, setAllTags] = useState<Array<LMUserUI>>([]);
  const [isUserTagging, setIsUserTagging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [localRefresh, setLocalRefresh] = useState(false);

  // this function is executed on pull to refresh
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setLocalRefresh(true);
    // calling getPost API
    await dispatch(
      refreshPostDetail(
        GetPostRequest.builder()
          .setpostId(props.route.params[0])
          .setpage(1)
          .setpageSize(10)
          .build(),
      ) as any,
    );
    setLocalRefresh(false);
    setRefreshing(false);
  }, [dispatch, props.route.params]);

  // this function closes the post action list modal
  const closePostActionListModal = () => {
    setShowActionListModal(false);
  };

  // this function closes the comment action list modal
  const closeCommentActionListModal = () => {
    setShowCommentActionListModal(false);
  };

  // this functions hanldes the post like functionality
  async function postLikeHandler(id: string) {
    const payload = {
      postId: id,
    };
    dispatch(likePostStateHandler(payload.postId) as any);
    // calling like post api
    const postLikeResponse = await dispatch(
      likePost(
        LikePostRequest.builder().setpostId(payload.postId).build(),
      ) as any,
    );
    return postLikeResponse;
  }

  // this functions hanldes the post save functionality
  async function savePostHandler(id: string, saved?: boolean) {
    const payload = {
      postId: id,
    };
    dispatch(savePostStateHandler(payload.postId) as any);
    // calling the save post api
    const savePostResponse = await dispatch(
      savePost(
        SavePostRequest.builder().setpostId(payload.postId).build(),
      ) as any,
    );
    await dispatch(
      showToastMessage({
        isToast: true,
        message: saved ? POST_UNSAVED_SUCCESS : POST_SAVED_SUCCESS,
      }) as any,
    );
    return savePostResponse;
  }

  // this function handles the functionality on the pin option
  const handlePinPost = async (id: string, pinned?: boolean) => {
    const payload = {
      postId: id,
    };
    dispatch(pinPostStateHandler(payload.postId) as any);
    const pinPostResponse = await dispatch(
      pinPost(
        PinPostRequest.builder().setpostId(payload.postId).build(),
      ) as any,
    );
    if (pinPostResponse) {
      dispatch(
        showToastMessage({
          isToast: true,
          message: pinned ? POST_UNPIN_SUCCESS : POST_PIN_SUCCESS,
        }) as any,
      );
    }
    return pinPostResponse;
  };

  // this function handles the functionality on the report option of post
  const handleReportPost = async () => {
    setShowReportModal(true);
  };

  // this function handles the functionality on the delete option of post
  const handleDeletePost = async (visible: boolean) => {
    setDeleteModal(visible);
  };

  // this function returns the id of the item selected from menu list and handles further functionalities accordingly for post
  const onMenuItemSelect = (
    postId: string,
    itemId?: number,
    pinnedValue?: boolean,
  ) => {
    setSelectedMenuItemCommentId('');
    setSelectedMenuItemPostId(postId);
    if (itemId === PIN_POST_MENU_ITEM || itemId === UNPIN_POST_MENU_ITEM) {
      handlePinPost(postId, pinnedValue);
    }
    if (itemId === REPORT_POST_MENU_ITEM) {
      handleReportPost();
    }
    if (itemId === DELETE_POST_MENU_ITEM) {
      handleDeletePost(true);
    }
    if (itemId === EDIT_POST_MENU_ITEM) {
      NavigationService.navigate(CREATE_POST, postId);
    }
  };

  // this function handles the functionality on the report option of comment
  const handleReportComment = async () => {
    setShowReportModal(true);
  };

  // this function handles the functionality on the delete option of comment
  const handleDeleteComment = async (visible: boolean) => {
    setDeleteModal(visible);
  };

  // this function returns the id of the item selected from menu list and handles further functionalities accordingly for comment
  const onCommentMenuItemSelect = async (
    commentId: string,
    itemId?: number,
  ) => {
    setSelectedMenuItemPostId('');
    setSelectedMenuItemCommentId(commentId);
    if (itemId === REPORT_COMMENT_MENU_ITEM) {
      handleReportComment();
    }
    if (itemId === DELETE_COMMENT_MENU_ITEM) {
      handleDeleteComment(true);
    }
    if (itemId === EDIT_COMMENT_MENU_ITEM) {
      const commentDetail = getCommentDetail(postDetail?.replies, commentId);
      // converts the mentions route to mention values
      const convertedComment = routeToMentionConverter(
        commentDetail?.text ? commentDetail.text : '',
      );
      setCommentToAdd(convertedComment);
      setTimeout(() => {
        setEditCommentFocus(true);
      }, 100);
    }
  };

  // this function gets the detail of comment whose menu item is clicked
  const getCommentDetail = (
    comments?: LMCommentUI[],
    id?: string,
  ): LMCommentUI | undefined => {
    const commentId = id ? id : selectedMenuItemCommentId;
    if (comments) {
      for (const reply of comments) {
        if (reply.id === commentId) {
          return reply; // Found the reply in the current level
        }
        if (reply.replies && reply.replies.length > 0) {
          const nestedReply = getCommentDetail(reply.replies, commentId);
          if (nestedReply) {
            return nestedReply; // Found the reply in the child replies
          }
        }
      }
    }
    return undefined; // Reply not found
  };

  // this function calls the getPost api
  const getPostData = useCallback(async () => {
    const getPostResponse = await dispatch(
      getPost(
        GetPostRequest.builder()
          .setpostId(props.route.params[0])
          .setpage(commentPageNumber)
          .setpageSize(10)
          .build(),
      ) as any,
    );
    return getPostResponse;
  }, [commentPageNumber, dispatch, props.route.params]);

  // this function calls the getComments api
  const getCommentsReplies = async (
    postId: string,
    commentId: string,
    repliesResponseCallback: any,
    pageNo: number,
  ) => {
    const commentsRepliesResponse = await dispatch(
      getComments(
        GetCommentRequest.builder()
          .setpostId(postId)
          .setcommentId(commentId)
          .setpage(pageNo)
          .setpageSize(10)
          .build(),
      ) as any,
    );

    // sets the api response in the callback function
    repliesResponseCallback(
      postDetail?.replies &&
        postDetail?.replies[
          postDetail.replies?.findIndex(
            (item: LMCommentUI) => item.id === commentId,
          )
        ]?.replies,
    );
    return commentsRepliesResponse;
  };

  // this functions hanldes the comment like functionality
  const commentLikeHandler = async (postId: string, commentId: string) => {
    const payload = {
      postId: postId,
      commentId: commentId,
    };
    const commentLikeResponse = await dispatch(
      likeComment(
        LikeCommentRequest.builder()
          .setcommentId(payload.commentId)
          .setpostId(payload.postId)
          .build(),
      ) as any,
    );
    return commentLikeResponse;
  };

  // this functions calls the add new comment api
  const addNewComment = async (postId: string) => {
    // convert the mentions to route
    const convertedNewComment = mentionToRouteConverter(commentToAdd);
    const currentDate = new Date();
    const payload = {
      postId: postId,
      newComment: convertedNewComment,
      tempId: -currentDate.getTime(),
    };
    setCommentToAdd('');
    // handles adding comment locally
    dispatch(addCommentStateHandler({payload, loggedInUser}) as any);
    // calls new comment api
    const commentAddResponse = await dispatch(
      addComment(
        AddCommentRequest.builder()
          .setpostId(payload.postId)
          .settext(payload.newComment)
          .setTempId(`${payload.tempId}`)
          .build(),
      ) as any,
    );
    return commentAddResponse;
  };

  // this functions calls the add new reply to a comment api
  const addNewReply = async (postId: string, commentId: string) => {
    // convert the mentions to route
    const convertedNewReply = mentionToRouteConverter(commentToAdd);
    const currentDate = new Date();
    const payload = {
      postId: postId,
      newComment: convertedNewReply,
      tempId: -currentDate.getTime(),
      commentId: commentId,
    };
    setCommentToAdd('');
    dispatch(replyCommentStateHandler({payload, loggedInUser}) as any);
    // call reply on comment api
    const replyAddResponse = await dispatch(
      replyComment(
        ReplyCommentRequest.builder()
          .setPostId(payload.postId)
          .setCommentId(payload.commentId)
          .setTempId(`${payload.tempId}`)
          .setText(payload.newComment)
          .build(),
      ) as any,
    );
    return replyAddResponse;
  };

  // this useEffect handles the pagination of the comments
  useEffect(() => {
    getPostData();
  }, [commentPageNumber, getPostData]);

  // this renders the postDetail view
  const renderPostDetail = () => {
    return (
      <LMPost
        post={postDetail}
        // header props
        headerProps={{
          post: postDetail,
          postMenu: {
            postId: postDetail?.id,
            menuItems: postDetail?.menuItems,
            modalPosition: modalPosition,
            modalVisible: showActionListModal,
            onCloseModal: closePostActionListModal,
            onSelected: (postId, itemId) =>
              onMenuItemSelect(postId, itemId, postDetail?.isPinned),
          },
          onTap: () => {},
          showMenuIcon: true,
          showMemberStateLabel: true,
        }}
        // footer props
        footerProps={{
          isLiked: postDetail?.isLiked,
          isSaved: postDetail?.isSaved,
          likesCount: postDetail?.likesCount,
          commentsCount: postDetail?.commentsCount,
          showBookMarkIcon: true,
          showShareIcon: true,
          likeIconButton: {
            onTap: () => {
              postLikeHandler(postDetail?.id);
            },
          },
          saveButton: {
            onTap: () => {
              savePostHandler(postDetail?.id, postDetail?.isSaved);
            },
          },
          likeTextButton: {
            onTap: () => {
              dispatch(postLikesClear() as any);
              NavigationService.navigate(LIKES_LIST, [
                POST_LIKES,
                postDetail?.id,
              ]);
            },
          },
        }}
        // media props
        mediaProps={{
          attachments: postDetail?.attachments ? postDetail.attachments : [],
          videoProps: {videoUrl: '', showControls: true},
          carouselProps: {
            attachments: postDetail?.attachments ? postDetail.attachments : [],
            videoItem: {videoUrl: '', showControls: true},
          },
        }}
      />
    );
  };

  // Update localModalVisibility when showDeleteModal visibility changes
  useEffect(() => {
    setLocalModalVisibility(showDeleteModal);
  }, [showDeleteModal]);

  // this handles the view layout with keyboard visibility
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardIsVisible(true);
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardIsVisible(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  // this function calls the edit comment api
  const commentEdit = async () => {
    // convert the mentions to route
    const convertedEditedComment = mentionToRouteConverter(commentToAdd);
    const payload = {
      commentId: selectedMenuItemCommentId,
      commentText: convertedEditedComment,
    };
    await dispatch(editCommentStateHandler(payload) as any);
    // call edit comment api
    const editCommentResponse = await dispatch(
      editComment(
        EditCommentRequest.builder()
          .setcommentId(selectedMenuItemCommentId)
          .setpostId(postDetail?.id)
          .settext(payload.commentText)
          .build(),
      ) as any,
    );
    if (editCommentResponse) {
      setEditCommentFocus(false);
      setCommentToAdd('');
    }
    return editCommentResponse;
  };

  // this function is called on change text of textInput
  const handleInputChange = async (event: any) => {
    setCommentToAdd(event);

    const newMentions = detectMentions(event);

    if (newMentions.length > 0) {
      const length = newMentions.length;
      setTaggedUserName(newMentions[length - 1]);
    }

    // debouncing logic
    if (debounceTimeout !== null) {
      clearTimeout(debounceTimeout);
    }

    const mentionListLength = newMentions.length;
    if (mentionListLength > 0) {
      const timeoutID = setTimeout(async () => {
        setPage(1);
        const taggingListResponse = await dispatch(
          getTaggingList(
            GetTaggingListRequest.builder()
              .setsearchName(newMentions[mentionListLength - 1])
              .setpage(1)
              .setpageSize(10)
              .build(),
          ) as any,
        );
        if (mentionListLength > 0) {
          const tagsLength = taggingListResponse?.members?.length;
          const arrLength = tagsLength;
          if (arrLength >= 5) {
            setUserTaggingListHeight(5 * 58);
          } else if (arrLength < 5) {
            const height = tagsLength * 100;
            setUserTaggingListHeight(height);
          }
          setAllTags(taggingListResponse?.members);
          setIsUserTagging(true);
        }
      }, 500);

      setDebounceTimeout(timeoutID);
    } else {
      if (isUserTagging) {
        setAllTags([]);
        setIsUserTagging(false);
      }
    }
  };

  // this calls the tagging list api for different page number
  const loadData = async (newPage: number) => {
    setIsLoading(true);
    const taggingListResponse = await dispatch(
      getTaggingList(
        GetTaggingListRequest.builder()
          .setsearchName(taggedUserName)
          .setpage(newPage)
          .setpageSize(10)
          .build(),
      ) as any,
    );
    if (taggingListResponse) {
      setAllTags([...allTags, ...taggingListResponse.members]);
      setIsLoading(false);
    }
  };

  // this handles the pagination of tagging list
  const handleLoadMore = () => {
    const userTaggingListLength = allTags.length;
    if (!isLoading && userTaggingListLength > 0) {
      // checking if conversations length is greater the 15 as it convered all the screen sizes of mobiles, and pagination API will never call if screen is not full messages.
      if (userTaggingListLength >= 10 * page) {
        const newPage = page + 1;
        setPage(newPage);
        loadData(newPage);
      }
    }
  };

  return (
    <SafeAreaView style={styles.flexView}>
      <KeyboardAvoidingView
        enabled={Platform.OS === 'android' ? true : false}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={
          Platform.OS === 'android'
            ? keyboardIsVisible
              ? 0
              : Layout.normalize(32)
            : 0
        }
        style={styles.flexView}>
        {/* header view */}
        <LMHeader
          showBackArrow
          heading="Post"
          subHeading={
            postDetail?.id
              ? postDetail?.commentsCount > 1
                ? `${postDetail?.commentsCount} comments`
                : `${postDetail?.commentsCount} comment`
              : ''
          }
          onBackPress={() => {
            Keyboard.dismiss();
            NavigationService.navigate(UNIVERSAL_FEED);
          }}
        />
        {/* post detail view */}
        {Object.keys(postDetail).length > 0 ? (
          <View
            style={StyleSheet.flatten([
              styles.mainContainer,
              {
                paddingBottom:
                  allTags && isUserTagging
                    ? 0
                    : replyOnComment.textInputFocus
                    ? Layout.normalize(74)
                    : Layout.normalize(44),
              },
            ])}>
            <>
              {/* this renders when the post has commentsCount greater than 0 */}
              {postDetail?.commentsCount > 0 ? (
                <View>
                  <FlatList
                    refreshing={refreshing}
                    refreshControl={
                      <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                      />
                    }
                    keyboardShouldPersistTaps={'handled'}
                    ListHeaderComponent={
                      // this renders the post section
                      <>
                        {renderPostDetail()}
                        <Text style={styles.commentCountText}>
                          {postDetail.commentsCount > 1
                            ? `${postDetail.commentsCount} Comments`
                            : `${postDetail.commentsCount} Comment`}
                        </Text>
                      </>
                    }
                    data={postDetail?.replies}
                    renderItem={({item}) => {
                      // this renders the comments section
                      return (
                        <>
                          {item && (
                            <LMCommentItem
                              comment={item}
                              // this calls the getCommentsReplies function on click of number of child replies text
                              onTapReplies={repliesResponseCallback => {
                                dispatch(clearComments(item?.id) as any);
                                getCommentsReplies(
                                  item?.postId,
                                  item?.id,
                                  repliesResponseCallback,
                                  1,
                                );
                              }}
                              // this handles the pagination of child replies on click of view more
                              onTapViewMore={(
                                pageValue,
                                repliesResponseCallback,
                              ) => {
                                getCommentsReplies(
                                  item?.postId,
                                  item?.id,
                                  repliesResponseCallback,
                                  pageValue,
                                );
                              }}
                              // this hanldes the functionality on click of reply text to add reply to an comment
                              replyTextProps={{
                                onTap: () => {
                                  setReplyOnComment({
                                    textInputFocus: true,
                                    commentId: item?.id,
                                  });
                                  setReplyToUsername(item?.user?.name);
                                },
                              }}
                              // view more text style
                              viewMoreRepliesProps={{
                                text: '',
                                textStyle: styles.viewMoreText,
                              }}
                              // comment menu item props
                              commentMenu={{
                                postId: item?.id,
                                menuItems: item?.menuItems,
                                modalPosition: modalPositionComment,
                                modalVisible: showCommentActionListModal,
                                onCloseModal: closeCommentActionListModal,
                                onSelected: (commentId, itemId) =>
                                  onCommentMenuItemSelect(commentId, itemId),
                              }}
                              // this executes on click of like icon of comment
                              likeIconButton={{
                                onTap: id => {
                                  commentLikeHandler(item?.postId, id);
                                },
                              }}
                              // this executes on click of like text of comment
                              likeTextButton={{
                                onTap: id =>
                                  NavigationService.navigate(LIKES_LIST, [
                                    COMMENT_LIKES,
                                    id,
                                    item?.postId,
                                  ]),
                              }}
                            />
                          )}
                        </>
                      );
                    }}
                    onEndReachedThreshold={0.3}
                    onEndReached={() => {
                      setCommentPageNumber(commentPageNumber + 1);
                    }}
                  />
                </View>
              ) : (
                // this section renders if the post has 0 comments
                <ScrollView keyboardShouldPersistTaps={'handled'}>
                  {renderPostDetail()}
                  <View style={styles.noCommentSection}>
                    <Text style={styles.noCommentText}>No comment found</Text>
                    <Text style={styles.lightGreyColorText}>
                      Be the first one to comment
                    </Text>
                  </View>
                </ScrollView>
              )}
            </>
          </View>
        ) : (
          <View style={styles.loaderView}>{!localRefresh && <LMLoader />}</View>
        )}
        {/* replying to username view which renders when the user is adding a reply to a comment */}
        {replyOnComment.textInputFocus && (
          <View style={styles.replyCommentSection}>
            <Text style={styles.lightGreyColorText}>
              Replying to {replyToUsername}
            </Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                setReplyOnComment({
                  textInputFocus: false,
                  commentId: '',
                })
              }>
              <Image
                source={require('../../assets/images/close_icon3x.png')}
                style={styles.crossIconStyle}
              />
            </TouchableOpacity>
          </View>
        )}
        {/* users tagging list */}
        {allTags && isUserTagging ? (
          <View
            style={[
              styles.taggingListView,
              {
                paddingBottom: replyOnComment.textInputFocus
                  ? Layout.normalize(74)
                  : Layout.normalize(44),
                height: userTaggingListHeight,
              },
            ]}>
            <FlashList
              data={[...allTags]}
              renderItem={({item}: {item: LMUserUI}) => {
                return (
                  <Pressable
                    onPress={() => {
                      const uuid = item?.sdkClientInfo?.uuid;
                      const res = replaceLastMention(
                        commentToAdd,
                        taggedUserName,
                        item?.name,
                        uuid ? `user_profile/${uuid}` : uuid,
                      );
                      setCommentToAdd(res);
                      setAllTags([]);
                      setIsUserTagging(false);
                    }}
                    style={styles.taggingListItem}>
                    <LMProfilePicture
                      fallbackText={item?.name}
                      fallbackTextBoxStyle={styles.taggingListProfileBoxStyle}
                      size={40}
                    />

                    <View style={styles.taggingListItemTextView}>
                      <Text style={styles.taggingListText} numberOfLines={1}>
                        {item?.name}
                      </Text>
                    </View>
                  </Pressable>
                );
              }}
              extraData={{
                value: [commentToAdd, allTags],
              }}
              estimatedItemSize={75}
              keyboardShouldPersistTaps={'handled'}
              onEndReached={handleLoadMore}
              onEndReachedThreshold={1}
              bounces={false}
              ListFooterComponent={
                isLoading ? (
                  <View style={styles.taggingLoaderView}>
                    <LMLoader size={15} />
                  </View>
                ) : null
              }
              keyExtractor={(item: any, index) => {
                return index?.toString();
              }}
            />
          </View>
        ) : null}

        {/* input field */}
        <LMInputText
          inputText={commentToAdd}
          onType={handleInputChange}
          inputTextStyle={styles.textInputStyle}
          autoFocus={
            props.route.params[1] === NAVIGATED_FROM_COMMENT
              ? true
              : replyOnComment.textInputFocus
              ? true
              : editCommentFocus
          }
          placeholderText="Write a comment"
          placeholderTextColor="#9B9B9B"
          disabled={postDetail?.id ? false : true}
          inputRef={myRef}
          rightIcon={{
            onTap: () => {
              commentToAdd
                ? editCommentFocus
                  ? commentEdit()
                  : replyOnComment.textInputFocus
                  ? addNewReply(postDetail?.id, replyOnComment.commentId)
                  : addNewComment(postDetail?.id)
                : {};
            },
            icon: {
              type: 'png',
              assetPath: require('../../assets/images/send_icon3x.png'),
              iconStyle: {opacity: commentToAdd ? 1 : 0.7},
            },
            isClickable: commentToAdd ? false : true,
          }}
          numberOfLines={6}
          partTypes={[
            {
              trigger: '@', // Should be a single character like '@' or '#'
              textStyle: {
                color: 'blue',
              }, // The mention style in the input
            },
          ]}
        />
      </KeyboardAvoidingView>

      {/* delete post modal */}
      {localModalVisibility && (
        <DeleteModal
          visible={showDeleteModal}
          displayModal={visible =>
            selectedMenuItemPostId
              ? handleDeletePost(visible)
              : handleDeleteComment(visible)
          }
          deleteType={selectedMenuItemPostId ? POST_TYPE : COMMENT_TYPE}
          postDetail={postDetail}
          commentDetail={getCommentDetail(postDetail?.replies)}
        />
      )}
      {/* report post modal */}
      {showReportModal && (
        <ReportModal
          visible={showReportModal}
          closeModal={() => setShowReportModal(false)}
          reportType={selectedMenuItemPostId ? POST_TYPE : COMMENT_TYPE}
          postDetail={postDetail}
          commentDetail={getCommentDetail(postDetail?.replies)}
        />
      )}
    </SafeAreaView>
  );
};

export default PostDetail;
