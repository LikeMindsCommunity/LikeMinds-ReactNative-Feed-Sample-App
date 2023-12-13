import {View, SafeAreaView} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {FlashList} from '@shopify/flash-list';
import {
  GetCommentLikesRequest,
  GetPostLikesRequest,
} from '@likeminds.community/feed-js';
import {commentLikes, postLikes} from '../../store/actions/postLikes';
import {useDispatch} from 'react-redux';
import {useAppSelector} from '../../store/store';
import {
  LMHeader,
  LMLikeUI,
  LMMemberListItem,
} from '../../../LikeMinds-ReactNative-Feed-UI';
import {NavigationService} from '../../navigation';
import LMLoader from '../../../LikeMinds-ReactNative-Feed-UI/src/base/LMLoader';
import {COMMENT_LIKES, POST_LIKES} from '../../constants/Strings';
import {styles} from './styles';

const LikesList = (props: any) => {
  const dispatch = useDispatch();
  const {postLike, totalLikes} = useAppSelector(state => state.postLikes);

  // this function calls the post likes api
  const postLikesList = useCallback(
    async (id: string) => {
      const payload = {
        postId: id,
      };
      // calling post likes api
      const postLikesResponse = await dispatch(
        postLikes(
          GetPostLikesRequest.builder()
            .setpostId(payload.postId)
            .setpage(1)
            .setpageSize(10)
            .build(),
        ) as any,
      );
      return postLikesResponse;
    },
    [dispatch],
  );

  // this function calls the comment likes api
  const commentLikesList = useCallback(
    async (id: string, postId: string) => {
      const payload = {
        commentId: id,
        postId: postId,
      };
      // calling post likes api
      const commentLikesResponse = await dispatch(
        commentLikes(
          GetCommentLikesRequest.builder()
            .setcommentId(payload.commentId)
            .setpage(1)
            .setpageSize(10)
            .setpostId(payload.postId)
            .build(),
        ) as any,
      );
      return commentLikesResponse;
    },
    [dispatch],
  );

  // this calls the post likes list function to render the data
  useEffect(() => {
    if (props.route.params[0] === COMMENT_LIKES) {
      commentLikesList(props.route.params[1], props.route.params[2]);
    }
    if (props.route.params[0] === POST_LIKES) {
      postLikesList(props.route.params[1]);
    }
  }, [commentLikesList, postLikesList, props.route.params]);

  return (
    <SafeAreaView style={styles.mainContainer}>
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
        <View style={styles.loaderView}>
          <LMLoader />
        </View>
      )}
    </SafeAreaView>
  );
};

export default LikesList;
