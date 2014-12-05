"use strict";

angular.module('arethusa.artificialToken').directive('artificialTokenInsertionPointer', [
  'artificialToken',
  'pointer',
  'translator',
  function(artificialToken, pointer, translator) {
    return {
      restrict: 'A',
      scope: {},
      link: function(scope, element, attrs) {
        scope.aT = artificialToken;

        var trsl = {};
        function updateAndTrigger(key) {
          return function(translation) {
            trsl[key] = translation;
            setInsertDirText();
          };
        }
        translator('aT.insertBehind',     updateAndTrigger('behind'), null, true);
        translator('aT.insertInFront',    updateAndTrigger('inFront'), null, true);
        translator('aT.insertBehindHint', updateAndTrigger('behindHint'));
        translator('aT.insertInFrontHint',    updateAndTrigger('inFrontHint'));

        function setInsertDirText() {
          var dir = scope.aT.insertBehind ? 'behind' : 'inFront';
          scope.insertDirText = trsl[dir];
          scope.insertDirHint = trsl[dir + 'Hint'];
          scope.arrow = scope.aT.insertBehind ? 'right' : 'left';
        }

        function tokens() {
          return angular.element('[token]');
        }

        scope.toggleDir = function() {
          scope.aT.insertBehind = !scope.aT.insertBehind;
          setInsertDirText();
        };

        function setInsertionPoint(id, token) {
          artificialToken.model.insertionPoint = token;
        }

        scope.selectInsertionPoint = function() {
          pointer.findTarget(setInsertionPoint);
        };

        scope.$watch('aT.model.insertionPoint', function(newVal, oldVal) {
          scope.insertionPoint = newVal;
        });

        scope.$watch('aT.insertBehind', setInsertDirText);

        setInsertDirText();
      },
      templateUrl: 'templates/arethusa.artificial_token/artificial_token_insertion_pointer.html'
    };
  }
]);
