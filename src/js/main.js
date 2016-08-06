var config = require('./utils/config');
var run = require('./utils/run');
var constants = require('./utils/constants');

require('angular-ui-router');
require('angular-cookies');

require('./controllers');
require('./services');
require('./filters');

/*
require('./directives');
*/


angular
    .module('app', [
        'ui.router',
        'ngCookies',
        'ngDialog',
        'app.controllers',
        'app.services',
        'app.filters'
    ])
    .constant('Constants', constants)
    .config(config)
    .run(run);
