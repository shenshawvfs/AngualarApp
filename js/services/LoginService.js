/**
 * Angular Services - LoginService
 *
 * @copyright: (C) 2014 Kibble Games Inc in cooperation with Vancouver Film School.  All Rights Reserved.
 * @author: Scott Henshaw
 *
 */
// import ???

var loginSvcInstance = null;

class LoginService {

    constructor($http, $q, $httpParamSerializerJQLike) {

        if (loginSvcInstance != null)
            return loginSvcInstance;

        loginSvcInstance = this;
        let privateData = {

            httpProvider: $http,
            promiseProvider: $q,
            httpSerializerProvider: $httpParamSerializerJQLike,
            state: 0, // should really be some enum
            listData: []
        };
        __private__.set(this, privateData);

        this.username = "";
        this.id = "";

        return loginSvcInstance;
    }


    authenticate(user) {
        /**
         * @purpose to authenticate a user against a know db or Oauth service
         * then to generate a has id for use by future REST calls to this server
         */

        let m = __private__.get(this);
        /*
         * Crazy magic here.
         * Angular provides a mechanism to dela with nested asynchronous
         * communication
         *
         * Here we create a deferred promise to use later.
         * We'll authenticate with the server and when it returns we'll
         * use this callback to notify our caller that we have data ready.
         */
        let clientCallback = m.promiseProvider.defer();


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
        let params = m.httpSerializerProvider(user)
        m.httpProvider.post('server/login/', params)
            .then((obj) => {

                /*
                 * callback via a promise object chained to the post
                 * when we get our anser firse we set some data in the service
                 * so all other modules can access it.
                 */
                let response = obj.data;
                this.id = response.id;
                this.nickname = user.nickname;

                /*
                 * Then we craft some data and use our defered callback to let the
                 * original callen know that data is ready for them
                 */
                let authData = {
                    error: 0,
                    id: this.id,
                    nickname: this.nickname
                };

                /*
                 *  now send our data along to the original caller's
                 *  ".then" callback handler
                 */
                clientCallback.resolve(authData);
            });

        // Return a promise here so we can hook our controller up to get
        // notified on completion
        return clientCallback.promise;
    };


    logoff() {

        let m = __private__.get(this);
        let clientCallback = m.promiseProvider.defer();

        m.httpProvider.post('server/logout/', "")
            .then((obj) => {

                let response = obj.data;
                clientCallback.resolve(response);
            });

        // Return a promise here so we can hook our controller up to get
        // notified on completion
        return clientCallback.promise;
    }


    register(user) {
        //------------------------------------------------------------
        // Called from form with ng-model collecting data that is passed as aUser
        //
        let m = __private__.get(this);
        let clientCallback = m.promiseProvider.defer();

        var params = m.httpSerializerProvider(user);
        m.httpProvider.post('server/register/', params)
            .then((obj) => {
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
                let response = obj.data;

                if (response.errCode < 0) // negative is bad, don't trust the result
                    return;

                // Do something with the data...
                console.log("Response success: Data-> " + response.data);
                clientCallback.resolve(response);
            });

        // Return a promise here so we can hook our controller up to get
        // notified on completion
        return clientCallback.promise;
    }

}
// export default LoginService;

// NOTE: Service definitions prior to 1.5.0 Angular can use => callbacks
// after 1.5.0 Angular the binding of 'this' gets broken in Angular so we have
// to declare the actual callback function definitions.
//
//  Essentially no constructor (.service, .controller, )
//
angular.module('app.services')
    .config(($httpProvider) => {
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
        $httpProvider.defaults.headers.post['Content-Type'] =
            'application/x-www-form-urlencoded;charset=utf-8';
    })
    .service('LoginService', ['$http', '$q', '$httpParamSerializerJQLike', ($http, $q, $httpParamSerializerJQLike) => {

        return new LoginService($http, $q, $httpParamSerializerJQLike);
    }]);
