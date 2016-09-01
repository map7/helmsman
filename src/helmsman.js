// Module
angular.module('helmsman', ['cfp.hotkeys'])

angular.module('helmsman').run(function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
});

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
HelmsmanController = ["$scope", "$state", "hotkeys", function($scope, $state, hotkeys){
    // Add shortcut keys for navigation using function keys
    setShortcuts = function(menu){
        [1,2,3,4,5,6,7,8,9,10,11,12].forEach(setShortcut);
    }

    // Return menu without breadcrumbs
    menuWithoutBreadcrumbs = function(menu){
        slimMenu = [];

        menu.forEach(function(item,index){
            if(item["breadcrumb"] == undefined){
                slimMenu.push(item);
            }
        })
        
        return slimMenu;
    }

    // Find the previous menu from the breadcrumbs
    previousMenu = function(){
        prev = 'main'
        $scope.items.forEach(function(item,index){
            if(item["breadcrumb"]){
                prev = item["breadcrumb"];
            }
        });
        return prev;
    }

    // Set shortcut for all the menu items.
    setShortcut = function(item,index) {
        menu=menuWithoutBreadcrumbs($scope.items);

        // Add ESC button to go to the previous menu
        hotkeys.del('esc');
        hotkeys.add({
            combo: 'esc',
            description: "",
            allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
            callback: function(e) {
                $scope.setMenu(previousMenu());
                e.preventDefault();
            }            
        })

        // Add function key navigation keys
        hotkeys.del('f' + item);
        hotkeys.add({
            combo: 'f' +  item,
            description: "",
            allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
            callback: function(e) {
                if(menu[item-1]){
                    if(menu[item-1]["state"]){
                        // Use angular ui-router to direct the content to a state
                        $state.go(menu[item-1]["state"]);
                    }
                    if(menu[item-1]["link"]){
                        // Change the menu system
                        // This has to be last in the callback otherwise it interupts the flow.
                        $scope.setMenu(menu[item-1]["link"]);
                    }
                }
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
}];

angular.module('helmsman').controller('HelmsmanController', HelmsmanController)
