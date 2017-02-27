/*
 * Draggable Module
 *
 * Copyright 2014, Google, adapted for VFS Use  All Rights Reserved.
 */

class Draggable {

    constructor() {

        /** @memberOf ngDraggable.private */
        let myData = {
            startX: 0,
            startY: 0,
            x:      0,
            y:      0
        };
        __private__.set( this, myData )

        /*
        template:
        templateUrl:  The HTML bit.

        restrict  => String of subset of 'EACM' which restricts the directive
                      to a specific directive declaration style. If omitted,
                      the defaults (elements and attributes) are used.

                    E - Element name (default): <my-directive></my-directive>
                    A - Attribute (default): <div my-directive="exp"></div>
                    C - Class: <div class="my-directive: exp;"></div>
                    M - Comment: <!-- directive: my-directive exp -->


        */
        this.template = "";   // Directive HTML template if applicable
        this.restrict = 'A';  // standard directive object restrict attribute
        this.scope = {};      //  config options
    }

    controller() {

    }

    compile( tElement, tAttrs ) {
        /*
        tElem, tAttrs = Template DOM before angular substitution
        optional compile function, called as Angular traverses the dom
        top to bottom

        Use to change the template element i.e pg-draggable before
        Angular has an instance and scope.
        */
    }

    link( scope, iElem, iAttrs ) {
        /*
        iElem, iAttrs = Template DOM AFTER angular substitution
        aka post-link function,
        reverse traversal from bottom to top of the DOM post parsing
        by angular.

        Use to execute logic after angular substitutions and scope
        are created.
        this is the safe place to begin manipulation.

        scope is provided, as this. ???
        */
        iElem.css({
            position: 'relative',
            border: '1px solid red',
            backgroundColor: 'lightgrey',
            cursor: 'pointer'
        });

        this.initHandlers( iElem );
    }

    // Directive specific methods.
    initHandlers( element ) {
        // TODO - change this Holding tank to somethign that works.
        let my = __private__.get( this );

        this.addEventListener('mousedown', ( event ) => {

            // Prevent default dragging of selected content
            event.preventDefault();
            my.startX = event.pageX - x;
            my.startY = event.pageY - y;

            element.addEventListener('mousemove', ( event ) => {

                let my = __private__.get( this );

                my.y = event.pageY - my.startY;
                my.x = event.pageX - my.startX;
                element.css({ top: `${my.y}px`, left: `${my.x}px`});
            );

            element.addEventListener('mouseup', ( event ) => {

                let my = __private__.get( this );

                element.removeEventListener('mousemove');
                element.removeEventListener('mouseup');
            } );
        });
    }
}



angular.module('app.directives')
    .directive('pgDraggable', Draggable );
