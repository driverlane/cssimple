describe('Unit: Browse', function() {

	describe('Unit: Browse: BrowseController', function() {
		
		var scope, routeParams, controller;
		
		// load the module
		beforeEach(module('browse'));
		
		// instantiate BrowseController and set it's scope
		beforeEach(inject(function($rootScope) {
			scope = $rootScope.$new();
			routeParams = {};
		}));
		
		it('should format the OT date when setDate is called', function() {
			controller = $controller('BrowseController', {
				$scope: scope,
				$routeParams: routeParams
			});
			var otdate = '';
			var expecteddate = '';
			var result = scope.setDate(otdate);
			expect(otdate).toEqual(expecteddate);
		});

	});

});