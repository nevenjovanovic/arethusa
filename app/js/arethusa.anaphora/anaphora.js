"use strict";

angular.module('arethusa.anaphora').service('anaphora', [
  'state',
  'configurator',
  'globalSettings',
  function(state, configurator, globalSettings) {
    var self = this;
    this.name = 'anaphora';

    this.defaultConf = {
      template: 'templates/arethusa.anaphora/anaphora.html',
      contextMenu: true,
      contextMenuTemplate: 'templates/arethusa.anaphora/context_menu.html'
    };

    function configure() {
      configurator.getConfAndDelegate(self);
    }

    function Anaphora() {
      this.targetId  = undefined;
      this.topTarget = undefined;
      this.referencedBy = [];
    }

    function addContainer() {
      angular.forEach(state.tokens, function(token, i) {
        if (!token.anaphora) token.anaphora = new Anaphora();
      });
    }

    var clickActionName = 'co-reference';
    var targetAttribute = 'anaphora.targetId';

    function clickAction(targetId) {
      state.doBatched(function() {
        angular.forEach(state.clickedTokens, function(type, id) {
          var token = state.getToken(id);
          state.change(token, targetAttribute, targetId);
        });
      });
    }

    function removeOldReference(refId, targetId) {
      if (!targetId) return;
      var token = state.getToken(targetId);
      var refs  = token.anaphora.referencedBy;
      refs.splice(refs.indexOf(refId), 1);
    }

    function addNewReference(refId, targetId) {
      if (!targetId) return;
      var token = state.getToken(targetId);
      token.anaphora.referencedBy.push(refId);
    }

    function dereferenceReference(token, targetToken) {
      // Infinite loop!
      //
      //var topTarget = targetToken;
      //while (topTarget.anaphora.targetId) {
        //topTarget = state.getToken(topTarget.anaphora.targetId);
      //}
      //token.anaphora.topTarget = topTarget.id;
    }

    state.watch(targetAttribute, function(newVal, oldVal, event) {
      var token = event.token;
      var referenceId = token.id;
      removeOldReference(referenceId, oldVal);
      addNewReference(referenceId, newVal);
      dereferenceReference(token, state.getToken(newVal));
    });

    this.changeAnaphora = clickAction;

    globalSettings.addClickAction(clickActionName, clickAction);
    globalSettings.setClickAction(clickActionName);

    this.useClickAction = function() {
      if (self.mode === 'editor') {
        globalSettings.setClickAction(clickActionName);
      }
    };

    this.init = function() {
      configure();
      addContainer();
    };
  }
]);
