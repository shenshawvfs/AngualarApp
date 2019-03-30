/**
 * AngularJS Services - DataService
 *
 * @Copyright (C)2016-2019 Kibble Online Inc in cooperation with Vancouver Film School.
 * @author: Scott Henshaw
 */
 'use strict';

// import ???

export default class DataService {

    constructor( $http, $httpParamSerializerJQLike ) {

        this.my = {
            appid:  "",
        };

        // Service Providers
        this.httpSvc =        $http;
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

        let params = this.httpSerializer( this.my.appid );
        this.httpSvc.post('server/my_command/', params )
            .then( obj => {

                let response = obj.data;
                this.vm.productList = response.payload;
            });
    }


    saveSomeData( aProduct ) { // RENAME ME !

        let pData = this.httpSerializer( aProduct );
        this.httpSvc.post("server/another_command/", pData )
            .then( result => {

                let p = result.data;
                this.vm.productList.push( p );
            });
    }
}

angular.module('app.services')
	.config( function( $httpProvider ) {

        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    })
    .service('DataService', ['$http', '$q', '$httpParamSerializerJQLike', function( $http, $q, $httpParamSerializerJQLike ) {

        return new DataService( $http, $q, $httpParamSerializerJQLike );
    }]);
