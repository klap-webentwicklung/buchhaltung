'use strict';
(function () {

  class BuchungenComponent {
    constructor(StatementService, uiGridConstants, $location, $filter, $http) {
      this.StatementService = StatementService;
      this.uiGridConstants = uiGridConstants;
      this.$location = $location;
      this.$filter = $filter;
      this.$http = $http;
      
      // Date conversion
      // ***********************
      // var stringDateD = "21.09.2017";
      // var datecomp = stringDateD.split('.');
      // var date = new Date(datecomp[2], datecomp[1]-1, datecomp[0]);
      // console.log('Date Obj: ', date);
      // ***********************

      this.gridOptions1 = {

        enableSorting: true,
        enableFiltering: true,
        showGridFooter: true,
        showColumnFooter: true,
        showColumnMenu: true,
        multiSelect: true,
        enableGridMenu: true,
        enableSelectAll: true,

        columnDefs: [
          {
            name: 'Edit',
            field: 'actions',
            width: 50,
            enableFiltering: false,
            enableSorting: false,
            enableCellEdit: false,
            cellTemplate: '<div class="btn-group"><button type="button" class="btn btn-default" ng-click="grid.appScope.$ctrl.passItem(row.entity)">Edit</button></div></td>',
          },
          {
            name: 'Delete',
            field: 'actions',
            width: 50,
            enableFiltering: false,
            enableSorting: false,
            enableCellEdit: false,
            cellTemplate: '<div class="btn-group"><button type="button" class="btn btn-default" ng-click="grid.appScope.$ctrl.deleteItem(row.entity)">Delete</button></div></td>',
          },
          {
            name: 'Add',
            field: 'actions',
            width: 50,
            enableFiltering: false,
            enableSorting: false,
            enableCellEdit: false,
            cellTemplate: '<div class="btn-group"><button type="button" class="btn btn-default" ng-click="grid.appScope.$ctrl.newItem()">Add</button></div></td>',
            // cellTemplate: '<div class="btn-group"><button type="button" class="btn btn-default" ng-click="grid.appScope.$ctrl.passItem(row.entity)">Edit</button></div></td>',
            aggregationType: uiGridConstants.aggregationTypes.count
          },
          {
            name: 'Provider',
            field: 'provider',
            width: 140
          },
          {
            name: 'Datum',
            field: 'date',
            width: 120,
            // exporterSuppressExport: true
          },
          {
            field: 'jahr',
          },
          {
            field: 'monat',
          },
          {
            name: 'Buchungs-Text',
            field: 'infotext',
            width: 600,
            sort: {
              direction: uiGridConstants.DESC,
              priority: 2
            }
          },
          //  {
          //   name: 'E-mail',
          //   field: 'memberData.mail',
          //   cellTemplate: '<div class="ui-grid-cell-contents"><a href="mailto:{{COL_FIELD}}">{{COL_FIELD}}</a></div>',
          //   width: 150
          // },
          {
            name: 'Betrag',
            field: 'amount',
            width: 100
          },
              /* {
                field: 'type', editableCellTemplate: 'ui-grid/dropdownEditor', cellFilter: 'mapType', editDropdownValueLabel: 'type', editDropdownOptionsArray: [
                  { id: 1, type: 'hardware' },
                  { id: 2, type: 'lohn' }
                ] 
              } */
              /* {
                field: 'type',
              width: 200
            },  */             {
            field: 'costType',
            width: 200
          },
          {
            field: 'incomeType',
            width: 200
          }, {
            name: 'OK',
            field: 'processed',
            sort: {
              direction: uiGridConstants.DESC,
              priority: 1
            },
            filter: {
              condition: function (searchTerm, cellValue) {
                return cellValue !== true;
              },
              noTerm: true
            },
            visible: false
          }, {
            name: 'Neut. Trans',
            field: 'neutralTrans',
            sort: {
              direction: uiGridConstants.DESC,
              priority: 3
            },
            filter: {
              condition: function (searchTerm, cellValue) {
                return cellValue === false;
              },
              noTerm: true
            },
            visible: false
          }
        ]


      }; // End UI Grid Options1

      // Grid Options 2
      this.gridOptions2 = {

        enableSorting: true,
        enableFiltering: true,
        showGridFooter: true,
        showColumnFooter: true,
        showColumnMenu: true,
        multiSelect: true,
        enableGridMenu: true,
        enableSelectAll: true,

        columnDefs: [
          {
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
            name: 'Provider',
            field: 'provider',
            width: 140
          },
          {
            name: 'Datum',
            field: 'date',
            width: 120,
          },
          {
            field: 'jahr',
          },
          {
            field: 'monat',
          },
          {
            name: 'Buchungs-Text',
            field: 'infotext',
            width: 600,
            sort: {
              direction: uiGridConstants.DESC,
              priority: 2
            }
          },
          {
            name: 'Betrag',
            field: 'amount',
            width: 100,
            aggregationType: uiGridConstants.aggregationTypes.sum
          },
          {
            field: 'costType',
            width: 200,
            filter: {
              condition: function (searchTerm, cellValue) {
                return cellValue !== 'Lohn';
              },
              noTerm: true
            },
          },
          {
            field: 'incomeType',
            width: 200,
            filter: {
              condition: function (searchTerm, cellValue) {
                return cellValue == '' || cellValue == null;
              },
              noTerm: true
            },
            visible: false
          }, {
            name: 'OK',
            field: 'processed',
            sort: {
              direction: uiGridConstants.DESC,
              priority: 1
            },
            filter: {
              condition: function (searchTerm, cellValue) {
                return cellValue === true;
              },
              noTerm: true
            },
            visible: false
          }, {
            name: 'Neut. Trans',
            field: 'neutralTrans',
            sort: {
              direction: uiGridConstants.DESC,
              priority: 3
            },
            filter: {
              condition: function (searchTerm, cellValue) {
                return cellValue === false;
              },
              noTerm: true
            },
            visible: false
          }
        ]


      }; // End UI Grid Options2

      // Grid Options 4 (Zugeordnete Ertrags-Positionen)
      this.gridOptions4 = {

        enableSorting: true,
        enableFiltering: true,
        showGridFooter: true,
        showColumnFooter: true,
        showColumnMenu: true,
        multiSelect: true,
        enableGridMenu: true,
        enableSelectAll: true,

        columnDefs: [
          {
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
            name: 'Provider',
            field: 'provider',
            width: 140
          },
          {
            name: 'Datum',
            field: 'date',
            width: 120,
          },
          {
            field: 'jahr',
          },
          {
            field: 'monat',
          },
          {
            name: 'Buchungs-Text',
            field: 'infotext',
            width: 600,
            sort: {
              direction: uiGridConstants.DESC,
              priority: 2
            }
          },
          {
            field: 'comment'
          },
          {
            name: 'Betrag',
            field: 'amount',
            width: 100,
            aggregationType: uiGridConstants.aggregationTypes.sum
          },
          {
            field: 'costType',
            width: 200,
            filter: {
              condition: function (searchTerm, cellValue) {
                return cellValue == '' || cellValue == null;
              },
              noTerm: true
            },
            visible: false
          },
          {
            field: 'incomeType',
            width: 200
          }, {
            name: 'OK',
            field: 'processed',
            sort: {
              direction: uiGridConstants.DESC,
              priority: 1
            },
            filter: {
              condition: function (searchTerm, cellValue) {
                return cellValue === true;
              },
              noTerm: true
            },
            visible: false
          }, {
            name: 'Neut. Trans',
            field: 'neutralTrans',
            sort: {
              direction: uiGridConstants.DESC,
              priority: 3
            },
            filter: {
              condition: function (searchTerm, cellValue) {
                return cellValue === false;
              },
              noTerm: true
            },
            visible: false
          }
        ]


      }; // End UI Grid Options4

      // Grid Options 3 (Ertrags-Neutrale Positionen)
      this.gridOptions3 = {

        enableSorting: true,
        enableFiltering: true,
        showGridFooter: true,
        showColumnFooter: true,
        showColumnMenu: true,
        multiSelect: true,
        enableGridMenu: true,
        enableSelectAll: true,

        columnDefs: [
          {
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
            name: 'Provider',
            field: 'provider',
            width: 140
          },
          {
            name: 'Datum',
            field: 'date',
            width: 120,
            sort: {
              direction: uiGridConstants.DESC,
              priority: 1
            }
          },
          {
            field: 'jahr',
          },
          {
            field: 'monat'
          },
          {
            name: 'Buchungs-Text',
            field: 'infotext',
            width: 600
          },
          {
            field: 'comment'
          },
          {
            name: 'Betrag',
            field: 'amount',
            width: 100
          }, {
            name: 'OK',
            field: 'processed'
          }, {
            name: 'Neut. Trans',
            field: 'neutralTrans',
            filter: {
              condition: function (searchTerm, cellValue) {
                return cellValue === true;
              },
              noTerm: true
            },
            visible: false
          }
        ]
      }; // End UI Grid Options3

      // Grid Options 5 (alle Positionen)
      this.gridOptions5 = {

        enableSorting: true,
        enableFiltering: true,
        showGridFooter: true,
        showColumnFooter: true,
        showColumnMenu: true,
        multiSelect: true,
        enableGridMenu: true,
        enableSelectAll: true,

        columnDefs: [
          {
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
            name: 'Provider',
            field: 'provider',
            width: 140
          },
          {
            name: 'Datum',
            field: 'date',
            width: 120,
          },
          {
            field: 'jahr',
          },
          {
            field: 'monat',
          },
          {
            name: 'Buchungs-Text',
            field: 'infotext',
            width: 600,
            sort: {
              direction: uiGridConstants.DESC,
              priority: 2
            }
          },
          {
            field: 'comment'
          },
          {
            name: 'Betrag',
            field: 'amount',
            width: 100
          }, {
            field: 'costType',
            width: 200
            
          },
          {
            field: 'incomeType',
            width: 200
          }, {
            name: 'OK',
            field: 'processed',
            sort: {
              direction: uiGridConstants.DESC,
              priority: 1
            },
            
          }, {
            name: 'Neut. Trans',
            field: 'neutralTrans',
            sort: {
              direction: uiGridConstants.DESC,
              priority: 3
            }
          }
        ]


      }; // End UI Grid Options5
      
      // Grid Options6
      this.gridOptions6 = {

        columnDefs: [

          {
            field: 'datum'
          },
          {
            field: 'einnahmenEth'
          },
          {
            field: 'ethChf'
          },
          {
            field: 'naturalbezug'
          },
          {
            field: 'einnahmen'
          },
          {
            field: 'lohn'
          },
          {
            field: 'material'
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

      }; // End UI Grid Options6

    } // End Constructor

    $onInit() {

      var self = this;
      // get marken via factory service
      this.StatementService.getStatements().then(function (data) {
        // obj for ui-grid
        self.gridOptions1.data = data;
        self.gridOptions2.data = data;
        self.gridOptions3.data = data;
        self.gridOptions4.data = data;
        self.gridOptions5.data = data;
        console.log('Grid Data :', self.gridOptions1.data);
        for (let i = 0; i < self.gridOptions1.data.length; i++) {
          const element = self.gridOptions1.data[i];

          if (element.costType === "" || element.costType === undefined && element.neutralTrans === false) {

            var re = new RegExp("Bancomat [^]*");
            if (re.test(element.infotext)) {
              element.costType = 'Lohn';
              self.editStatementItem(element);
            } 
            
            var re1 = new RegExp("Einkauf [^]*MIGROS [^]*");
            if (re1.test(element.infotext)) {
              element.costType = 'Lohn';
              self.editStatementItem(element);
            } 
            
            var re2 = new RegExp("Einkauf [^]* COOP[^]*");
            if (re2.test(element.infotext)) {
              console.log("Valid");
              element.costType = 'Lohn';
              self.editStatementItem(element);
            } 

            switch (element.infotext) {
              case 'Belast. E-Banking Viseca Card Services SA':
                // element.costType = 'Diverser Aufwand';
                element.neutralTrans = true;
                self.editStatementItem(element);
                break;
              case 'Belast. E-Banking PayPal International Ltd':
                // element.costType = 'Diverser Aufwand';
                element.neutralTrans = true;
                self.editStatementItem(element);
                break;
              case 'Einkauf Debitkarte':
                element.costType = 'Lohn';
                self.editStatementItem(element);
                break;
              case 'E-Rechnung Sunrise Communications AG':
                element.costType = 'Lohn';
                self.editStatementItem(element);
                break;
              case 'Belast. E-Banking Marinus Angelo Klap':
                element.costType = 'Lohn';
                self.editStatementItem(element);
                break;
              case 'Belast. E-Banking The Hub Zürich Association':
                element.costType = 'Miete Putzen EWZ';
                self.editStatementItem(element);
                break;
              case 'E-Rechnung Swisscom (Schweiz) AG':
                element.costType = 'Büro und Telefon';
                self.editStatementItem(element);
                break;
              case 'Belast. E-Banking DHL Express (Schweiz) AG':
                element.costType = 'Büro und Telefon';
                self.editStatementItem(element);
                break;
              case 'E-Rechnung Genossenschaft GGA Maur':
                element.costType = 'Büro und Telefon';
                self.editStatementItem(element);
                break;
              case 'Dauerauftrag':
                element.costType = 'Lohn';
                self.editStatementItem(element);
              case 'Belast. E-Banking Assura':
                element.costType = 'Lohn';
                self.editStatementItem(element);
                break;
              case 'Belast. E-Banking Dell SA':
                element.costType = 'Diverser Aufwand';
                self.editStatementItem(element);
                break;
              case 'Belast. E-Banking Digitec Galaxus AG':
                element.costType = 'Hardware';
                self.editStatementItem(element);
                break;
              case 'Belast. E-Banking Genossenschaft GGA Maur':
                element.costType = 'Büro und Telefon';
                self.editStatementItem(element);
                break;
              case 'Spesen':
                element.costType = 'Diverser Aufwand';
                self.editStatementItem(element);
                break;
              case 'Gutschrift 340.625.101-08':
                element.neutralTrans = true;
                self.editStatementItem(element);
                break;
              case 'Belast. E-Banking Klap Web Development':
                element.neutralTrans = true;
                self.editStatementItem(element);
                break;
            }

            /* if (element.infotext === 'Belast. E-Banking Viseca Card Services SA') {
              element.costType = 'Diverser Aufwand';
              self.editStatementItem(element);
            } else {
              if (element.infotext === 'Belast. E-Banking The Hub Zürich Association') {
                element.costType = 'Miete Putzen EWZ';
                self.editStatementItem(element);
                
              }
            } */

          }
          // console.log('element.costType not empty');
        }
      });

    } // end $onInit

    editStatementItem(item) {

      var self = this;

      item.monat = self.$filter('date')(item.date, "MMMM");
      item.jahr = self.$filter('date')(item.date, "yyyy");
      item.processed = true;

      self.$http.put('/api/statements/' + item._id, {
        provider: 'ABS AG',
        monat: item.monat,
        jahr: item.jahr,
        costType: item.costType,
        processed: item.processed,
        neutralTrans: item.neutralTrans
      });

    }

    // to edit
    passItem(statementItem) {
      this.$location.path('/buchungenedit/' + statementItem._id);
      // this.$state.go('mitgliededit', {memberId: member._id});
    }
  
    // go to new item
    newItem() {
      this.$location.path('/buchungenedit/');
    }

    deleteItem(statementItem) {
      this.$http.delete('/api/statements/' + statementItem._id);
      this.$state.reload();
  } 
  }


  angular.module('angularFullstackApp')
    .component('buchungen', {
      templateUrl: 'app/buchungen/buchungen.html',
      controller: BuchungenComponent
    });

})();
