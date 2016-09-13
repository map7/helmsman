angular.module('app',['ui.router', 'helmsman']).config(function(hotkeysProvider) {
  hotkeysProvider.template = '<div class="cfp-hotkeys-container fade" ng-class="{in: helpVisible}">' +
    '<div class="cfp-hotkeys">' +
        '<h4 class="cfp-hotkeys-title" ng-if="!header">{{ title }}t</h4>' +
        '<div class="table-hotkeys">' +
          '<div ng-repeat="hotkey in hotkeys">' +
            '<div class="cfp-hotkeys-keys">' +
              '{{ hotkey.description }}<span ng-repeat="key in hotkey.format() track by $index" class="cfp-hotkeys-key">{{ key }}</span>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
        '</div>';
                    
  })

