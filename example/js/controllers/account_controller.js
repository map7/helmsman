account = ['$scope', 'LedgerService', function($scope, LedgerService){
    $scope.ledger = LedgerService.getLedger()
}]

angular.module('app').controller('account', account)
