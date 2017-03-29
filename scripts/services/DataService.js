/**
 * Angular Services - DataService
 *
 * @copyright: (C) 2016 Kibble Games Inc in cooperation with Vancouver Film School.  All Rights Reserved.
 * @author: Scott Henshaw
 *
 */
 'use strict';

// import ???

class DataService { 

    constructor( $http, $httpParamSerializerJQLike ) {

        let pseudoPrivate = {
            appid:                  "",
        };
        __private__.set( this, pseudoPrivate );

        // Service Providers
        this.http =           $http;
        this.httpSerializer = $httpParamSerializerJQLike;

        // public view model.  Use these in templates.
        this.vm = {
            username:    "",
            id:          "",
            orderList:   [],
            productList: []
        };
    }

    loadSomeData() { // RENAME ME !
        
        let my = __private__.get( this ); // retrieve pseudo private data

        let params = this.httpSerializer( my.appid );
        this.http.post('server/my_command/', params )
            .then( ( obj ) => {

                let response = obj.data;
                this.vm.productList = response.payload;
            });
    }


    saveSomeData( aProduct ) { // RENAME ME !
        
        let my = __private__.get( this );// retrieve pseudo private data

        let pData = this.httpSerializer( aProduct );
        this.http.post("server/another_command/", pData )
            .then( ( result ) => {

                let p = result.data;
                this.vm.productList.push( p );
            });
    }
}
// export default DataService;

angular.module('app.services')
	.config( function( $httpProvider ) {

        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    })
    .service('DataService', ['$http', '$q', '$httpParamSerializerJQLike', function( $http, $q, $httpParamSerializerJQLike ) {

        return new DataService( $http, $q, $httpParamSerializerJQLike );
    }]);
