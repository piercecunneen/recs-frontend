'use strict';
/* eslint-disable max-len */
var document = require('global/document');
var r = require('r-dom');
var ReactDom = require('react-dom');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var createBrowserHistory = require('history/lib/createBrowserHistory.js');

var home = require('./views/home.js');
var login = require('./views/login/login-page.js');
var profile = require('./views/profile/profile.js');
var myRecs = require('./views/myRecs/my-recs.js');
var myRequests = require('./views/myRequests/my-requests.js');
var track = require('./views/music/track.js');
var artist = require('./views/music/artist.js');
var makeRecommendation = require('./views/recommendations/make-recommendation.js');

ReactDom.render(
  r(Router, {history: createBrowserHistory()}, [
    r(Route, {path: '/', component: home}),
    r(Route, {path: '/login', component: login}),
    r(Route, {path: '/profile', component: profile}),
    r(Route, {path: '/profile/recs', component: profile}),
    r(Route, {path: '/profile/favorites', component: profile}),
    r(Route, {path: '/my-recs', component: myRecs}),
    r(Route, {path: '/my-requests', component: myRequests}),
    r(Route, {path: '/track/:trackID', component: track}),
    r(Route, {path: '/artist/:artistID', component: artist}),
    r(Route, {path: '/recs/make-recommendation', component: makeRecommendation})
  ]),
  document.getElementById('web-content')
);
/* eslint-enable max-len */
