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

        let privateData = {
            id: "",
            loop: null,
        };
        __private__.set( this, privateData );

        // The View Model (vm) keeps clear the data the template can/should bind to
        this.vm = {
            title: "App Title",
            author: "PGWM Students"
        };
    }


}
// export default AppViewController;

// List the dependent services here comma separated
// Create the controller and inject the dependencies, return the controller referenced by name
angular.module('app.controllers')
    .controller('AppController', function() {
        return new AppController( TimerService, LoginService );
    });
