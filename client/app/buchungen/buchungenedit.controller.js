'use strict';
(function() {

  class BuchungenEditComponent {
    constructor($http, $state) {
      this.$http = $http;
      this.$state = $state;
      this.newStatementitem = {};
      this.typeOptions = ['option1', 'option2'];
      console.log('Options: ', this.typeOptions);

    }

    $onInit() {
    	// when coming from member to add a thing
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

      if (this.params && this.params.length > 0) {

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
      this.$http.put('/api/statements/' + this.statementItemParams, {
        provider: this.newStatementitem.provider,
        date: this.newStatementitem.date,
        infotext: this.newStatementitem.infotext,
        amount: this.newStatementitem.amount,
        type: this.newStatementitem.type,
        processed: this.newStatementitem.processed
      });

      this.$state.reload();

    }

  }

  angular.module('angularFullstackApp')
    .component('buchungenedit', {
      templateUrl: 'app/buchungen/buchungenedit.html',
      controller: BuchungenEditComponent
    });

})();
