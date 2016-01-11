/*
 * Draggable Module
 * 
 * Copyright 2014, Google, adapted for VFS Use  All Rights Reserved.
 */
app.directive('ngDraggable', ['$document', function( $document ) {
    
    return function( scope, element, attr ) {

        /** @memberOf ngDraggable.private */
        var local = {
            startX: 0, 
            startY: 0, 
            x:      0, 
            y:      0
        };
        
        var self = this;

        element.css( {
            position : 'relative',
            border : '1px solid red',
            backgroundColor : 'lightgrey',
            cursor : 'pointer'
        } );

        
        element.on( 'mousedown', function( event ) {

            // Prevent default dragging of selected content
            event.preventDefault();
            local.startX = event.pageX - x;
            local.startY = event.pageY - y;
            $document.on( 'mousemove', self.mousemove );
            $document.on( 'mouseup', self.mouseup );
        } );

        
        self.mousemove = function( event ) {

            local.y = event.pageY - local.startY;
            local.x = event.pageX - local.startX;
            element.css( {
                top : y + 'px',
                left : x + 'px'
            } );
        };
        
        self.mouseup = function() {

            $document.off( 'mousemove', self.mousemove );
            $document.off( 'mouseup', self.mouseup );
        };
    };
}]);