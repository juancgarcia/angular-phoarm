

myApp.helper = {};
myApp.helper.classes = {};
myApp.helper.classes.state = (function() {
	var stateClass = function(config){};
	stateClass.prototype.name = '--unnamed--';
	stateClass.prototype.getName = function(){
		return this.name;
	};

	return stateClass;
})();

myApp.helper.classes.stateList = (function(){
	var stateListClass = function(config){
		var names = {};
		var indexes = {};
	};
	stateListClass.prototype.add = function(){};
})();

myApp.helper.classes.stateMachine = function(config){
	config = config || {};
	var statesArr, statesIndex, activeState, loop = false;

	this.init = function(_config){
		if(Array.isArray(_config)){
			statesArr = _config;
		} else {
			statesArr = _config.states || [];
		}

		statesIndex = (function(arr){
			var result = [];
			for (var i = 0; i < arr.length; i++) {
				result[ arr[i].name ] = i;
				// console.log('result @'+arr[i].name+' = '+i);
			};
			return result;
		})(statesArr);
		activeState = (statesArr && statesArr[0] && statesArr[0].name)? statesArr[0].name: null;
		loop = (config['loop'] !== undefined)? config.loop: loop;
	}

	this.currentState = function(){
		return activeState;
	};

	function find(keyName){
		return statesArr[ statesIndex[keyName] ];
	}

	this.nextStep = function(){
		var nextStateObj;
		try {
			// console.log('current step: '+activeState);
			var index = statesIndex[activeState];
			nextStateObj = statesArr[ index + 1 ];
			// console.log('index: ' + index);
		} catch(e) {
			nextStateObj = (loop)? {name: statesArr[0].name}: {name: null};
		}
		activeState = (nextStateObj && nextStateObj['name'] !== undefined)? nextStateObj.name: null;
		//var current = find($scope.wizStep);
		//$scope.wizStep = statesArr[current+1];
	}

	this.reset = function(){
		wizStep = statesArr[0];
		WizardDS.reset(true);
	}

	this.init(config);
};