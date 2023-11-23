import {
  View,
  Platform,
  TouchableOpacity,
  SafeAreaView,
  Text,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  detectURLs,
  requestStoragePermission,
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
  LMProfilePicture,
  LMText,
  LMVideo,
} from '../../../LikeMinds-ReactNative-Feed-UI';
import {
  ADD_FILES,
  ADD_IMAGES,
  ADD_MORE_MEDIA,
  ADD_POST_TEXT,
  ADD_VIDEOS,
  CREATE_POST_PLACEHOLDER_TEXT,
  FILE_UPLOAD_SIZE_VALIDATION,
  IMAGE_ATTACHMENT_TYPE,
  MAX_FILE_SIZE,
  MEDIA_UPLOAD_COUNT_VALIDATION,
  MIN_FILE_SIZE,
  SELECT_BOTH,
  SELECT_IMAGE,
  SELECT_VIDEO,
  VIDEO_ATTACHMENT_TYPE,
} from '../../constants/Strings';
import {DecodeURLRequest} from '@likeminds.community/feed-js-beta';
import _ from 'lodash';
import {
  getDecodedUrl,
  setUploadAttachments,
} from '../../store/actions/createPost';
import {useDispatch} from 'react-redux';
import {NavigationService} from '../../navigation';
import {UNIVERSAL_FEED} from '../../constants/screenNames';
import {
  convertImageVideoMetaData,
  convertDocumentMetaData,
  convertLinkMetaData,
} from '../../viewDataModels';
import {styles} from './styles';
import {showToastMessage} from '../../store/actions/toast';
import LMLoader from '../../../LikeMinds-ReactNative-Feed-UI/src/base/LMLoader';

const CreatePost = (props:any) => {  
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
  const [postContentText, setPostContentText] = useState('');
  const postToEdit = props?.route?.params

  // function handles the selection of images and videos
  const setSelectedImageVideo = (type: string) => {
    setShowSelecting(true);
    selectImageVideo(type)?.then((res: any) => {
      if (res?.didCancel) {
        setShowSelecting(false);
      } else {
        const mediaWithSizeCheck = [];
        // checks the size of media
        for (const media of res?.assets) {
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
        const responsePromises = links.map((item: string) => {
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
        });

        Promise.all(responsePromises)
          .then(async responses => {
            if (!responses.includes(undefined)) {
              const convertedLinkData = await convertLinkMetaData(responses);
              setFormattedLinkAttachments(convertedLinkData);
              if (!closedOnce) {
                setShowLinkPreview(true);
              }
            }
            // Do something with the array of responses
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
  }, [postContentText]);

  // all image/video/document media to be uploaded
  const allAttachment = [
    ...formattedMediaAttachments,
    ...formattedDocumentAttachments,
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* screen header section*/}
      <LMHeader
        showBackArrow
        onBackPress={() => NavigationService.navigate(UNIVERSAL_FEED)}
        heading={postToEdit ? "Edit Post" : "Create a Post"}
        rightComponent={
          // post button section
          <TouchableOpacity
            activeOpacity={0.8}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
            disabled={
              allAttachment?.length > 0 ||
              formattedLinkAttachments?.length > 0 ||
              postContentText.trim() != ''
                ? false
                : true
            }
            style={{
              opacity:
                allAttachment?.length > 0 ||
                formattedLinkAttachments?.length > 0 ||
                postContentText.trim() != ''
                  ? 1
                  : 0.5,
            }}
            onPress={() => {
              // store the media for uploading and navigate to feed screen
              dispatch(
                setUploadAttachments({
                  mediaAttachmentData: allAttachment,
                  linkAttachmentData: formattedLinkAttachments,
                  postContentData: postContentText.trim(),
                }) as any,
              );
              NavigationService.goBack();
            }}>
            <Text style={{color: '#5046E5', fontSize: 16, fontWeight: '500'}}>
              {ADD_POST_TEXT}
            </Text>
          </TouchableOpacity>
        }
      />
      <ScrollView style={{flex: 1, marginBottom: showOptions ? 125 : 0}}>
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
          inputText={postContentText}
          onType={val => {
            setPostContentText(val);
          }}
        />

        {/* selected media section */}
        <View>
          {/* multi media selection section */}
          {showSelecting ? (
            <View
              style={{
                height: 300,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <LMLoader size={10} />
              <Text style={{color: '#666666', marginTop: 12}}>
                Fetching Media
              </Text>
            </View>
          ) : formattedMediaAttachments ? (
            formattedMediaAttachments?.length > 1 ? (
              <LMCarousel
                attachments={formattedMediaAttachments}
                showCancel
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
                    showCancel
                    onCancel={() => removeSingleAttachment()}
                  />
                )}
                {/* single video selected section  */}
                {formattedMediaAttachments[0]?.attachmentType ===
                  VIDEO_ATTACHMENT_TYPE && (
                  <LMVideo
                    videoUrl={`${formattedMediaAttachments[0]?.attachmentMeta.url}`}
                    showCancel
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
                showCancel
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
        {allAttachment.length > 0 && allAttachment.length < 10 && (
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
      {/* selection options section */}
      {showOptions && (
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
                assetPath={require('../../assets/images/gallery_icon3x.png')}></LMIcon>
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
                assetPath={require('../../assets/images/video_icon3x.png')}></LMIcon>
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
                assetPath={require('../../assets/images/paperClip_icon3x.png')}></LMIcon>
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
