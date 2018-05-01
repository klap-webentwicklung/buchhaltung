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
      this.reverse = true;

      this.gridOptions = {

        columnDefs: [
          {
            field: 'tag'
          },
          {
            field: 'monat',
            visible: false
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
          // console.log('this.buchungen:', this.buchungen);

          // groop buchungen by "jahr"
          var buchungenJahrOrdered = this.$filter('orderBy')(this.buchungen, "jahr", this.reverse);
          // console.log('buchungen Jahr ordered:', buchungenJahrOrdered);
          
          var buchungenJahrGrouped = this.$filter('groupBy')(buchungenJahrOrdered, "jahr");
          // console.log('buchungenMonat grouped:', buchungenJahrGrouped);

          var jahr2018 = buchungenJahrGrouped[2018];

          // groop buchungen by "monat"
          var jahr2018MonatOrdered = this.$filter('orderBy')(jahr2018, "monat");
          // console.log(' 2018 Monat ordered:', jahr2018MonatOrdered);
          
          var jahr2018MonatGrouped = this.$filter('groupBy')(jahr2018MonatOrdered, "monat");
          console.log('Jahr 2018 Monat grouped:', jahr2018MonatGrouped);

          var jahr2028Januar = jahr2018MonatGrouped.January;

          jahr2028Januar.forEach(element => {
            console.log('foreach triggered');
            if(element.costType === "Versicherung") {
              element.versicherung = element.amount;
            }
          });
          console.log('jahr2028Januar:', jahr2028Januar);
          this.gridOptions.data = jahr2028Januar;

        });

        /* this.gridOptions.data = [{
          jahr: "2018",
          monat: "Januar",
          tag: "11.",
          amountEth: 1.1,
          rate: 600,
          amount: 660, // naturalbezug
          /*einnahmen: null,
          material: 40,
          lohn: 200,
          hardware: null,
          software: null,
          mietePutzenEWZ: null,
          bueroTelefon: null,
          transport: null,
          werbung: null,
          ahv: null,
          versicherung: null,
          repSpesen: null,
          weiterBildung: null,
          diverses: null
        }]; 
        */

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
