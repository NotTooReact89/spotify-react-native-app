// @flow

import _ from 'lodash';
import moment from 'moment';

const toSongDetails = (rawData: any): any => {
  try {
    return {
      id: rawData.id,
      name: rawData.name,
      image: rawData.preview_url,
      artist: getArtist(rawData.artists),
      album: rawData.album.name,
      duration: getConvertedTime(rawData.duration_ms),
    };
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

const getConvertedTime = durationInMs => {
  return moment.utc(durationInMs).format('HH:mm:ss');
};

export default toSongDetails;
