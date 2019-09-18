import { combineReducers, applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk'

import seriesReducer from './reducers/series';

const rootReducer = combineReducers({
    series: seriesReducer,
});


const storeConfig = () => createStore(rootReducer, compose(applyMiddleware(thunk)))

export default storeConfig