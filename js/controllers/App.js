/**
 * @name VFS Angular App Controller
 * 
 * @copyright (C) 2014-2015 Kibble Games Inc in cooperation with Vancouver Film School.  All Rights Reserved.
 * @author Scott Henshaw
 * 
 */
'use_strict';

//import { Timer } from 'timer';

class AppViewController {
    
    constructor( $interval ) {

        let privateData = {
            id:   "",
            loop: null,
            intervalProvider: $interval
        }; 
        __private__.set( this, privateData );
    
        this.title =  "App Title";
        this.author = "PGWM Students";

        // manage the mapping of the other partials elements to the screen
        // for use with the ng-include / ng-switch directives
        // could also be used with the ng-repeat directive to generate a menu
        this.screen = {
                
            current: "partials/login.html",
            info:    "partials/info.html"
        };
            
        this.timer = new Timer( $interval, this.update ); 
    }

    
    update( deltaMin, deltaSec, deltaMs, label ) {
        
        this.time = deltaMin.toString() + ":" + deltaSec.toString() + ":" + deltaMs.toString();
        this.label = "Waited ";        
    }
    
}
// export default AppViewController;

// List the dependent services here comma separated
// Create the controller and inject the dependencies, return the controller referenced by name

angular.module('app.controllers')
	.controller('AppViewController', ['$interval', ( $interval ) => { 
	    return new AppViewController( $interval ); }
	]);		

