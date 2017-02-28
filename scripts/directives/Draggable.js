/*
 * Draggable Module
 *
 * Copyright 2014, Google, adapted for VFS Use  All Rights Reserved.
 */

class Draggable {

    constructor() {
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

        let myData = {
            startX: 0,
            startY: 0,
            x:      0,
            y:      0
        };
        __private__.set( this, myData );
    }

    controller() {
        // ok something interactive here???
    }


    compile( tElement, tAttrs ) {
        /*


        tElem, tAttrs = Template DOM before angular substitution
        optional compile function, called as Angular traverses the dom
        top to bottom

        Use to change the template element i.e pg-draggable before
        Angular has an instance and scope.
        */
        let a = 3; // test line

        tElement.css({
            position: 'relative',
            border: '1px dashed blue',
            backgroundColor: 'lightgrey',
            cursor: 'pointer',
        });

        // if compile() exists it must return the link method
        return this.link;
    }


    link( scope, iElement ) { // , iAttrs, controller, transcludeFn ) {
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
        let my = __private__.get( this );

        let childElement = angular.element( iElement[0].children[0] );

        childElement.css({
            position: 'relative',
            border: '1px solid red',
            backgroundColor: 'lightgrey',
            cursor: 'pointer'
        });

        childElement.on('mousedown', ( event ) => {

            // Prevent default dragging of selected content
            event.preventDefault();
            my.startX = event.pageX - my.x;
            my.startY = event.pageY - my.y;

            childElement.on('mousemove', ( event ) => {

                let my = __private__.get( this );

                my.y = event.pageY - my.startY;
                my.x = event.pageX - my.startX;
                childElement.css({ top: `${my.y}px`, left: `${my.x}px`});
            });

            childElement.on('mouseup', ( event ) => {

                let my = __private__.get( this );

                childElement.off('mousemove');
                childElement.off('mouseup');
            });
        });
    }
}



angular.module('app.directives')
    .directive('pgDraggable', Draggable );
