/*
 * SampleItem Directive - collect multiple inputs into object provided
 * Copyright 2019, Google, adapted for VFS Use. All Rights Reserved.
 * 
 * 
 *  <pg-sample-item item="myObj" tip="tooltip here"> Data </pg-sample-item>
 * 
 */
'use strict';

export class SampleItem {

    constructor() {

    	this.scope = { // Scope attributes, passed in as attributes to the directive (replaces component bindings)
            item: '=',
            tip: '@'
        };

        /*
        template:
        templateUrl:  The HTML bit.
        */
        this.template = `
            <div>
                <input type="text" name="item_name"   ng-model="item.name" />
                <input type="text" name="item_value"  ng-model="item.value" />
                <input type="text" name="item_status" ng-model="item.status" />
                <span class="tooltip">{{tip}}</span>
                <ng-transclude></ng-transclude>
            </div>`;

        /*
        restrict  => String of subset of 'EACM' which restricts the directive
                    to a specific directive declaration style. If omitted,
                    the defaults (elements and attributes) are used.

            E - Element name (default):  <my-directive></my-directive>
            A - Attribute (default):     <div my-directive="exp"></div>
            C - Class:                   <div class="my-directive: exp;"></div>
            M - Comment:                 <!-- directive: my-directive exp -->
        */
        this.restrict = 'E';

        this.transclude = true;  // allows this directive to use parent controller scope

        //this.replace = true;
    }

    // controller() {  }

    // compile( tElement,tAttrs ) { return this.link }

    link( scope, iElement, iAttrs, $ctrl ) { // , controller, transcludeFn ) {
        /*
        iElem, iAttrs = Template DOM AFTER angular substitution aka post-link function,
        reverse traversal from bottom to top of the DOM post parsing by angular.

        Use to execute logic after angular substitutions and scope are created.
        this is the safe place to begin manipulation.
       */
        console.debug( iAttrs );
    }
}

angular.module('app.directives')
	.directive('pgSampleItem', SampleItem );
