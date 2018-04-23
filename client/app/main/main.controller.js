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
            field: 'einnahmen'
          },
          {
            field: 'material'
          },
          {
            field: 'lohn'
          },
          {
            field: 'hardware'
          },
          {
            field: 'software'
          },
          {
            field: 'mietePutzenEWZ'
          },
          {
            field: 'bueroTelefon'
          },
          {
            field: 'transport'
          },
          {
            field: 'werbung'
          },
          {
            field: 'ahv'
          },
          {
            field: 'versicherung'
          },
          {
            field: 'repSpesen'
          },
          {
            field: 'weiterBildung'
          },
          {
            field: 'diverses'
          }
        ]

      }; // End UI Grid Options

    } // end constructor

    $onInit() {

      this.$http.get('/api/statements')
        .then(response => {
          this.buchungen = response.data;
          console.log('this.buchungen:', this.buchungen);

          // groop buchungen by "jahr", "monat", "incomeType" or "costType"
          var buchungenMonatOrdered = this.$filter('orderBy')(this.buchungen, "monat");
          console.log('buchungenMonat ordered:', buchungenMonatOrdered);
          
          var buchungenMonatGrouped = this.$filter('groupBy')(buchungenMonatOrdered, "monat");
          console.log('buchungenMonat grouped:', buchungenMonatGrouped);
        });

      this.gridOptions.data = [{
        jahr: "2017",
        monat: "Januar",
        einkommen: 200,
        material: 40,
        lohn: 200,
        hardware: null,
        software: null,
        mietePutzenEWZ: null,
        bueroTelefon: null,
        transport:null,
        werbung: null,
        ahv: null,
        versicherung: null,
        repSpesen: null,
        weiterBildung: null,
        diverses: null
      }];

      /* this.$http.get('/api/things')
        .then(response => {
          this.awesomeThings = response.data;
        }); */
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
