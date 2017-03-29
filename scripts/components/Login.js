/**
 * @name VFS Angular Component
 *
 * @copyright (C) 2014-2017 Kibble Games Inc in cooperation with Vancouver Film School.  All Rights Reserved.
 * @author Scott Henshaw
 *
 */
'use strict';

class LoginComponentController {

    constructor( $state ) {
        let myData = {
            nickname: "nobody",
            id:       0,
            status:   "off"
        };
        __private__.set( this, myData );
        this.state = $state
        this.vm = {
            master:  {},
            user: {}
        };
    }

    authenticate( user ) {
        angular.copy( user, this.vm.master );
    }

    logoff() {
        this.user = angular.copy( this.vm.master );
    }

    register( user ) {
    }
}

/*
template:
    OR
templateUrl:  The HTML bit.

bindings   Control the data binding between template variables and the controller with
            the binding attribute to the options literal

            "=" => two way data binding
            "<" => one way binding - user input into a variable
            "@" => string parameters
            "&" => callbacks to output something to the parent controller

            binding data elements are tied to $ctrl by default.
*/
let LoginComponentOptions = {

    templateUrl: 'partials/login.html',
    controller: ['$state', LoginComponentController ],
    bindings: {
        count:    "=",
        nickname: "<",
        id:       "<",
        status:   "@"
    }
};

angular.module('app.components')
    .component('pgLogin', LoginComponentOptions );
