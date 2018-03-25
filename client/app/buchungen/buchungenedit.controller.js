'use strict';
(function () {

  class BuchungenEditComponent {
    constructor($http, $state) {
      this.$http = $http;
      this.$state = $state;
      this.newStatementitem = {};
      this.typeOptions = [
        'Lohn',
        'Material 1',
        'Material 2',
        'Miete Putzen EWZ',
        'Büro und Telefon',
        'Transport',
        'Werbung',
        'AHV',
        'Versicherung',
        'Rep - Spesen',
        'Weiter - bildung',
        'Diverses'
      ];
      console.log('Options: ', this.typeOptions);

    }

    $onInit() {
      // when coming from member to add a thing
      this.statementItemParams = this.$state.params.statementItemId;
      console.log('Params: ', this.statementItemParams);

      if (this.statementItemParams) {
        this.editing = true;

        this.$http.get('/api/statement/' + this.statementItemParams)
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
        infotext: this.newStatementitem.infotext,
        amount: this.newStatementitem.amount,
        type: this.newStatementitem.type,
        processed: this.newStatementitem.processed
      });
      
      this.$state.reload();
      
    }
    editStatementItem() {
      if(this.newStatementitem.type !== undefined) {
        console.log('this.newStatementitem.type:', this.newStatementitem.type);
        this.newStatementitem.processed = true;
      }
      this.$http.put('/api/statements/' + this.statementItemParams, {
        provider: this.newStatementitem.provider,
        date: this.newStatementitem.date,
        infotext: this.newStatementitem.infotext,
        amount: this.newStatementitem.amount,
        type: this.newStatementitem.type,
        processed: this.newStatementitem.processed
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
