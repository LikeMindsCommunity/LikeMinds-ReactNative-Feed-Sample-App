import {
  View,
  Text,
  Modal,
  Pressable,
  TouchableOpacity,
  TextInput,
  Image,
  Keyboard,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import styles from './styles';
import {useDispatch} from 'react-redux';
import {getReportTags, postReport} from '../../store/actions/feed';
import {
  GetReportTagsRequest,
  PostReportRequest,
} from '@likeminds.community/feed-js-beta';
import {useAppSelector} from '../../store/store';
import {
  COMMENT_REPORTED_SUCCESSFULLY,
  COMMENT_REPORT_ENTITY_TYPE,
  COMMENT_TYPE,
  POST_REPORT_ENTITY_TYPE,
  POST_TYPE,
  REASON_FOR_DELETION_PLACEHOLDER,
  REPLY_REPORT_ENTITY_TYPE,
  REPORTED_SUCCESSFULLY,
  REPORT_INSTRUSTION,
  REPORT_PROBLEM,
  REPORT_REASON_VALIDATION,
  REPORT_TAGS_TYPE,
  SOMETHING_WENT_WRONG,
} from '../../constants/Strings';
import {showToastMessage} from '../../store/actions/toast';
import LMLoader from '../../../LikeMinds-ReactNative-Feed-UI/src/base/LMLoader';
import {SafeAreaView} from 'react-native';
import Toast from 'react-native-toast-message';
import {LMCommentUI, LMPostUI} from '../../../LikeMinds-ReactNative-Feed-UI';

// interface for post report api request
interface ReportRequest {
  entityId: string;
  entityType: number;
  reason: string;
  tagId: number;
  uuid: string;
}

// post report modal props
interface ReportModalProps {
  visible: boolean;
  closeModal: () => void;
  reportType: string;
  postDetail: LMPostUI;
  commentDetail?: LMCommentUI;
}

const ReportModal = ({
  visible,
  closeModal,
  reportType,
  postDetail,
  commentDetail,
}: ReportModalProps) => {
  const dispatch = useDispatch();
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [otherReason, setOtherReason] = useState('');
  const [selectedId, setSelectedId] = useState(-1);
  const reportTags = useAppSelector(state => state.feed.reportTags);

  // this function calls the get report tags api for reporting a post
  const fetchReportTags = useCallback(async () => {
    const payload = {
      type: REPORT_TAGS_TYPE, // type 3 for report tags
    };
    const reportTagsResponse = await dispatch(
      getReportTags(
        GetReportTagsRequest.builder().settype(payload.type).build(),
      ) as any,
    );
    return reportTagsResponse;
  }, [dispatch]);

  // this function calls the report post api
  const reportPost = async ({
    entityId,
    entityType,
    reason,
    tagId,
    uuid,
  }: ReportRequest) => {
    if (selectedIndex === 5 && otherReason === '') {
      showToast();
    } else {
      const payload = {
        entityId: entityId,
        entityType: entityType,
        reason: reason,
        tagId: tagId,
        uuid: uuid,
      };
      setSelectedId(-1);
      setSelectedIndex(-1);
      closeModal();
      const postReportResponse = await dispatch(
        postReport(
          PostReportRequest.builder()
            .setEntityId(payload.entityId)
            .setEntityType(payload.entityType)
            .setReason(payload.reason)
            .setTagId(payload.tagId)
            .setUuid(payload.uuid)
            .build(),
        ) as any,
      );
      // toast message action
      if (postReportResponse) {
        dispatch(
          showToastMessage({
            isToast: true,
            message:
              reportType === POST_TYPE
                ? REPORTED_SUCCESSFULLY
                : COMMENT_REPORTED_SUCCESSFULLY,
          }) as any,
        );
      } else {
        dispatch(
          showToastMessage({
            isToast: true,
            message: SOMETHING_WENT_WRONG,
          }) as any,
        );
      }
      return postReportResponse;
    }
  };

  // this functions make the toast visible
  const showToast = () => {
    Toast.show({
      position: 'bottom',
      type: 'reportToastView',
      autoHide: true,
      visibilityTime: 1500,
    });
  };

  const renderToastView = () => {
    return (
      <View style={styles.toastViewStyle}>
        <View>
          <View style={styles.modalView}>
            <Text style={styles.filterText}>{REPORT_REASON_VALIDATION}</Text>
          </View>
        </View>
      </View>
    );
  };
  // toast message view UI
  const toastConfig = {
    reportToastView: () => renderToastView(),
  };

  // this calls the fetchReportTags api when the modal gets visible
  useEffect(() => {
    if (visible) {
      fetchReportTags();
    }
  }, [visible, fetchReportTags]);

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={() => {
        setSelectedId(-1);
        setSelectedIndex(-1);
        closeModal();
      }}>
      <SafeAreaView style={styles.page}>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.contentBox}
          onPress={() => Keyboard.dismiss()}>
          {/* header section */}
          <View style={styles.titleView}>
            <Text style={styles.titleText}>Report Abuse</Text>
            <TouchableOpacity
              activeOpacity={0.8}
              hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
              onPress={() => {
                setSelectedId(-1);
                setSelectedIndex(-1);
                closeModal();
              }}>
              <Image
                source={require('../../assets/images/close_icon3x.png')}
                style={styles.dropdownIcon}
              />
            </TouchableOpacity>
          </View>

          {/* modal content */}
          <View style={styles.contentView}>
            <Text style={styles.textHeading}>{REPORT_PROBLEM}</Text>
            <Text style={styles.text}>{REPORT_INSTRUSTION(reportType)}</Text>
          </View>

          {/* report tags list section */}
          <View style={styles.tagView}>
            {reportTags.length > 0 ? (
              reportTags?.map((res: any, index: number) => {
                return (
                  <Pressable
                    key={res?.id}
                    onPress={() => {
                      setSelectedIndex(index);
                      setSelectedId(res.id);
                    }}>
                    <View
                      style={[
                        styles.reasonsBtn,
                        index === selectedIndex
                          ? styles.selectedReasonItemView
                          : styles.defaultReasonItemView,
                      ]}>
                      <Text
                        style={[
                          styles.btnText,
                          selectedIndex === index
                            ? styles.selectedReasonText
                            : styles.defaultReasonText,
                        ]}>
                        {res.name}
                      </Text>
                    </View>
                  </Pressable>
                );
              })
            ) : (
              <View style={styles.loaderView}>
                <LMLoader />
              </View>
            )}
          </View>

          {/* text input view for other reason text*/}
          {selectedIndex === 5 ? (
            <View style={styles.otherSection}>
              <TextInput
                onChangeText={e => {
                  setOtherReason(e);
                }}
                style={styles.otherTextInput}
                placeholder={REASON_FOR_DELETION_PLACEHOLDER}
                value={otherReason}
                placeholderTextColor={'#999999'}
              />
            </View>
          ) : null}

          {/* toast component */}
          <Toast config={toastConfig} />
          {/* report button */}
          <View style={styles.reportBtnParent}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={
                selectedId !== -1 || otherReason
                  ? styles.reportBtn
                  : styles.disabledReportBtn
              }
              onPress={
                selectedId !== -1 || otherReason
                  ? () => {
                      reportPost({
                        entityId:
                          reportType === POST_TYPE
                            ? postDetail?.id
                            : commentDetail
                            ? commentDetail?.id
                            : '',
                        entityType:
                          reportType === POST_TYPE
                            ? POST_REPORT_ENTITY_TYPE
                            : reportType === COMMENT_TYPE
                            ? COMMENT_REPORT_ENTITY_TYPE
                            : REPLY_REPORT_ENTITY_TYPE, // different entityType value for post/comment/reply
                        reason: otherReason,
                        tagId: selectedId,
                        uuid:
                          reportType === POST_TYPE
                            ? postDetail?.uuid
                            : commentDetail
                            ? commentDetail?.uuid
                            : '',
                      });
                    }
                  : () => null
              }>
              <Text style={styles.reportBtnText}>REPORT</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    </Modal>
  );
};

export default ReportModal;
