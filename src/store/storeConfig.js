import { combineReducers, applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk'

import seriesReducer from './reducers/series';
import authReducer from './reducers/auth';
import uiReducer from './reducers/ui';

const rootReducer = combineReducers({
    series: seriesReducer,
    auth: authReducer,
    ui: uiReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const storeConfig = () => createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

export default storeConfig