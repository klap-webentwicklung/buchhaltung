'use strict';

(function() {

  class MainController {

    constructor($http,StatementService, uiGridConstants, $location, $filter) {
      this.$http = $http;
      this.awesomeThings = [];
      this.StatementService = StatementService;
      this.uiGridConstants = uiGridConstants;
      this.$location = $location;
      this.$filter = $filter;

      this.gridOptions = {

        columnDefs: [
          
          {
            field: 'monat'
          },
          {
            field: 'einkommen'
          },
          {
            field: 'material'
          }
          
        ]


      }; // End UI Grid Options

    } // end constructor

    $onInit() {

      this.gridOptions.data = [{
        monat: "Januar",
        einkommen: 200,
        material: 40
      }];

      this.$http.get('/api/things')
        .then(response => {
          this.awesomeThings = response.data;
        });
    }

    addThing() {
      if (this.newThing) {
        this.$http.post('/api/things', {
          name: this.newThing
        });
        this.newThing = '';
      }
    }

    deleteThing(thing) {
      this.$http.delete('/api/things/' + thing._id);
    }
  }

  angular.module('angularFullstackApp')
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController
    });
})();
