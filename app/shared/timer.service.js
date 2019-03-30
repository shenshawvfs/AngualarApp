/**
 * @name VFS AngularJS Timer Service
 * @desc The timer object is a class that manages a simple Angular interval timer
 * much like the setInterval in JavaScript.  Just a sample of what can be done.
 *
 * @copyright (C) 2014-2017 Kibble Games Inc in cooperation with Vancouver Film School.  All Rights Reserved.
 * @author Scott Henshaw
 *
 */
'use_strict';


export default class TimerService {

    constructor( $interval ) {
        // Public members mapped to $scope.  These are watched and can be used
        // by the Angular HTML app.
        this.my = {
            loopTimer: null,
            startTime: new Date(),
            timerView: null
        };
        this.intervalSvc = $interval;
        this.vm = {
            lable: "Waiting...",
            time: "00:00:000"
        };

        this.update( 0, 0, 0, "Waiting...");
    }

    start( timerComponent ) {
        // if the loop is not null then its already been started.
        if (this.my.loopTimer != null)
            return;

        this.my.timerView = timerComponent;
        this.my.loopTimer = this.intervalSvc( ( timerComponent ) => {

            let now = new Date();
            let deltaTime = now - this.my.startTime;

            let deltaMin = Math.floor( deltaTime / 60000 );
            let deltaSec = Math.floor( (deltaTime - (deltaMin * 60000)) / 1000 );
            let deltaMs = Math.floor( deltaTime - (deltaMin * 60000) - (deltaSec * 1000) );

            this.my.timerView.update( deltaMin, deltaSec, deltaMs, " Running...");

        }, 1000/60 );
    }

    stop( timerComponent ) {

        // Stop the timer, and nullify the loop so we can re-start.
        this.intervalSvc.cancel( this.my.loopTimer );
        this.my.loopTimer = null;
        this.my.timerView = null;

        this.update( 0, 0, 0, "Waiting...");
    }

    update( deltaMin, deltaSec, deltaMs, label ) {

        this.vm.time = `${deltaMin.toString()}:${deltaSec.toString()}:${deltaMs.toString()}`;
        this.vm.label = label;
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
