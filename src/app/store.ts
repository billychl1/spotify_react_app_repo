import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authorizationReducer from '../features/authorization/authorizationSlice';
import spotifyUserInfoReducer from '../features/spotifyUserInfo/spotifyUserInfoSlice';
import spotifyNewReleaseReducer from '../features/spotifyNewRelease/spotifyNewReleaseSlice';
import spotifyCategoryReducer from '../features/spotifyCategory/spotifyCategorySlice';
import spotifyFeaturePlaylistReducer from '../features/spotifyFeaturePlaylist/spotifyFeaturePlaylistSlice';

export const store = configureStore({
  reducer: {
    authorization: authorizationReducer,
    spotifyUserInfo: spotifyUserInfoReducer,
    spotifyNewRelease: spotifyNewReleaseReducer,
    spotifyCategory: spotifyCategoryReducer,
    spotifyFeaturePlaylist: spotifyFeaturePlaylistReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
