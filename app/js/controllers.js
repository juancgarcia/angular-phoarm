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

	function moveToIndex(_index){
		if(_index < 0 || _index > sequence.length - 1)
			return;
		index = _index;
		$scope.wizStep = sequence[index];
		$scope.partial = partials[index];
	}

	$scope.reset = function(){
		index = 0;
		moveToIndex(index);
		$scope.WizardDS.reset(true);
	}

	$scope.nextStep = function(){
		moveToIndex(index+1);
	}

	$scope.reset();
}]);

myApp.controller('ContractWizardSearchCtrl', ['$scope', 'WizardDS', function($scope, WizardDS){
	$scope.WizardDS = WizardDS;

	$scope.form = {};

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

	// $scope.reset(dummyState);
	$scope.reset();
}]);

myApp.controller('ContractWizardProductsCtrl', ['$scope', 'WizardDS', 'DummyAPI', function($scope, WizardDS, DummyAPI){
	$scope.WizardDS = WizardDS;
	$scope.form = {product_id: 0};

	$scope.products = [];

	DummyAPI.getProducts(function(data, status){
		$scope.products = data;
		$scope.form.product_id = data[0].options[0].id;
	});

	$scope.selection = function(value){
		console.log('ng:change fired', value);
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
}]);

myApp.controller('ContractWizardDetailsCtrl', ['$scope', 'WizardDS', 'DummyAPI', function($scope, WizardDS, DummyAPI){
	$scope.WizardDS = WizardDS;
	$scope.form = {};

	DummyAPI.getDetails(function(data, status){
		$scope.products = data;
		// var optionGroup;
		// for(var i=0; i<data.length; i++){
		// 	for(var j=0; j<data[i].options[j].length; j++){
		// 		optionGroup = 'optionGroup' + data[i].id + "_" + data[i].options[j].id;
		// 		$scope.form[optionGroup];
		// 	}
		// }

	}, $scope.WizardDS.data.product_id);

	$scope.validate = function(){
		var valid = true;
		for(var i=0; i<0; i++){
			valid = valid && (true)/*condition*/;
		}
		return valid;
	};

	function extractFormData(products){
		products = products || {};
		var data = {};
		//products = [{ options:[{code: "optionGroup_id", value: 'value',...},...] },...]
		angular.forEach(products, function(product, pKey){
			angular.forEach(product.options, function(option, oKey){
				if(option.type == 'radioGroup'){
					data[option.code] = option.value;
				} else if(option.type == 'check'){				
					angular.forEach(option.items, function(item, key){
						if(item.value && item.value === true)
							data[item.code] = true;
					});
				}				
			});
		});
		return data;
	}

	$scope.submit = function(){
		if($scope.validate()){
			//doSearch
			var filteredForm = extractFormData($scope.products);
			var resultData = WizardDS.merge(filteredForm);
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