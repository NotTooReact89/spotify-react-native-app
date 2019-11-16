import React from 'react';
import { Platform, View, Dimensions } from 'react-native';
import {
  createAppContainer,
  createStackNavigator,
  createDrawerNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import Icon from 'react-native-vector-icons/Feather';
import { Text } from '../Components';
import Styles from './Styles/NavigationStyles';
import { Colors, Device, Spaces } from '../Styles';
import Playlist from '../Containers/Playlist/Playlist';
import PlaylistTracks from '../Containers/PlaylistTracks/PlaylistTracks';
import SongDetails from '../Containers/SongDetails/SongDetails';

const AppNavigation = createStackNavigator(
  {
    Playlist: {
      screen: Playlist,
    },
    PlaylistTracks: {
      screen: PlaylistTracks,
    },
    SongDetails: {
      screen: SongDetails,
    },
  },
  {
    headerMode: Platform.OS === 'ios' ? 'float' : 'screen',
    initialRouteName: 'Playlist',
    cardStyle: { backgroundColor: 'transparent' },
    navigationOptions: ({ navigation }) => ({
      title: 'Homitag spotify playlist',
      headerStyle: Styles.headerStyle,
      headerForceInset: { top: 'never' },
      headerTitleStyle: Styles.headerTitleStyle,
      headerBackTitleStyle: Styles.headerBackTitleStyle,
      headerTintColor: Colors.navigation.info,
    }),
  },
);

const App = createAppContainer(AppNavigation);

export default App;
