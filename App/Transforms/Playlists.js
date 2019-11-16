// @flow

import { DateTimeUtils } from '../Lib';
import _ from 'lodash';

const toPlaylists = (rawData: any): any => {
  try {
    // Edit: to add it in the array format instead
    const playList = rawData.playlists.items.map(playlistItem => {
      return {
        id: playlistItem.id,
        name: playlistItem.name,
        image: playlistItem.images[0].url,
        totalTracks: playlistItem.tracks.total,
      };
    });

    return playList;
  } catch (e) {
    console.log('exception: ', e);
  }
};

export default toPlaylists;
