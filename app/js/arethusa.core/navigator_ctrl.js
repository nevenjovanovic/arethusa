'use strict';
angular.module('arethusa.core').controller('NavigatorCtrl', [
  '$scope',
  'navigator',
  function ($scope, navigator) {
    $scope.next = function () {
      navigator.nextChunk();
    };
    $scope.prev = function () {
      navigator.prevChunk();
    };
    $scope.goToFirst = function() {
      navigator.goToFirst();
    };
    $scope.goToLast = function() {
      navigator.goToLast();
    };
    $scope.goTo = function(id) {
      navigator.goTo(id);
    };
    $scope.nav = navigator;

    $scope.$watch('nav.status', function(newVal, oldVal) {
      $scope.navStat = newVal;
    });
  }
]);
