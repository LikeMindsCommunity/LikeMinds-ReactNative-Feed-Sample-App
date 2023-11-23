import {StyleSheet} from 'react-native';
import STYLES from '../../constants/Styles';
import Layout from '../../constants/Layout';

const styles = StyleSheet.create({
  page: {
    backgroundColor: STYLES.$BACKGROUND_COLORS.LIGHT,
    flex: 1,
    paddingTop: STYLES.$PADDINGS.SMALL,
  },
  textHeading: {
    color: STYLES.$COLORS.darkTextColor,
    fontSize: STYLES.$FONT_SIZES.LARGE,
    fontWeight: STYLES.$FONT_WEIGHTS.MEDIUM,
    fontFamily: STYLES.$FONT_FAMILY.REGULAR,
  },
  text: {
    color: STYLES.$COLORS.postDescriptionTextColor,
    fontSize: STYLES.$FONT_SIZES.LARGE,
    fontFamily: STYLES.$FONT_FAMILY.REGULAR,
  },
  btnText: {
    color: STYLES.$COLORS.postDescriptionTextColor,
    fontSize: STYLES.$FONT_SIZES.MEDIUM,
    fontFamily: STYLES.$FONT_FAMILY.REGULAR,
  },
  reasonsBtn: {
    borderRadius: 18,
    paddingVertical: 8,
    paddingHorizontal: STYLES.$PADDINGS.MEDIUM,
    margin: 8,
    borderWidth: 1,
    borderColor: '#9B9B9B',
  },
  reportBtnParent: {
    justifyContent: 'center',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 40,
    zIndex: -1,
  },
  reportBtn: {
    backgroundColor: STYLES.$COLORS.RED,
    borderRadius: 25,
    paddingHorizontal: 50,
    paddingVertical: STYLES.$PADDINGS.MEDIUM,
  },
  reportBtnText: {
    color: STYLES.$COLORS.whiteTextColor,
    fontSize: STYLES.$FONT_SIZES.LARGE,
    fontWeight: STYLES.$FONT_WEIGHTS.BOLD,
    fontFamily: STYLES.$FONT_FAMILY.REGULAR,
  },
  disabledReportBtn: {
    backgroundColor: '#D0D8E2',
    borderRadius: 25,
    paddingHorizontal: 50,
    paddingVertical: STYLES.$PADDINGS.MEDIUM,
  },
  titleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#D8D8D8',
    borderBottomWidth: 1,
    paddingHorizontal: STYLES.$PADDINGS.LARGE,
    paddingVertical: STYLES.$PADDINGS.SMALL,
    alignItems: 'center',
  },
  titleText: {
    color: STYLES.$COLORS.RED,
    fontSize: STYLES.$FONT_SIZES.XXL,
    fontWeight: STYLES.$FONT_WEIGHTS.MEDIUM,
    fontFamily: STYLES.$FONT_FAMILY.REGULAR,
  },
  contentView: {
    gap: 15,
    paddingHorizontal: STYLES.$PADDINGS.LARGE,
    paddingTop: STYLES.$PADDINGS.SMALL,
  },
  tagView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: STYLES.$MARGINS.MEDIUM,
    paddingHorizontal: STYLES.$PADDINGS.LARGE,
  },
  otherSection: {
    marginTop: STYLES.$MARGINS.XL,
    paddingHorizontal: STYLES.$PADDINGS.LARGE,
  },
  otherTextInput: {
    margin: 12,
    borderBottomWidth: 1,
    padding: STYLES.$PADDINGS.SMALL,
    paddingLeft: 0,
    fontSize: STYLES.$FONT_SIZES.MEDIUM,
    fontFamily: STYLES.$FONT_FAMILY.LIGHT,
    color: STYLES.$COLORS.darkTextColor,
  },
  dropdownIcon: {
    width: Layout.normalize(18),
    height: Layout.normalize(18),
  },
  modalView: {
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    backgroundColor: STYLES.$BACKGROUND_COLORS.DARK,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  filterText: {
    fontSize: STYLES.$FONT_SIZES.LARGE,
    fontFamily: STYLES.$FONT_FAMILY.REGULAR,
    color: STYLES.$COLORS.whiteTextColor,
  },
});

export default styles;
