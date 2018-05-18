'use strict';

(function () {
  
  class MainController {
    
    constructor($http, StatementService, uiGridConstants, $location, $filter, $scope, $timeout) {
      this.$http = $http;
      this.$scope = $scope;
      this.awesomeThings = [];
      this.StatementService = StatementService;
      this.uiGridConstants = uiGridConstants;
      this.$location = $location;
      this.$filter = $filter;
      this.reverse = true;
      this.$timeout = $timeout;
      this.foo = 'foo';
      // sample array for overview table
      this.overviewItems = [
        {
          month: 'january',
          items: {
            einnahmen: 500,
            lohn: -300,
            software: -200
          }
        },
        {
          month: 'february',
          items: {
            einnahmen: 600,
            lohn: -300,
            software: -250
          }
        }
      ];
      var self = this;
      this.colSums = [];
      this.gridOptions = {

        showColumnFooter: true,
        enableFiltering: true,
        enableSorting: true,
        onRegisterApi: function (gridApi) {
          self.gridApi = gridApi;
          // this.gridApi.grid.columns[7].getAggregationValue();
          console.log('gridApi: ', self.gridApi.grid.columns);
        },

        columnDefs: [{
          name: 'Edit',
          field: 'actions',
          width: 50,
          enableFiltering: false,
          enableSorting: false,
          enableCellEdit: false,
          cellTemplate: '<div class="btn-group"><button type="button" class="btn btn-default" ng-click="grid.appScope.$ctrl.passItem(row.entity)">Edit</button></div></td>',
          aggregationType: uiGridConstants.aggregationTypes.count
        },
        {
          field: 'neutralTrans',
          filter: {
            condition: function (searchTerm, cellValue) {
              return cellValue === false;
            },
            noTerm: true
          },
          visible: false
        },
        {
          field: 'tag',
          sort: {
            direction: uiGridConstants.ASC,
            priority: 1
          }
        },
        {
          field: 'monat',
          visible: false
        },
        {
          field: 'amountEth',
          aggregationType: uiGridConstants.aggregationTypes.sum, aggregationHideLabel: true,
          footerCellTemplate: '<div class="ui-grid-cell-contents" >{{col.getAggregationValue() | number:5 }}</div>',
          name: 'ETH',
          cellFilter: 'number: 5'
        },
        {
          name: 'Naturalbezüge',
          field: 'naturalbezuege',
          cellFilter: 'number: 2',
          aggregationType: uiGridConstants.aggregationTypes.sum, aggregationHideLabel: true,
          footerCellTemplate: '<div class="ui-grid-cell-contents" >{{col.getAggregationValue() | number:2 }}</div>'
        },
        {
          name: 'einnahmen',
          field: 'einnahmen',
          cellFilter: 'number: 2',
          aggregationType: uiGridConstants.aggregationTypes.sum, aggregationHideLabel: true,
          footerCellTemplate: '<div class="ui-grid-cell-contents" >{{col.getAggregationValue() | number:2 }}</div>'
        },
        {
          name: 'AirBnb',
          field: 'airbnb',
          aggregationType: uiGridConstants.aggregationTypes.sum, aggregationHideLabel: true,
          footerCellTemplate: '<div class="ui-grid-cell-contents" >{{col.getAggregationValue() | number:2 }}</div>',
          cellFilter: 'number: 2'
        },
        {
          field: 'rate',
          cellFilter: 'number: 5'
        },
        {
          field: 'material',
          cellFilter: 'number: 2',
          aggregationType: uiGridConstants.aggregationTypes.sum, aggregationHideLabel: true,
          footerCellTemplate: '<div class="ui-grid-cell-contents" >{{col.getAggregationValue() | number:2 }}</div>'
        },
        {
          field: 'lohn',
          cellFilter: 'number: 2',
          aggregationType: uiGridConstants.aggregationTypes.sum, aggregationHideLabel: true,
          footerCellTemplate: '<div class="ui-grid-cell-contents" >{{col.getAggregationValue() | number:2 }}</div>'
        },
        {
          field: 'hardware',
          cellFilter: 'number: 2',
          aggregationType: uiGridConstants.aggregationTypes.sum, aggregationHideLabel: true,
          footerCellTemplate: '<div class="ui-grid-cell-contents" >{{col.getAggregationValue() | number:2 }}</div>'
        },
        {
          field: 'software',
          cellFilter: 'number: 2',
          aggregationType: uiGridConstants.aggregationTypes.sum, aggregationHideLabel: true,
          footerCellTemplate: '<div class="ui-grid-cell-contents" >{{col.getAggregationValue() | number:2 }}</div>'
        },
        {
          field: 'mietePutzenEwz',
          cellFilter: 'number: 2',
          aggregationType: uiGridConstants.aggregationTypes.sum, aggregationHideLabel: true,
          footerCellTemplate: '<div class="ui-grid-cell-contents" >{{col.getAggregationValue() | number:2 }}</div>'
        },
        {
          field: 'bureauTelefon',
          cellFilter: 'number: 2',
          aggregationType: uiGridConstants.aggregationTypes.sum, aggregationHideLabel: true,
          footerCellTemplate: '<div class="ui-grid-cell-contents" >{{col.getAggregationValue() | number:2 }}</div>'
        },
        {
          field: 'transport',
          cellFilter: 'number: 2',
          aggregationType: uiGridConstants.aggregationTypes.sum, aggregationHideLabel: true,
          footerCellTemplate: '<div class="ui-grid-cell-contents" >{{col.getAggregationValue() | number:2 }}</div>'
        },
        {
          field: 'werbung',
          cellFilter: 'number: 2',
          aggregationType: uiGridConstants.aggregationTypes.sum, aggregationHideLabel: true,
          footerCellTemplate: '<div class="ui-grid-cell-contents" >{{col.getAggregationValue() | number:2 }}</div>'
        },
        {
          field: 'ahv',
          cellFilter: 'number: 2',
          aggregationType: uiGridConstants.aggregationTypes.sum, aggregationHideLabel: true,
          footerCellTemplate: '<div class="ui-grid-cell-contents" >{{col.getAggregationValue() | number:2 }}</div>'
        },
        {
          field: 'versicherung',
          cellFilter: 'number: 2',
          aggregationType: uiGridConstants.aggregationTypes.sum, aggregationHideLabel: true,
          footerCellTemplate: '<div class="ui-grid-cell-contents" >{{col.getAggregationValue() | number:2 }}</div>'
        },
        {
          field: 'repSpesen',
          cellFilter: 'number: 2',
          aggregationType: uiGridConstants.aggregationTypes.sum, aggregationHideLabel: true,
          footerCellTemplate: '<div class="ui-grid-cell-contents" >{{col.getAggregationValue() | number:2 }}</div>'
        },
        {
          field: 'weiterBildung',
          cellFilter: 'number: 2',
          aggregationType: uiGridConstants.aggregationTypes.sum, aggregationHideLabel: true,
          footerCellTemplate: '<div class="ui-grid-cell-contents" >{{col.getAggregationValue() | number:2 }}</div>'
        },
        {
          field: 'diverserAufwand',
          cellFilter: 'number: 2',
          aggregationType: uiGridConstants.aggregationTypes.sum, aggregationHideLabel: true,
          footerCellTemplate: '<div class="ui-grid-cell-contents" >{{col.getAggregationValue() | number:2 }}</div>'
        }
        ],

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

          jahr2018.forEach(element => {

            if (element.incomeType === "Einnahmen") {
              element.einnahmen = element.amount;
            }

            if (element.incomeType === "Naturalbezüge") {
              element.naturalbezuege = element.amount;
            }

            if (element.incomeType === "AirBnb") {
              element.airbnb = element.amount;
            }

            if (element.currency === 'EUR') {
              element.amount = element.amountEur;
            }

            switch (element.costType) {
              case 'Versicherung':
                element.versicherung = element.amount;
                break;
              case 'Lohn':
                element.lohn = element.amount;
                break;
              case 'Material':
                element.material = element.amount;
                break;
              case 'Hardware':
                element.hardware = element.amount;
                break;
              case 'Software':
                element.software = element.amount;
                break;
              case 'Miete Putzen EWZ':
                element.mietePutzenEwz = element.amount;
                break;
              case 'Büro und Telefon':
                element.bureauTelefon = element.amount;
                break;
              case 'Transport':
                element.transport = element.amount;
                break;
              case 'Werbung':
                element.werbung = element.amount;
                break;
              case 'AHV':
                element.ahv = element.amount;
                break;
              case 'Versicherung':
                element.versicherung = element.amount;
                break;
              case 'Rep - Spesen':
                element.repSpesen = element.amount;
                break;
              case 'Weiter - bildung':
                element.weiterBildung = element.amount;
                break;
              case 'Diverser Aufwand':
                element.diverserAufwand = element.amount;
                break;
            }
          });

          // order buchungen by "monat"
          var jahr2018MonatOrdered = this.$filter('orderBy')(jahr2018, "monat");
          // console.log(' 2018 Monat ordered:', jahr2018MonatOrdered);

          var jahr2018MonatGrouped = this.$filter('groupBy')(jahr2018MonatOrdered, "monat");
          console.log('Jahr 2018 Monat grouped:', jahr2018MonatGrouped);

          var jahr2028Januar = jahr2018MonatGrouped.January;
          console.log('jahr2028Januar:', jahr2028Januar);
          var jahr2028Februar = jahr2018MonatGrouped.February;
          console.log('jahr2028Februar:', jahr2028Februar);

          this.gridOptions.data = jahr2028Januar;

        }); // end $http.get

        
        var self = this;
        this.$timeout(function () {
          var gridcolumns = self.gridApi.grid.columns;
          gridcolumns.forEach(element => {
            self.colSums.push({ colName: element.name, colSum: element.aggregationValue });
          });
        }, 3000);
        
        // dies ist das aggregierte ergebnis vom Januar, das in der Übersicht der entsprechenden
        // Zeile entspricht. Somit kann ein neuer array gebildet werden, mit jedem Monat als Obj.
        this.$timeout(function () {
          console.log('aggregated values: ', self.colSums);
        }, 4000);
        
      } // end $onInit
      
      // to edit
      passItem(statementItem) {
        this.$location.path('/buchungenedit/' + statementItem._id);
        // this.$state.go('mitgliededit', {memberId: member._id});
      }
      
      setActiveTab(index) {
        console.log('active Tab triggered');
        this.activeTab = index;
      }
      
      /* CRUD Example
      this.$http.get('/api/things')
      .then(response => {
        this.awesomeThings = response.data;
       });

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
   } */

  }

  angular.module('angularFullstackApp')
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController
    });
})();
