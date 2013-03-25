'use strict';

/* Controllers */

myApp.controller('ContractWizardCtrl', ['$scope', 'WizardDS', function($scope, WizardDS){
	$scope.WizardDS = WizardDS;
	var index;

	var sequence = [
		'search',
		'products',
		'details',
		'customer',
		'done'
	], partials = [
		'partials/contract-wizard-search.html',
		'partials/contract-wizard-product.html',
		'partials/contract-wizard-details.html',
		'partials/contract-wizard-customer.html'
	];

	var states = {
		'search': {
			'partial': 'partials/contract-wizard-search.html'
		},
		'products': {
			'partial': 'partials/contract-wizard-product.html'
		},
		'details': {
			'partial': 'partials/contract-wizard-details.html'
		},
		'customer': {
			'partial': 'partials/contract-wizard-customer.html'			
		},
		'done': {
			'partial': ''
		}
	}, sequenceIndex = (function(arr){
		var result = [];
		for (var i = 0; i < arr.length; i++) {
			result[ arr[i] ] = i;
		};
		return result;
	})(sequence);;

	function moveToIndex(_index){
		if(_index < 0 || _index > sequence.length - 1)
			return;
		index = _index;
		$scope.wizStep = sequence[index];
		$scope.partial = partials[index];
	}

	$scope.reset = function(){
		// $scope.wizStep = sequence[0];
		index = 0;
		moveToIndex(index);
		$scope.WizardDS.reset(true);
	}

	$scope.nextStep = function(){
		moveToIndex(index+1);
	}

	function find(keyName){
		// return sequence[ sequenceIndex[keyName] ];
		return sequenceIndex[keyName];
	}

	function find(keyName){
		// return sequence[ sequenceIndex[keyName] ];
		return sequenceIndex[keyName];
	}

	function old_find(key){
		var index = -1;
		for(var i=0; i<sequence.length; i++){
			if(sequence[i] == key){
				index = i;
				i = sequence.length;
			}
		}
		return index;
	}

	$scope.reset();
}]);

myApp.controller('ContractWizardSearchCtrl', ['$scope', 'WizardDS', function($scope, WizardDS){
	$scope.WizardDS = WizardDS;

	$scope.searchForm = {};

	$scope.conditions = ['new', 'used'];

	var dummyState = {
		vin: '1234563',
		stock: '5',
		miles: '25000',
		condition: 'used',
		date: '2013-02-25'
	};

	var blankFields = {
		vin: '',
		stock: '',
		miles: '',
		condition: 'used',
		date: ''
	};

	$scope.isUnchanged = function(formData){
		return angular.equals(formData, blankFields);
	};

	$scope.reset = function(fields){
		$scope.searchForm = angular.copy(fields || blankFields);
	};

	$scope.validate = function(fields){
		var valid = true;
		for(var i=0; i<0; i++){
			valid = valid && (true)/*condition*/;
		}
		return valid;
	};

	$scope.submit = function(fields){
		if($scope.validate(fields)){
			//doSearch
			var resultData = WizardDS.merge(fields);
			$scope.nextStep();
		}
	};

	// $scope.reset(dummyState);
	$scope.reset();
}]);

myApp.controller('ContractWizardProductsCtrl', ['$scope', 'WizardDS', 'DummyAPI', function($scope, WizardDS, DummyAPI){
	$scope.WizardDS = WizardDS;
	$scope.productsForm = {};

	var blankFields = {product_id: null};

	$scope.products = [];

	DummyAPI.getProducts(function(data, status){
		$scope.products = data;
	});

	$scope.isUnchanged = function(formData){
		return angular.equals(formData, blankFields);
	};

	$scope.reset = function(fields){
		$scope.productsForm = angular.copy(fields || blankFields);
	};

	$scope.validate = function(fields){
		var valid = true;
		for(var i=0; i<0; i++){
			valid = valid && (true)/*condition*/;
		}
		return valid;
	};

	$scope.submit = function(fields){
		if($scope.validate(fields)){
			//doSearch
			var resultData = WizardDS.merge(fields);
			$scope.nextStep();
		}
	};

	$scope.reset();
}]);

myApp.controller('ContractWizardDetailsCtrl', ['$scope', 'WizardDS', 'DummyAPI', function($scope, WizardDS, DummyAPI){
	$scope.WizardDS = WizardDS;
	$scope.productDetails = {};

	var blankFields = null;

	DummyAPI.getDetails(function(data, status){

		$scope.productDetails = data;
		blankFields = parseFormData(data); //get base state for unmarked form

	}, $scope.WizardDS.data.product_id);

	$scope.isUnchanged = function(formData){
		return angular.equals(parseFormData(formData), blankFields);
	};

	$scope.validate = function(postData){
		return true;
	};

	$scope.impermissible = function(formData){
		var errors = [];
		parseFormData(formData, errors);
		return errors.length != 0;
	};

	function parseFormData(formDefinition, errors){
		//products = products || {};
		formDefinition = formDefinition || {};
		errors = errors || [];

		var data = {},
			permissible = true;

		//formDefinition = { product_id: 0, options:[{code: "optionGroup_id", value: 'value',...},...] }
		angular.forEach(formDefinition.options, function(option, oKey){
			if(option.type == 'radioGroup'){
				if( typeof option.value === 'undefined' /*&& option.required*/ ){
					errors.push(option.code);
				}
				data[option.code] = option.value;
			} else if(option.type == 'check'){		
				angular.forEach(option.items, function(item, key){
					if(item.value && item.value === true)
						data[item.code] = true;
				});
			}				
		});

		return data;
	}

	$scope.submit = function(fields){
		//fields is ignored as data is embedded into product details object
		fields = parseFormData($scope.productDetails);
		if($scope.validate(fields)){
			//doSearch
			var resultData = WizardDS.merge(fields);
			$scope.nextStep();
		}
	};
}]);

myApp.controller('ContractWizardCustomerCtrl', ['$scope', 'WizardDS', function($scope, WizardDS){
	$scope.WizardDS = WizardDS;

	$scope.form = {};

	var blankFields = {
		customer: {
			name: {
				first: '',
				mi: '',
				last: ''
			},
			address:{
				line1: '',
				line2: '',
				city: '',
				state: '',
				zip:''
			},
			phone: ''	
		},
		lienHolder: {
			name: '',
			address: '',
			city: '',
			state: '',
			zip: ''
		}		
	};

	$scope.reset = function(fields){
		$scope.form = angular.copy(fields || blankFields);
	};

	$scope.validate = function(){
		var valid = true;
		for(var i=0; i<0; i++){
			valid = valid && (true)/*condition*/;
		}
		return valid;
	};

	$scope.submit = function(){
		if($scope.validate()){
			//doSearch
			var resultData = WizardDS.merge($scope.form);
			$scope.nextStep();
		}
	};

	$scope.reset();
}]);