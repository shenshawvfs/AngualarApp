/**
 * @copyright (C)2014-2019 Kibble Online Inc., in cooperation with Vancouver Film School.
 * @author Scott Henshaw
 */
'use strict';
export default class LoginController {

    constructor( $state ) {
        this.stateSvc = $state
        this.vm = {
            nickname: "unknown",
            id:       0,
            master:   {},
            user:     {},
            status:   "off"
        };
    }

    authenticate( user ) {
        angular.copy( user, this.vm.master );
        this.vm.nickname = this.vm.master.nickname
        this.vm.status = "on";
        // This might be the place to contact a service that could in fact authenticate the user...
    }

    logoff() {
        this.user = angular.copy( this.vm.master );
        this.vm.master = {};
        this.vm.status = "off";
        this.vm.nickname = "";
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
angular.module('app.components')
    .component('pgLogin', {
        templateUrl: 'app/components/login.html',
        controller:  ['$state', LoginController ],
        bindings:    {
            nickname: "<",
            id:       "<",
            status:   "@"
        }
    });
