/*
 * Game Angular Directives
 *
 * Copyright (C) 2014 Kibble Games Inc in cooperation with Vancouver Film School.  All Rights Reserved.
 */
class HideMeDirective {

    constructor() {
        this.template = "";
        this.restrict = 'E';
        this.controller = HideMeDirectiveController;
        this.controllerAs = 'ctrl';
        this.bindToController = true;
    };

    compile() {}
    link() {}
}

class HideMeDirectiveController {

    constructor( scope, element, attr ) {
        scope.$watch( attrs.hideMe, ( newVal ) => {
            if (newVal) {
                element.delay( 3000 ).fadeOut( 2000 );
            }
        }
    }
}

angular.module('app.directives')
    .directive('ngHideMe', function() {
        return new HideMeDirective( $document );
    });
