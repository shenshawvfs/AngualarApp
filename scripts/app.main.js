/**
 * @name VFS AngularJS App Controller
 *
 * @copyright (C) 2014-2017 Kibble Games Inc in cooperation with Vancouver Film School.  All Rights Reserved.
 * @author Scott Henshaw
 *
 */
'use_strict';

//import { Timer } from 'timer';

class AppController {

    constructor( TimerService ) {

        this['private'] = new WeakMap();
        this.private.members = ( key, value ) => {
            if (value != undefined)
                this.private.set( key, value );
            return this.private.get( key );
        }

        let my = this.private.members( this, {
            id: "",
            loop: null,
        });

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
    .config(['$stateProvider', function( $stateProvider ) {

        $stateProvider
            .state({ name: 'Login',  url:  '/',      templateUrl: 'partials/index.html'})
            .state({ name: 'Home',   url:  '/home',  templateUrl: 'partials/home.html'})
            .state({ name: 'Main',   url:  '/main',  templateUrl: 'partials/main.html'});
    }])
    .run(['$state', function($state) {

        $state.transitionTo('Login');
    }])
    .controller('AppController', function() {

        return new AppController( TimerService );
    });
