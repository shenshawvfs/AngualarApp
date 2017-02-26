/**
 * @name VFS Angular Menu Component
 *
 * @copyright (C) 2014-2015 Kibble Games Inc in cooperation with Vancouver Film School.  All Rights Reserved.
 * @author Scott Henshaw
 *
 */
'use_strict';

class MenuComponentController {

    constructor($state) {

        this.state = $state;
        this.content = ['Home', 'Main'];
    }

    setPage( page ) {
        this.state.transitionTo( page );
        this.currentPage = page;
    }
}


let MenuComponentOptions = {

    template: `
        <div class="sidebar">
            Current Page: {{ $ctrl.currentPage }} <br />
            <ul>
                <li ng-repeat="page in $ctrl.content" class="menuitem">
                    <button ng-click="$ctrl.setPage( page )">{{page}}</button>
                </li>
            </ul>
        </div>`,
    controller: ['$state', MenuComponentController ],
    // restrict: 'EA',
    bindings: {
        currentPage: "@"
    }
};


// Routing by chaining the components for the ui.router module
angular.module('app.controllers', ['ui.router'])
    .config(['$stateProvider', function( $stateProvider ) {

        let homeState = {
            name: 'Home',
            url:  '/',
            // controller: 'HomeController as $ctrl';
            templateUrl: 'partials/home.html'
        };

        let mainState = {
            name: 'Main',
            url:  '/main',
            templateUrl: 'partials/main.html'
        };

        $stateProvider.state( homeState );
        $stateProvider.state( mainState );
    }])
    .run(['$state', function($state) {
        $state.transitionTo('Home');
    }])
    .component('pgMenu', MenuComponentOptions );
