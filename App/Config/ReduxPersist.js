import { AsyncStorage } from 'react-native'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import getStoredStateMigrateV4 from 'redux-persist/lib/integration/getStoredStateMigrateV4'
import { createMigrate } from 'redux-persist'
import { toEventsData } from '../Transforms'

const migrations = {
  0: state => {
    // migration clear out device state
    return {
      ...state,
    }
  },
  1: state => {
    // migration to keep only device state
    return {
      userProfile: state.userProfile,
      calendarEvents: state.calendarEvents,
      syncData: state.syncData,
      events: state.events,
      eventDetail: state.eventDetail,
      favoriteEvent: state.favoriteEvent,
      personalisedEvents: state.personalisedEvents,
    }
  },
  2: state => {
    // migration to keep only device state
    return {
      userProfile: state.userProfile,
      calendarEvents: state.calendarEvents,
      syncData: state.syncData,
      events: state.events,
      eventDetail: state.eventDetail,
      favoriteEvent: state.favoriteEvent,
      personalisedEvents: state.personalisedEvents,
    }
  },
}
const persistConfigV4 = {
  storage: AsyncStorage,
  blacklist: ['nav'],
  whitelist: [
    'userProfile',
    'calendarEvents',
    'syncData',
    'events',
    'eventDetail',
    'favoriteEvent',
    'personalisedEvents',
  ],
}

const persistConfig = {
  stateReconciler: autoMergeLevel2,
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['nav'],
  whitelist: [
    'userProfile',
    'calendarEvents',
    'syncData',
    'events',
    'eventDetail',
    'favoriteEvent',
    'personalisedEvents',
  ],
  getStoredState: getStoredStateMigrateV4(persistConfigV4),
  migrate: createMigrate(migrations, { debug: false }),
  version: 2,
}

export default persistConfig
