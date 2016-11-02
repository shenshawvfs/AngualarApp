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


class Timer {
    
    constructor( $interval, updateFunction ) {
        
        let privateData = {
            doUpdate:         updateFunction,
            loop:             null,
            startTime:        new Date(),
            intervalService: $interval
        };
        __private__.set( this, privateData );
    
        // Public members mapped to $scope.  These are watched and can be used
        // by the Angular HTML app.
        this.lable = "Waiting...";
        this.time = "00:00:000";

        let m = privateData; 
        m.doUpdate( 0, 0, 0, "Waiting...");
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
            let deltaTime = now - m.startTime;
            
            let deltaMin = Math.floor( deltaTime / 60000 );
            let deltaSec = Math.floor( (deltaTime - (deltaMin * 60000)) / 1000 );
            let deltaMs = Math.floor( deltaTime - (deltaMin * 60000) - (deltaSec * 1000) );

            m.doUpdate( deltaMin, deltaSec, deltaMs, "Waited ");
            
        }, 1000/60 );
    }
                
    
    stop() {            
        let m = __private__.get( this );
        
        // Stop the timer, and nullify the loop so we can re-start.
        m.intervalService.cancel( m.loop );
        m.loop = null;
     
        m.doUpdate( 0, 0, 0, "Waiting...");
    }
        
}
