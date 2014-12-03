"use strict";

angular.module('arethusa.anaphora').service('anaphora', [
  'state',
  'configurator',
  function(state, configurator) {
    var self = this;
    this.name = 'anaphora';

    this.defaultConf = {
      template: 'templates/arethusa.anaphora/anaphora.html'
    };

    function configure() {
      configurator.getConfAndDelegate(self);
    }

    this.init = function() {
      configure();
    };
  }
]);
