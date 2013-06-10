var isTest = function(name) {
  return !!name.match(/^test/);
};

Ember.keys(define.registry).forEach(function(file) {
  if (isTest(file)) { requireModule(file); }
});
