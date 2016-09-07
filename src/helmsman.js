// Module
angular.module('helmsman', ['cfp.hotkeys'])

angular.module('helmsman').run(function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
});

// Get script path
scriptPath = document.scripts[document.scripts.length-1].src
templatePath=(scriptPath).replace("helmsman.js","helmsman.html")

