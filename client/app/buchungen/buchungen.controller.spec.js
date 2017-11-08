'use strict';

describe('Component: BuchungenComponent', function () {

  // load the controller's module
  beforeEach(module('angularFullstackApp'));

  var BuchungenComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    BuchungenComponent = $componentController('BuchungenComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
