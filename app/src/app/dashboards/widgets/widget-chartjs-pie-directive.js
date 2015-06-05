'use strict';

/**
* @ngdoc directive
* @name chartjsPieWidget
* @restrict A
* @scope
*
* @description
*
* Adds chartjs pie chart data to widget
*
* @usage
* ```html
* <widget chartjs-pie-widget>
* ```
*/
angular.module('triAngularDashboards')
.directive('chartjsPieWidget', function ($timeout) {
    return {
        require: 'widget',
        restrict: 'A',
        link: function ($scope, $element, attrs, widgetCtrl) {
            widgetCtrl.setLoading(true);

            $timeout(function() {
                widgetCtrl.setLoading(false);
            }, 1500);

            widgetCtrl.setMenu({
                icon: 'icon-more-vert'
            });

            $scope.pieChart = {
                labels: ['Facebook', 'Twitter', 'Google+', 'Others'],
                data: [300, 500, 100, 50]
            }; 
        }
    };
});