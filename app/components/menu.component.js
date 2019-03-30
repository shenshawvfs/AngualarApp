/**
 * @name VFS AngularJS Menu Component
 *
 * @copyright (C) 2014-2018 Kibble Games Inc in cooperation with Vancouver Film School.  All Rights Reserved.
 * @author Scott Henshaw
 *
 */
'use_strict';
export default class MenuController {

    constructor( $state ) {

        this.stateSvc = $state;
        this.content = ['Login', 'Home', 'Main'];
        this.currentPage = 'Login';
    }

    setPage( page ) {

        this.stateSvc.go( page );
        this.currentPage = page;
    }
}

angular.module('app.components')
    .component('pgMenu', {
        template: `
            <div class="sidebar">
                Current Page: {{ $ctrl.currentPage }} <br />
                <ul>
                    <li ng-repeat="page in $ctrl.content" class="menuitem">
                        <button ng-click="$ctrl.setPage( page )">{{page}}</button>
                    </li>
                </ul>
            </div>`,
        controller: ['$state', MenuController ],
        bindings: {
            currentPage: "@"
        }
    });
