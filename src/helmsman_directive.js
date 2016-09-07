// Directive
helmsmanDirective = function(){
    return {
        restrict: 'E',
        replace: true,
        scope: {
            menus: '=',
            locationToMenu: '='
        },
        templateUrl: templatePath,
        controller: HelmsmanController
    }
};

angular.module('helmsman').directive('helmsmanDirective', helmsmanDirective)
