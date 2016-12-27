'use strict';

class ExtPortController {
  constructor($scope) {

    this.isDetailsPanelVisible = false;
    this.scope = $scope;

    this.port = {
      name: 'newExtPort'
    }
  }

  $onInit() {
    this.port = this.data;
  }
}

ExtPortController.$inject = [ '$scope' ];

export const ExtPortComponent = {
  bindings: {
    data: '<'
  },
  controller: ExtPortController,
  template: '<div class="external-port-icon bounce-in-animation animated"></div>'
}