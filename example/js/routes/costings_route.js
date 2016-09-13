costingsRoute = function($stateProvider){
    $stateProvider
        .state('invoices', {
            url: '/invoices',
            templateUrl: 'templates/invoices.html'
        })
}

angular.module('app').config(costingsRoute);

