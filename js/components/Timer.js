

class TimerController {

    constructor( $scope, $element, $attrs ) {

        //this.interval = $interval;
        this.timer = {}//new Timer( $interval, this );
    }

    update() {
        this.onUpdate({time: this.timeString(0,0,0)})
    }

    timeString( deltaMin, deltaSec, deltaMs, label ) {

        let timeText = `${deltaMin.toString()}:${deltaSec.toString()}:${deltaMs.toString()}`;
        return timeText;
    }

    startTimer() {}

    stopTimer() {}
}


angular.module('app.components')
    .component('pgTimer', {
            templateUrl: 'partials/timer.html',
            controller: TimerController,
            bindings: {
                label: '<',
                time: '<',
                onUpdate: '&'
            }
        });
