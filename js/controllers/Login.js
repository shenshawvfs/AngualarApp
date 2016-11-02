/**
 * @name VFS Angular Controllers
 * 
 * @copyright (C) 2014-2015 Kibble Games Inc in cooperation with Vancouver Film School.  All Rights Reserved.
 * @author Scott Henshaw
 * 
 */
'use strict';


class LoginController {
    
    constructor( $state, LoginService ) {
        
        let privateData = {
                
            stateProvider: $state,
            loginProvider: LoginService
        };
        __private__.set( this, privateData );

        this.master =  {};
        this.nickname = "";
        this.id = "";           
        this.status = "off";
    }
    
    
    authenticate( user ) {
        
        let m = __private__.get( this );
        m.loginProvider.authenticate( user )
            .then( ( obj ) => {
                
                this.nickname = obj.nickname;
                this.id = obj.id;
                this.status = "on";
                
                m.stateProvider.transitionTo('Main');
            });
    }
    
    
    logoff() {
        
        let m = __private__.get( this );
        m.loginProvider.logoff()
            .then( ( obj ) => {
            
                this.nickname = "";
                this.id = "";
                this.status = "off";
                
                m.stateProvider.transitionTo('Home');
            });
    }

    
    register( user ) {
        
        let m = __private__.get( this );
        m.loginProvider.register( user )
            .then( ( obj ) => {
            
                this.nickname = obj.nickname;
                this.id = obj.id;
                this.status = "on";
                
                m.stateProvider.transitionTo( 'Main' );
            
            });
    }
    
    reset() {
        
        this.master = {};
    }
    
    update( user ) {
        
        this.master = angular.copy( user );
    }
}


angular.module('app.controllers')	    
	.controller( 'LoginController', ['$state', 'LoginService', ( $state, LoginService ) => {
	    return new LoginController( $state, LoginService ); 
    }]);


    