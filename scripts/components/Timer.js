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

        //this.interval = $interval;
        this.timer = TimerService;
    }

    update() {

    }

    timeString( deltaMin, deltaSec, deltaMs, label ) {

        let timeText = `${deltaMin.toString()}:${deltaSec.toString()}:${deltaMs.toString()}`;
        return timeText;
    }

    startTimer() {}

    stopTimer() {}
}

// Options for the timer component
let TimerComponentOptions = {

    // restrict: 'EA',
    templateUrl: "partials/timer.html",
    controller: ['$element','$attrs', 'TimerService', TimerComponentController ],
    bindings: {
        label: '<',
        time: '<',
        onUpdate: '&'
    }
};


angular.module('app.components')
    .component('pgTimer', TimerComponentOptions );
