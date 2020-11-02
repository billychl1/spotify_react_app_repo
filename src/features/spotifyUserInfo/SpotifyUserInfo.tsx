import React from 'react';
import { useSelector } from 'react-redux';
import { selectDisplayName, selectProduct } from './spotifyUserInfoSlice';
import styles from './SpotifyUserInfo.module.css';

export function SpotifyUserInfo() {
  const displayName = useSelector(selectDisplayName);
  const product = useSelector(selectProduct);

  return (
    <div className={styles.column}>
      {displayName && <div className={styles.row}>
        Logged in as: {displayName}
      </div>}
    </div>
  );
}
