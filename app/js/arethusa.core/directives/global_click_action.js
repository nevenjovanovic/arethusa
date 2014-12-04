"use strict";

angular.module('arethusa.core').directive('globalClickAction', [
  'globalSettings',
  function(globalSettings) {
    return {
      restrict: 'A',
      scope: {},
      link: function(scope, element, attrs) {
        scope.gS = globalSettings;
        scope.label = globalSettings.settings.clickAction.label;

        // Looks redundant - but the order of events requires this!
        scope.$watch('gS.clickAction', function(newVal, oldVal) {
          scope.currentAction = newVal;
        });
      },
      templateUrl: 'templates/arethusa.core/global_click_action.html'
    };
  }
]);
