'use strict';

/**
 * @ngdoc function
 * @name ThemesController
 * @module triAngularUI
 * @kind function
 *
 * @description
 *
 * Handles the themes ui page
 */
angular.module('triAngularUI').
controller('ThemesController', function ($scope, $rootScope, triThemeColors) {
    $scope.themes = [];
    $scope.palettes = triThemeColors.palettes();

    function createColor(intention, color) {
        return {
            intention: intention,
            name: color.name,
            hues: color.hues
        };
    }

    angular.forEach(triThemeColors.themes(), function(theme) {
        // parse the themes so we get colors in nice order (primary, accent, warn, background)
        var newTheme = {
            name: theme.name,
            colors: []
        };
        newTheme.colors.push(createColor('Primary', theme.colors.primary));
        newTheme.colors.push(createColor('Accent', theme.colors.accent));
        newTheme.colors.push(createColor('Warn', theme.colors.warn));
        newTheme.colors.push(createColor('Background', theme.colors.background));
        $scope.themes.push(newTheme);
    })

    $scope.setBackgroundColor = function(color) {
        if($scope.palettes.hasOwnProperty(color.name) && $scope.palettes[color.name].hasOwnProperty(color.hues.default)) {
            var rgba = triThemeColors.rgba($scope.palettes[color.name][color.hues.default].value);
            return {
                'background-color': rgba
            };
        }
    };

    $scope.switchTheme = function(theme) {
        $rootScope.currentTheme = theme.name;
        $rootScope.sidebarTheme = theme.name;
        $rootScope.toolbarTheme = theme.name;
        $scope.currentTheme = theme.name;
        $scope.sidebarTheme = theme.name;
        $scope.toolbarTheme = theme.name;
    }

    $scope.changeTheme = function(themeElement, theme) {
        $rootScope[themeElement] = theme;
    }
});