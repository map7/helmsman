settingsRoute = function($stateProvider, $urlRouterProvider){
    $stateProvider
        .state('profile', {
            url: '/profile',
            templateUrl: 'templates/profile.html'
        })
        .state('account', {
            url: '/account',
            templateUrl: 'templates/account.html',
            controller: 'account'
        });
    $urlRouterProvider.otherwise('/account');
}

angular.module('app').config(settingsRoute);

