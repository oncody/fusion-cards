"use strict";

angular.module( "fusion" ).directive( "fusEscapePress", function () {
    return function ( scope, element, attrs ) {
        element.bind( "keydown keypress", function ( event ) {
            if( event.which === 27 ) {
                scope.$apply( function (){
                    scope.$eval( attrs.fusEscapePress );
                });

                event.preventDefault();
            }
        });
    };
});