/**
 * @name VFS AngularJS Sample Service
 *
 * @copyright (C) 2014-2017 Kibble Games Inc in cooperation with Vancouver Film School.  All Rights Reserved.
 * @author Scott Henshaw
 *
 */
'use_strict';


class SampleService {

	constructor( dependentService ) {

        this.svcProvider = dependentService;
		this.model = new ModelObject();
	}

	get modelData() { return this.model.data }

	populate() {
		// Go to a server and retrieve data to add to this.modelData.
        this.svcProvider.getData()
            .then( ( responseData ) => {

                this.model = new ModelObject( responseData );
            });
	}
}

//Now lets regiseter a generic angular service for this
angular.module('app.services')
 	.service('SampleService', function( dependentService ) {

 		return new SampleService( dependentService );
 	});
