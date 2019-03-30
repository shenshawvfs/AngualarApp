/**
 * @name VFS AngularJS App Controller
 *
 * @copyright (C) 2014-2017 Kibble Games Inc in cooperation with Vancouver Film School.  All Rights Reserved.
 * @author Scott Henshaw
 *
 */
'use_strict';

import { app } from          './app.js';

import Draggable from    './shared/draggable.directive.js';

import MenuController from   './components/menu.component.js';
import LoginController from  './components/login.component.js';
import TimerController  from  './components/timer.component.js';

export class AppController {

    constructor( TimerService ) {

        let my = this.__private__ = {
            id: "",
            loop: null,
        };

        // The View Model (vm) keeps clear the data the template can/should bind to
        this.vm = {
            title: "App Title",
            author: "PGWM Students"
        };
    }
}

/* -------------------------------------------------------------------------- */
// MAIN - start the whole thing off by creating the AppController
// Define the routing for the app using the UI router.
angular.module('app.controllers')
    .controller('AppController', ['TimerService', function( TimerService ) {
        return new AppController( TimerService );
    }]);
