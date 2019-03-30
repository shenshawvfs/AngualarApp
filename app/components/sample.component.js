/**
 * @name VFS AngularJS App Component
 *
 * @copyright (C) 2014-2017 Kibble Games Inc in cooperation with Vancouver Film School.  All Rights Reserved.
 * @author Scott Henshaw
 *
 */
'use_strict';

import SomeService from './components/some.service.js';

export default class SampleController {

	constructor( someServiceINeed ) {

		this.svcProvider = someServiceINeed;
		this.vm = {
			title: "test"
		};
	}

	getTitleFromService() {

		this.svcProvider.populate();
		this.vm.title = this.svcProvider.modelData.title;
	}
}


angular.module('app.controllers')
	.component('SampleController',  {
        //templateUrl: 'app/components/sample.html',
        template: `
        <div id="home-area" class="row">
            <div >
            This is the {{$ctrl.vm.title}} Screen
            </div>
        </div>
        `,
        controller:  ['someServiceINeed', SampleController ],
        bindings:    {
            title:    "@",
        }
    });
