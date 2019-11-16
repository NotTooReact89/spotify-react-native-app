import React from 'react';
import { StatusBar, NetInfo, AppState } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';
import AppNavigation from '../../Navigation/AppNavigation';
import NavigationService from '../../Navigation/NavigationService';
import StartupActions from '../../Redux/StartupRedux';
import UserProfileActions from '../../Redux/Authentication/UserProfileRedux';
import { BaseStyles as Styles } from '../../Styles';
import SyncActions from '../../Redux/SyncRedux';

type Props = {
  initialNetworkStatus: () => void,
  storeNetworkStatus: boolean => void,
  syncReset: () => void,
  startSync: () => void,
};

class RootContainer extends React.Component<Props, *> {
  props: Props;

  componentDidMount() {
    // Set the default network status to true as Android can take
    // several SECONDS to start responding to these events.
    this.props.initialNetworkStatus();
    this.props.startSync();
    // this.props.loginRequest();
    // wait for NetInfo to initialise before adding the event listener
    NetInfo.getConnectionInfo()
      .then()
      .done(() => {
        NetInfo.isConnected.addEventListener(
          'connectionChange',
          this.handleConnectivityChange,
        );
      });

    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      'connectionChange',
      this.handleConnectivityChange,
    );

    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange = nextAppState => {
    if (nextAppState === 'inactive' || nextAppState === 'background') {
      this.props.syncReset();
    }
  };

  handleConnectivityChange = isConnected => {
    if (isConnected) {
      this.props.storeNetworkStatus(true);
    } else {
      this.props.storeNetworkStatus(false);
    }
  };

  render() {
    return (
      <SafeAreaView style={Styles.mainContainer}>
        <StatusBar barStyle="default" />
        <AppNavigation
          ref={navigatorRef => {
            NavigationService.setAppNavigator(navigatorRef);
          }}
        />
      </SafeAreaView>
    );
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch: Dispatch<*>) => ({
  initialNetworkStatus: () => {
    dispatch(StartupActions.initialIsConnected());
  },
  storeNetworkStatus: networkStatus => {
    dispatch(StartupActions.isConnected(networkStatus));
  },
  loginRequest: () => {
    dispatch(UserProfileActions.loginRequest());
  },
  syncReset: () => {
    dispatch(SyncActions.syncReset());
  },
  startSync: () => dispatch(SyncActions.startSync()),
});

export default connect(null, mapDispatchToProps)(RootContainer);
