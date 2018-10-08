// Controller
HelmsmanController = ["$scope", "$state", "hotkeys", function($scope, $state, hotkeys){
  // Add shortcut keys for navigation using function keys
  setShortcuts = function(menu){
    [1,2,3,4,5,6,7,8,9,10].forEach(setShortcut);
  };

  // Return menu without breadcrumbs
  menuWithoutBreadcrumbs = function(menu){
    slimMenu = [];

    menu.forEach(function(item,index){
      if(item["breadcrumb"] == undefined){
        slimMenu.push(item);
      }
    });
    
    return slimMenu;
  };

  // Find the previous menu from the breadcrumbs
  previousMenu = function(){
    prev = 'main';

    $scope.items.forEach(function(item,index){
      if(item["breadcrumb"]){
        prev = item;
      }
    });
    return prev;
  };

  // Find root menu from the breadcrumbs
  rootMenu = function(){
    prev = 'main';

    $scope.items.forEach(function(item,index){
      if(item["breadcrumb"]){
        return item;
      }
    });
  };

  // Set shortcut for all the menu items.
  setShortcut = function(item,index) {
    menu=menuWithoutBreadcrumbs($scope.items);

    // Set shortcuts for the back one level menu item
    if(previousMenu()["breadcrumb"]){
      $scope.helmsman_back_shortcut = "esc"
    }else{
      $scope.helmsman_back_shortcut = ""
    }
    setBackShortcut('esc')

    // Set navigation shortcuts with function keys
    key="f" + item
    setNavShortcut(key,item, menu);
  };

  // Set jump shortcuts for all the jump items.
  setJumpShortcuts = function() {
    $scope.jumps.forEach(function(item){
      setJumpShortcut(item)
    });
  };

  setJumpShortcut = function(item){
    hotkeys.add({
      combo: item.jump_key,
      description: "Jump to " + item.label,
      allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
      callback: function(e) {
        if(item["state"]){ $state.go(item["state"]); }
        if(item["link"]){  $scope.setMenu(item["link"]); }
        e.preventDefault();
      }            
    });
  }
  
  // Setup the shortcut keys for the back function.
  setBackShortcut = function(key){
    hotkeys.add({
      combo: key,
      description: "Previous Menu",
      allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
      callback: function(e) {
        if(angular.element(document.getElementById("cancel-btn")).length > 0){
          angular.element(document.getElementById("cancel-btn")).click()
        } else if(angular.element(document.getElementById("listing-btn")).length > 0){
          angular.element(document.getElementById("listing-btn")).click()
        } else if (previousMenu()["breadcrumb"]){
          $scope.setMenu(previousMenu()["breadcrumb"]);
        } else {
          console.log("Top Level Menu");
        }
        e.preventDefault();
      }            
    });
  };

  // Add navigation keys
  setNavShortcut = function(key,item,menu){
    setKeyLabel(key,menu[item-1]);

    if(menu[item-1]){
      label = "Navigate to " + menu[item-1]["label"];
      
    }else{
      label = "$$undefined$$";
    }
    
    
    hotkeys.add({
      combo: key,
      description: label,
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
  };
  
  // On refresh find the corresponding menu to the page.
  setPageMenu = function(){
    loc=location.hash;
    guess_state = location.hash.slice(2);

    // Use the locationToMenu table
    if($scope.locationToMenu && $scope.locationToMenu[loc]) {
      $scope.setMenu($scope.locationToMenu[loc])

    }else if(find_state_menu(guess_state) != null){
      // Try and guess using the location href and assuming this is the same as state
      $scope.setMenu(find_state_menu(guess_state));
    }else{
      // Cannot find, just use main
      $scope.setMenu("main")
    }
  };

  // Given a state eg: 'invoices' return the parent.
  function find_state_menu(state) {

    // Step through a hash of sub menus
    for(parent in $scope.menus){
      result = find_parent($scope.menus[parent], state) // Look for parent
      if(result) return parent      // Return the parent menu name
    }
  };

  // Given a state eg: 'invoices' return true if we have found the menu
  function find_parent(menu, state){

    // Step through an array of hashes
    for (var i = 0; i < menu.length; i ++) {
      if(menu[i].state === state) return true; // If we find the state return true
    }
    return null;       // Return null if we haven't found anything
  }
  
  // Set the key label
  setKeyLabel = function(key,menu){
    if(menu){ menu["key"] = key; }
  };
  
  // Check menus exist
  if($scope.menus){
    
    // Set the active menu
    $scope.setMenu = function(menu){
      $scope.heading = menu
      $scope.items = $scope.menus[menu]
      setShortcuts()

      // Add if the state exists to the hash
      $scope.items.forEach(function(item,index){
        item['exists'] = $state.is(item['state'])
      })
    };
    

    setPageMenu();
  }

  // Check jumps exist
  if($scope.jumps) {
    setJumpShortcuts()
  }
}];

angular.module('helmsman').controller('HelmsmanController', HelmsmanController);
