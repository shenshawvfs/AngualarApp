(function () { // closure app.controllers 
	'use_strict';
    /**
     * @name VFS Angular App Controller
     * 
     * @copyright (C) 2014-2015 Kibble Games Inc in cooperation with Vancouver Film School.  All Rights Reserved.
     * @author Scott Henshaw
     * 
     */
	angular.module('app.controllers')
		.controller( 'AppViewController', function( $scope, $interval ) {		
		
		    // for clarity, create a container object for all things private; 
		    // however the private keyword may be reserved so lets use something 
		    // similar.
		    
            /** @memberOf App.private */      
            var local = {
                id:   "",
                loop: null
            };            
            
		    // Adding a controller object as a singleton function
		    // allows the returned value to be mapped to $scope.
		    // we declare a local self to contain the address of the actual
		    // singleton object so use is consistent regardless of what the
		    // current value of this is in whichever context its used in.
    		var self = this; 
    		
    		// public $scope attributes for use in HTML elements and directives 
    		// supported by this controller.
    	    self.title =  "App Title";
    	    self.author = "PGWM Students";

    	    // manage the mapping of the other partials elements to the screen
    	    // for use with the ng-include / ng-switch directives
    	    // could also be used with the ng-repeat directive to generate a menu
    	    self.screen = {
	    	    current: "partials/login.html",
	    	    info:    "partials/info.html"
	    	}    	    	
            
            self.timer = new Timer();
    	    
    	    function Timer() {
    	        /**
                 * @name App.timer
                 * @desc The timer object is a class that manages a simple Angular interval timer
                 * much like the setInterval in JavaScript.  Just a sample of what can be done.  
                 */
        	        
    	        /** @memberOf App.timer.private */    	
    	    	var local = {
        	        loop:      null,
        	        startTime: new Date()
    	    	};
    	    
    	    	var self = this;
    	    	
    	    	// Public members mapped to $scope.  These are watched and can be used
    	    	// by the Angular HTML app.
    	    	self.lable = "Waiting";
    	    	self.time =  "00:00:000";
    	    
    	    	self.start = function() {    	    	    
    	    		// if the loop is not null then its already been started.
    	    		if (local.loop != null)
    	    			return;
    	    			
    	    	    local.loop = $interval( local.run, 1000/60 );
    	    	};
    	    	    	    	
    	    	self.stop = function() {    		
    	    		// Stop the timer, and nullify the loop so we cna re-start.
    	    		$interval.cancel( local.loop );
    	    		local.loop = null;
    	    		local.setWaitLable();  		
    	    	};
    
    	    	/** @memberOf App.timer.private */
    	    	local.run = function() {    	     		
    	        	// ticks = 60 / sec so
    	        	var now = new Date();
    	        	var deltaTime = now - local.startTime;
    	        	
    	        	var deltaMin = Math.floor( deltaTime / 60000 );
    	        	var deltaSec = Math.floor( (deltaTime - (deltaMin * 60000)) / 1000 );
    	        	var deltaMs = Math.floor( deltaTime - (deltaMin * 60000) - (deltaSec * 1000) );
    	    
    	        	self.time = deltaMin.toString() + ":" + deltaSec.toString() + ":" + deltaMs.toString();
    	    	};
    		
    	    	/** @memberOf App.timer.private */
    	    	local.setWaitLable = function() {
    	    	    
    	    	    self.label = "Waited "; 
    	    	};
    	    		    
        	}		
    		
    	});
    	
})(); 
