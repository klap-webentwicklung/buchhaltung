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
      this.currencies = [
        'CHF',
        'EUR',
        'ETH'
      ];
      this.providerOptions = [
        'ABS',
        'ABS AG',
        'Ethereum Network',
        'Visa',
        'PayPal'
      ];
      this.incomeTypeOptions = [
        /* 'Webentwicklung',
        'Webhosting',
        'Mineing',
        'Diverse Erträge' */
        'Einnahmen',
        'Naturalbezüge',
        'AirBnb'
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
            // Date String has to be changed in Date Ojs to be loaded in date imput
            this.newStatementitem.date = new Date(this.newStatementitem.date);
            // console.log('Statement Item Data Date: ', this.newStatementitem.date);
            // ETH positions cant be edited and should not as original amount gets overwritten with fasle value
            if (this.newStatementitem.currency === 'ETH' || this.newStatementitem.currency === 'EUR') {
              // calc not correct but cant be saved
              this.newStatementitem.amount = this.newStatementitem.amount / this.newStatementitem.rate;
               // this.newStatementitem.amount = this.$filter('number')((this.newStatementitem.amount / this.newStatementitem.rate),8);
              // console.log('this.newStatementitem.amount:', this.newStatementitem.amount);
            }
          });
      }

    } // end on Init

    saveStatementItem() {
      this.submitted = true;
      
      console.log('Date: ', this.newStatementitem.date);
      this.newStatementitem.monat = this.$filter('date')(this.newStatementitem.date, "MMMM");
      this.newStatementitem.jahr = this.$filter('date')(this.newStatementitem.date, "yyyy");
      this.newStatementitem.tag = this.$filter('date')(this.newStatementitem.date, "dd");
      
      if (this.newStatementitem.costType !== undefined || this.newStatementitem.incomeType !== undefined) {
        console.log('this.newStatementitem.costType:', this.newStatementitem.costType);
        this.newStatementitem.processed = true;
      }
      
      if (this.newStatementitem.currency === 'ETH') {
        this.newStatementitem.amountEth = this.newStatementitem.amount;
        console.log('this.newStatementitem.amountEth:', this.newStatementitem.amountEth);
        // this.newStatementitem.amount = Number(this.newStatementitem.amount * this.newStatementitem.rate);
        // this.newStatementitem.amount = this.$filter('number')((this.newStatementitem.amount), '2');
        // console.log('this.newStatementitem.amount:', this.newStatementitem.amount);
      }

      if (this.newStatementitem.currency === 'EUR') {
        this.newStatementitem.amountEur = this.newStatementitem.amount;
        console.log('this.newStatementitem.amountEur:', this.newStatementitem.amountEur);
        this.newStatementitem.amount = Number(this.newStatementitem.amount * this.newStatementitem.rate);
        // this.newStatementitem.amount = this.$filter('number')((this.newStatementitem.amount), '2');
        console.log('this.newStatementitem.amount:', this.newStatementitem.amount);
        
      }
          this.itemObj = {
            provider: this.newStatementitem.provider,
              date: this.newStatementitem.date,
              monat: this.newStatementitem.monat,
              jahr: this.newStatementitem.jahr,
              tag: this.newStatementitem.tag,
              infotext: this.newStatementitem.infotext,
              amount: this.newStatementitem.amount,
              rate: this.newStatementitem.rate,
              amountEth: this.newStatementitem.amountEth,
              amountEur: this.newStatementitem.amountEur,
              costType: this.newStatementitem.costType,
              incomeType: this.newStatementitem.incomeType,
              processed: this.newStatementitem.processed,
              neutralTrans: this.newStatementitem.neutralTrans,
              comment: this.newStatementitem.comment,
              currency: this.newStatementitem.currency,
              refId: this.newStatementitem.refId
          };
      if (this.statementItemParams && this.statementItemParams.length > 0) {

        this.editStatementItem();
        return;
      }

      this.addStatementItem();

    }

    addStatementItem() {
        this.$http.post('/api/statements', this.itemObj);
        
        if(this.newStatementitem.processed) {
          console.log('Processed triggered');
        }
        
        // this.$state.reload();
        this.$state.go('buchungen');
        
      }
      editStatementItem() {
        this.$http.put('/api/statements/' + this.statementItemParams, this.itemObj);
      
      this.$state.go('buchungen');
    }

  }

  angular.module('angularFullstackApp')
    .component('buchungenedit', {
      templateUrl: 'app/buchungen/buchungenedit.html',
      controller: BuchungenEditComponent
    });

})();
