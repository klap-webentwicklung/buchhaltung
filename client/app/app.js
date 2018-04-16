'use strict';

angular.module('angularFullstackApp', ['angularFullstackApp.auth', 'angularFullstackApp.admin', 'ui.grid',
    'angularFullstackApp.constants', 'ngCookies', 'ngResource', 'ngSanitize', 'ui.router',
  'ui.bootstrap', 'validation.match', 'ui.grid.edit'
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
  })

  .filter('groupBy', ['pmkr.filterStabilize', function (stabilize) {
    return stabilize(function (data, key) {
      if (!(data && key)) return;
      var result = {};
      for (var i = 0; i < data.length; i++) {
        if (!result[data[i][key]])
          result[data[i][key]] = [];
        result[data[i][key]].push(data[i])
      }
      return result;
    });
  }])

  .factory('pmkr.filterStabilize', [
    'pmkr.memoize',
    function (memoize) {
      function service(fn) {
        function filter() {
          var args = [].slice.call(arguments);
          // always pass a copy of the args so that the original input can't be modified
          args = angular.copy(args);
          // return the `fn` return value or input reference (makes `fn` return optional)
          var filtered = fn.apply(this, args) || args[0];
          return filtered;
        }
        var memoized = memoize(filter);
        return memoized;
      }
      return service;
    }
  ])
  
  .factory('pmkr.memoize', [
    function () {
      function service() {
        return memoizeFactory.apply(this, arguments);
      }
      function memoizeFactory(fn) {
        var cache = {};
        function memoized() {
          var args = [].slice.call(arguments);
          var key = JSON.stringify(args);
          var fromCache = cache[key];
          if (fromCache) {
            return fromCache;
          }
          cache[key] = fn.apply(this, arguments);
          return cache[key];
        }
        return memoized;
      }
      return service;
    }
  ])

  /* .filter('groupBy', function () {
    var results = {};
    return function (data, key) {
      if (!(data && key)) return;
      var result;
      if (!this.$id) {
        result = {};
      } else {
        var scopeId = this.$id;
        if (!results[scopeId]) {
          results[scopeId] = {};
          this.$on("$destroy", function () {
            delete results[scopeId];
          });
        }
        result = results[scopeId];
      }

      for (var groupKey in result)
        result[groupKey].splice(0, result[groupKey].length);

      for (var i = 0; i < data.length; i++) {
        if (!result[data[i][key]])
          result[data[i][key]] = [];
        result[data[i][key]].push(data[i]);
      }

      var keys = Object.keys(result);
      for (var k = 0; k < keys.length; k++) {
        if (result[keys[k]].length === 0)
          delete result[keys[k]];
      }
      return result;
    };
  }) */
  
  .filter('mapType', function () {
    var genderHash = {
      1: 'hardware',
      2: 'lohn'
    };

    return function (input) {
      if (!input) {
        return '';
      } else {
        return genderHash[input];
      }
    };
  });
