/**
 * @name VFS Angular App Controller
 * 
 * @copyright (C) 2014-2015 Kibble Games Inc in cooperation with Vancouver Film School.  All Rights Reserved.
 * @author Scott Henshaw
 * 
 */
'use_strict';

//import { Timer } from 'timer';

class MenuController {
    
    constructor( $state ) {
    
        this.state = $state;
        this.content = ['Home', 'Main'];    
    }
    
    setPage( page ) {
        
        this.state.transitionTo( page );
    }
}
// export default MenuController


// Routing by chaining the components for the ui.router module
angular.module('app.controllers', ['ui.router'])
    .config(['$stateProvider', ( $stateProvider ) => {        
            $stateProvider
                .state( 'Home', { url: '',      templateUrl: 'partials/home.html'})
                .state( 'Main', { url: 'main',  templateUrl: 'partials/main.html'});
        }])
    .run(['$state', ( $state ) => { $state.transitionTo('Home'); }])
    .controller('MenuController', ['$state', ( $state ) => { return new MenuController( $state ); }]);

