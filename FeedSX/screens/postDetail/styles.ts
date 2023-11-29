import {StyleSheet} from 'react-native';
import Layout from '../../constants//Layout';

export const styles = StyleSheet.create({
  flexView: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    height: Layout.window.height - Layout.normalize(44),
  },
  commentCountText: {
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 5,
    fontWeight: '500',
    color: '#222020',
    backgroundColor: '#fff',
  },
  viewMoreText: {
    color: '#484F67',
    fontWeight: '500',
    marginVertical: 24,
  },
  noCommentSection: {
    alignItems: 'center',
    marginTop: 10,
    paddingBottom: Layout.window.height / 6.2,
  },
  noCommentText: {color: '#0F1E3D66', fontSize: 16, fontWeight: '500'},
  loaderView: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 30,
  },
  replyCommentSection: {
    position: 'absolute',
    bottom: Layout.normalize(44),
    backgroundColor: '#e9e9e9',
    paddingHorizontal: 15,
    width: Layout.window.width,
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  crossIconStyle: {
    width: 15,
    height: 15,
    tintColor: '#000',
  },
  textInputStyle: {
    margin: 0,
    borderRadius: 0,
    paddingVertical: 0,
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    height: Layout.normalize(44),
    paddingHorizontal: 15,
    fontSize: 14,
    color: '#222020',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  lightGreyColorText: {color: '#0F1E3D66'},
});
