'use strict';

describe('directives', function() {
	var $scope,
		form;
	
	beforeEach(module('australianBusinessNumber'));
	
	beforeEach(inject(function($compile, $rootScope) {
		$scope = $rootScope.$new();
		var element = angular.element(
			'<form name="form">'+
				'<input ng-model="model.abn" name="abn" abn />' +
			'</form>'
		);
		$scope.model = { abn: null };
		$compile(element)($scope);
		$scope.$digest();
		form = $scope.form;
	}));
  
	describe('abn', function() {
		it('should pass with a valid ABN', function() {
			var exampleABN = '53004085616';
			form.abn.$setViewValue(exampleABN);
			expect($scope.model.abn).toEqual(exampleABN);
			expect(form.abn.$valid).toBe(true);
		});
		it('should pass an ABN with spaces', function() {
			var exampleABN = '   5 3 0  0 4 0   8 5  6 1 6    ';
			form.abn.$setViewValue(exampleABN);
			expect($scope.model.abn).toEqual(exampleABN);
			expect(form.abn.$valid).toBe(true);
		});
		it('should pass with an empty ABN', function() {
			form.abn.$setViewValue('');
			expect($scope.model.abn).toEqual('');
			expect(form.abn.$valid).toBe(true);
		});
		it('should pass with Google Australia\'s ABN', function() {
			var googleAustraliaABN = '33 102 417 032';
			form.abn.$setViewValue(googleAustraliaABN);
			expect($scope.model.abn).toEqual(googleAustraliaABN);
			expect(form.abn.$valid).toBe(true);
		});
		it('should pass with Telstra\'s ABN', function() {
			var googleAustraliaABN = '33 051 775 556';
			form.abn.$setViewValue(googleAustraliaABN);
			expect($scope.model.abn).toEqual(googleAustraliaABN);
			expect(form.abn.$valid).toBe(true);
		});
		it('should fail with text', function() {
			var failABN = 'ishouldnotwork';
			form.abn.$setViewValue(failABN);
			expect($scope.model.abn).toEqual(undefined);
			expect(form.abn.$valid).toBe(false);
		});
		it('should fail with 11 chars', function() {
			var failABN = 'abcdefghijk';
			form.abn.$setViewValue(failABN);
			expect($scope.model.abn).toEqual(undefined);
			expect(form.abn.$valid).toBe(false);
		});
		it('should fail with a partial ABN', function() {
			var examplePartialABN = '53 004 085'; //+ 616
			form.abn.$setViewValue(examplePartialABN);
			expect($scope.model.abn).toEqual(undefined);
			expect(form.abn.$valid).toBe(false);
		});
		it('should fail with a 12 digit ABN', function() {
			var examplePartialABN = '53 004 085 616 0';
			form.abn.$setViewValue(examplePartialABN);
			expect($scope.model.abn).toEqual(undefined);
			expect(form.abn.$valid).toBe(false);
		});
		it('should fail with a valid ABN containing text', function() {
			var exampleABN = 'ABC 53 004 085 616';
			form.abn.$setViewValue(exampleABN);
			expect($scope.model.abn).toEqual(undefined);
			expect(form.abn.$valid).toBe(false);
		});
	});
});