// Module
angular.module('helmsman', ['cfp.hotkeys'])

// Get script path
scriptPath = document.scripts[document.scripts.length-1].src
templatePath=(scriptPath).replace("helmsman.js","../templates/helmsman.html")

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
        controller: HelmsmanController
    }
};

angular.module('helmsman').directive('menuDirective', menuDirective)

// Controller
HelmsmanController = ["$scope", "hotkeys", function($scope, hotkeys){
    // Add shortcut keys for navigation using function keys
    setShortcuts = function(menu){
        [1,2,3,4,5,6,7,8,9,10,11,12].forEach(setShortcut);
    }

    setShortcut = function(item,index) {
        hotkeys.add({
            combo: 'f' +  item,
            description: "",
            callback: function(e) {
                alert($scope.items[item - 1]["label"]);
                e.preventDefault();
            }
        });    
    }
    
    // Check menus exist
    if($scope.menus && $scope.locationToMenu){
        
        // Set the active menu
        $scope.setMenu = function(menu){
            $scope.heading = menu
            $scope.items = $scope.menus[menu]
            setShortcuts()
        }

        // On refresh find the corresponding menu to the page.
        if($scope.locationToMenu[location.hash]) {
            $scope.setMenu($scope.locationToMenu[location.hash])
        }else{
            $scope.setMenu("main")
        }

     
    }
    
}]

angular.module('helmsman').controller('HelmsmanController', HelmsmanController)
