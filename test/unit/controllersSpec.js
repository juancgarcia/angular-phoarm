'use strict';

/* jasmine specs for controllers go here */

describe('ContractWizardCtrl', function(){
  beforeEach(module('myApp'));
  var scope, ctrl;

  beforeEach(inject(function($rootScope, $controller){
    scope = $rootScope.$new();
    ctrl = $controller('ContractWizardCtrl', {$scope: scope});
  }));

  it('can advance steps', function(){
    expect(scope.wizStep).toMatch('search');
    scope.nextStep();
    expect(scope.wizStep).toMatch('products');
  });

  it('can reset to the first step', function(){
    scope.nextStep();
    scope.nextStep();
    expect(scope.wizStep).not.toMatch('search');
    scope.reset();
    expect(scope.wizStep).toMatch('search');
  });

});