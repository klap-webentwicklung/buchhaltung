'use strict';

angular.module('angularFullstackApp', ['angularFullstackApp.auth', 'angularFullstackApp.admin', 'ui.grid',
    'angularFullstackApp.constants', 'ngCookies', 'ngResource', 'ngSanitize', 'ui.router',
    'ui.bootstrap', 'validation.match'
  ])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);
  })

    // make statement data available
  .factory('StatementService', function($http) {
    return {
      getStatements: function() {
        var promise = $http.get('/api/statements')
          .then(response => {
          	console.log('got the Statements');
            return response.data;
          });
        return promise;
      }

    };
  });
