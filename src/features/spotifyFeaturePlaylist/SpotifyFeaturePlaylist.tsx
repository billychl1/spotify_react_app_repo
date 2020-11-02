import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFeaturePlaylistAsync, selectFeaturePlaylistList, selectOffset, selectTotalrecord } from './spotifyFeaturePlaylistSlice';
import styles from './SpotifyFeaturePlaylist.module.css';
import {
  selectIsLoggedIn,
  selectAccessToken
} from '../authorization/authorizationSlice';

export function SpotifyFeaturePlaylist() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const accessToken = useSelector(selectAccessToken);
  const featurePlaylistList = useSelector(selectFeaturePlaylistList);
  const currentOffset = useSelector(selectOffset);
  const totalrecord = useSelector(selectTotalrecord);

  return (
    <div className="App">
      <button 
      onClick={() => dispatch(setFeaturePlaylistAsync(accessToken, "0", currentOffset, totalrecord))}>
        Check Featured Playlists
      </button>
      <h2>Featured Playlists</h2>
      {Object.keys(featurePlaylistList).map((i) => {
        return (
          <li key={i}>
            <span>{featurePlaylistList[i].name}</span>
          </li>
        );
      })}
      <button 
      onClick={() => dispatch(setFeaturePlaylistAsync(accessToken, "-", currentOffset, totalrecord))}>
        Previous 20 items
      </button>
      <br/>
      <button 
      onClick={() => dispatch(setFeaturePlaylistAsync(accessToken, "+", currentOffset, totalrecord))}>
        Next 20 items
      </button>
      
    </div>
  );
}
