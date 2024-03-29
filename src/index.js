import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, HashRouter } from "react-router-dom";
import { Provider } from 'react-redux'

import storeConfig from './store/storeConfig'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const store = storeConfig();

const app = (
    <Provider store={store} >
        <BrowserRouter>
            <HashRouter>
                <App />
            </HashRouter>
        </BrowserRouter>
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
