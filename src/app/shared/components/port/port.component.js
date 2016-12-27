'use strict';

class PortController {
  constructor($scope) {

    this.isDetailsPanelVisible = false;
    this.scope = $scope;

    this.port = {
      name: 'newPort'
    }
  }

  $onInit() {
    this.port = this.data;
  }
}

PortController.$inject = [ '$scope' ];

export const PortComponent = {
  bindings: {
    data: '<',
    type: '@'
  },
  controller: PortController,
  template: `
    <ext-port data="$ctrl.data" ng-show="$ctrl.type == 'ext'"></ext-port>
    <int-port data="$ctrl.data" ng-show="$ctrl.type == 'int'"></int-port>
  `
}