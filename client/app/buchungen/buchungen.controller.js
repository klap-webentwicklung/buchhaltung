'use strict';
(function() {

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

          this.gridOptions = {

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
                width: 600
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
                }
              }
            ]


          }; // End UI Grid Options
        } // End Constructor

        $onInit() {

          var self = this;
          // get marken via factory service
          this.StatementService.getStatements().then(function(data) {
            // obj for ui-grid
            self.gridOptions.data = data;
            console.log('Grid Data :', self.gridOptions.data);
            for (let i = 0; i < self.gridOptions.data.length; i++) {
              const element = self.gridOptions.data[i];
              if (element.infotext === 'Belast. E-Banking Viseca Card Services SA') {
                self.gridOptions.data[i].costType = 'Diverser Aufwand';
              self.editStatementItem(self.gridOptions.data[i]);
              }
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
          //provider: self.newStatementitem.provider,
          // date: self.newStatementitem.date,
          monat: item.monat,
          jahr: item.jahr,
          // infotext: self.newStatementitem.infotext,
          // amount: self.newStatementitem.amount,
          // type: self.newStatementitem.type,
          costType: item.costType,
          // incomeType: self.newStatementitem.incomeType,
          processed: item.processed
        });

      }

        // to edit
        passItem(statementItem) {
            this.$location.path('/buchungenedit/' + statementItem._id);
            // this.$state.go('mitgliededit', {memberId: member._id});
        }
      }

      angular.module('angularFullstackApp')
        .component('buchungen', {
          templateUrl: 'app/buchungen/buchungen.html',
          controller: BuchungenComponent
        });

    })();
