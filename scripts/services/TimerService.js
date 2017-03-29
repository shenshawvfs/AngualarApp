'use_strict';
/**
 * @name VFS Angular Timer
 * @desc The timer object is a class that manages a simple Angular interval timer
 * much like the setInterval in JavaScript.  Just a sample of what can be done.
 *
 * @copyright (C) 2014-2015 Kibble Games Inc in cooperation with Vancouver Film School.  All Rights Reserved.
 * @author Scott Henshaw
 *
 */


class TimerService {

    constructor( $interval ) {

        let myData = {
            loop:             null,
            startTime:        new Date(),
        };
        __private__.set( this, myData );

        // save the injected service provider for later
        this.interval = $interval;
    }

    start( timerComponent ) {
        // if the loop is not null then its already been started.
        let my = __private__.get( this );
        if (my.loop != null)
            return;

        my.loop = this.interval( () => {
            // ticks = 60 / sec so
            let now = new Date();
            let deltaTime = now - my.startTime;

            let deltaMin = Math.floor( deltaTime / 60000 );
            let deltaSec = Math.floor( (deltaTime - (deltaMin * 60000)) / 1000 );
            let deltaMs = Math.floor( deltaTime - (deltaMin * 60000) - (deltaSec * 1000) );

            timerComponent.update( deltaMin, deltaSec, deltaMs, " Running...");

        }, 1000/60 );
    }

    stop( timerComponent ) {
        let my = __private__.get( this );

        // Stop the timer, and nullify the loop so we can re-start.
        this.interval.cancel( my.loop );
        my.loop = null;

        //timerComponent.update( 0, 0, 0, "Waiting...");
    }
}

// Now lets create a generic angular service for this (really this one is a factory)
angular.module('app.services')
    .service('TimerService', ['$interval', function( $interval ) {
        /*
        Register the service, give it (a name, [an array])
        the array should have a list of depency names, and a function that creates
        a service object using the injected dependencies.
        */
        return new TimerService( $interval );
    }]);
