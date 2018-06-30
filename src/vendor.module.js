/**
 * Load all 3rd party imports here so it'll be
 * directly included in vendor.bundle.js file.
 */
import 'jquery';
import 'popper.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'angular-ui-router';
import 'lodash';
import 'backendless';
import 'jquery-confirm';
import alertify from 'alertifyjs';
window.alertify = alertify;

import 'angular-aria';
import 'angular-animate';
import 'angular-messages';
import 'angular-material';

var URL     = 'https://api.backendless.com';
var APP_ID  = '0FC174F8-1D3A-699D-FF9A-12DA40395200';
var API_KEY = 'DE972BE2-A967-97B7-FF08-A4F7394EC500';


Backendless.serverURL = URL;
Backendless.initApp(APP_ID, API_KEY);
