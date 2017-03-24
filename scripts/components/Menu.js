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
        this.content = ['Root', 'Home', 'Main', 'Test'];
        this.currentPage = 'Root';
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
    bindings: {
        currentPage: "@"
    }
};

angular.module('app.components')
    .component('pgMenu', MenuComponentOptions );
