'use strict';

var document = require('global/document');
var r = require('r-dom');
var ReactDom = require('react-dom');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var createBrowserHistory = require('history/lib/createBrowserHistory.js');

var home = require('./views/home.js');
var login = require('./views/login/loginPage.js');

ReactDom.render(
  r(Router, {history: createBrowserHistory()}, [
    r(Route, {path: '/', component: home}),
    r(Route, {path: '/login', component: login})
  ]),
  document.getElementById('web-content')
);
