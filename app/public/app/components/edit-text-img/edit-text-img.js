'use strict';

angular.module( 'fusion' ).directive( 'fusEditSpan', function() {
    return {
		restrict: 'E',
		templateUrl: 'components/edit-text-img/edit-text-img.html',
		scope: {
			text: '=',
			width: '@',
			height: '@'	,
		    maxlength: '@'
		},
		compile: function( element, attributes ) {
			if ( !attributes.width  ) {
				attributes.width = "100px"; 
			}
			if ( !attributes.height ) {
				attributes.height = "20px"; 
			}
			if ( !attributes.maxlength ) {
				attributes.maxlength = "25"; 
			}
		}
    };
});