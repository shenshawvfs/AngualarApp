class LoginComponenet {

    constructor() {

        this.bindings = {
            count: '=',
            nickname: "",
            id: "",
            status: "off"
        };
        this.template = `<!-- Demo Copyright (C) 2015 Kibble Games Inc in partnership with Vancouver Film School -->
        <section id="welcome">
            <div id="login-server" class="dialog">
                <h3>Welcome! Please Login!</h3>
                <form ng-submit="$ctrl.authenticate(user)" ng-model-options="{debounce:500}">

                    <input class="input login username" type="text" placeholder="nickname" ng-model="user.nickname"/>
                    <br />
                    <input class="input login submit" type="submit" placeholder="Login!" />
                    <span id="logout-container" ng-if="$ctrl.status=='on'">
                        <button type="button" placeholder="Logout" ng-click="$ctrl.logoff()"/>Logout</button>
                    </span>
                </form>

                <div>
                Logged {{$ctrl.status}} <span ng-if="$ctrl.status=='on'"> as {{$ctrl.nickname}} id: {{$ctrl.id}}</span>
                </div>
            </div>
        </section>`;
        this.controller = this;
    }

    authenticate(user) {
        /*
        this.login.authenticate( user )
            .then( ( obj ) => {

                this.bindings.nickname = obj.nickname;
                this.bindings.id = obj.id;
                this.bindings.status = "on";

                this.state.transitionTo('Main');
        });
        */
    }


    logoff() {
        /*
        this.login.logoff()
            .then( ( obj ) => {

                this.bindings.nickname = "";
                this.bindings.id = "";
                this.bindings.status = "off";

                this.state.transitionTo('Home');
            });
        */
    }


    register(user) {
        /*
        this.login.register( user )
            .then( ( obj ) => {

                this.nickname = obj.nickname;
                this.id = obj.id;
                this.status = "on";

                m.state.transitionTo( 'Main' );

            });
        */
    }

    increment() {
        this.count++;
    }

    decrement() {
        this.count--;
    }
}

angular.module('app.components')
    .component('pgLogin', ['LoginService', function( LoginService ) {
        return new LoginComponent( LoginService );
    }]);
