'use_strict';
/**
 * @name VFS Angular App Controller
 * 
 * @copyright (C) 2014-2015 Kibble Games Inc in cooperation with Vancouver Film School.  All Rights Reserved.
 * @author Scott Henshaw
 * 
 */
const __private__ = new WeakMap();
const INTERVAL = new WeakMap();

class Timer {
    /**
     * @name App.timer
     * @desc The timer object is a class that manages a simple Angular interval timer
     * much like the setInterval in JavaScript.  Just a sample of what can be done.  
     */
    
    constructor( $interval, updateFunction ) {
        
        let privateData = {
            update:           updateFunction,
            loop:             null,
            startTime:        new Date(),
            intervalService: $interval
        };
        __private__.set( this, privateData );
    
        // Public members mapped to $scope.  These are watched and can be used
        // by the Angular HTML app.
        this.lable = "Waiting";
        this.time =  "00:00:000";
    }
    
    start() {                   
        // if the loop is not null then its already been started.
        let m = __private__.get( this );
        if (m.loop != null)
            return;
            
        m.loop = m.intervalService( () => {
            // ticks = 60 / sec so
            let m = __private__.get( this );
            let now = new Date();
            let deltaTime = now - local.startTime;
            
            let deltaMin = Math.floor( deltaTime / 60000 );
            let deltaSec = Math.floor( (deltaTime - (deltaMin * 60000)) / 1000 );
            let deltaMs = Math.floor( deltaTime - (deltaMin * 60000) - (deltaSec * 1000) );

            m.update( deltaMin, deltaSec, deltaMs, "Waited ");
            
        }, 1000/60 );
    }
                
    
    stop() {            
        // Stop the timer, and nullify the loop so we cna re-start.
        let m = __private__.get( this );
        m.intervalService.cancel( m.loop );
        m.loop = null;
     
        m.update( 0, 0, 0, "Waiting...");
    }
    
}



class AppViewController {
    
    constructor( $interval ) {
        //INTERVAL.set( this, $interval );
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
            
        this.timer = new Timer( $interval );
        
    }

    
    update( deltaMin, deltaSec, deltaMs, label ) {
        
        this.time = deltaMin.toString() + ":" + deltaSec.toString() + ":" + deltaMs.toString();
        this.label = "Waited ";        
    }
    
}


angular.module('app.controllers')
	.controller('AppViewController', ['$interval', ( $interval ) => {
	    return new AppViewController($interval); 
    }]);		

