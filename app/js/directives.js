'use strict';

/* Directives */


angular.module('myApp.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]);


//via https://github.com/angular/angular.js/issues/1897
ieFixes.directive('radioValue', function(){
	return {
		require: 'ngModel',
		restrict: 'A',

		link: function(scope, el, attr, controller){
			// Delay until after render
			setTimeout(function(){
				// If 'value' isn't set properly
				if (attr.value != attr.radioValue) {
					// Enforce value
					attr.value = attr.radioValue;

					// Re-render (to reflect 'checked')
					controller.$render();
				}

			});
		}
	};
});