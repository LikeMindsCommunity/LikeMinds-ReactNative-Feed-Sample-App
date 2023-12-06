import {
  View,
  Platform,
  TouchableOpacity,
  SafeAreaView,
  Text,
  ScrollView,
  Pressable,
  TextInput,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  detectMentions,
  detectURLs,
  mentionToRouteConverter,
  replaceLastMention,
  requestStoragePermission,
  routeToMentionConverter,
  selectDocument,
  selectImageVideo,
} from '../../utils';
import {useAppSelector} from '../../store/store';
import {
  LMAttachmentUI,
  LMButton,
  LMCarousel,
  LMDocument,
  LMHeader,
  LMIcon,
  LMImage,
  LMInputText,
  LMLinkPreview,
  LMOGTagsUI,
  LMPostUI,
  LMProfilePicture,
  LMText,
  LMUserUI,
  LMVideo,
} from '../../../LikeMinds-ReactNative-Feed-UI';
import {
  ADD_FILES,
  ADD_IMAGES,
  ADD_MORE_MEDIA,
  ADD_POST_TEXT,
  ADD_VIDEOS,
  CREATE_POST_PLACEHOLDER_TEXT,
  DOCUMENT_ATTACHMENT_TYPE,
  FILE_UPLOAD_SIZE_VALIDATION,
  IMAGE_ATTACHMENT_TYPE,
  MAX_FILE_SIZE,
  MEDIA_UPLOAD_COUNT_VALIDATION,
  MIN_FILE_SIZE,
  SAVE_POST_TEXT,
  SELECT_BOTH,
  SELECT_IMAGE,
  SELECT_VIDEO,
  VIDEO_ATTACHMENT_TYPE,
} from '../../constants/Strings';
import {
  DecodeURLRequest,
  EditPostRequest,
  GetPostRequest,
  GetTaggingListRequest,
} from '@likeminds.community/feed-js-beta';
import _ from 'lodash';
import {
  editPost,
  getDecodedUrl,
  setUploadAttachments,
} from '../../store/actions/createPost';
import {useDispatch} from 'react-redux';
import {NavigationService} from '../../navigation';
import {
  convertImageVideoMetaData,
  convertDocumentMetaData,
  convertLinkMetaData,
  convertToLMPostUI,
} from '../../viewDataModels';
import {styles} from './styles';
import {showToastMessage} from '../../store/actions/toast';
import LMLoader from '../../../LikeMinds-ReactNative-Feed-UI/src/base/LMLoader';
import {getPost, getTaggingList} from '../../store/actions/postDetail';
import {FlashList} from '@shopify/flash-list';

interface IProps {
  navigation: object;
  route: {
    key: string;
    name: string;
    params: string;
    path: undefined;
  };
}

