/**
 * AngularJS Module Definitions
 *
 * @copyright: (C) 2014-2017 Kibble Games Inc in cooperation with
 *                            Vancouver Film School.
 *                            All Rights Reserved.
 * @author: Scott Henshaw
 *
 */
'use strict';

class App {

    constructor() {

        /*
        Create a private data store for the entire App keyed by
        each 'this' object, returning a private data object
        */
        this['private'] = new WeakMap();
        this.private.members = ( key, value ) => {
            if (value != undefined)
                this.private.set( key, value );
            return this.private.get( key );
        }

        /*
         * Module definitions
         *
         * Declaring multiple 'containers' for various app components allows
         * us to have a much larger app without the complexity.
         * These statements create empty - no dependency namespaces within the
         * angular system.
         *
         */
        angular.module('app.components',[]);
        angular.module('app.controllers',[]);
        angular.module('app.directives',[]);
        angular.module('app.services', []);

        /*
        Add the config for the httpProvider for the entire app - use PHP
        style data passing to a server if required.
        */
        angular.module('app.services')
            .config( function( $httpProvider ) {

                let contentType = 'application/x-www-form-urlencoded;charset=utf-8'
                $httpProvider.defaults.headers.post['Content-Type'] = contentType;
            });

        /*
        Declare the app itself and all the dependencies it relies on
        This can later be used to add routing or other service providers.
        Angular constructs to add modular functionality to an APP
        */
        angular.module('app', [   // list modules that we depend on.
            'ui.router',
            'app.services',
            'app.directives',
            'app.components',
            'app.controllers',
        ]);

        /* -------------------------------------------------------------------------- */
        // Define the routing for the app using the UI router.
        angular.module('app.controllers')
            .config(['$stateProvider', function( $stateProvider ) {
                $stateProvider
                    .state({ name: 'Login',  url:  '/',      templateUrl: 'app/components/intro.html'})
                    .state({ name: 'Home',   url:  '/home',  templateUrl: 'app/components/home.html'})
                    .state({ name: 'Main',   url:  '/main',  templateUrl: 'app/components/main.html'});
            }])
            .run(['$state', function($state) {
                // Set the initial state
                $state.transitionTo('Login');
            }]);
    }
}

const app = new App();
