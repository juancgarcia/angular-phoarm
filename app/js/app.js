'use strict';

var ieFixes = angular.module('ieFixes', []);


// Declare app level module which depends on filters, and services
window.myApp = angular.module('myApp', [
	'myApp.filters', 'myApp.services', 'myApp.directives', 'ieFixes', 'ui.date'
	]).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/contracts/wizard', {templateUrl: 'partials/contract-wizard.html', controller: 'ContractWizardCtrl'});
  }]);