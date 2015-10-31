 /* ============================================================
  * File: app.js
  * Configure global module dependencies. Page specific modules
  * will be loaded on demand using ocLazyLoad
  * ============================================================ */

'use strict';

var app = angular.module('app', [
    'ui.router',
    'ui.utils',
    'oc.lazyLoad',
    'ngCookies',
    'base64',
    'pascalprecht.translate',
    'language-picker',
    'app.services'
]);

// var apiUrl = "http://localhost:8080/api/";
var apiUrl = "http://houses-api.cfapps.io/api/";