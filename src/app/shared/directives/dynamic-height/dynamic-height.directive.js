'use strict';

import angular from 'angular';


export const DynamicHeightDirective = () => {
    return {
        restrict: 'A',
        bindToController: true,
        controller: () => { },
        link: function (scope, ele, attrs, ctrl) {
            var setHeight = () => {
                let height = $('.app-parent-container').outerHeight() - 130;
                $(ele[0]).css('height', height);
            }

            $(window).on('resize', () => {
                setHeight();
            });

            setHeight();   
        }
    }
}
