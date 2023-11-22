import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import thunk, {ThunkMiddleware} from 'redux-thunk';
import apiMiddleware from './apiMiddleware';
import {feedReducer} from './reducers/feedReducer';
import {loader} from './reducers/loader';
import { postLikesReducer } from './reducers/postLikesReducer';
import { createPostReducer } from './reducers/createPostReducer';
import { postDetailReducer } from './reducers/postDetailReducer';

const rootReducer = combineReducers({
  feed: feedReducer,
  loader: loader,
  postLikes: postLikesReducer,
  createPost: createPostReducer,
  postDetail: postDetailReducer
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk as ThunkMiddleware, apiMiddleware],
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
