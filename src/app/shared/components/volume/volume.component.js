'use strict';

class VolumeController {
  constructor($scope) {

    this.isDetailsPanelVisible = false;
    this.scope = $scope;

    this.port = {
      name: 'newVolume'
    };
  }

  $onInit(){
    
  }
}

VolumeController.$inject = [ '$scope' ];

export const VolumeComponent = {
  bindings: {
    data: '<'
  },
  controller: VolumeController,
  template: '<div class="volume-icon bounce-down-animation animated"></div>'
}
