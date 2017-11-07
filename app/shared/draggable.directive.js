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
        let draggableElement = angular.element( iElement[0].children[0] );

        draggableElement.on('mouseover', ( event ) => {

            angular.element( event.target ).css({

                position: 'relative',
                border: '1px dashed red',
                cursor: 'pointer'
            });
        });

        draggableElement.on('mouseout', ( event ) => {

            angular.element( event.target ).css({

                position: 'relative',
                border: 'none',
                cursor: 'default'
            });
        });

        draggableElement.on('mousedown', ( event ) => {

            // Prevent default dragging of selected content
            event.preventDefault();
            let ngElement = angular.element( event.target );

            my.startX = event.pageX - my.x;
            my.startY = event.pageY - my.y;
            my.zValue = ngElement.css('z-index');

            ngElement.css('z-index', 10000 );
            ngElement.on('mousemove', ( event ) => {

                let my = __private__.get( this );

                my.y = event.pageY - my.startY;
                my.x = event.pageX - my.startX;
                ngElement.css({ top: `${my.y}px`, left: `${my.x}px`});
            });

            ngElement.on('mouseup', ( event ) => {

                let my = __private__.get( this );

                ngElement.css('z-index',my.zValue );
                ngElement.off('mousemove');
                ngElement.off('mouseup');

                // reset the values.
                my.startX = 0;
                my.startY = 0;
                my.x =      0;
                my.y =      0;
            });
        });
    }
}


/*
Register the directive, give it (a name, a directive class)
the directive should be a class that can be created.
*/
angular.module('app.directives')
    .directive('pgDraggable', Draggable );
