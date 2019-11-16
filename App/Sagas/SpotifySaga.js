// @flow

import { call, put, select } from 'redux-saga/effects';
import apiCall from './APISaga';
import { SpotifyService } from '../Services';
import { toPlaylists, toPlaylistTracks, toSongDetails } from '../Transforms';
import { ApiUtils, DateTimeUtils } from '../Lib';
import type { ServiceResponse } from '../Services';
import PlaylistsActions from '../Redux/PlaylistsRedux';
import PlaylistTracksActions from '../Redux/PlaylistTracksRedux';
import SongDetailsActions from '../Redux/SongDetailsRedux';
import { getAccessToken } from '../Redux/Authentication/UserProfileRedux';
import { isConnectedToInternet } from '../Redux/StartupRedux';
import { isSyncing } from '../Redux/SyncRedux';
import { authenticate } from '../Sagas/LoginSagas';
import { LoginService } from '../Services';

type Params = {
  id: string,
};

const spotifyService = SpotifyService.create();

export function* getPlaylists(
  playlistsService,
  action: Params,
): Generator<*, *, *> {
  try {
    const loginService = LoginService.create();

    const isOnline = yield select(state => isConnectedToInternet(state));

    if (!isOnline) {
      return;
    }

    yield* authenticate(loginService);

    const { countryCode } = action;

    if (!countryCode) {
      return;
    }

    const playlistsResponse: ServiceResponse = yield call(
      apiCall,
      spotifyService.getPlaylists,
      countryCode,
    );

    if (playlistsResponse.ok && playlistsResponse.data) {
      yield put(
        PlaylistsActions.setPlaylistsData(toPlaylists(playlistsResponse.data)),
      );
    } else {
      yield put(
        PlaylistsActions.setPlaylistsError(
          ApiUtils.apiResolveError({
            statusCode: playlistsResponse.status,
            serviceResponse: playlistsResponse,
          }),
        ),
      );
    }
  } catch (err) {
    yield put(
      PlaylistsActions.setPlaylistsError(
        ApiUtils.apiResolveError({
          statusCode: null,
          serviceResponse: null,
        }),
      ),
    );
  }
}

export function* getPlaylistTracks(
  playlistTracksSpotifyService,
  action: Params,
): Generator<*, *, *> {
  try {
    const isOnline = yield select(state => isConnectedToInternet(state));

    if (!isOnline) {
      return;
    }

    const { id } = action;

    if (!id) {
      return;
    }

    const playlistTracksResponse: ServiceResponse = yield call(
      apiCall,
      playlistTracksSpotifyService,
      id,
    );

    if (playlistTracksResponse.ok && playlistTracksResponse.data) {
      yield put(
        PlaylistTracksActions.setPlaylistTracksData(
          toPlaylistTracks(playlistTracksResponse.data),
        ),
      );
    } else {
      yield put(
        PlaylistTracksActions.setPlaylistTracksError(
          ApiUtils.apiResolveError({
            statusCode: playlistTracksResponse.status,
            serviceResponse: playlistTracksResponse,
          }),
        ),
      );
    }
  } catch (err) {
    console.log('err: ', err);
    yield put(
      PlaylistTracksActions.setPlaylistTracksError(
        ApiUtils.apiResolveError({
          statusCode: null,
          serviceResponse: null,
        }),
      ),
    );
  }
}

export function* getSongDetails(
  songDetailsSpotifyService,
  action: Params,
): Generator<*, *, *> {
  try {
    const isOnline = yield select(state => isConnectedToInternet(state));

    if (!isOnline) {
      return;
    }

    const { id } = action;

    if (!id) {
      return;
    }

    const songDetailsResponse: ServiceResponse = yield call(
      apiCall,
      spotifyService.getSongDetails,
      id,
    );

    if (songDetailsResponse.ok && songDetailsResponse.data) {
      yield put(
        SongDetailsActions.setSongDetailsData(
          toSongDetails(songDetailsResponse.data),
        ),
      );
    } else {
      yield put(
        SongDetailsActions.setSongDetailsError(
          ApiUtils.apiResolveError({
            statusCode: songDetailsResponse.status,
            serviceResponse: songDetailsResponse,
          }),
        ),
      );
    }
  } catch (err) {
    yield put(
      SongDetailsActions.setSongDetailsError(
        ApiUtils.apiResolveError({
          statusCode: null,
          serviceResponse: null,
        }),
      ),
    );
  }
}
