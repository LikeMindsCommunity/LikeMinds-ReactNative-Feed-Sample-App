import {StyleSheet} from 'react-native';
import STYLES from '../../constants/Styles';

export const styles = StyleSheet.create({
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
