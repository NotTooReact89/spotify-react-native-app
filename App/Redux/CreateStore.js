// flow

import { createStore, applyMiddleware, compose } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'
import createSagaMiddleware from 'redux-saga'
import Config from '../Config/DebugConfig'
import persistConfig from '../Config/ReduxPersist'
import { rootReducer } from '../Redux'
import rootSaga from '../Sagas'
import Reactotron from '../Config/ReactotronConfig'

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware()

  const middleware = []
  middleware.push(sagaMiddleware)

  const persistedReducer = persistReducer(persistConfig, rootReducer)
  const initialStoreState = {} // empty for now

  // if Reactotron is enabled (default for __DEV__), we'll create the store through Reactotron
  const store = Config.useReactotron
    ? console.tron.createStore(
        persistedReducer,
        initialStoreState,
        applyMiddleware(...middleware)
      ) // eslint-disable-line no-console
    : createStore(
        persistedReducer,
        initialStoreState,
        applyMiddleware(...middleware)
      )

  // persist the store
  persistStore(store)

  // kick off root saga
  sagaMiddleware.run(rootSaga)

  return store
}

export default configureStore
