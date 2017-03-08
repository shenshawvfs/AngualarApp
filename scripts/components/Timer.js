/**
 * @name VFS Angular Menu Component
 *
 * @copyright (C) 2014-2015 Kibble Games Inc in cooperation with Vancouver Film School.  All Rights Reserved.
 * @author Scott Henshaw
 *
 */
'use_strict';

class TimerComponentController {

    constructor( $element, $attrs, TimerService ) {

        this.timer = TimerService;

        // Public members mapped to $scope.  These are watched and can be used
        // by the Angular HTML app.
        this.vm = {
            lable: "Waiting...",
            time: "00:00:000"
        };
    }

    update( deltaMin, deltaSec, deltaMs, label ) {

        this.vm.time = `${deltaMin.toString()}:${deltaSec.toString()}:${deltaMs.toString()}`;
        this.vm.label = label;
    }

    timeString( deltaMin, deltaSec, deltaMs, label ) {

        let timeText = `${deltaMin.toString()}:${deltaSec.toString()}:${deltaMs.toString()}`;
        return timeText;
    }

    startTimer() {
        this.timer.start( this );
    }

    stopTimer() {
        this.timer.stop( this );
    }
}

// Options for the timer component
let TimerComponentOptions = {

    template: `
    <div id="timer-demo">
        <div id="timer">{{$ctrl.vm.time}} {{$ctrl.vm.label}}</div>
        <button ng-click="$ctrl.startTimer()">Start</button>
        <button ng-click="$ctrl.stopTimer()">Stop</button>
    </div>`,
    // restrict: 'EA',
    //templateUrl: "partials/timer.html",
    controller: ['$element','$attrs', 'TimerService', TimerComponentController ],
    bindings: {
        label: '<',
        time: '<',
        onUpdate: '&'
    }
};


angular.module('app.components')
    .component('pgTimer', TimerComponentOptions );
