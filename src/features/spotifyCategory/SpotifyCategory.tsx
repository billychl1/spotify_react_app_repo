import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryAsync, selectCategoryList, selectOffset, selectTotalrecord} from './spotifyCategorySlice';
import styles from './SpotifyCategory.module.css';
import {
  selectIsLoggedIn,
  selectAccessToken
} from '../authorization/authorizationSlice';

export function SpotifyCategory() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const accessToken = useSelector(selectAccessToken);
  const categoryList = useSelector(selectCategoryList);
  const currentOffset = useSelector(selectOffset);
  const totalrecord = useSelector(selectTotalrecord);

  return (
    <div className="App">
      <button 
      onClick={() => dispatch(setCategoryAsync(accessToken, "0", currentOffset, totalrecord))}>
        Check Browse genres
      </button>
      <h2>Browse genres</h2>
      {Object.keys(categoryList).map((i) => {
        return (
          <li key={i}>
            <span>{categoryList[i].name}</span>
          </li>
        );
      })}
      <button 
      onClick={() => dispatch(setCategoryAsync(accessToken, "-", currentOffset, totalrecord))}>
        Previous 20 items
      </button>
      <br/>
      <button 
      onClick={() => dispatch(setCategoryAsync(accessToken, "+", currentOffset, totalrecord))}>
        Next 20 items
      </button>
      
    </div>
  );
}
