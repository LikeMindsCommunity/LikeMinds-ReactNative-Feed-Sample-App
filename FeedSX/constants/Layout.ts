import {Dimensions, PixelRatio} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const scale = width / 375;

const normalize = (size: number) => {
  return PixelRatio.roundToNearestPixel(size * scale);
};

export default {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
  normalize,
};
