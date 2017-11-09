'use strict';

angular.module('angularFullstackApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('buchungen', {
        url: '/buchungen',
        template: '<buchungen></buchungen>'
      })
      .state('buchungenedit', {
        url: '/buchungenedit/{statementItemId}',
        template: '<buchungenedit></buchungenedit>'
      });
  });
