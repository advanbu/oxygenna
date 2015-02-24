'use strict';

/**
* @ngdoc directive
* @name sideMenu
* @restrict E
* @scope
*
* @description
*
* Handles the main admin sidemenu
*
* @usage
* ```html
* <side-menu></side-menu>
* ```
*/
angular.module('triAngular')
.directive('sideMenu', function(MenuService) {
    return {
        restrict: 'E',
        template: '<md-content flex><side-menu-item ng-repeat="item in menu" item="item"></side-menu-item></md-content>',
        scope: {},
        controller: function($scope) {
            // get the menu structure from the menu service
            $scope.menu = MenuService.buildMenu();
            // update the menu statuses based on current location
            MenuService.updateLocationState();

            // add a watch for when the url location changes
            $scope.$on('$locationChangeSuccess', function() {
                // location has changed so update menu
                MenuService.updateLocationState();
            });

            // when user clicks to open a menu open it using menu service
            this.openMenu = function(item) {
                MenuService.openParentMenu(item);
            };
        }
    };
});