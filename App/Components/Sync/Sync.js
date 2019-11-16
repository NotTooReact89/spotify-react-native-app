// flow

import React from 'react';
import { connect } from 'react-redux';
import { TestProps, DateTimeUtils } from '../../Lib';
import { isConnectedToInternet } from '../../Redux/StartupRedux';
import {
  getLastSyncedTimestamp,
  isSyncing,
  getSyncError,
} from '../../Redux/SyncRedux';
import type { Error } from '../../Redux/types';
import Text from '../Text';
import Styles from './SyncStyles';

type Props = {
  isConnectedToInternet: boolean,
  lastSyncedTimestamp: number,
  isSyncing: boolean,
  syncError: Error,
};

type State = {
  text: string,
};

class Sync extends React.Component<Props, State> {
  state: State;
  periodicallyUpdateText: any;

  constructor(props) {
    super(props);

    this.state = {
      text: getUpdatedText(this.props.lastSyncedTimestamp),
    };
  }

  componentDidMount() {
    this.periodicallyUpdateText = setInterval(
      () =>
        this.setState({ text: getUpdatedText(this.props.lastSyncedTimestamp) }),
      1000,
    );
  }

  componentWillUnmount() {
    clearInterval(this.periodicallyUpdateText);
  }

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    return {
      syncDateTimeStamp: getUpdatedText(nextProps.lastSyncedTimestamp),
    };
  }

  render() {
    return (
      <Text
        size="sm"
        numberOfLines={2}
        style={Styles.syncText}
        allowFontScaling={false}
        {...TestProps('sync_txt')}
      >
        {this.state.text}
      </Text>
    );
  }
}

const getUpdatedText = (lastSyncedTimestamp: ?number) => {
  if (lastSyncedTimestamp) {
    const duration = DateTimeUtils.getDurationInMilliseconds(
      DateTimeUtils.now(),
      lastSyncedTimestamp,
    );
    return {
      syncText: DateTimeUtils.getDurationInWords(duration),
    };
  }
  return `Not synced`;
};

const mapStateToProps = state => ({
  isConnectedToInternet: isConnectedToInternet(state),
  lastSyncedTimestamp: getLastSyncedTimestamp(state),
  syncError: getSyncError(state),
  isSyncing: isSyncing(state),
});

export default connect(mapStateToProps, null)(Sync);
