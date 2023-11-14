import {View, SafeAreaView} from 'react-native';
import React, {useEffect} from 'react';
import {FlashList} from '@shopify/flash-list';
import {GetCommentLikesRequest, GetPostLikesRequest} from '@likeminds.community/feed-js-beta';
import {commentLikes, postLikes} from '../../store/actions/postLikes';
import {useDispatch} from 'react-redux';
import {useAppSelector} from '../../store/store';
import {
  LMHeader,
  LMMemberListItem,
} from '../../../LikeMinds-ReactNative-Feed-UI';
import {NavigationService} from '../../navigation';
import {UNIVERSAL_FEED} from '../../constants/screenNames';
import LMLoader from '../../../LikeMinds-ReactNative-Feed-UI/src/base/LMLoader';
import { COMMENT_LIKES, POST_LIKES } from '../../constants/Strings';

const LikesList = (props: any) => {
  const dispatch = useDispatch();
  const {postLike, totalLikes, user} = useAppSelector(state => state.postLikes);

  // this function calls the post likes api
  async function postLikesList(id: string) {
    let payload = {
      postId: id,
    };
    // calling post likes api
    let postLikesResponse = await dispatch(
      postLikes(
        GetPostLikesRequest.builder()
          .setpostId(payload.postId)
          .setpage(1)
          .setpageSize(10)
          .build(),
      ) as any,
    );
    return postLikesResponse;
  }

  // this function calls the comment likes api
  async function commentLikesList(id: string, postId: string) {
    let payload = {
      commentId: id,
      postId: postId
    };
    // calling post likes api
    let commentLikesResponse = await dispatch(
      commentLikes(GetCommentLikesRequest.builder().setcommentId(payload.commentId).setpage(1).setpageSize(10).setpostId(payload.postId).build()) as any,
    );
    return commentLikesResponse;
  }

  // this calls the post likes list function to render the data
  useEffect(() => {    
    if(props.route.params[0] === COMMENT_LIKES) {
      commentLikesList(props.route.params[1],props.route.params[2]);
    } 
    if(props.route.params[0] === POST_LIKES) {
      postLikesList(props.route.params[1]);
    } 
  }, []);
  
  return (
    <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
      <LMHeader
        showBackArrow
        heading="Likes"
        subHeading={
          totalLikes > 1 ? `${totalLikes} likes` : `${totalLikes} like`
        }
        onBackPress={() => NavigationService.goBack()}
      />
      {/* post likes list */}
      {postLike?.length > 0 ? (
        <FlashList
          data={postLike}
          renderItem={({item}: {item: LMLikeUI}) => {
            return <LMMemberListItem likes={item} />;
          }}
          estimatedItemSize={100}
        />
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <LMLoader />
        </View>
      )}
    </SafeAreaView>
  );
};

export default LikesList;
