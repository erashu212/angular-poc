'use strict';


import { guid } from '../shared/services'

require('./home.component.css');

class HomeController {

  constructor($scope) {
    this.tiers = [];
    this.vms = [];

    $scope.$on('event:showInfoDeleted', (evt, args) => {
      let {type, data } = args;

      if (type == 'tier') {
        let idx = this.tiers.findIndex(tier => tier.id == data.id);
        if (idx > -1) {
          this.tiers.splice(idx, 1);
        }
      }
    })

    $scope.$on('event:entitySelectionChanged', (evt) => {
      this.tiers.map(tier => {
        tier.isActive = false

        tier.containers.map(cont => cont.isActive = false);
        return tier;
      });

      this.vms.map(vm => {
        vm.isActive = false

        vm.volumes.map(vol => vol.isActive = false);
        return vm;
      });
    })

    $scope.$on('event:showInfoUpdated', (evt, args) => {
      let {type, data } = args;
      this.updateInfo(type, data)
    });
  }

  toggleClass(evt, tier) {
    this.vms.map(vm => vm.isActive = false);
    this.tiers.map(tier => tier.isActive = false);

    tier.isActive = !tier.isActive;
    evt.stopPropagation();
  }

  toggleVMClass(evt, vm) {
    this.vms.map(vm => vm.isActive = false);
    this.tiers.map(tier => tier.isActive = false);

    vm.isActive = !vm.isActive;
    evt.stopPropagation();
  }

  addTier(tier) {
    this.tiers.push(tier);
  }

  onDropOverMainContent(evt, data) {
    if (data == 'vm') {
      this.vms.map(vm => vm.isActive = false);
      this.vms.push({
        id: guid(),
        name: 'New York VM',
        type: 'vm',
        isActive: false,
        volumes: [],
        ports: []
      })
    } else {

      this.tiers.map(tier => tier.isActive = false);
      this.addTier({
        id: guid(),
        name: 'New Tier',
        type: 'app type',
        replica: 1,
        isActive: false,
        containers: [],
        ports: []
      })
    }
  }

  updateInfo(type, data) {
    switch (type) {
      case 'tier':
        this.tier = Object.assign({}, this.tier, data);
        break;
      case 'container':
        this.tier.containers
          .filter(cont => cont.id == data.id)
          .map(cont => Object.assign(cont, data));
        break;
      case 'volume':
        this.tier.containers.forEach(cont => {
          cont.volumes
            .filter(vol => vol.id == data.id)
            .map(vol => Object.assign(vol, data));
        });

        break;
      case 'ports':
        let portsData;
        if (this.findWhichTypePort(data.id) == 'tier') {
          portsData = this.tier;
        }
        else {
          portsData = this.tier.containers;
        }

        portsData.ports
          .filter(port => port.id == data.id)
          .map(port => Object.assign(port, data))

        break;
      default:
        return data;

    }
  }

  findWhichTypePort(id) {
    return this.tier.ports.find(x => x.id == id) ? 'tier' : 'container'
  }

}

HomeController.$inject = ['$scope'];

export const HomeComponent = {
  controller: HomeController,
  template: require('./home.component.html')
}
