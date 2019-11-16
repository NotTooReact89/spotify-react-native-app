// flow

import { combineReducers } from 'redux';
import { reducer as userProfile } from './Authentication/UserProfileRedux';
import { reducer as syncData } from './SyncRedux';
import { reducer as startup } from './StartupRedux';
import { reducer as deviceConfig } from './Authentication/DeviceConfigRedux';
import { reducer as playlists } from './PlaylistsRedux';
import { reducer as playlistTracks } from './PlaylistTracksRedux';
import { reducer as songDetails } from './SongDetailsRedux';

export const rootReducer = combineReducers({
  // eslint-disable-line import/prefer-default-export
  startup,
  syncData,
  userProfile,
  deviceConfig,
  playlists,
  playlistTracks,
  songDetails,
});
