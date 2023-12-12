import {Platform, StyleSheet} from 'react-native';
import layout from '../../constants/Layout';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: layout.window.height,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 12,
  },
  userNameText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#222020',
    marginLeft: 8,
    textTransform: 'capitalize',
  },
  textInputView: {
    marginHorizontal: 15,
    marginVertical: 8,
    fontSize: 16,
    elevation: 0,
    maxHeight: 220,
  },
  addMoreButtonView: {
    width: '35%',
    borderColor: '#5046E5',
    borderWidth: 1,
    borderRadius: 8,
    alignSelf: 'center',
    paddingVertical: 8,
    marginVertical: 20,
  },
  selectionOptionsView: {
    position: 'absolute',
    bottom: 0,
    width: layout.window.width,
    backgroundColor: '#fff',
    height: 122,
  },
  optionItemView: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#D0D8E280',
    borderBottomWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 7,
  },
  addMoreButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#5046E5',
    marginLeft: 5,
  },
  selectionOptionstext: {
    marginLeft: 8,
    color: '#222020',
  },
  postButtonDisabled: {
    opacity: 0.5,
  },
  postButtonEnable: {
    opacity: 1,
  },
  postTextStyle: {color: '#5046E5', fontSize: 16, fontWeight: '500'},
  scrollViewStyleWithOptions: {
    flex: 1,
    marginBottom: 125,
  },
  scrollViewStyleWithoutOptions: {
    flex: 1,
    marginBottom: 0,
  },
  selectingMediaView: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectingMediaText: {color: '#666666', marginTop: 12},
  rowAlignMent: {flex: 1, justifyContent: 'center'},
  headerRightComponentText: {color: '#5046E5', fontSize: 16, fontWeight: '500'},
  enabledOpacity: {opacity: 1},
  disabledOpacity: {opacity: 0.5},
  taggingListView: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    width: '100%',
    position: 'relative',
    borderColor: '#000',
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  taggingListItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomColor: '#e0e0e0',
    borderBottomWidth: 1,
  },
  taggingListProfileBoxStyle: {
    borderRadius: 50,
    marginRight: 10,
  },
  taggingListItemTextView: {
    flex: 1,
    paddingVertical: 15,
    gap: Platform.OS === 'ios' ? 5 : 0,
  },
  taggingListText: {fontSize: 14, color: '#000'},
  taggingLoaderView: {paddingVertical: 20},
});
