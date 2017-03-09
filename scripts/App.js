/**
 * @name VFS Angular App Controller
 *
 * @copyright (C) 2014-2015 Kibble Games Inc in cooperation with Vancouver Film School.  All Rights Reserved.
 * @author Scott Henshaw
 *
 */
'use_strict';

class AppController {
    constructor( TimerService ) {
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

/* -------------------------------------------------------------------------- */
// MAIN - start the whole thing off by creating the AppController
// Define the routing for the app using the UI router.
angular.module('app.controllers', ['ui.router'])
    .config(['$stateProvider', function( $stateProvider ) {
        /*
        Configure the $stateProvider service provided by the ui.router module
        with a set of known states.  Each state has a name, url and html file
        that can replace the ui-view place holder.
        */
        let loginState = {
            name: 'Login',
            url:  '/',
            templateUrl: 'partials/index.html'
            // controller: 'HomeController as $ctrl';
        };
        $stateProvider.state( loginState );

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
        /*
        use the $state service provided by the ui.router module to set the default
        state (and in turn replace the <div ui-view></div> element with the html provided)
        */
        $state.transitionTo('Login');
    }])
    .controller('AppController', ['TimerService', function( TimerService) {
        /*
        Register the controller, give it (a name, [an array])
        the array should have a list of depency names, and a function that creates
        a controller object using the injected dependencies.
        */
        return new AppController( TimerService );
    }]);
