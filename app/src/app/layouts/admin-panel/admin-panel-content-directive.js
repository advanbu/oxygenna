'use strict';

/**
* @ngdoc directive
* @name adminPanelContent
* @restrict E
* @scope
*
* @description
*
* Handles injection of the footer into the admin panel content
*
* @usage
* ```html
* <div ui-view="content" admin-panel-content></div>
* ```
*/
angular.module('triAngular')
.directive('adminPanelContent', function($compile, $templateRequest) {
    return {
        restrict: 'A',
        link: function($scope, $element, attrs) {
            $scope.$on('$viewContentLoaded', function($event) {
                var contentView = $element.find('#admin-panel-content-view');
                // add footer to the content view
                $templateRequest('components/footer/footer.tmpl.html')
                .then(function(template) {
                    // compile template with current scope and add to the content
                    var linkFn = $compile(template);
                    var content = linkFn($scope);
                    contentView.append(content);
                }, function(reason) {
                    console.error('Could not load footer tempalate');
                });
            });
        }
    };
});