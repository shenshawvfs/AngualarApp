/**
 * @name VFS Angular Component
 *
 * @copyright (C) 2014-2017 Kibble Games Inc in cooperation with Vancouver Film School.  All Rights Reserved.
 * @author Scott Henshaw
 *
 */
'use strict';

class LoginComponentController {

    constructor( $state, LoginService ) {

        let privateData = {

            nickname: "nobody",
            id:       0,
            status:   "off"
        };
        __private__.set( this, privateData );

        this.state = $state
        this.login = LoginService;

        this.vm = {
            master:  {}
        };
    }

    authenticate(user) {

        this.login.authenticate( user )
            .then( ( obj ) => {

                $ctrl.nickname = obj.nickname;
                $ctrl.id = obj.id;
                $ctrl.status = "on";

                this.state.transitionTo('Home');
        });
    }

    logoff() {

        this.login.logoff()
            .then( ( obj ) => {

                this.bindings.nickname = "";
                this.bindings.id = "";
                this.bindings.status = "off";

                this.state.transitionTo('Root');
            });
    }

    register(user) {

        this.login.register( user )
            .then( ( obj ) => {

                $ctrl.nickname = obj.nickname;
                $ctrl.id = obj.id;
                $ctrl.status = "on";

                this.state.transitionTo( 'Home' );

            });
    }
}


/*
template:
templateUrl:  The HTML bit.

restrict  => String of subset of 'EACM' which restricts the directive
              to a specific directive declaration style. If omitted,
              the defaults (elements and attributes) are used.

            E - Element name (default): <my-directive></my-directive>
            A - Attribute (default): <div my-directive="exp"></div>
            C - Class: <div class="my-directive: exp;"></div>
            M - Comment: <!-- directive: my-directive exp -->

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
    controller: ['$state', 'LoginService', LoginComponentController ],
    bindings: {
        count:    "=",
        nickname: "<",
        id:       "<",
        status:   "="
    }
};


angular.module('app.components')
    .component('pgLogin', LoginComponentOptions );
