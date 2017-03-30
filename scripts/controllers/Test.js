/**
 * @name VFS Angular App Controller
 *
 * @copyright (C) 2014-2015 Kibble Games Inc in cooperation with Vancouver Film School.  All Rights Reserved.
 * @author Scott Henshaw
 *
 */
'use_strict';

class TestController {
	
	constructor( TestService ) {
		
		this.data = TestService;
		
		this.vm = {
			title: "test"	
		};
	}
	
	getTitleFromService() {
		
		this.data.populate();
		this.vm.title = this.data.modelData.title;
	}
}

angular.module('app.controllers')
	.controller('TestController', ['TestService', function( TestService ) {

			return new TestController( TestService );
	}]);