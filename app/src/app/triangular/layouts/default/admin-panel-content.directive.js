(function() {
    'use strict';

    angular
        .module('triangular.layouts')
        .directive('triAdminPanelContent', adminPanelContent);

    /* @ngInject */
    function adminPanelContent ($compile, $templateRequest) {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link($scope, $element) {
            $scope.$on('$stateChangeStart', function() {
                var mdContentElement = $element.parent();
                // scroll page to the top when content is loaded (stops pages keeping scroll position even when they have changed url)
                mdContentElement.scrollTop(0);
            });

            $scope.$on('$viewContentLoaded', function() {
                var contentView = $element.find('#admin-panel-content-view');

                // add footer to the content view
                $templateRequest('app/triangular/components/footer/footer.tmpl.html')
                .then(function(template) {
                    // compile template with current scope and add to the content
                    var linkFn = $compile(template);
                    var content = linkFn($scope);
                    contentView.append(content);
                });
            });
        }
    }
})();