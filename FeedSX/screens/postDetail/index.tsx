import {Alert, FlatList, SafeAreaView, ScrollView, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  LMCommentItem,
  LMHeader,
  LMInputText,
  LMPost,
} from '../../../LikeMinds-ReactNative-Feed-UI';
import {useDispatch} from 'react-redux';
import {
  addComment,
  clearComments,
  getComments,
  getPost,
  likeComment,
} from '../../store/actions/postDetail';
import {
  AddCommentRequest,
  GetCommentRequest,
  GetPostRequest,
  LikeCommentRequest,
  LikePostRequest,
  PinPostRequest,
  SavePostRequest,
} from '@likeminds.community/feed-js-beta';
import {useAppSelector} from '../../store/store';
import {NavigationService} from '../../navigation';
import {LIKES_LIST, UNIVERSAL_FEED} from '../../constants/screenNames';
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
  DELETE_POST_MENU_ITEM,
  PIN_POST_MENU_ITEM,
  POST_LIKES,
  POST_PIN_SUCCESS,
  POST_SAVED_SUCCESS,
  POST_TYPE,
  POST_UNPIN_SUCCESS,
  POST_UNSAVED_SUCCESS,
  REPORT_POST_MENU_ITEM,
  UNPIN_POST_MENU_ITEM,
} from '../../constants/Strings';
import {DeleteModal, ReportModal} from '../../customModals';
import {convertToLMCommentUI} from '../../viewDataModels';
import {FlashList} from '@shopify/flash-list';
import Layout from '../../constants/Layout';
import LMLoader from '../../../LikeMinds-ReactNative-Feed-UI/src/base/LMLoader';

