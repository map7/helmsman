LedgerService = function(){
    ledger = "None"
    this.setLedger = function(value){
        ledger = value;
    };
    
    this.getLedger = function(){
        return ledger;
    };
}

angular.module('app').service('LedgerService', LedgerService)
