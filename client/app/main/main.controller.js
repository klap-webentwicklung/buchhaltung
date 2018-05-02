'use strict';

(function() {

  class MainController {

    constructor($http, StatementService, uiGridConstants, $location, $filter) {
      this.$http = $http;
      this.awesomeThings = [];
      this.StatementService = StatementService;
      this.uiGridConstants = uiGridConstants;
      this.$location = $location;
      this.$filter = $filter;
      this.reverse = true;

      this.gridOptions = {

        showGridFooter: true,
        showColumnFooter: true,

        columnDefs: [
          {
            field: 'tag'
          },
          {
            field: 'monat',
            visible: false
          },
          {
            field: 'einnahmen',
            aggregationType: uiGridConstants.aggregationTypes.sum, aggregationHideLabel: true
          },
          {
            field: 'material',
            aggregationType: uiGridConstants.aggregationTypes.sum, aggregationHideLabel: true
          },
          {
            field: 'lohn',
            aggregationType: uiGridConstants.aggregationTypes.sum, aggregationHideLabel: true
          },
          {
            field: 'hardware',
            aggregationType: uiGridConstants.aggregationTypes.sum, aggregationHideLabel: true
          },
          {
            field: 'software',
            aggregationType: uiGridConstants.aggregationTypes.sum, aggregationHideLabel: true
          },
          {
            field: 'mietePutzenEWZ',
            aggregationType: uiGridConstants.aggregationTypes.sum, aggregationHideLabel: true
          },
          {
            field: 'bueroTelefon',
            aggregationType: uiGridConstants.aggregationTypes.sum, aggregationHideLabel: true
          },
          {
            field: 'transport',
            aggregationType: uiGridConstants.aggregationTypes.sum, aggregationHideLabel: true
          },
          {
            field: 'werbung',
            aggregationType: uiGridConstants.aggregationTypes.sum, aggregationHideLabel: true
          },
          {
            field: 'ahv',
            aggregationType: uiGridConstants.aggregationTypes.sum, aggregationHideLabel: true
          },
          {
            field: 'versicherung',
            aggregationType: uiGridConstants.aggregationTypes.sum, aggregationHideLabel: true
          },
          {
            field: 'repSpesen',
            aggregationType: uiGridConstants.aggregationTypes.sum, aggregationHideLabel: true
          },
          {
            field: 'weiterBildung',
            aggregationType: uiGridConstants.aggregationTypes.sum, aggregationHideLabel: true
          },
          {
            field: 'diverses',
            aggregationType: uiGridConstants.aggregationTypes.sum, aggregationHideLabel: true
          }
        ],
        
        onRegisterApi: function(gridApi) {
                this.gridApi = gridApi;
                console.log('gridApi: ', this.gridApi.grid.columns);
                var colTotals = [];
                this.gridApi.grid.columns.forEach(element => {
                  console.log('agg triggered');
                    //colTotals.push({element.name : element.aggregationValue});
                });
                
        },
      }; // End UI Grid Options
      
    } // end constructor
    
    $onInit() {
      
      // is undefined
      
      
      
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
          
          /* if(element.costType === "Versicherung") {
            element.versicherung = element.amount;
          }  */
          
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
            element.material = element.amount;
            break;
            case 'Software':
            element.material = element.amount;
            break;
            case 'Miete Putzen EWZ':
            element.material = element.amount;
            break;
            case 'Büro und Telefon':
            element.material = element.amount;
            break;
            case 'Transport':
            element.material = element.amount;
            break;
            case 'Werbung':
            element.material = element.amount;
            break;
            case 'AHV':
            element.material = element.amount;
            break;
            case 'Versicherung':
            element.material = element.amount;
            break;
            case 'Rep - Spesen':
            element.material = element.amount;
            break;
            case 'Weiter - bildung':
            element.material = element.amount;
                break;
                case 'Diverser Aufwand':
                element.material = element.amount;
                break;
                
              }
              
            });
            
            // groop buchungen by "monat"
            var jahr2018MonatOrdered = this.$filter('orderBy')(jahr2018, "monat");
            // console.log(' 2018 Monat ordered:', jahr2018MonatOrdered);
            
            var jahr2018MonatGrouped = this.$filter('groupBy')(jahr2018MonatOrdered, "monat");
            console.log('Jahr 2018 Monat grouped:', jahr2018MonatGrouped);
            
            var jahr2028Januar = jahr2018MonatGrouped.January;
            
            console.log('jahr2028Januar:', jahr2028Januar);
            this.gridOptions.data = jahr2028Januar;
            
            // this.gridOptions.onRegisterApi();
            
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
          });
        };
        
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
