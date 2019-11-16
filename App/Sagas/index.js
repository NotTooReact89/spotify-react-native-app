// @flow

import { takeLatest, all, takeLeading } from 'redux-saga/effects';

/* ------------- Services ---------- */

import { LoginService, SpotifyService } from '../Services';

/* ------------- Types ------------- */

import { UserProfileTypes } from '../Redux/Authentication/UserProfileRedux';
import { SyncTypes } from '../Redux/SyncRedux';
import { DeviceConfigTypes } from '../Redux/Authentication/DeviceConfigRedux';
import { PlaylistsTypes } from '../Redux/PlaylistsRedux';
import { PlaylistTracksTypes } from '../Redux/PlaylistTracksRedux';
import { SongDetailsTypes } from '../Redux/SongDetailsRedux';

/* ------------- Sagas ------------- */

import { login, authenticate } from './LoginSagas';
import { sync } from './SyncSaga';
import { getPlaylists, getPlaylistTracks, getSongDetails } from './SpotifySaga';

/* ------------- API --------------- */

const loginService = LoginService.create();
const spotifyService = SpotifyService.create();

/* ------------- Connect Types To Sagas ------------- */

export default function* root(): Generator<*, *, *> {
  yield all([
    takeLatest(
      UserProfileTypes.LOGIN_REQUEST,
      login,
      authenticate,
      loginService,
    ),
    takeLatest(DeviceConfigTypes.DEVICE_CONFIG_REQUEST, sync),
    takeLatest(
      PlaylistsTypes.REQUEST_PLAYLISTS,
      getPlaylists,
      spotifyService.getPlaylists,
    ),
    takeLatest(
      PlaylistTracksTypes.REQUEST_PLAYLIST_TRACKS,
      getPlaylistTracks,
      spotifyService.getPlaylistTracks,
    ),
    takeLatest(
      SongDetailsTypes.REQUEST_SONG_DETAILS,
      getSongDetails,
      spotifyService.getSongDetails,
    ),

    takeLeading(SyncTypes.START_SYNC, sync),
  ]);
}
