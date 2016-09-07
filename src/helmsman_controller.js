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
        });
        
        return slimMenu;
    }

    // Find the previous menu from the breadcrumbs
    previousMenu = function(){
        prev = 'main'

        $scope.items.forEach(function(item,index){
            if(item["breadcrumb"]){
                prev = item;
            }
        });
        return prev;
    }

    // Set shortcut for all the menu items.
    setShortcut = function(item,index) {
        menu=menuWithoutBreadcrumbs($scope.items);

        // Set shortcuts for the back one level menu item
        setBackShortcut('ctrl+esc')
        setBackShortcut('ctrl+-')

        // Set navigation shortcuts with function keys
        setNavShortcut('f'+item,item, menu);
        if(item == 10){
            key = "ctrl+0"
        }else{
            key="ctrl+" + item
        }
        setNavShortcut(key,item, menu);
    }

    // Setup the shortcut keys for the back function.
    setBackShortcut = function(key){
        if(previousMenu()["breadcrumb"]){
            setKeyLabel(key,previousMenu());
            
            hotkeys.add({
                combo: key,
                description: "",
                allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
                callback: function(e) {
                    $scope.setMenu(previousMenu()["breadcrumb"]);
                    e.preventDefault();
                }            
            });
        }else{
            // No more back
            hotkeys.add({
                combo: key,
                description: "",
                allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
                callback: function(e) {
                    console.log("Top Level Menu");
                    e.preventDefault();
                }            
            });
        }
    }

    // Add function key navigation keys
    setNavShortcut = function(key,item,menu){
        setKeyLabel(key,menu[item-1]);
        
        hotkeys.add({
            combo: key,
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

    // Set the key label
    setKeyLabel = function(key,menu){
        if(menu){ menu["key"] = key; }
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