const PostDetail = (props: any) => {  
  const dispatch = useDispatch();
  const [modalPosition, setModalPosition] = useState({x: 0, y: 0});
  const [showActionListModal, setShowActionListModal] = useState(false);
  const [selectedMenuItemPostId, setSelectedMenuItemPostId] = useState('');
  const [selectedMenuItemCommentId, setSelectedMenuItemCommentId] =
    useState('');
  const [showDeleteModal, setDeleteModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const {postDetail} = useAppSelector(state => state.postDetail);
  const [commentPageNumber, setCommentPageNumber] = useState(1);
  const [replyPageNumber, setReplyPageNumber] = useState(0);
  const [modalPositionComment, setModalPositionComment] = useState({
    x: 0,
    y: 0,
  });
  const [showCommentActionListModal, setShowCommentActionListModal] =
    useState(false);

  const closePostActionListModal = () => {
    setShowActionListModal(false);
  };
  const closeCommentActionListModal = () => {
    setShowCommentActionListModal(false);
  };

  // this functions hanldes the post like functionality
  async function postLikeHandler(id: string) {
    let payload = {
      postId: id,
    };    
    dispatch(likePostStateHandler(payload.postId) as any);
    // calling like post api
    let postLikeResponse = await dispatch(
      likePost(
        LikePostRequest.builder().setpostId(payload.postId).build(),
      ) as any,
    );
    if (postLikeResponse) {
    }
    return postLikeResponse;
  }

  // this functions hanldes the post save functionality
  async function savePostHandler(id: string, saved?: boolean) {
    let payload = {
      postId: id,
    };
    dispatch(savePostStateHandler(payload.postId) as any);
    // calling the save post api
    let savePostResponse = await dispatch(
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
    let payload = {
      postId: id,
    };
    dispatch(pinPostStateHandler(payload.postId) as any);
    let pinPostResponse = await dispatch(
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

  // this function handles the functionality on the report option
  const handleReportPost = async () => {
    setShowReportModal(true);
  };

  // this function handles the functionality on the delete option
  const handleDeletePost = async (visible: boolean) => {
    setDeleteModal(visible);
  };

  // this function returns the id of the item selected from menu list and handles further functionalities accordingly
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
  };

  // this function handles the functionality on the report option
  const handleReportComment = async () => {
    setShowReportModal(true);
  };

  // this function handles the functionality on the delete option
  const handleDeleteComment = async (visible: boolean) => {
    setDeleteModal(visible);
  };

  // this function returns the id of the item selected from menu list and handles further functionalities accordingly
  const onCommentMenuItemSelect = (commentId: string, itemId?: number) => {
    setSelectedMenuItemPostId('');
    setSelectedMenuItemCommentId(commentId);
    if (itemId === 7) {
      handleReportComment();
    }
    if (itemId === 6) {
      handleDeleteComment(true);
    }
  };

  // this function gets the detail pf post whose menu item is clicked
  const getCommentDetail = (
    comments?: LMCommentUI[],
  ): LMCommentUI | undefined => {
    if (comments) {
      for (const reply of comments) {
        // console.log('selectedMenuItemCommentId',selectedMenuItemCommentId,reply.id);

        if (reply.id === selectedMenuItemCommentId) {
          return reply; // Found the reply in the current level
        }
        // console.log('reply.replies',reply.replies);

        if (reply.replies && reply.replies.length > 0) {
          // console.log('here');

          const nestedReply = getCommentDetail(reply.replies);
          if (nestedReply) {
            return nestedReply; // Found the reply in the child replies
          }
        }
      }
    }

    return undefined; // Reply not found in the current branch
  };

  const getPostData = async () => {
    let getPostResponse = await dispatch(
      getPost(
        GetPostRequest.builder()
          .setpostId(props.route.params[0])
          .setpage(commentPageNumber)
          .setpageSize(10)
          .build(),
      ) as any,
    );
    return getPostResponse;
  };

  const getCommentsReplies = async (
    postId: string,
    commentId: string,
    repliesResponseCallback: any,
    pageNo: number
  ) => {    
    let commentsRepliesResponse = await dispatch(getComments(GetCommentRequest.builder()
    .setpostId(postId)
    .setcommentId(commentId)
    .setpage(pageNo)
    .setpageSize(10)
    .build()) as any);
    

    repliesResponseCallback(
      postDetail?.replies &&
        postDetail?.replies[
          postDetail.replies?.findIndex(item => item.id === commentId)
        ]?.replies,
    );
    return commentsRepliesResponse;
  };

  const commentLikeHandler = async (postId: string, commentId: string) => {
    let payload = {
      postId: postId,
      commentId: commentId,
    };
    let commentLikeResponse = await dispatch(
      likeComment(
        LikeCommentRequest.builder()
          .setcommentId(payload.commentId)
          .setpostId(payload.postId)
          .build(),
      ) as any,
    );
    return commentLikeResponse;
  };

  const addNewComment = async (postId: string) => {
    let payload = {
      postId: postId,
    };
    let commentLikeResponse = await dispatch(
      addComment(
        AddCommentRequest.builder()
          .setpostId(payload.postId)
          .settext('good')
          .build(),
      ) as any,
    );
    return commentLikeResponse;
  };

  useEffect(() => {
    getPostData();
  }, [commentPageNumber]);

  const [localModalVisibility, setLocalModalVisibility] =
    useState(showDeleteModal);

  // Update localModalVisibility when modalVisibility changes
  useEffect(() => {
    setLocalModalVisibility(showDeleteModal);
  }, [showDeleteModal]);

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



  return (
    <SafeAreaView style={{flex: 1}}>
      <LMHeader
        showBackArrow
        heading="Post"
        subHeading={postDetail?.id ?
          postDetail?.commentsCount > 1
            ? `${postDetail?.commentsCount} comments`
            : `${postDetail?.commentsCount} comment` : ''
        }
        onBackPress={() => NavigationService.navigate(UNIVERSAL_FEED)}
      />
      {postDetail?.id ? <>{postDetail?.commentsCount > 0 ?  <View
            style={{
              height: '100%',
              paddingBottom: Layout.window.height / 6.2,
            }}>
            <FlatList
              ListHeaderComponent={() => {
                return (
                  <>
                    {renderPostDetail()}
                    <Text
                      style={{
                        paddingHorizontal: 15,
                        paddingTop: 20,
                        paddingBottom: 5,
                        fontWeight: '500',
                        color: '#222020',
                        backgroundColor: '#fff'
                      }}>
                      {postDetail.commentsCount > 1
                        ? `${postDetail.commentsCount} Comments`
                        : `${postDetail.commentsCount} Comment`}
                    </Text>
                  </>
                );
              }}
              // estimatedItemSize={150}
              data={postDetail?.replies}
              renderItem={({item}) => {
                return (
                  <>
                    {item && (
                      <LMCommentItem
                        comment={item}
                        onTapReplies={repliesResponseCallback =>
                          { dispatch(clearComments(item?.id) as any)

                            getCommentsReplies(
                            item?.postId,
                            item?.id,
                            repliesResponseCallback,
                            1
                          )}
                        }
                        onTapViewMore={(val:any, repliesResponseCallback)=>  {setReplyPageNumber(val);  getCommentsReplies(
                          item?.postId,
                          item?.id,
                          repliesResponseCallback,
                          val
                        )} }
                        viewMoreRepliesProps={{text:'', textStyle:{color:'#484F67', fontWeight:'500', marginVertical:24}}}
                        commentMenu={{
                          postId: item?.id,
                          menuItems: item?.menuItems,
                          modalPosition: modalPositionComment,
                          modalVisible: showCommentActionListModal,
                          onCloseModal: closeCommentActionListModal,
                          onSelected: (commentId, itemId) =>
                            onCommentMenuItemSelect(commentId, itemId),
                        }}
                        likeIconButton={{
                          onTap: id => {
                            commentLikeHandler(item?.postId, id);
                          },
                        }}
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
          </View> : <ScrollView>{renderPostDetail()}
            <View style={{alignItems: 'center', marginTop: 10, paddingBottom: Layout.window.height / 6.2,}}>
              <Text
                style={{color: '#0F1E3D66', fontSize: 16, fontWeight: '500'}}>
                No comment found
              </Text>
              <Text style={{color: '#0F1E3D66'}}>
                Be the first one to comment
              </Text>
            </View></ScrollView>
          }</> : <View
          style={{
            flex: 1,
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <LMLoader />
        </View>}
      

      <LMInputText
        inputTextStyle={{
          margin: 0,
          borderRadius: 0,
          shadowOpacity: 0.5,
          shadowRadius: 4,
          elevation: 10,
          shadowColor: '#000',
          shadowOffset: {
            width: 5,
            height: 5,
          },
          height: 48,
          paddingHorizontal: 15,
          fontSize: 14,
          color: '#222020',
          position: 'absolute',
          bottom: 0,
          width: '100%',
        }}
        autoFocus={props.route.params[1] === 'FROM_COMMENTS' ? true : false}
        placeholderText="Write a comment"
        placeholderTextColor="#9B9B9B"
        rightIcon={{type:'png', assetPath:require('../../assets/images/send_icon3x.png') }}
      />
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
