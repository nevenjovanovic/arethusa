"use strict";

angular.module('arethusa.contextMenu').directive('arethusaContextMenus', [
  function() {
    return {
      restrict: 'A',
      scope: {
        tokens: '=',
        plugins: '='
      },
      link: function(scope, element, attrs) {
        scope.fullId = function(token) {
          return token.sentenceId + token.id;
        };

        scope.$on('contextMenuOpened', function(event, token) {
          scope.token = token;
        });
      },
      template: '\
        <arethusa-context-menu \
          plugins="plugins"\
          token-obj="token">\
        </arethusa-context-menu>\
      '
    };
  }
]);
