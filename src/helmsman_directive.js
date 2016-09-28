// Directive
helmsmanDirective = function(){
    return {
        restrict: 'E',
        replace: true,
        scope: {
            menus: '=',
            locationToMenu: '='
        },
        template: '<div>' +
  '<div class="helmsman-breadcrumb">' +
    '<span class="helmsman-breadcrumb-key">{{helmsman_back_shortcut}}</span>' +
    '<span ng-repeat="item in items" ng-if="item.breadcrumb">' +
      '<a href="" ng-click="setMenu(item.breadcrumb)" ng-if="item.breadcrumb">{{item.label}}</a> >' + 
    '</span>' + 
  '</div>' + 
  '<div class="helmsman-menu">' + 
    '<div class="helmsman-heading" ng-if="heading">{{heading}}</div>' + 
      '<li ng-repeat="item in items" ng-if="!item.breadcrumb">' +
        // Link
        '<a href="" ng-click="setMenu(item.link)" ng-if="item.link">' +
          '<div class=helmsman-link>' +
            '<span class="helmsman-key">{{item.key}}</span>' + 
            '{{item.label}}' +
          '</div>' +
        '</a>' +

        // Item
        '<a ui-sref="{{item.state}}" ui-sref-active="helmsman-active-item" ng-if="item.state">' + 
          '<div class=helmsman-item>' +
            '<span class="helmsman-key">{{item.key}}</span>' + 
            '{{item.label}}' +
          '</div>' +
        '</a>' +
    '</li>' + 
  '</div>' + 
'</div>', 
        controller: HelmsmanController
    }
};

angular.module('helmsman').directive('helmsmanDirective', helmsmanDirective)
