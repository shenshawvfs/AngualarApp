(function() { // closure app.services 
	/**
	 * Angular Services - AppService
	 * 
	 * @copyright: (C) 2014 Kibble Games Inc in cooperation with Vancouver Film School.  All Rights Reserved.
	 * @author: Scott Henshaw
	 * 
	 */

	angular.module('app.services')
		.config( function( $httpProvider ) {
            /**
             * Could be done globally for the AppController
             * Angular transmits data as application/json, 
             * 
             * PHP expects commands and params in the form x-ww-form-urlencoded 
             * i.e. "?p1=v1&p2=v2" etc.
             * 
             * so we have to change the header to tepp the server how to interpret the 
             * incoming data.
             * 
             */
            $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';            
        })
		.service('LoginService', function( $http, $q, $httpParamSerializerJQLike ) {
    	
            /** @memberOf LogonService.private */
            var local = {                             
                state:    0,  // should really be some enum                                
                listData: []
            };
            
            var self = this;
            self.username = "";
            self.id = "";
            
    	    self.init = function( theUser ) {
    	        //------------------------------------------------------------
    	    	// Save the game for use in the update long poll loop.
    	        //
    	    	if (theUser != undefined) {
    	    	    
    	    	    this.demo.user = theUser;
    	    	}
    	    }
    	                
    	    
            self.authenticate = function( user ) {
                /**
                 * @purpose to authenticate a user against a know db or Oauth service
                 * then to generate a has id for use by future REST calls to this server  
                 */
                
                /*
               * Crazy magic here.
               * Angular provides a mechanism to dela with nested asynchronous
               * communication
               * 
               * Here we create a deferred promise to use later.
               * We'll authenticate with the server and when it returns we'll
               * use this callback to notify our caller that we have data ready.
               */
                var clientCallback = $q.defer();
                
                
                /* 
               * We are using a PHP server.  PHP servers want uuencoded paramater
               * lists.  Angular provides native JSON paramater lists which PHP 
               * doesn't recognize, so we set the header differently when we configured
               * this module.   Then we use the JQ style param lists to post info to our
               * URL.
               * 
               *  Note that server side we need special code to authenticate this
               *  data.
               *
               * Make AJAX $http.post call to server with appId if local.id is 
               * not set, get it from server.
               */
                var params = $httpParamSerializerJQLike( user )
                $http.post( 'server/login/', params )
                    .then( function( obj ) {
                        
                        /*
                      * callback via a promise object chained to the post
                      * when we get our anser firse we set some data in the service
                      * so all other modules can access it. 
                      */ 
                        var response = obj.data;
                        self.id = response.id; 
                        self.username = user.username;
                        
                        /*
                      * Then we craft some data and use our defered callback to let the
                      * original callen know that data is ready for them 
                      */
                        var authData = {
                            username: self.username,
                            id: self.id
                        };
                        
                        /*
                      *  now send our data along to the original caller's
                      *  ".then" callback handler
                      */                         
                        clientCallback.resolve( authData );
                    });  
                
                // Return a promise here so we can hook our controller up to get
                // notified on completion
                return clientCallback.promise;
            };
            
            
            
            self.logoff = function() {
                
                var clientCallback = $q.defer();
                
                $http.post('server/logout/', "" )
                    .then( function( obj ) {
                        
                        var response = obj.data;
                        
                        clientCallback.resolve( response );
                    });
                
                // Return a promise here so we can hook our controller up to get
                // notified on completion
                return clientCallback.promise;
            }
           
            
    	    self.register = function( user ) { 
    	        //------------------------------------------------------------
    	        // Called from form with ng-model collecting data that is passed as aUser
    	        //
    	        var clientCallback = $q.defer();
    	        
    	        var params = $httpParamSerializerJQLike( user );
    	        $http.post("server/register/", params )       
    	        	.then( function( obj ) {
            	        //------------------------------------------------------------
            	    	// Handle the successful result of an AJAX request
            	        //
            	       
            	        /*
            	        * @param result: a generic object angular constructs to contain 
            	        * your data. Its already been decoded from JSON into an object
            	        * 
            	        * @param result.data: the part of the generic angular response that
            	        * is the actual data from your server...
            	        *  
            	        */
    	        	    var response = obj.data;
    	        
            	        if (response.errCode < 0) // negative is bad, don't trust the result 
            	            return;
            	    		
            	        
            	    	// Do something with the data...
            			console.log( "Response success: Data-> " + response.data );
            			clientCallback.resolve( response );
    	        	});
    	        
                // Return a promise here so we can hook our controller up to get
                // notified on completion
                return clientCallback.promise;
    	    }
        
        });  
})();
