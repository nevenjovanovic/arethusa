"use strict";

angular.module('arethusa.anaphora').service('anaphora', [
  'state',
  'configurator',
  'globalSettings',
  function(state, configurator, globalSettings) {
    var self = this;
    this.name = 'anaphora';

    this.defaultConf = {
      template: 'templates/arethusa.anaphora/anaphora.html'
    };

    function configure() {
      configurator.getConfAndDelegate(self);
    }

    function Anaphora() {
      this.targetId = undefined;
    }

    function addContainer() {
      angular.forEach(state.tokens, function(token, i) {
        if (!token.anaphora) token.anaphora = new Anaphora();
      });
    }

    var clickActionName = 'co-reference';

    function clickAction(targetId) {
      state.doBatched(function() {
        angular.forEach(state.clickedTokens, function(type, id) {
          var token = state.getToken(id);
          state.change(token, 'anaphora.targetId', targetId);
        });
      });
    }

    globalSettings.addClickAction(clickActionName, clickAction);

    this.init = function() {
      configure();
      addContainer();
    };
  }
]);
