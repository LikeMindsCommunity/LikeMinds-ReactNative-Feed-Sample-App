import {StyleSheet} from 'react-native';
import STYLES from '../../constants/Styles';
import Layout from '../../constants/Layout';

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
  },
  modalContainer: {
    backgroundColor: STYLES.$BACKGROUND_COLORS.LIGHT,
    elevation: 8,
    paddingHorizontal: 18,
    paddingVertical: 12,
    marginHorizontal: STYLES.$MARGINS.XL,
  },
  textHeading: {
    color: STYLES.$COLORS.darkTextColor,
    fontSize: STYLES.$FONT_SIZES.LARGE,
    fontWeight: STYLES.$FONT_WEIGHTS.MEDIUM,
    fontFamily: STYLES.$FONT_FAMILY.REGULAR,
    marginVertical: STYLES.$MARGINS.SMALL,
  },
  text: {
    color: STYLES.$COLORS.postDescriptionTextColor,
    fontSize: STYLES.$FONT_SIZES.LARGE,
    fontWeight: STYLES.$FONT_WEIGHTS.REGULAR,
    fontFamily: STYLES.$FONT_FAMILY.REGULAR,
  },
  reasonText: {
    color: '#9b9b9b',
    fontSize: STYLES.$FONT_SIZES.LARGE,
    fontWeight: STYLES.$FONT_WEIGHTS.REGULAR,
    fontFamily: STYLES.$FONT_FAMILY.REGULAR,
  },
  reasonsSelectionView: {
    borderWidth: 0.5,
    borderRadius: 8,
    marginTop: STYLES.$MARGINS.XL,
    borderColor: STYLES.$COLORS.darkTextColor,
    padding: STYLES.$PADDINGS.SMALL,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownIcon: {
    width: Layout.normalize(30),
    height: Layout.normalize(30),
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: STYLES.$MARGINS.XL,
    paddingBottom: STYLES.$PADDINGS.XS,
  },
  deleteTextBtn: {
    color: '#5046e5',
    fontWeight: STYLES.$FONT_WEIGHTS.MEDIUM,
    fontSize: 15,
    fontFamily: STYLES.$FONT_FAMILY.REGULAR,
  },
  cancelTextBtn: {
    color: '#9b9b9b',
    fontWeight: STYLES.$FONT_WEIGHTS.MEDIUM,
    fontSize: 15,
    fontFamily: STYLES.$FONT_FAMILY.REGULAR,
    marginRight: 40,
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
  asteriskTextStyle: {
    color: 'red',
  },
});

export default styles;
