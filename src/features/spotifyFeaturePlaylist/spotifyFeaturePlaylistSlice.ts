import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';


interface SpotifyFeaturePlaylistState {
  featurePlaylistList: any;
  offset: string;
  totalrecord: string;
}

const initialState: SpotifyFeaturePlaylistState = {
  featurePlaylistList: [],
  offset: "0",
  totalrecord: "0",
};

export const spotifyfeatureplaylistSlice = createSlice({
  name: 'spotifyFeaturePlaylist',
  initialState,
  reducers: {
    setFeaturePlaylistList: (state, action: PayloadAction<string>) => {
      state.featurePlaylistList = action.payload;
    },
    setOffset: (state, action: PayloadAction<string>) => {
      state.offset = action.payload;
    },
    setTotalrecord: (state, action: PayloadAction<string>) => {
      state.totalrecord = action.payload;
    },
  },
});

export const { setFeaturePlaylistList } = spotifyfeatureplaylistSlice.actions;
export const { setOffset } = spotifyfeatureplaylistSlice.actions;
export const { setTotalrecord} = spotifyfeatureplaylistSlice.actions;

export const selectFeaturePlaylistList = (state: RootState) => state.spotifyFeaturePlaylist.featurePlaylistList;
export const selectOffset = (state: RootState) => state.spotifyFeaturePlaylist.offset;
export const selectTotalrecord = (state: RootState) => state.spotifyFeaturePlaylist.totalrecord;

export const setFeaturePlaylistAsync = (accessToken: string, offset: string, currentoffset: string, totalrecord: string): AppThunk => dispatch => {
  const myHeaders = new Headers();
  myHeaders.append('Authorization', 'Bearer ' + accessToken);
  let tempOffset = 0;
  if (offset == "0")
    setOffset("0");
  else if (offset == "-")
  {
    tempOffset = Number.parseInt(currentoffset)-20;
    if ( tempOffset < 0)
      tempOffset = 0;
    setOffset(tempOffset.toString());
  }
  else if (offset == "+")
  {
    tempOffset = Number.parseInt(currentoffset)+20;
    if ( tempOffset >= Number.parseInt(totalrecord))
      tempOffset -= 20;
    setOffset(tempOffset.toString());
  }

  fetch('https://api.spotify.com/v1/browse/featured-playlists?offset='+tempOffset, {
    method: 'GET',
    headers: myHeaders,
  }).then(response => response.json())
    .then((data) => {
      console.log(data);
      dispatch(setFeaturePlaylistList(data.playlists.items));
      dispatch(setOffset(data.playlists.offset));
      dispatch(setTotalrecord(data.playlists.total));
      
    }).catch((error) => {
      console.log(error);
      if (error instanceof XMLHttpRequest) {
        if (error.status === 401) {
        }
      }
    });
};

export default spotifyfeatureplaylistSlice.reducer;
