import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import {BrowserRouter} from 'react-router-dom';
import {createStore, applyMiddleware,compose,combineReducers} from 'redux'; //combineReducers
import {Provider} from 'react-redux'
import authReducer from './store/authStore/authReducer';
import productReducer from './store/productStore/productReducer';

import thunk from 'redux-thunk';

const reducer=combineReducers({
    auth:authReducer,
    product:productReducer
})


const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const store=createStore(reducer,composeEnhancers(applyMiddleware(thunk)));



const app=<Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>



ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
