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
import Styles from './SongDetailsStyles';
import SongDetailsAction, {
  getSongDetailsError,
  isFetchingSongDetails,
  getSongDetailsData,
} from '../../Redux/SongDetailsRedux';

type Props = {
  songDetails: any,
  songDetailsError: '',
  songDetailsRequest: () => void,
  isFetching: boolean,
  navigation: any,
};

type State = {
  songDetailsError: string,
  songDetails: any,
};

class SongDetails extends React.Component<Props, State> {
  props: Props;
  state: State;

  constructor(props: Props) {
    super(props);
    this.state = { songDetails: {}, songDetailsError: '' };

    const { trackId } = this.props.navigation.state.params;
    this.props.songDetailsRequest(trackId);
  }

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    let newState: State = prevState;

    if (nextProps.songDetails) {
      newState = {
        ...newState,
        songDetails: nextProps.songDetails,
        songDetailsError: '',
      };
    }

    if (nextProps.songDetailsError) {
      newState = {
        ...newState,
        songDetails: {},
        songDetailsError: nextProps.songDetailsError,
      };
    }

    return prevState === newState ? null : newState;
  }

  render() {
    const { songDetails } = this.state;
    return (
      <View style={[Styles.mainContainer]}>
        <Image source={{ uri: songDetails.image }} style={Styles.imageView} />
        <View style={Styles.contentContainer}>
          <Text inverse voice size="xxl">
            Name: {songDetails.name}
          </Text>
          <Text inverse bold style={{ marginTop: 20 }}>
            Artist: {songDetails.artist}
          </Text>
          <Text inverse bold style={{ marginTop: 20 }}>
            Album: {songDetails.album}
          </Text>
          <Text inverse bold style={{ marginTop: 20 }}>
            Duration: {songDetails.duration}
          </Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  isFetching: isFetchingSongDetails(state),
  songDetails: getSongDetailsData(state),
  songDetailsError: getSongDetailsError(state),
});

const mapDispatchToProps = (dispatch: Dispatch<*>) => ({
  songDetailsRequest: id => dispatch(SongDetailsAction.requestSongDetails(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SongDetails);
