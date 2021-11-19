import { createStore, applyMiddleware, Store, Dispatch } from 'redux';

import logger from 'redux-logger';
import rootReducer from './root.reducer';
import rootState from './store.type';

const middleware = [logger];

const store: Store<rootState, any> & { dispatch: Dispatch } = createStore(
    rootReducer,
    applyMiddleware(...middleware)
);

export default store;