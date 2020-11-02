import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';


interface SpotifyNewReleaseState {
  albumList : any;
  offset: string;
  totalrecord: string;
}

const initialState: SpotifyNewReleaseState = {
  albumList: [],
  offset: "0",
  totalrecord: "0",
};

export const spotifynewreleaseSlice = createSlice({
  name: 'spotifyNewRelease',
  initialState,
  reducers: {
    setAlbumList: (state, action: PayloadAction<string>) => {
      state.albumList = action.payload;
    },
    setOffset: (state, action: PayloadAction<string>) => {
      state.offset = action.payload;
    },
    setTotalrecord: (state, action: PayloadAction<string>) => {
      state.totalrecord = action.payload;
    },
  },
});

export const { setAlbumList } = spotifynewreleaseSlice.actions;
export const { setOffset } = spotifynewreleaseSlice.actions;
export const { setTotalrecord} = spotifynewreleaseSlice.actions;

export const selectAlbumList = (state: RootState) => state.spotifyNewRelease.albumList;
export const selectOffset = (state: RootState) => state.spotifyNewRelease.offset;
export const selectTotalrecord = (state: RootState) => state.spotifyNewRelease.totalrecord;

export const setNewReleaseAsync = (accessToken: string, offset: string, currentoffset: string, totalrecord: string): AppThunk => dispatch => {
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

  fetch('https://api.spotify.com/v1/browse/new-releases?offset='+tempOffset, {
    method: 'GET',
    headers: myHeaders,
  }).then(response => response.json())
    .then((data) => {
      console.log(data);
      dispatch(setAlbumList(data.albums.items));
      dispatch(setOffset(data.albums.offset));
      dispatch(setTotalrecord(data.albums.total));

    }).catch((error) => {
      console.log(error);
      if (error instanceof XMLHttpRequest) {
        if (error.status === 401) {
        }
      }
    });
};

export default spotifynewreleaseSlice.reducer;
