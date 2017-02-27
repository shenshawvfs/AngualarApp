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

        let myData = {

            nickname: "nobody",
            id:       0,
            status:   "off"
        };
        __private__.set( this, myData );

        this.state = $state
        this.login = LoginService;

        this.vm = {
            master:  {}
        };
    }

    authenticate( user ) {

        angular.copy( user, this.vm.master );
        this.login.authenticate( user )
            .then( ( obj ) => {

                this.nickname = obj.nickname;
                this.id = obj.id;
                this.status = "on";

                this.state.transitionTo('Home');
        });
    }

    logoff() {

        this.user = angular.copy( this.vm.master );
        this.login.logoff()
            .then( ( obj ) => {

                this.nickname = "";
                this.id = "";
                this.status = "off";

                this.state.transitionTo('Root');
            });
    }

    register( user ) {

        this.login.register( user )
            .then( ( obj ) => {

                this.nickname = obj.nickname;
                this.id = obj.id;
                this.status = "on";

                this.state.transitionTo( 'Home' );

            });
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
    controller: ['$state', 'LoginService', LoginComponentController ],
    bindings: {
        count:    "=",
        nickname: "<",
        id:       "<",
        status:   "@"
    }
};


angular.module('app.components')
    .component('pgLogin', LoginComponentOptions );
