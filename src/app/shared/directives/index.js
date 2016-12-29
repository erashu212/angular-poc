import angular from 'angular';

import { ConnectorDirective } from './connector'
import { DynamicHeightDirective } from './dynamic-height'

const SHARED_DIRECTIVES_MODULE = [
]

export const SHARED_DIRECTIVES = angular
  .module(`${window.MODULE_NAME}.shared_directives`, [
    ...SHARED_DIRECTIVES_MODULE
  ])
  .directive('connector', ConnectorDirective)
  .directive('dynamicHeight', DynamicHeightDirective)
  .name;