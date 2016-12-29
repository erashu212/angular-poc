'use strict';

import { guid } from '../../services'

class TierComponentController {
  constructor($scope, $rootScope) {
    this.isDetailsPanelVisible = false;
    this.scope = $scope;
    this.rootScope = $rootScope;

    this.tier = {
      id: guid(),
      name: 'newTier',
      containers: [],
      ports: []
    }

    $scope.$on('event:volumeDeleted', (evt, data) => {
      if (!!!data) return;

      let containerIdx;

      this.tier.containers.forEach((cont, index) => {
        let idx = cont.volumes.findIndex(vol => vol.id == data.id);
        if (idx > -1) {
          cont.volumes.splice(idx, 1);
          containerIdx = index;
          return false;
        }
      })

      this.tier.containers[containerIdx] = Object.assign({}, this.tier.containers[containerIdx]);

      this.scope.$emit('event:showInfo', {
        type: 'volume',
        data: this.tier.containers[containerIdx].volumes,
        isVisible: true
      })
    })
  }

  $onInit() {
    this.tier = this.data;
    this.showDetails();
  }

  toggleClass(evt, container) {
    this.tier.containers.map(cont => cont.isActive = false);

    container.isActive = !container.isActive;
  }

  onDropOverTier(evt, data) {
    let prevObj = this.tier;

    if (data == 'container') {
      this.tier.containers.push({
        id: guid(),
        isActive: false,
        name: 'new container',
        image: '',
        volumes: [],
        ports: []
      });

      this.showContainerDetails();
    } else {
      this.tier.ports.push({
        id: guid(),
        name: `new ${data}`,
        type: data.indexOf('ext') > -1 ? 'ext' : 'int',
        containerPort: 0,
        servicePort: 0,
        hostPort: 0,
        protocol: 'test'
      });

      this.showPortDetails();
    }

    //this.tier = Object.assign({}, this.tier, prevObj);
  }

  redrawConnector() {
    this.rootScope.$broadcast('event:redraw', { redraw: true, idx: this.tierIndex })
  }

  showDetails(event) {
    this.isDetailsPanelVisible = true;
    this.scope.$emit('event:showInfo', {
      type: 'tier',
      data: this.tier,
      isVisible: this.isDetailsPanelVisible
    })
    // this.stopEventPropogation(event);
  }

  showContainerDetails(event, container) {
    this.isDetailsPanelVisible = true;
    this.scope.$emit('event:showInfo', {
      type: 'container',
      data: container ? {data: this.tier.containers, id: container.id} :this.tier.containers,
      isVisible: this.isDetailsPanelVisible
    })
    this.stopEventPropogation(event);
  }

  showPortDetails(event) {
    this.isDetailsPanelVisible = true;
    this.scope.$emit('event:showInfo', {
      type: 'port',
      data: this.tier.ports,
      isVisible: this.isDetailsPanelVisible
    })
    this.stopEventPropogation(event);
  }

  stopEventPropogation(event) {
    if (!!event) {
      event.stopPropagation();
      event.preventDefault();
    }
  }

}

TierComponentController.$inject = ['$scope', '$rootScope'];

export const TierComponent = {
  bindings: {
    data: '<',
    tierIndex: '@'
  },
  controller: TierComponentController,
  template: require('./tier.component.html')
}
