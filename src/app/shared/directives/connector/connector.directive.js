'use strict';

import angular from 'angular';

import { connectElements } from './connector.service';

class ConnectorController {

  constructor() {
    this.draw = false;
  }

  createPath(svg) {
    var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    svg.append(path).a
    return path;
  }

}

ConnectorController.$inject = []

export const ConnectorDirective = () => {
  return {
    restrict: 'A',
    bindToController: true,
    controller: ConnectorController,
    link: function (scope, ele, attrs, ctrl) {

      let svg = $('.connector');
      let svgContainer = $('.middle-section');

      var tierElements = $(ele).find('.tier-vm-render-area');

      //bind mouse down event @network
      let isDrawingStart = false;
      let startEle, endEle, path;

      $('.middle-section')
        .on('mousedown', '.tier-wrapper, .network-block, vm', function (e) {
          if ($(this).hasClass('connected')) {
            return false;
          } else {
            if (!startEle)
              startEle = this;
            else
              endEle = this;

            if (startEle && endEle && startEle != endEle) {
              callConnectLine(startEle, endEle);
              startEle = endEle = undefined;
            }
          }
        })

      function callConnectLine(startElement, endElement, connectionIndexes) {
        if (!connectionIndexes) {
          connectionIndexes = `${$(startElement).index()},${$(endElement).index()}`
        }

        $('path', 'svg.connector').each(function (idx) {
          if ($(this).attr('id') == connectionIndexes) {
            $(this).remove();
          }
        })

        path = ctrl.createPath(svg);
        $(path).attr("id", connectionIndexes);

        if ($(startElement).data('type') !== $(endElement).data('type')) {
          connectElements(svgContainer, svg, path, $(startElement), $(endElement))
        }
      }

      const getStartElementByIndex = (idx) => {
        return $('.network-block').get(idx);
      }

      const getEndElementByIndex = (idx) => {
        return $('.tier-wrapper').get(idx);
      }

      scope.$on('event:redraw', (evt, data) => {
        let { idx: tierIndex, redraw } = data;

        let startElement;
        let endElement = getEndElementByIndex(tierIndex - 1);

        let connectedObjectIndexes = $(endElement).attr('connection');

        if (connectedObjectIndexes) {
          let idx = connectedObjectIndexes.split(',')[0];
          startElement = getStartElementByIndex(idx);

          if (redraw) {
            callConnectLine(startElement, endElement, connectedObjectIndexes)
          }
        }

      })
    }
  }
}
