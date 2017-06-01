import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import {createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import  thunkMiddleware from 'redux-thunk';

import App from './components/App';

import ShowLoginRegister from './containers/ShowLoginRegister';
import AllEmployees from './containers/AllEmployees';
import Play from './containers/Play';
import Seat from './containers/Seat';
import GetStudios from './containers/Studios';

import reducer from './reducers/index.js';

import login from './middlewares/FindUsers';
import register from './middlewares/Register';
import allEmployees from './middlewares/GetAllEmployees';
import seat from './middlewares/Seat';
import getStudios from './middlewares/GetStudios';
import showPlay from './middlewares/showPlay';
import nav from './middlewares/Nav';

const Middleware = applyMiddleware(thunkMiddleware, createLogger(), login, register, allEmployees,seat,getStudios,showPlay,nav);

let store = createStore(reducer, Middleware);

ReactDom.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/app" component={App}>
                <Route path="/employees" component={AllEmployees}/>
                <Route path="/studios" component={GetStudios}/>
                <Route path="/play" component={Play}/>
                <Route path="/seat" component={Seat}/>
            </Route>
            <Route path="/" component={ShowLoginRegister}/>
        </Router>
    </Provider>
    ,
    document.getElementById('root')
);

