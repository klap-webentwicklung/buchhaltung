'use strict';
(function(){

class BuchungenComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('angularFullstackApp')
  .component('buchungen', {
    templateUrl: 'app/buchungen/buchungen.html',
    controller: BuchungenComponent
  });

})();
