function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
             .toString(16)
             .substring(1);
};

function guid() {
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
         s4() + '-' + s4() + s4() + s4();
}

myApp.helper = {};
myApp.helper.classes = {};
myApp.helper.classes.state = (function() {
	var stateClass = function(config){
		config = config || {};
		this.name = config.name || guid();
	};
	stateClass.prototype.name = '--unnamed--';
	stateClass.prototype.getName = function(){
		return this.name;
	};

	return stateClass;
})();

myApp.helper.classes.stateList = (function(){
	var nameToIndex, indexToName, nextInsert, dataStructure;

	var stateListClass = function(config){
		nameToIndex = {};
		indexToName = {};
		nextInsert = 0;
	};
	stateListClass.prototype.add = function(state_s){
		if(Array.isArray(state_s))
			addMany.call(this, state_s);
		else
			addMany.call(this, [state_s]);

		function addOne(state){
			if( !(state instanceof myApp.helper.classes.stateList) )
				state = new myApp.helper.classes.stateList(state);

			nameToIndex[state.getName()] = nextInsert;
			indexToName[nextInsert] = state.getName();
			nextInsert++;
		}
		function addMany(states){}
	};
	stateListClass.prototype.get = function(name){
		var foo;
		if(false)
			foo = 12;
	};
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
				if(arr[i] instanceof myApp.helper.classes.state)
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