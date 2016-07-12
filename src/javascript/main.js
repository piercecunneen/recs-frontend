'use strict';

var r = require('r-dom');
var ReactDom = require('react-dom');
var ReactRouter = require('react-router');
var createBrowserHistory = require('history/lib/createBrowserHistory');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;

var Home = r.div({}, ['First div!!']);

ReactDom.render(
  r(Router, {history: createBrowserHistory()}, [
    r(Route, {path: '/', component: Home})
  ]),
  document.getElementById('web-content')
);
