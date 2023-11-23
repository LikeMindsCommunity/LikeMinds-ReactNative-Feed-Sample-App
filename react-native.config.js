module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: ['./FeedSX/assets/fonts/'],
  dependencies: {
    'react-native-video': {
      platforms: {
        android: {
          sourceDir: '../node_modules/react-native-video/android-exoplayer',
        },
      },
    },
  },
};