const CreatePost = (props: IProps) => {
  const memberData = useAppSelector(state => state.feed.member);
  const dispatch = useDispatch();
  const [formattedDocumentAttachments, setFormattedDocumentAttachments] =
    useState<Array<LMAttachmentUI>>([]);
  const [formattedMediaAttachments, setFormattedMediaAttachments] = useState<
    Array<LMAttachmentUI>
  >([]);
  const [formattedLinkAttachments, setFormattedLinkAttachments] = useState<
    Array<LMAttachmentUI>
  >([]);
  const [showLinkPreview, setShowLinkPreview] = useState(false);
  const [closedOnce, setClosedOnce] = useState(false);
  const [showOptions, setShowOptions] = useState(true);
  const [showSelecting, setShowSelecting] = useState(false);
  const postToEdit = props?.route?.params;
  const [postDetail, setPostDetail] = useState({} as LMPostUI);
  const [postContentText, setPostContentText] = useState('');
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

  // function handles the selection of images and videos
  const setSelectedImageVideo = (type: string) => {
    setShowSelecting(true);
    selectImageVideo(type)?.then((res: any) => {
      if (res?.didCancel) {
        setShowSelecting(false);
      } else {
        const mediaWithSizeCheck = [];
        // checks the size of media
        if (res?.assets) {
          for (const media of res.assets) {
            if (
              media.fileSize > MAX_FILE_SIZE ||
              media.fileSize < MIN_FILE_SIZE
            ) {
              dispatch(
                showToastMessage({
                  isToast: true,
                  message: FILE_UPLOAD_SIZE_VALIDATION,
                }) as any,
              );
            } else {
              mediaWithSizeCheck.push(media);
            }
          }
        }
        const selectedImagesVideos =
          convertImageVideoMetaData(mediaWithSizeCheck);
        // checks ths count of the media
        if (
          selectedImagesVideos.length + formattedMediaAttachments.length >
          10
        ) {
          setFormattedMediaAttachments([...formattedMediaAttachments]);
          setShowSelecting(false);
          dispatch(
            showToastMessage({
              isToast: true,
              message: MEDIA_UPLOAD_COUNT_VALIDATION,
            }) as any,
          );
        } else {
          if (
            selectedImagesVideos.length > 0 ||
            formattedMediaAttachments.length > 0
          ) {
            setShowOptions(false);
          } else {
            setShowOptions(true);
          }
          setShowSelecting(false);
          setFormattedMediaAttachments([
            ...formattedMediaAttachments,
            ...selectedImagesVideos,
          ]);
        }
      }
    });
  };

  // function handles the slection of documents
  const setSelectedDocuments = () => {
    selectDocument()?.then((res: any) => {
      const mediaWithSizeCheck = [];
      // checks the size of the files
      for (const media of res) {
        if (media.size > MAX_FILE_SIZE || media.size < MIN_FILE_SIZE) {
          dispatch(
            showToastMessage({
              isToast: true,
              message: FILE_UPLOAD_SIZE_VALIDATION,
            }) as any,
          );
        } else {
          mediaWithSizeCheck.push(media);
        }
      }
      const selectedDocuments = convertDocumentMetaData(mediaWithSizeCheck);
      // checks the count of the files attached
      if (selectedDocuments.length + formattedDocumentAttachments.length > 10) {
        setFormattedDocumentAttachments([...formattedDocumentAttachments]);
        dispatch(
          showToastMessage({
            isToast: true,
            message: MEDIA_UPLOAD_COUNT_VALIDATION,
          }) as any,
        );
      } else {
        if (
          selectedDocuments.length > 0 ||
          formattedDocumentAttachments.length > 0
        ) {
          setShowOptions(false);
        } else {
          setShowOptions(true);
        }
        setFormattedDocumentAttachments([
          ...formattedDocumentAttachments,
          ...selectedDocuments,
        ]);
      }
    });
  };

  // function handles the permission for image/video selection
  const handleGallery = async (type: string) => {
    if (Platform.OS === 'ios') {
      setSelectedImageVideo(type);
    } else {
      const res = await requestStoragePermission();
      if (res === true) {
        setSelectedImageVideo(type);
      }
    }
  };

  // function handles the permission for selection of documents
  const handleDocument = async () => {
    if (Platform.OS === 'ios') {
      setSelectedDocuments();
    } else {
      const res = await requestStoragePermission();
      if (res === true) {
        setSelectedDocuments();
      }
    }
  };

  // function removes the selected documents
  const removeDocumentAttachment = (index: number) => {
    const newDocAttachments = [...formattedDocumentAttachments];
    if (formattedDocumentAttachments.length === 1) {
      setFormattedDocumentAttachments([]);
      setShowOptions(true);
    } else {
      newDocAttachments.splice(index, 1);
      setFormattedDocumentAttachments(newDocAttachments);
    }
  };

  // function removes multiple images/videos selected
  const removeMediaAttachment = (index: number) => {
    const newMediaAttachments = [...formattedMediaAttachments];
    newMediaAttachments.splice(index, 1);
    setFormattedMediaAttachments(newMediaAttachments);
  };

  // function removes single image and video selected
  const removeSingleAttachment = () => {
    setFormattedMediaAttachments([]);
    setShowOptions(true);
  };

  useEffect(() => {
    const debouncedSearch = _.debounce(text => {
      // Perform your search or update your component's state here
      const links = detectURLs(text);

      if (links && links.length > 0) {
        const responsePromises: Promise<LMOGTagsUI>[] = links.map(
          (item: string) => {
            return new Promise((resolve, reject) => {
              // calls the decodeUrl api
              const decodeUrlResponse = dispatch(
                getDecodedUrl(
                  DecodeURLRequest.builder().setURL(item).build(),
                ) as any,
              );
              decodeUrlResponse
                .then((res: any) => {
                  resolve(res?.og_tags);
                })
                .catch((error: any) => {
                  reject(error);
                });
            });
          },
        );

        Promise.all(responsePromises)
          .then(async (responses: LMOGTagsUI[]) => {
            const filteredResponses = responses.filter(
              (response: LMOGTagsUI) => response !== undefined,
            );

            if (filteredResponses.length > 0) {
              const convertedLinkData = await convertLinkMetaData(
                filteredResponses,
              );
              setFormattedLinkAttachments(convertedLinkData);
              if (!closedOnce) {
                setShowLinkPreview(true);
              }
            }
            // Do something with the array of non-undefined responses
          })
          .catch(error => {
            console.error('An error occurred:', error);
          });
      } else {
        setFormattedLinkAttachments([]);
      }
    }, 500); // 500ms delay

    debouncedSearch(postContentText);

    return () => {
      debouncedSearch.cancel(); // Cleanup the debounced function
    };
  }, [postContentText, dispatch, closedOnce]);

  // all image/video/document media to be uploaded
  const allAttachment = [
    ...formattedMediaAttachments,
    ...formattedDocumentAttachments,
  ];

  // this function calls the getPost api
  const getPostData = useCallback(async () => {
    const getPostResponse = await dispatch(
      getPost(
        GetPostRequest.builder()
          .setpostId(postToEdit)
          .setpage(1)
          .setpageSize(10)
          .build(),
      ) as any,
    );

    setPostDetail(
      convertToLMPostUI(getPostResponse?.post, getPostResponse?.users),
    );
    return getPostResponse;
  }, [dispatch, postToEdit]);

  // this checks if the post has to be edited or not and call the get post api
  useEffect(() => {
    if (postToEdit) {
      getPostData();
    }
  }, [postToEdit, getPostData]);

  // this sets the post data in the local state to render UI
  useEffect(() => {
    if (postDetail?.text) {
      const convertedText = routeToMentionConverter(postDetail?.text);
      setPostContentText(convertedText);
    }
    if (postDetail?.attachments) {
      const imageVideoMedia = [];
      const documentMedia = [];
      const linkPreview = [];
      for (const media of postDetail.attachments) {
        if (media.attachmentType === IMAGE_ATTACHMENT_TYPE) {
          imageVideoMedia.push(media);
        } else if (media.attachmentType === VIDEO_ATTACHMENT_TYPE) {
          imageVideoMedia.push(media);
        } else if (media.attachmentType === DOCUMENT_ATTACHMENT_TYPE) {
          documentMedia.push(media);
        } else {
          linkPreview.push(media);
        }
      }
      setFormattedMediaAttachments(imageVideoMedia);
      setFormattedDocumentAttachments(documentMedia);
      setFormattedLinkAttachments(linkPreview);
    }
  }, [postDetail]);

  //  this function calls the edit post api
  const postEdit = async () => {
    // replace mentions with route
    const contentText = mentionToRouteConverter(postContentText);
    // call edit post api
    const editPostResponse = dispatch(
      editPost(
        EditPostRequest.builder()
          .setHeading('')
          .setattachments([...allAttachment, ...formattedLinkAttachments])
          .setpostId(postDetail?.id)
          .settext(contentText)
          .build(),
      ) as any,
    );
    if (editPostResponse) {
      NavigationService.goBack();
    }
    return editPostResponse;
  };

  // this function is called on change text of inputText
  const handleInputChange = async (event: any) => {
    setPostContentText(event);

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

  // this renders the post detail UI
  const uiRenderForPost = () => {
    return (
      <ScrollView
        style={
          postToEdit
            ? styles.scrollViewStyleWithoutOptions
            : showOptions
            ? styles.scrollViewStyleWithOptions
            : styles.scrollViewStyleWithoutOptions
        }>
        {/* user profile section */}
        <View style={styles.profileContainer}>
          {/* profile image */}
          <LMProfilePicture
            fallbackText={memberData.name}
            imageUrl={memberData.imageUrl}
          />
          {/* user name */}
          <LMText text={memberData.name} textStyle={styles.userNameText} />
        </View>
        {/* text input field */}
        <LMInputText
          placeholderText={CREATE_POST_PLACEHOLDER_TEXT}
          placeholderTextColor="#0F1E3D66"
          inputTextStyle={styles.textInputView}
          multilineField
          inputRef={myRef}
          inputText={postContentText}
          onType={handleInputChange}
          autoFocus={postToEdit ? true : false}
          partTypes={[
            {
              trigger: '@', // Should be a single character like '@' or '#'
              textStyle: {
                color: '#007AFF',
              }, // The mention style in the input
            },
          ]}
        />

        {/* users tagging list */}
        {allTags && isUserTagging ? (
          <View
            style={[
              styles.taggingListView,
              {
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
                        postContentText,
                        taggedUserName,
                        item?.name,
                        uuid ? `user_profile/${uuid}` : uuid,
                      );
                      setPostContentText(res);
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
                      <LMText
                        text={item?.name}
                        maxLines={1}
                        textStyle={styles.taggingListText}
                      />
                    </View>
                  </Pressable>
                );
              }}
              extraData={{
                value: [postContentText, allTags],
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

        {/* selected media section */}
        <View>
          {/* multi media selection section */}
          {showSelecting ? (
            <View style={styles.selectingMediaView}>
              <LMLoader size={10} />
              <Text style={styles.selectingMediaText}>Fetching Media</Text>
            </View>
          ) : formattedMediaAttachments ? (
            formattedMediaAttachments?.length > 1 ? (
              <LMCarousel
                attachments={formattedMediaAttachments}
                showCancel={postToEdit ? false : true}
                videoItem={{videoUrl: '', showControls: true}}
                onCancel={index => removeMediaAttachment(index)}
              />
            ) : (
              <>
                {/* single image selected section */}
                {formattedMediaAttachments[0]?.attachmentType ===
                  IMAGE_ATTACHMENT_TYPE && (
                  <LMImage
                    imageUrl={`${formattedMediaAttachments[0]?.attachmentMeta.url}`}
                    showCancel={postToEdit ? false : true}
                    onCancel={() => removeSingleAttachment()}
                  />
                )}
                {/* single video selected section  */}
                {formattedMediaAttachments[0]?.attachmentType ===
                  VIDEO_ATTACHMENT_TYPE && (
                  <LMVideo
                    videoUrl={`${formattedMediaAttachments[0]?.attachmentMeta.url}`}
                    showCancel={postToEdit ? false : true}
                    showControls
                    looping={false}
                    onCancel={() => removeSingleAttachment()}
                  />
                )}
              </>
            )
          ) : null}
          {/* selected document view section */}
          {formattedDocumentAttachments &&
            formattedDocumentAttachments.length >= 1 && (
              <LMDocument
                attachments={formattedDocumentAttachments}
                showCancel={postToEdit ? false : true}
                showMoreText={false}
                onCancel={index => removeDocumentAttachment(index)}
              />
            )}
          {/* added link preview section */}
          {formattedMediaAttachments.length <= 0 &&
            formattedDocumentAttachments.length <= 0 &&
            showLinkPreview &&
            formattedLinkAttachments.length >= 1 && (
              <LMLinkPreview
                attachments={formattedLinkAttachments}
                showCancel
                onCancel={() => {
                  setShowLinkPreview(false);
                  setClosedOnce(true);
                  setFormattedLinkAttachments([]);
                }}
              />
            )}
        </View>
        {/* add more media button section */}
        {!postToEdit &&
          allAttachment.length > 0 &&
          allAttachment.length < 10 && (
            <LMButton
              onTap={
                formattedMediaAttachments.length > 0
                  ? () => handleGallery(SELECT_BOTH)
                  : formattedDocumentAttachments.length > 0
                  ? () => handleDocument()
                  : () => {}
              }
              icon={{
                assetPath: require('../../assets/images/plusAdd_icon3x.png'),
                type: 'png',
                height: 20,
                width: 20,
              }}
              text={{
                text: ADD_MORE_MEDIA,
                textStyle: styles.addMoreButtonText,
              }}
              buttonStyle={styles.addMoreButtonView}
            />
          )}
      </ScrollView>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* screen header section*/}
      <LMHeader
        showBackArrow
        onBackPress={() => NavigationService.goBack()}
        heading={postToEdit ? 'Edit Post' : 'Create a Post'}
        rightComponent={
          // post button section
          <TouchableOpacity
            activeOpacity={0.8}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
            disabled={
              postToEdit
                ? false
                : allAttachment?.length > 0 ||
                  formattedLinkAttachments?.length > 0 ||
                  postContentText.trim() !== ''
                ? false
                : true
            }
            style={
              postToEdit
                ? styles.enabledOpacity
                : allAttachment?.length > 0 ||
                  formattedLinkAttachments?.length > 0 ||
                  postContentText.trim() !== ''
                ? styles.enabledOpacity
                : styles.disabledOpacity
            }
            onPress={
              postToEdit
                ? () => {
                    postEdit();
                  }
                : () => {
                    // store the media for uploading and navigate to feed screen
                    dispatch(
                      setUploadAttachments({
                        mediaAttachmentData: allAttachment,
                        linkAttachmentData: formattedLinkAttachments,
                        postContentData: postContentText.trim(),
                      }) as any,
                    );
                    NavigationService.goBack();
                  }
            }>
            <Text style={styles.headerRightComponentText}>
              {postToEdit ? SAVE_POST_TEXT : ADD_POST_TEXT}
            </Text>
          </TouchableOpacity>
        }
      />
      {/* handles the UI to be rendered for edit post and create post */}
      {!postToEdit ? (
        uiRenderForPost()
      ) : postDetail?.id ? (
        uiRenderForPost()
      ) : (
        // loader view section
        <View style={styles.rowAlignMent}>
          <LMLoader />
        </View>
      )}
      {/* selection options section */}
      {!postToEdit && showOptions && (
        <View>
          <View style={styles.selectionOptionsView}>
            {/* add photos button */}
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.optionItemView}
              onPress={() => {
                handleGallery(SELECT_IMAGE);
              }}>
              <LMIcon
                type="png"
                assetPath={require('../../assets/images/gallery_icon3x.png')}
              />
              <LMText
                text={ADD_IMAGES}
                textStyle={styles.selectionOptionstext}
              />
            </TouchableOpacity>
            {/* add video button */}
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.optionItemView}
              onPress={() => {
                handleGallery(SELECT_VIDEO);
              }}>
              <LMIcon
                type="png"
                assetPath={require('../../assets/images/video_icon3x.png')}
              />
              <LMText
                text={ADD_VIDEOS}
                textStyle={styles.selectionOptionstext}
              />
            </TouchableOpacity>
            {/* add files button */}
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.optionItemView}
              onPress={() => {
                handleDocument();
              }}>
              <LMIcon
                type="png"
                assetPath={require('../../assets/images/paperClip_icon3x.png')}
              />
              <LMText
                text={ADD_FILES}
                textStyle={styles.selectionOptionstext}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default CreatePost;
