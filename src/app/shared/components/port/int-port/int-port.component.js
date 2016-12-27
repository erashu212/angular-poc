'use strict';

class IntPortController {
  constructor($scope) {

    this.isDetailsPanelVisible = false;
    this.scope = $scope;

    this.port = {
      name: 'newIntPort'
    }
  }

  $onInit() {
    this.port = this.data;
  }
}

IntPortController.$inject = [ '$scope' ];

export const IntPortComponent = {
  bindings: {
    data: '<'
  },
  controller: IntPortController,
  template: '<div class="internal-port-icon bounce-in-animation animated"></div>'
}