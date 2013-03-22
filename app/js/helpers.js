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
		this.dataBlob = null;
		this.name = config.name || guid();
		this.init(config);
	};	
	stateClass.prototype.init = function(_config){
		this.dataBlob = _config;
	}
	stateClass.prototype.name = '--unnamed--';
	stateClass.prototype.getName = function(){
		return this.name;
	};
	stateClass.prototype.getData = function(){
		return this.dataBlob;
	};

	return stateClass;
})();

myApp.helper.classes.stateList = (function(){

	var stateListClass = function(config){
		this.nameToIndex = {};
		this.indexToName = {};
		this.dataStructure = {};
		this.nextInsert = 0;

		if(config)
			this.init(config);
	};
	stateListClass.prototype.init = function(_config){
		var statesList;
		if(!this.isEmpty() || _config === undefined)
			return;

		if( _config instanceof Array ){
			statesList = _config;
		} else if( _config.states !== undefined ){
			statesList = _config.states;
		} else
			statesList = [];

		this.add(statesList);
	};
	stateListClass.prototype.add = function(state_s){
		if(Array.isArray(state_s))
			addMany.call(this, state_s);
		else
			addMany.call(this, [state_s]);
	};
	function addOne(state){
		if( !(state instanceof myApp.helper.classes.state) )
			state = new myApp.helper.classes.state(state);

		this.nameToIndex[state.getName()] = this.nextInsert;
		this.indexToName[this.nextInsert] = state.getName();
		this.dataStructure[state.getName()] = state;
		this.nextInsert++;
	}
	function addMany(states){
		for(var i=0; i<states.length; i++){
			addOne.call(this, states[i]);
		}
	}
	getIndex = function(name){
		var index;
		if( (index = this.nameToIndex[name]) == undefined)
			throw "noSuchState";
		return index;
	};
	/*return state obj*/
	stateListClass.prototype.get = function(name){
		var index;
		if( (index = this.nameToIndex[name]) == undefined)
			throw "noSuchState";
		return this.dataStructure[name];
	};
	/*return state obj*/
	stateListClass.prototype.getAt = function(_index){
		var name;
		if( (name = this.indexToName[_index]) == undefined )
			throw "noSuchState";
		return this.dataStructure[name];
	};
	/*return state obj*/
	stateListClass.prototype.getAfter = function(name){
		var index = getIndex.call(this, name);
		if(index > this.nextInsert)
			throw "noStateAfter";
		return this.dataStructure[ this.indexToName[index+1] ];
	};
	/*return state obj*/
	stateListClass.prototype.getBefore = function(name){
		var index = getIndex.call(this, name);
		if(index < 1)
			throw "noStateBefore";
		return this.dataStructure[ this.indexToName[index-1] ];
	};
	stateListClass.prototype.isEmpty = function(){
		return this.nextInsert == 0;
	};

	return stateListClass;
})();

myApp.helper.classes.linearStateMachine = function(config){
	config = config || {};
	var statesArr, statesIndex, activeState, loop = false;

	var statesList;

	this.init = function(_config){
		if( _config instanceof myApp.helper.classes.stateList ){
			statesList = _config;
		} else if(Array.isArray(_config)) {
			statesList = new myApp.helper.classes.stateList(_config);
		}
		
		activeState = this.reset().getName();

		loop = (config['loop'] !== undefined)? config.loop: loop;
	}

	this.currentState = function(){
		return activeState;
	};

	this.nextStep = function(){
		var nextStateObj;

		try {
			nextStateObj = statesList.getAfter(activeState);
		} catch(e) {
			nextStateObj = (loop)? this.reset(): new myApp.helper.classes.state();
		}

		activeState = nextStateObj.getName();
	}

	this.reset = function(){
		var stateObj = statesList.getAt(0);
		activeState = stateObj.getName();

		return stateObj;
	}

	this.init(config);
};