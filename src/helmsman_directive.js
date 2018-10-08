// Directive
helmsmanDirective = function(){
    return {
        restrict: 'E',
        replace: true,
        scope: {
          menus: '=',
          jumps: '=',
          locationToMenu: '='
        },
        template: '<div>' +
  '<div class="helmsman-breadcrumb">' +
    '<span class="helmsman-breadcrumb-key">{{helmsman_back_shortcut}}</span>' +
    '<span ng-repeat="item in items" ng-if="item.breadcrumb">' +
      '<a href="" \
          tabIndex="-1" \
          ng-click="setMenu(item.breadcrumb)" \
          ng-if="item.breadcrumb">{{item.label}}</a> >' +
        
    '</span>' + 
  '</div>' + 

  '<div class="helmsman-menu">' + 
    '<div class="helmsman-heading" ng-if="heading">{{heading}}</div>' + 
    '<li ng-repeat="item in items" ng-if="!item.breadcrumb">' +

      // Link
      '<a id="{{item.link}}_menu_link" \
          href="" ng-click="setMenu(item.link)" \
          tabIndex="-1" \
          ng-if="item.link">' +

        '<div class=helmsman-link>' +
          '<span class="helmsman-key">{{item.key}}</span>' + 
          '{{item.label}}' +
        '</div>' +
      '</a>' +

      // State
      '<a tabIndex="-1" \
          ui-sref="{{item.state}}" \
          ui-sref-active-eq="helmsman-active-item" \
          ng-if="item.state">' +

        '<div id="{{item.state}}_menu_item" ng-class="{helmsman_item: item.exists != undefined, helmsman_missing_item: item.exists == undefined}">' +
          '<span class="helmsman-key">{{item.key}}</span>' + 
          '{{item.label}}' +
        '</div>' +
      '</a>' +

    '</li>' + 

    '<div class="helmsman-heading" ng-if="heading && jumps">Jump Menu</div>' + 
    '<li ng-repeat="item in jumps" ng-if="!item.breadcrumb && jumps">' +

      // Jump link
      '<a id="{{item.link}}_menu_link" \
          href="" ng-click="setMenu(item.link)" \
          tabIndex="-1" \
          ng-if="item.link && !item.state">' +

        '<div class=helmsman-link>' +
          '<span class="helmsman-key">{{item.jump_key}}</span>' + 
          '{{item.label}}' +
        '</div>' +
      '</a>' +

      // State
      '<a tabIndex="-1" \
          ui-sref="{{item.state}}" \
          ui-sref-active-eq="helmsman-active-item" \
          ng-if="item.state">' +

        '<div id="{{item.state}}_menu_item" class="helmsman_item">' +
          '<span class="helmsman-key">{{item.jump_key}}</span>' + 
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
