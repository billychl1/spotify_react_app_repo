import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';


interface SpotifyCategoryState {
  categoryList: any;
  offset: string;
  totalrecord: string;
}

const initialState: SpotifyCategoryState = {
  categoryList: [],
  offset: "0",
  totalrecord: "0",
};

export const spotifycategorySlice = createSlice({
  name: 'spotifyCategory',
  initialState,
  reducers: {
    setCategoryList: (state, action: PayloadAction<string>) => {
      state.categoryList = action.payload;
    },
    setOffset: (state, action: PayloadAction<string>) => {
      state.offset = action.payload;
    },
    setTotalrecord: (state, action: PayloadAction<string>) => {
      state.totalrecord = action.payload;
    },
  },
});

export const { setCategoryList } = spotifycategorySlice.actions;
export const { setOffset } = spotifycategorySlice.actions;
export const { setTotalrecord} = spotifycategorySlice.actions;

export const selectCategoryList = (state: RootState) => state.spotifyCategory.categoryList;
export const selectOffset = (state: RootState) => state.spotifyCategory.offset;
export const selectTotalrecord = (state: RootState) => state.spotifyCategory.totalrecord;

export const setCategoryAsync = (accessToken: string, offset: string, currentoffset: string, totalrecord: string): AppThunk => dispatch => {
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

  console.log(tempOffset);
  fetch('https://api.spotify.com/v1/browse/categories?offset='+tempOffset, {
    method: 'GET',
    headers: myHeaders,
  }).then(response => response.json())
    .then((data) => {
      console.log(data);
      dispatch(setCategoryList(data.categories.items));
      dispatch(setOffset(data.categories.offset));
      dispatch(setTotalrecord(data.categories.total));
    }).catch((error) => {
      console.log(error);
      if (error instanceof XMLHttpRequest) {
        if (error.status === 401) {
          
        }
      }
      
    }
    );

};

export default spotifycategorySlice.reducer;
