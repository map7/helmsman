// Module
angular.module('helmsman', [])

// Get script path
scriptPath = document.scripts[document.scripts.length-1].src
templatePath=(scriptPath).replace("helmsman.js","helmsman.html")

// Directive
menuDirective = function(){
    return {
        restrict: 'E',
        replace: true,
        scope: {
            menus: '=',
            locationToMenu: '='
        },
        templateUrl: templatePath,
        controller: MenuController
    }
};

angular.module('helmsman').directive('menuDirective', menuDirective)

// Controller
MenuController = ["$scope", function($scope){

    // Check menus
    if($scope.menus && $scope.locationToMenu){
        // Set the active menu
        $scope.setMenu = function(menu){
            $scope.items = $scope.menus[menu]
        }

        // On refresh find the corresponding menu to the page.
        if($scope.locationToMenu[location.hash]) {
            $scope.setMenu($scope.locationToMenu[location.hash])
        }else{
            $scope.setMenu("main")
        }
    }
    
}]

angular.module('helmsman').controller('MenuController', MenuController)
