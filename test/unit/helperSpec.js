// Helper Classes

describe('Helpers', function(){

	describe('stateObject', function(){
		var myState, rawState = {
			name: 'someState',
			blah: { dummy: 'data'}
		};
		beforeEach(function(){
			myState = new myApp.helper.classes.state(rawState);
		});
		it('has name', function(){
			expect(myState.getName).toBeDefined();
			expect(myState.getName()).not.toBeUndefined();
			expect(myState.getName().length).toBeGreaterThan(0);
		});
		it('can get data', function(){
			expect(myState.getData).toBeDefined();
			expect(myState.getData()).toBeDefined();
			expect(myState.getData().blah.dummy).toMatch('data');
		})
		it('returns original name', function(){
			expect(myState.getName()).toMatch('someState');
		});
	});

	describe('stateList', function(){
		var SL1, SL2, rawList = [
			{name: 'first', data: {blah: 'someFirstData'}},
			{name: 'second', data: {blah: 'someSecondData'}},
			{name: 'third', data: {blah: 'someThirdData'}},
			{name: 'fourth', data: {blah: 'someFourthData'}}
		], rawListB = [
			{name: 'SB', data: {blah: 'fhqwhgads'}},
			{name: 'HR', data: {blah: 'lngpnts'}}
		];

		describe('originally empty list', function(){
			beforeEach(function(){
				SL1 = new myApp.helper.classes.stateList();
				SL2 = new myApp.helper.classes.stateList();
			});

			it('is originally empty', function(){
				expect(SL1.isEmpty()).toBe(true);
			});
		});

		describe('initilized via contructor', function(){
			beforeEach(function(){
				SL1 = new myApp.helper.classes.stateList(rawList);
				SL2 = new myApp.helper.classes.stateList(rawListB);
			});

			it('is not empty', function(){
				expect(SL1.isEmpty()).toBe(false);
			});

			it('can retrieve contained state', function(){
				var secondState = SL1.get('second');
				expect(secondState.getName()).toMatch('second');
				expect(secondState instanceof myApp.helper.classes.state).toBe(true);
				expect(JSON.stringify(secondState.getData())).toMatch(JSON.stringify(rawList[1]));
			});

			it('can get state via index', function(){
				var thirdState = SL1.getAt(2);
				expect(thirdState.getName()).toMatch('third');
			});
		});
	});

	describe('linearStateMachine', function(){
		var SM,
			states = [
				{ name: 'first',
					partial: 'path/to/file.html' },
				{ name: 'second',
					partial: 'path/to/file.html' },
				{ name: 'third',
					partial: 'path/to/file.html' }
			];
		beforeEach(function(){
			SM = new myApp.helper.classes.linearStateMachine(states);
		});

		it('can advance state', function(){
			SM.nextStep();
			expect(SM.currentState()).toMatch('second');
		});

		it('re-initialize state', function(){
			expect(SM.currentState()).toMatch('first');
			SM.init(states);
			expect(SM.currentState()).toMatch('first');
		});

		it('can replace existing states', function(){
			expect(SM.currentState()).toMatch('first');
			SM.init([{name: 'someState', partial:''}, {name: 'otherState', partial:''}]);
			expect(SM.currentState()).toMatch('someState');
		});
	});
});