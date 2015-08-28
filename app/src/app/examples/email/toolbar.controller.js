(function() {
    'use strict';

    angular
        .module('app.examples.email')
        .controller('EmailToolbarController', EmailToolbarController);

    /* @ngInject */
    function EmailToolbarController($rootScope, $filter, $mdUtil, $mdSidenav, $state, triBreadcrumbsService, EMAIL_ROUTES) {
        var vm = this;
        vm.breadcrumbs = triBreadcrumbsService.breadcrumbs;
        vm.filterEmailList = filterEmailList;
        vm.openSideNav = openSideNav;
        vm.showSearch = false;
        vm.toggleSearch = toggleSearch;
        vm.toolbarMenu = [];

        /////////////////

        function filterEmailList(emailSearch) {
            $rootScope.$broadcast('emailSearch', emailSearch);
        }

        function toggleSearch() {
            vm.showSearch = !vm.showSearch;
        }

        /**
         * Build handler to open/close a SideNav;
         */
        function openSideNav(navID) {
            $mdUtil.debounce(function(){
                $mdSidenav(navID).toggle();
            }, 300)();
        }


        // init

        for(var i = 0; i < EMAIL_ROUTES.length; i++) {
            vm.toolbarMenu.push({
                name: $filter('translate')(EMAIL_ROUTES[i].name),
                state: EMAIL_ROUTES[i].state,
                icon: EMAIL_ROUTES[i].icon
            });
        }
    }
})();