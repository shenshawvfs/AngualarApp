/**
 * @name VFS AngularJS Timer Component
 *
 * @copyright (C) 2014-2017 Kibble Games Inc in cooperation with Vancouver Film School.  All Rights Reserved.
 * @author Scott Henshaw
 *
 */
'use_strict';

import TimerService from '../shared/timer.service.js';

export default class TimerController {

    constructor( $element, $attrs, TimerService ) {
        // Public members mapped to $scope.  These are watched and can be used
        // by the Angular HTML app.
        this.timer = TimerService;
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

// Register the component with AngularJS and give it a name
angular.module('app.components')
    .component('pgTimer', {
        // Restricted to elements only
        template: `
            <div id="timer-demo">
                <div id="timer">{{$ctrl.vm.time}} {{$ctrl.vm.label}}</div>
                <button ng-click="$ctrl.startTimer()">Start</button>
                <button ng-click="$ctrl.stopTimer()">Stop</button>
            </div>`,
        //templateUrl: "app/components/timer.html",
        controller:  ['$element','$attrs', 'TimerService', TimerController],
        bindings: {
            label: '<',
            time: '<',
            onUpdate: '&'
        }
    } );
