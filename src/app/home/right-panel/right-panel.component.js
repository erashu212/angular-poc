'use strict';

import { MOCK_DATA } from './shared';

class RightPanelController {

  constructor($rootScope) {
    this.isVisible = true;
    this.$rootScope = $rootScope;

    this.currentTpl = '';
    this.templateData = '';
    this.yamlData = '';

    $rootScope.$on('event:showInfo', (evt, args) => {
      let { type, data, isVisible } = args;
      this.isVisible = isVisible;
      if (!this.isVisible) return;

      if(!(data instanceof Array)) {
        this.templateData = [ data ];
      } else {
        this.templateData = data;
      }
    
      this.currentTpl = this.getTemplateByType(type);
      this.yamlData = MOCK_DATA;
    });
  }

  getTemplateByType(type) {
    let template = '';
    switch (type) {
      case 'tier':
        template = 'tier-info.html'
        break;
      case 'container':
        template = 'container-info.html'
        break;
      case 'volume':
        template = 'volume-info.html'
        break;
      case 'port':
        template = 'port-info.html'
        break;
      default:
        template = 'tier-info.html';
        break;
    }

    return template
  }

  onInformationUpdate(type, data) {
   let dataToSend = {
      type: type,
      data: data
    };

    this.$rootScope.$broadcast('event:showInfoUpdated', dataToSend);
  }

  onDeleteInfo(data) {
    if(!confirm('Do you want to remove this entry?')) return false;
    this.currentTpl = '';
    this.$rootScope.$broadcast('event:showInfoDeleted', {type: 'tier', data: data});
  }

}

RightPanelController.$inject = [ '$rootScope' ];

export const RightPanelComponent = {
  template: require('./right-panel.component.html'),
  controller: RightPanelController
}