'use strict';
(function () {

  class BuchungenEditComponent {
    constructor($http, $state, $filter) {
      this.$http = $http;
      this.$state = $state;
      this.$filter = $filter;
      this.newStatementitem = {};
      this.costTypeOptions = [
        'Lohn',
        'Material',
        'Hardware',
        'Software',
        'Miete Putzen EWZ',
        'Büro und Telefon',
        'Transport',
        'Werbung',
        'AHV',
        'Versicherung',
        'Rep - Spesen',
        'Weiter - bildung',
        'Diverser Aufwand'
      ];
      console.log('Cost Type Options: ', this.costTypeOptions);
      this.incomeTypeOptions = [
        'Ertrag Webentwicklung',
        'Ertrag Webhosting',
        'Diverse Erträge'
      ];
      console.log('Income Type Options: ', this.incomeTypeOptions);

    }

    $onInit() {
      this.statementItemParams = this.$state.params.statementItemId;
      console.log('Params: ', this.statementItemParams);

      if (this.statementItemParams) {
        this.editing = true;

        this.$http.get('/api/statements/' + this.statementItemParams)
          .then(response => {
            this.newStatementitem = response.data;
            console.log('Statement Item Data: ', this.newStatementitem);
          });
      }

    }

    saveStatementItem() {
      this.submitted = true;

      if (this.statementItemParams && this.statementItemParams.length > 0) {

        this.editStatementItem();
        return;
      }

      this.addStatementItem();

    }

    addStatementItem() {

        this.$http.post('/api/statements', {
        provider: this.newStatementitem.provider,
        date: this.newStatementitem.date,
        monat: this.newStatementitem.monat,
        infotext: this.newStatementitem.infotext,
        amount: this.newStatementitem.amount,
        costType: this.newStatementitem.costType,
        incomeType: this.newStatementitem.incomeType,
        processed: this.newStatementitem.processed
      });
      
      if(this.newStatementitem.processed) {
        console.log('Processed triggered');
      }

      // this.$state.reload();
      
    }
    editStatementItem() {

      this.newStatementitem.monat = this.$filter('date')(this.newStatementitem.date, "MMMM");
      this.newStatementitem.jahr = this.$filter('date')(this.newStatementitem.date, "yyyy");

      if (this.newStatementitem.costType !== undefined || this.newStatementitem.incomeType !== undefined) {
        console.log('this.newStatementitem.costType:', this.newStatementitem.costType);
        this.newStatementitem.processed = true;
      }
      this.$http.put('/api/statements/' + this.statementItemParams, {
        provider: 'ABS AG',
        //provider: this.newStatementitem.provider,
        date: this.newStatementitem.date,
        monat: this.newStatementitem.monat,
        jahr: this.newStatementitem.jahr,
        infotext: this.newStatementitem.infotext,
        amount: this.newStatementitem.amount,
        // type: this.newStatementitem.type,
        costType: this.newStatementitem.costType,
        incomeType: this.newStatementitem.incomeType,
        processed: this.newStatementitem.processed,
        neutralTrans: this.newStatementitem.neutralTrans
      });
      
      this.$state.go('buchungen');
    }

  }

  angular.module('angularFullstackApp')
    .component('buchungenedit', {
      templateUrl: 'app/buchungen/buchungenedit.html',
      controller: BuchungenEditComponent
    });

})();
