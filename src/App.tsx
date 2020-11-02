import React from 'react';
import { Authorization } from './features/authorization/Authorization';
import { SpotifyUserInfo } from './features/spotifyUserInfo/SpotifyUserInfo';
import { SpotifyCategory } from './features/spotifyCategory/SpotifyCategory';
import { SpotifyFeaturePlaylist } from './features/spotifyFeaturePlaylist/SpotifyFeaturePlaylist';
import { SpotifyNewRelease } from './features/spotifyNewRelease/SpotifyNewRelease';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <table>
        <tr><td colSpan={3}>
        <Authorization />
        <SpotifyUserInfo />
        </td></tr>
        <tr>
        <td>
        <SpotifyNewRelease />
        </td>
        <td>
        <SpotifyFeaturePlaylist />
        </td>
        <td>
        <SpotifyCategory />
        </td>
        </tr></table>
      </header>
    </div>
  );
}

export default App;
