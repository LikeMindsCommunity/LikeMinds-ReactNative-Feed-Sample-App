import {StyleSheet} from 'react-native';
import Layout from '../../constants/Layout';
import STYLES from '../../constants/Styles';

export const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
  },
  uploadingPostContentView: {flexDirection: 'row', alignItems: 'center'},
  uploadingVideoStyle: {backgroundColor: STYLES.$BACKGROUND_COLORS.LIGHT},
  uploadingImageStyle: {backgroundColor: STYLES.$BACKGROUND_COLORS.LIGHT},
  uploadingDocumentStyle: {marginRight: 2, resizeMode: 'contain'},
  postUploadingText: {color: '#333333'},
  newPostButtonView: {
    backgroundColor: '#5046E5',
    flexDirection: 'row',
    width: '40%',
    alignItems: 'center',
    padding: STYLES.$PADDINGS.SMALL,
    justifyContent: 'center',
    borderRadius: 25,
    position: 'absolute',
    top: Layout.window.height - 100,
    right: 20,
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 2.5,
      height: 2.5,
    },
  },
  newPostText: {
    fontSize: 15,
    fontWeight: STYLES.$FONT_WEIGHTS.MEDIUM,
    color: STYLES.$COLORS.whiteTextColor,
    fontFamily: STYLES.$FONT_FAMILY.BOLD,
    marginLeft: STYLES.$MARGINS.SMALL,
  },
  postUploadingView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 10,
    height: 50,
  },
  uploadingImageVideoBox: {
    backgroundColor: '#fff',
    width: 49,
    height: 42,
    marginRight: 10,
  },
  uploadingPdfIconSize: {
    width: 45,
    height: 32,
  },
  loaderView: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 30,
  },
  noDataView: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center',
    marginBottom: 30,
  },
  newPostButtonEnable: {
    opacity: 1,
  },
  newPostButtonDisable: {
    opacity: 0.8,
  },
  newPostButtonIcon: {
    width: 30,
    height: 30,
  },
});
