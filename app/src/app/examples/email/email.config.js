(function() {
    'use strict';

    angular
        .module('app.examples.email')
        .config(moduleConfig)
        .constant('EMAIL_ROUTES', [{
            state: 'triangular.email-default.email-inbox',
            name: 'MENU.EMAIL.INBOX',
            url: '/email/inbox',
            icon: 'icon-inbox'
        },{
            state: 'triangular.email-default.email-trash',
            name: 'MENU.EMAIL.TRASH',
            url: '/email/trash',
            icon: 'icon-remove-circle'
        },{
            state: 'triangular.email-default.email-sent',
            name: 'MENU.EMAIL.SENT',
            url: '/email/sent',
            icon: 'icon-mail'
        }]);

    /* @ngInject */
    function moduleConfig($translatePartialLoaderProvider, $stateProvider, triMenuProvider, EMAIL_ROUTES) {
        $translatePartialLoaderProvider.addPart('app/examples/email');

        $stateProvider
        .state('triangular.email-default', {
            abstract: true,
            views: {
                sidebarLeft: {
                    templateUrl: 'app/triangular/components/menu/menu.tmpl.html',
                    controller: 'MenuController',
                    controllerAs: 'vm'
                },
                sidebarRight: {
                    templateUrl: 'app/triangular/components/notifications-panel/notifications-panel.tmpl.html',
                    controller: 'NotificationsPanelController',
                    controllerAs: 'vm'
                },
                toolbar: {
                    templateUrl: 'app/examples/email/toolbar.tmpl.html',
                    controller: 'EmailToolbarController',
                    controllerAs: 'vm'
                },
                content: {
                    template: '<div id="admin-panel-content-view" flex ui-view></div>'
                }
            }
        });

        // $stateProvider
        // .state('admin-panel-email-no-scroll', {
        //     abstract: true,
        //     templateUrl: 'app/layouts/no-scroll/no-scroll.tmpl.html',
        //     data: {
        //         toolbar: {
        //             extraClass: '',
        //             background: false,
        //             shrink: true
        //         },
        //     }
        // })
        // .state('admin-panel-email-no-scroll.email', {
        //     abstract: true,
        //     views: {
        //         sidebarLeft: {
        //             templateUrl: 'components/sidebar-left/sidebar-left.tmpl.html',
        //             controller: 'SidebarLeftController'
        //         },
        //         toolbar: {
        //             templateUrl: 'app/examples/email/toolbar.tmpl.html',
        //             controller: 'EmailToolbarController'
        //         },
        //         content: {
        //             template: '<div flex ui-view layout="column" class="overflow-hidden"></div>'
        //         }
        //     },
        // });

        angular.forEach(EMAIL_ROUTES, function(route) {
            $stateProvider
            .state(route.state, {
                url: route.url,
                templateUrl: 'app/examples/email/inbox.tmpl.html',
                controller: 'InboxController',
                controllerAs: 'vm',
                resolve: {
                    emails: function($http, API_CONFIG) {
                        return $http({
                            method: 'GET',
                            url: API_CONFIG.url + 'email/inbox'
                        });
                    },
                    contacts: function($http, API_CONFIG) {
                        return $http({
                            method: 'GET',
                            url: API_CONFIG.url + 'email/contacts'
                        });
                    }
                }
            });
        });

        angular.forEach(EMAIL_ROUTES, function(route) {
            $stateProvider
            .state(route.state + '.email', {
                url: '/mail/:emailID',
                templateUrl: 'app/examples/email/email.tmpl.html',
                controller: 'EmailController',
                controllerAs: 'vm',
                resolve: {
                    email: function($stateParams, emails) {
                        emails = emails.data;
                        var foundEmail = false;
                        for(var i = 0; i < emails.length; i++) {
                            if(emails[i].id === $stateParams.emailID) {
                                foundEmail = emails[i];
                                break;
                            }
                        }
                        return foundEmail;
                    }
                },
                onEnter: function($state, email){
                    if (false === email) {
                        $state.go(route.state);
                    }
                }
            });
        });

        var emailMenu = {
            name: 'MENU.EMAIL.EMAIL',
            icon: 'icon-email',
            type: 'dropdown',
            priority: 2.2,
            children: []
        };

        angular.forEach(EMAIL_ROUTES, function(route) {
            emailMenu.children.push({
                name: route.name,
                state: route.state,
                type: 'link'
            });
        });

        triMenuProvider.addMenu(emailMenu);

        triMenuProvider.addMenu({
            type: 'divider',
            priority: 2.3
        });
    }
})();