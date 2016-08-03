(function() {
	/**
	 * @name VFS Angular Controllers
	 * 
	 * @copyright (C) 2014-2015 Kibble Games Inc in cooperation with Vancouver Film School.  All Rights Reserved.
	 * @author Scott Henshaw
	 * 
	 */
	angular.module( 'app.controllers' )	    
		.controller( 'LoginController', function( $scope, $state, LoginService ) {
				    
		    // local member variables              
            var local = { };
    	    
            // Public $scope variables that templates have access to.
    		var self = this;
    		
    		self.master =  {};
    		self.nickname = "";
		    self.id = "";    		
    		self.status = "off";
    		
    		
    	    self.authenticate = function( user ) {
    	            	        
    	        LoginService.authenticate( user )
    	            .then( function( obj ) {
    	                
    	                self.nickname = obj.nickname;
    	                self.id = obj.id;
    	                self.status = "on";
    	                
    	                $state.transitionTo( 'Main' );
    	            });
    	    };
    	    
    	    self.logoff = function() {
    	        
    	        LoginService.logoff()
    	            .then( function( obj ) {
    	            
    	                self.nickname = "";
    	                self.id = "";
    	                self.status = "off";
    	                
    	                $state.transitionTo( 'Home' );
    	            });
    	    };

    	    self.register = function( user ) {
    	        
    	        LoginService.register( user )
    	            .then( function( obj ) {
    	            
    	                self.nickname = obj.nickname;
    	                self.id = obj.id;
    	                self.status = "on";
    	                
    	                $state.transitionTo( 'Main' );
    	            
    	            });
    	    };
    	    
    	    self.reset = function() {
    	    	
    	    	self.master = {};
    	    };
    	    
            self.update = function( user ) {
                
                self.master = angular.copy( user );
            };
    	});
	
})();


    