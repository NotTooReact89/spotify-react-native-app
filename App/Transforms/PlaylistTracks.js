// @flow

import _ from 'lodash';

const toPlaylistTracks = (rawData: any): any => {
  try {
    // Edit: to add it in the array format instead
    const playListTrack = rawData.items.map(playListTrackItem => {
      return {
        id: playListTrackItem.track.id,
        name: playListTrackItem.track.name,
        image: playListTrackItem.track.album.images[0].url,
        artist: getArtist(playListTrackItem.track.artists),
        popularity: playListTrackItem.track.popularity,
      };
    });

    return playListTrack;
  } catch (e) {
    console.log('exception: ', e);
  }
};

const getArtist = artists => {
  const artistString = [];
  for (artist of artists) {
    artistString.push(artist.name);
  }
  return artistString.join(', ');
};

export default toPlaylistTracks;
