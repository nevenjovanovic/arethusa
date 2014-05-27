"use strict";

describe('morph', function() {
  var mockState = {};
  var mockConfigurator = {
    getConfAndDelegate: function(name, obj) {
      obj.conf = {
        retrievers: []
      };
      return obj;
    },
    getRetrievers: function(name) {
      return [];
    }
  };

  beforeEach(module('arethusa', function($provide) {
    $provide.value('state', mockState);
    $provide.value('configurator', mockConfigurator);
  }));

  describe('this.seedAnalyses', function() {
    it('...', inject(function(morph, state, configurator) {
      var tokens = { '1' : { string: "Marcus" } };
      var result = { '1' : { string: "Marcus", forms: [], analyzed: false} };
      expect(morph.seedAnalyses(tokens)).toEqual(result);
    }));
  });
});
