home = ["$rootScope", "$scope", "$state", "$stateParams", "LedgerService", function($rootScope, $scope, $state, $stateParams, LedgerService){
  $scope.ledgerService = LedgerService;

  $rootScope.$state = $state;
  $rootScope.$stateParams=$stateParams;

  $scope.setLedger = function(value){
    LedgerService.setLedger(value);
  }

  // --------------------------------------------------------------------------------
  // Menu related stuff
  // --------------------------------------------------------------------------------

  // Build the menu
  $scope.menus = {
    main: [
      {label: "Costings Menu...",  link: "costings"},
      {label: "Settings Menu...",  link: "Settings"},
    ],
    costings:  [
      {label: "Main",      breadcrumb: "main"},
      {label: "Invoices",  state: "invoices"},
      {label: "Invoices",  state: "invoices"},
      {label: "Invoices",  state: "invoices"},
      {label: "Invoices",  state: "invoices"},
      {label: "Invoices",  state: "invoices"},
      {label: "Invoices",  state: "invoices"},
      {label: "Invoices",  state: "invoices"},
      {label: "Invoices",  state: "invoices"},
      {label: "Invoices",  state: "invoices"},
      {label: "Invoices",  state: "invoices"},
      {label: "Invoices",  state: "invoices"},
      {label: "Invoices",  state: "invoices"},
      {label: "Invoices",  state: "invoices"},
      {label: "Invoices",  state: "invoices"}
    ],
    Settings:  [
      {label: "Main",      breadcrumb: "main"},
      {label: "Accounting Menu...",link: "Accounting"},
      {label: "Account",   state: "account"},
      {label: "Missing state",     state: "missing"}
    ],
    Accounting: [
      {label: "Main",      breadcrumb: "main"},
      {label: "Settings",  breadcrumb: "Settings"},
      {label: "Profile",   state: "profile"}
    ]
  }

  // // On the refresh
  // // page -> menu
  // $scope.locationToMenu = {
  //     "#/account": "Settings",
  //     "#/profile": "Accounting"
  // }
  
  // --------------------------------------------------------------------------------
}]

angular.module('app').controller('home', home)
