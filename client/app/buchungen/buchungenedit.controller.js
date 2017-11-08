'use strict';
(function(){

class BuchungenEditComponent {
  constructor($http, $state) {
    this.$http = $http;
    this.$state = $state;
    this.newStatementitem = {};
  }


$onInit() {


}
	saveStatementItem() {
		console.log('Form submitted');
      this.submitted = true;

         this.addStatementItem();
          return;
        }

    addStatementItem() {
    	console.log(this.newStatementitem.provider);
      this.$http.post('/api/statements', {
        provider: this.newStatementitem.provider,
        date: this.newStatementitem.date,
        infotext: this.newStatementitem.infotext,
        amount: this.newStatementitem.amount
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
