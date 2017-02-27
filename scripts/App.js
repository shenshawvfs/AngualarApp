/**
 * @name VFS Angular App Controller
 *
 * @copyright (C) 2014-2015 Kibble Games Inc in cooperation with Vancouver Film School.  All Rights Reserved.
 * @author Scott Henshaw
 *
 */
'use_strict';

//import { Timer } from 'timer';

class AppController {

    constructor( TimerService, LoginService) {

        let myData = {
            id: "",
            loop: null,
        };
        __private__.set( this, myData );

        // The View Model (vm) keeps clear the data the template can/should bind to
        this.vm = {
            title: "App Title",
            author: "PGWM Students"
        };
    }


}

// Define the routing for the app using the UI router.
angular.module('app.components', ['ui.router'])
    .config(['$stateProvider', function( $stateProvider ) {

        let rootState = {
            name: 'Root',
            url:  '/',
            templateUrl: 'partials/index.html'
            // controller: 'HomeController as $ctrl';
        };
        $stateProvider.state( rootState );

        let homeState = {  // now user is logged in
            name: 'Home',
            url:  '/home',
            templateUrl: 'partials/home.html'
        };
        $stateProvider.state( homeState );

        let mainState = {
            name: 'Main',
            url:  '/main',
            templateUrl: 'partials/main.html'
        };
        $stateProvider.state( mainState );
    }])
    .run(['$state', function($state) {

        $state.transitionTo('Root');
    }]);


/* -------------------------------------------------------------------------- */
// MAIN - start the whole thing off by creating the AppController

angular.module('app.controllers')
    .controller('AppController', function() {

        return new AppController( TimerService, LoginService );
    });
