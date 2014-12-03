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
        scope.currentAction = globalSettings.clickAction;
      },
      templateUrl: 'templates/arethusa.core/global_click_action.html'
    };
  }
]);
