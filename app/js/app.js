'use strict';


// Declare app level module which depends on filters, and services
window.myApp = angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/contracts/wizard', {templateUrl: 'partials/contract-wizard.html', controller: 'ContractWizardCtrl'});
  }]);


myApp.factory('WizardDS', function(){
	return {
		data: {},
		merge: function(newData){
			return angular.extend(this.data, newData);
		},
		reset: function(sure){
			sure = sure || false;
			if(sure === true)
				this.data = {};
			//return this.data;
		}
	};
});

myApp.factory('DummyAPI', function($http){
	var api = {};

	api.getProducts = function(callback){
		var httpPromise = $http.get('./dummy-data/products.json');
		httpPromise.success(function(data, status, header, config){
			callback.apply(this, arguments);
		});
		httpPromise.error(function(data, status, header, config){
			callback.apply(this, arguments);
		});

		return httpPromise.data;
	};
	api.getDetails = function(callback, product_id){
		var httpPromise = $http.get('./dummy-data/detail-all.json');
		httpPromise.success(function(data, status, headers, config){
			var index = 0;
			console.log('Total: '+ data.length);
			for(var i=0; i<data.length; i++){
				if(data[i].id != product_id){
					console.log('Deleting Product['+index+']: '+data[i].product_id);
					data.splice(i, 1);
					i--;
				} index++;
			}
			callback.apply(this, arguments);
		});
		httpPromise.error(function(data, status, headers, config){
			callback.apply(this, arguments);
		});

		return httpPromise.data;
	};

	return api;
});