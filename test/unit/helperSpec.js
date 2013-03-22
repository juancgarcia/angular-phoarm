// Helper Classes

describe('Helpers', function(){

	describe('stateObject', function(){
		var myState;
		beforeEach(function(){
			myState = new myApp.helper.classes.state();
		});
		it('has name', function(){
			expect(myState.getName()).not.toBe(undefined);
			expect(myState.getName().length).toBeGreaterThan(0);
		});
	});

	describe('stateMachine', function(){
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
			SM = new myApp.helper.classes.stateMachine(states);
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