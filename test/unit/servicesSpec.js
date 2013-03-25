'use strict';

/* jasmine specs for services go here */

describe('service', function() {
  beforeEach(module('myApp.services'));


  describe('version', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});


describe('WizardDS', function(){
	beforeEach(module('myApp'));

	var svc;
	beforeEach(inject(function(WizardDS){
		svc = WizardDS;
	}));

	it('returns an empty data object', function(){
		expect(svc.data).not.toBeNull();
		expect(svc.data.name).toBeUndefined();
		expect(svc.data.address).toBeUndefined();
		expect(svc.data.phone).toBeUndefined();
	});

	var testData = {name: 'fred', address: '123 main st', phone: '555-4567'};
	it('saves object data', function(){

		svc.merge(testData);

		expect(svc.data.name).toBeDefined();
		expect(svc.data.name).toMatch(testData.name);

		expect(svc.data.address).toBeDefined();
		expect(svc.data.address).toMatch(testData.address);

		expect(svc.data.phone).toBeDefined();
		expect(svc.data.phone).toMatch(testData.phone);
	});

	// it('can\'t easily clear it\'s data by accident', function(){
	//   svc.reset();

	//   expect(svc.data.name).toBeDefined()
	//   expect(svc.data.name).toMatch(testData.name);
	// });

	it('can clear its data if you\'re sure', function(){
		svc.reset(true);

		expect(svc.data.name).toBeUndefined();
	});
});

describe('DummyAPI', function(){
	beforeEach(module('myApp'));
	var svc, $httpBackend, testData;

	beforeEach(inject(function(DummyAPI, _$httpBackend_){
		svc = DummyAPI;
		$httpBackend = _$httpBackend_;
	}));

	it('provides API', function(){
		expect(svc.getProducts).toBeDefined();
		expect(svc.getDetails).toBeDefined();
	});

	describe('getProducts', function(){
		beforeEach(function(){
			testData = {
				"id": "1",
				"name": "Gold",
				"options": [
					{ "id": "1",
					"name": "1 Yr / 12,000 miles" },
					{ "id": "2",
					"name": "2 Yr / 24,000 miles" }
				]
			};
			$httpBackend.expectGET('./dummy-data/products.json').
				respond([testData]);
		});

		it('getProducts returns properly', function(){
			svc.getProducts(function(data, status){
				expect(data).not.toBeNull();
				expect(data.length).toBeGreaterThan(0);
				expect(data[0].name).toMatch(testData.name);//
				expect(data[0].options).not.toBeNull();
				expect(data[0].options.length).toBeGreaterThan(0);
				expect(data[0].options[0].id).not.toBeNull();
			});
		});
	});

	describe('getDetails()', function(){
		beforeEach(function(){
			testData = {
				"id": "1",
				"product_id": "1",
				"name": "1 Yr / 12,000 miles",
				"options": [
					{
						"id": "0",
						"type": "radioGroup",
						"code": "optionGroup_0",
						"name": "Deductible",
						"items": [
							{ "id": 0,
								"name": "zero" },
							{ "id": 1,
								"name": "$100" },
							{ "id": 2,
								"name": "$50" },
							{ "id": 3,
								"name": "disappearing" },
							{ "id": 4,
								"name": "$50" }
						]
					}
				]
			};
			$httpBackend.expectGET('./dummy-data/detail-all.json').
				respond([testData]);
		});
		it('getDetails returns properly', function(){
			svc.getDetails(function(data, status){
				expect(data).not.toBeNull();
				//expect(data.length).toBeGreaterThan(0);
				expect(data.name).toMatch(testData.name);//
				expect(data.options).not.toBeNull();
				expect(data.options.length).toBeGreaterThan(0);
				expect(data.options[0].items).not.toBeNull();
				expect(data.options[0].items.length).toBeGreaterThan(0);
				expect(data.options[0].items[0].name).
					toMatch(testData.options[0].items[0].name);
			});
		});
	});
});