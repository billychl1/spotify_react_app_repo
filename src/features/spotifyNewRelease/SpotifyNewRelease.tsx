import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setNewReleaseAsync, selectAlbumList, selectOffset, selectTotalrecord } from './spotifyNewReleaseSlice';
import styles from './SpotifyNewRelease.module.css';
import {
  selectIsLoggedIn,
  selectAccessToken
} from '../authorization/authorizationSlice';

export function SpotifyNewRelease() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const accessToken = useSelector(selectAccessToken);
  const albumList = useSelector(selectAlbumList);
  const currentOffset = useSelector(selectOffset);
  const totalrecord = useSelector(selectTotalrecord);

  return (
    <div className="App">
      <button 
      onClick={() => dispatch(setNewReleaseAsync(accessToken, "0", currentOffset, totalrecord))}>
        Check Released This Week songs
      </button>
      <h2>Released This Week songs</h2>
      {Object.keys(albumList).map((i) => {
        return (
          <li key={i}>
            <span>{albumList[i].name}</span>
          </li>
        );
      })}
      <button 
      onClick={() => dispatch(setNewReleaseAsync(accessToken, "-", currentOffset, totalrecord))}>
        Previous 20 items
      </button>
      <br/>
      <button 
      onClick={() => dispatch(setNewReleaseAsync(accessToken, "+", currentOffset, totalrecord))}>
        Next 20 items
      </button>
    </div>
  );
}
