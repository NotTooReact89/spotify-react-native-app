import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Platform,
  View,
  ActivityIndicator,
  FlatList,
  Alert,
  YellowBox,
  TouchableHighlight,
  Image,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import Geocoder from 'react-native-geocoder';
import { Analytics, AnalyticsProps, Debounce } from '../../Lib';
import { Text, ScrollViewWithPullDownRefresh } from '../../Components';
import Styles from './PlaylistStyles';
import PlaylistsAction, {
  getPlaylistsError,
  isFetchingPlaylists,
  getPlaylistsData,
} from '../../Redux/PlaylistsRedux';
navigator.geolocation = require('@react-native-community/geolocation');

type Props = {
  playlists: any,
  playlistsError: '',
  playlistsRequest: string => void,
  isFetching: boolean,
  navigation: any,
};

type State = {
  playlistsError: string,
  playlists: any,
};

class Playlist extends React.Component<Props, State> {
  props: Props;
  state: State;

  constructor(props: Props) {
    super(props);
    this.state = { playlists: [], playlistsError: '' };
  }

  componentDidMount() {
    console.log('here?');
    this.initialCall();
  }

  initialCall = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        Geocoder.geocodePosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
          .then(res => {
            this.props.playlistsRequest(res[0].countryCode);
          })
          .catch(err => console.log(err));
      },
      error => {
        console.log(error);
      },
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
    );
  };

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    let newState: State = prevState;

    if (nextProps.playlists) {
      newState = {
        ...newState,
        playlists: nextProps.playlists,
        playlistsError: '',
      };
    }

    if (nextProps.playlistsError) {
      newState = {
        ...newState,
        playlists: [],
        playlistsError: nextProps.playlistsError,
      };
    }

    return prevState === newState ? null : newState;
  }

  flatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#000',
        }}
      />
    );
  };

  handlePlaylistItemPress = Debounce(item => {
    const navigateToNextScreen = NavigationActions.navigate({
      routeName: 'PlaylistTracks',
      params: {
        playlistId: item.id,
      },
      actions: NavigationActions.navigate({ routeName: 'PlaylistTracks' }),
    });
    this.props.navigation.dispatch(navigateToNextScreen);
  });

  renderList = () => {
    if (!this.state.playlistsError && !this.props.isFetching) {
      return this.state.playlists && this.state.playlists.length > 0 ? (
        <FlatList
          data={this.state.playlists}
          ItemSeparatorComponent={this.flatListItemSeparator}
          renderItem={({ item }) => (
            <TouchableHighlight
              onPress={() => this.handlePlaylistItemPress(item)}
            >
              <View style={{ flex: 1 }}>
                <Image source={{ uri: item.image }} style={Styles.imageView} />
                <Text size="lg" bold inverse style={Styles.text}>
                  {item.name}
                </Text>
                <Text size="lg" bold inverse style={Styles.text}>
                  Total tracks: {item.totalTracks}
                </Text>
              </View>
            </TouchableHighlight>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <Text bold inverse size="lg">
          There are no playlists.
        </Text>
      );
    }

    if (this.state.playlistsError) {
      return (
        <Text bold inverse size="lg">
          There was a problem fetching playlists. Please try again later.
        </Text>
      );
    }
  };

  render() {
    return (
      <ScrollViewWithPullDownRefresh screenName="Playlist">
        <View style={[Styles.mainContainer]}>
          <Text
            inverse
            voice
            size="xxl"
            style={{ paddingLeft: 20, paddingVertical: 20 }}
          >
            Playlists
          </Text>

          {this.renderList()}
        </View>
      </ScrollViewWithPullDownRefresh>
    );
  }
}

const mapStateToProps = state => ({
  isFetching: isFetchingPlaylists(state),
  playlists: getPlaylistsData(state),
  playlistsError: getPlaylistsError(state),
});

const mapDispatchToProps = (dispatch: Dispatch<*>) => ({
  playlistsRequest: countryCode =>
    dispatch(PlaylistsAction.requestPlaylists(countryCode)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);
