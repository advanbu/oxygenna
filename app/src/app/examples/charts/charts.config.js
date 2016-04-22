(function() {
    'use strict';

    angular
        .module('app.examples.charts')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider, triMenuProvider) {

        $stateProvider
        .state('triangular.charts-google-bar', {
            url: '/charts/google/bar',
            templateUrl: 'app/examples/charts/google-bar.tmpl.html'
        })
        .state('triangular.charts-google-scatter', {
            url: '/charts/google/scatter',
            templateUrl: 'app/examples/charts/google-scatter.tmpl.html'
        })
        .state('triangular.charts-google-line', {
            url: '/charts/google/line',
            templateUrl: 'app/examples/charts/google-line.tmpl.html'
        })
        .state('triangular.charts-chartjs-bar', {
            url: '/charts/chartjs/bar',
            templateUrl: 'app/examples/charts/chartjs-bar.tmpl.html'
        })
        .state('triangular.charts-chartjs-pie', {
            url: '/charts/chartjs/pie',
            templateUrl: 'app/examples/charts/chartjs-pie.tmpl.html'
        })
        .state('triangular.charts-chartjs-ticker', {
            url: '/charts/chartjs/ticker',
            templateUrl: 'app/examples/charts/chartjs-ticker.tmpl.html'
        })
        .state('triangular.charts-chartjs-line', {
            url: '/charts/chartjs/line',
            templateUrl: 'app/examples/charts/chartjs-line.tmpl.html'
        });

        triMenuProvider.addMenu({
            name: 'Charts',
            icon: 'zmdi zmdi-chart',
            type: 'dropdown',
            priority: 5.1,
            children: [{
                name: 'Google',
                type: 'dropdown',
                children: [{
                    name: 'Bar',
                    state: 'triangular.charts-google-bar',
                    type: 'link'
                },{
                    name: 'Scatter',
                    state: 'triangular.charts-google-scatter',
                    type: 'link'
                },{
                    name: 'Line',
                    state: 'triangular.charts-google-line',
                    type: 'link'
                }]
            },{
                name: 'Chart.js',
                type: 'dropdown',
                children: [{
                    name: 'Bar',
                    state: 'triangular.charts-chartjs-bar',
                    type: 'link'
                },{
                    name: 'Line',
                    state: 'triangular.charts-chartjs-line',
                    type: 'link'
                },{
                    name: 'Pie',
                    state: 'triangular.charts-chartjs-pie',
                    type: 'link'
                },{
                    name: 'Ticker',
                    state: 'triangular.charts-chartjs-ticker',
                    type: 'link'
                }]
            }]
        });
    }
})();
