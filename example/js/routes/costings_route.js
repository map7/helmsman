costingsRoute = function($stateProvider){
    $stateProvider
        .state('invoices', {
            url: '/invoices',
            templateUrl: 'templates/invoices.html'
        })
        .state('new_invoices', {
            url: '/invoices/new',
            templateUrl: 'templates/invoices_new.html'
        })  
}

angular.module('app').config(costingsRoute);

