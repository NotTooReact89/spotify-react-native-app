// flow
import * as React from 'react';
import { RefreshControl, View, Image } from 'react-native';
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Banner from '../Banner';
import SyncActions, {
  isSyncing,
  getSyncError,
  getSyncErrorId,
  isOnScreenMessageVisible,
} from '../../Redux/SyncRedux';
import type { Error } from '../../Redux/types';
import { TestProps, Analytics, ApiUtils } from '../../Lib';
import { isConnectedToInternet } from '../../Redux/StartupRedux';
import { getEmployeeId } from '../../Redux/Authentication/UserProfileRedux';
import { Colors } from '../../Styles';
import Text from '../Text';
import Styles from './ScrollViewWithPullDownRefreshStyles';

type Props = {
  background: any,
  contentContainerStyle?: any, // $FlowFixMe,
  onKeyboardDidShow?: () => void,
  onKeyboardDidHide?: () => void,
  showExtraBanner?: boolean,
  banner?: React.Node,
  children: React.Node,
  screenName: string,
  isConnectedToInternet: boolean,
  startSync: () => void,
  isSyncing: boolean,
  syncError: ?Error,
  syncErrorId: ?string,
  showAppBanner: boolean,
  hideOnScreenMessage: () => void,
};

export class ScrollViewWithPullDownRefresh extends React.Component<Props, *> {
  props: Props;

  static defaultProps = {
    contentContainerStyle: {},
    onKeyboardDidShow: () => {},
    onKeyboardDidHide: () => {},
    showExtraBanner: false,
    banner: null,
  };

  onRefresh = () => {
    this.props.startSync();
  };

  render() {
    return (
      <View style={Styles.container}>
        {this.props.syncError && this.props.showAppBanner ? (
          <Banner
            text={ApiUtils.convertApiErrorToText(this.props.syncError)}
            onPress={this.props.hideOnScreenMessage}
          />
        ) : null}
        {this.props.showExtraBanner ? this.props.banner : null}

        <KeyboardAwareScrollView
          contentContainerStyle={this.props.contentContainerStyle}
          keyboardShouldPersistTaps="handled"
          onKeyboardDidShow={this.props.onKeyboardDidShow}
          onKeyboardDidHide={this.props.onKeyboardDidHide}
          refreshControl={
            <RefreshControl
              refreshing={this.props.isSyncing}
              onRefresh={this.onRefresh}
              tintColor={Colors.base.textInverse}
              style={{ backgroundColor: 'black' }}
            />
          }
        >
          {this.props.children}
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  isSyncing: isSyncing(state),
  isConnectedToInternet: isConnectedToInternet(state),
  syncError: getSyncError(state),
  showAppBanner: isOnScreenMessageVisible(state),
});

export const mapDispatchToProps = (dispatch: Dispatch<*>) => ({
  startSync: () => {
    dispatch(SyncActions.startSync());
  },
  hideOnScreenMessage: () => {
    dispatch(SyncActions.hideOnScreenMessage());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ScrollViewWithPullDownRefresh);
