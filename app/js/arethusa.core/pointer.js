"use strict";

angular.module('arethusa.core').service('pointer', [
  'state',
  'notifier',
  'translator',
  function(state, notifier, translator) {
    var self = this;
    var modeClass = 'crosshair-cursor';
    var listener;
    var trsls = {};
    translator('pointer.defaultNotification', trsls, 'defaultMessage');

    function tokens() {
      return angular.element('[token]');
    }

    function enterSelectMode(onSelection, msg) {
      self.active = true;
      state.deselectAll();
      tokens().addClass(modeClass);
      // In case we're already in that mode we need to deregister
      // the old listener, so that we don't run two actions at the
      // same time.
      if (listener) listener();
      listener = state.on('tokenClicked', function(ev, id) {
        onSelection(id, state.getToken(id));
        state.deselectAll();
        leaveSelectMode();
      });
      notifier.info(msg || trsls.defaultMessage);
    }

    function leaveSelectMode() {
      self.active = false;
      tokens().removeClass(modeClass);
      listener(); // to deregister
    }

    this.findTarget = enterSelectMode;
  }
]);
