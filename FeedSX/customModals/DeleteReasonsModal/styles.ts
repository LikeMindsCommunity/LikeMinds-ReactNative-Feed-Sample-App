import {StyleSheet} from 'react-native';
import STYLES from '../../constants/Styles';

const styles = StyleSheet.create({
  modal: {
    flex: 1,
  },
  modalContainer: {
    backgroundColor: STYLES.$BACKGROUND_COLORS.LIGHT,
    elevation: 8,
    paddingVertical: STYLES.$PADDINGS.SMALL,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  textHeading: {
    color: STYLES.$COLORS.darkTextColor,
    fontSize: STYLES.$FONT_SIZES.LARGE,
    fontWeight: STYLES.$FONT_WEIGHTS.MEDIUM,
    fontFamily: STYLES.$FONT_FAMILY.REGULAR,
    marginVertical: STYLES.$MARGINS.SMALL,
    paddingHorizontal: STYLES.$PADDINGS.MEDIUM,
  },
  btnText: {
    color: '#333333',
    fontSize: STYLES.$FONT_SIZES.MEDIUM,
    fontWeight: STYLES.$FONT_WEIGHTS.REGULAR,
    fontFamily: STYLES.$FONT_FAMILY.REGULAR,
  },
  reasonsBtn: {
    borderRadius: 16,
    padding: 8,
    borderWidth: 2,
    width: 12,
    height: 12,
    borderColor: '#919191',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedReasonBtn: {
    borderRadius: 16,
    width: 10,
    height: 10,
    borderColor: '#919191',
  },
  tagItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  radioBtnView: {
    width: '15%',
    alignItems: 'center',
  },
  reasonTextView: {
    borderBottomWidth: 1,
    borderColor: '#e7ebf1',
    width: '84%',
    paddingVertical: 18,
  },
  selectedReasonView: {
    backgroundColor: '#919191',
  },
  defaultReasonView: {
    backgroundColor: '#ffffff',
  },
});

export default styles;
