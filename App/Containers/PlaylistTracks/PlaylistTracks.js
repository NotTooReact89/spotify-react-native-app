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
import { Analytics, AnalyticsProps, Debounce } from '../../Lib';
import { Text, ScrollViewWithPullDownRefresh } from '../../Components';
import Styles from './PlaylistTracksStyles';
import PlaylistTracksAction, {
  getPlaylistTracksError,
  isFetchingPlaylistTracks,
  getPlaylistTracksData,
} from '../../Redux/PlaylistTracksRedux';

type Props = {
  playlistTracks: any,
  playlistTracksError: '',
  playlistTracksRequest: () => void,
  isFetching: boolean,
  navigation: any,
};

type State = {
  playlistTracksError: string,
  playlistTracks: any,
};

class PlaylistTracks extends React.Component<Props, State> {
  props: Props;
  state: State;

  constructor(props: Props) {
    super(props);
    this.state = { playlistTracks: [], playlistTracksError: '' };

    const { playlistId } = this.props.navigation.state.params;
    this.props.playlistTracksRequest(playlistId);
  }

  // componentDidMount() {
  //   this.initialCall();
  // }

  // initialCall = () => {
  //   this.props.playlistTracksRequest();
  // };

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    let newState: State = prevState;

    if (nextProps.playlistTracks) {
      newState = {
        ...newState,
        playlistTracks: nextProps.playlistTracks,
        playlistTracksError: '',
      };
    }

    if (nextProps.playlistTracksError) {
      newState = {
        ...newState,
        playlistTracks: [],
        playlistTracksError: nextProps.playlistTracksError,
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

  handlePlaylistTrackItemPress = Debounce(item => {
    const navigateToNextScreen = NavigationActions.navigate({
      routeName: 'SongDetails',
      params: {
        trackId: item.id,
      },
      actions: NavigationActions.navigate({ routeName: 'SongDetails' }),
    });
    this.props.navigation.dispatch(navigateToNextScreen);
  });

  renderList = () => {
    if (!this.state.playlistTracksError && !this.props.isFetching) {
      return this.state.playlistTracks &&
        this.state.playlistTracks.length > 0 ? (
        <FlatList
          data={this.state.playlistTracks}
          ItemSeparatorComponent={this.flatListItemSeparator}
          renderItem={({ item }) => (
            <TouchableHighlight
              onPress={() => this.handlePlaylistTrackItemPress(item)}
            >
              <View style={{ flex: 1 }}>
                <Image source={{ uri: item.image }} style={Styles.imageView} />
                <Text size="lg" bold inverse style={Styles.text}>
                  {item.name}
                </Text>
                <Text bold inverse style={Styles.text}>
                  Artist: {item.artist}
                </Text>
                <Text bold inverse style={Styles.text}>
                  Popularity: {item.popularity}
                </Text>
              </View>
            </TouchableHighlight>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <Text bold inverse size="lg">
          There are no tracks in this playlist.
        </Text>
      );
    }

    if (this.state.playlistTracksError) {
      return (
        <Text bold inverse size="lg">
          There was a problem fetching tracks for this playlist. Please try
          again later.
        </Text>
      );
    }
  };

  render() {
    return (
      <ScrollViewWithPullDownRefresh screenName="PlaylistTracks">
        <View style={[Styles.mainContainer]}>
          <Text
            inverse
            voice
            size="xxl"
            style={{ paddingLeft: 20, paddingVertical: 20 }}
          >
            Playlist Tracks
          </Text>

          {this.renderList()}
        </View>
      </ScrollViewWithPullDownRefresh>
    );
  }
}

const mapStateToProps = state => ({
  isFetching: isFetchingPlaylistTracks(state),
  playlistTracks: getPlaylistTracksData(state),
  playlistTracksError: getPlaylistTracksError(state),
});

const mapDispatchToProps = (dispatch: Dispatch<*>) => ({
  playlistTracksRequest: id =>
    dispatch(PlaylistTracksAction.requestPlaylistTracks(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistTracks);
