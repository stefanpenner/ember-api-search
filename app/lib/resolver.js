var classify = Ember.String.classify,
    decamelize = Ember.String.decamelize,
    assert = Ember.assert;

var resolveFactory = function(namespace) {
  return function(parsedName) {
    var className = classify(parsedName.name) + classify(parsedName.type),
        moduleName = namespace + '/' + parsedName.type + 's/' + parsedName.name,
        factory;

    if (define.registry[moduleName]) {
      var exports = requireModule(moduleName);
      assert('Expected ' + moduleName + ' to export ' + className, exports && exports[className]);
      factory = exports[className];
    } else {
      factory = this._super.apply(this, arguments);
    }

    return factory;
  };
};

var findTemplate = function(name) {
  return Ember.TEMPLATES[name];
};

var resolveTemplate = function(namespace) {
  return function(parsedName) {
    var templateName = parsedName.fullNameWithoutType.replace(/\./g, '/'),
        decamalizedTemplateName = decamelize(templateName),
        _super = this._super,
        check;

    // makes sure templates are loaded
    // ok to assume user is going to put templates in this amd/location?
    if (define.registry[namespace + '/templates']) {
      requireModule(namespace + '/templates');
    }

    // look for the template in the following keys of Ember.TEMPLATES
    // namespace + name
    // namespace + decamelize name
    // name
    // decamalized name
    // this._super

    check = [
      function() { return findTemplate(namespace + '/' + templateName); },
      function() { return findTemplate(namespace + '/' + decamalizedTemplateName); },
      function() { return findTemplate(templateName); },
      function() { return findTemplate(decamalizedTemplateName); },
      function() { return _super(parsedName); }
    ];

    return check.reduce(function(result, findTemplateFn) {
      if (!result) { result = findTemplateFn.call(); }
      return result;
    }, null);
  };
};

var Resolver = function(namespace) {
  if (!namespace) { namespace = ''; }

  return Ember.DefaultResolver.extend({
    resolveTemplate: resolveTemplate(namespace),
    resolveOther: resolveFactory(namespace)
  });
};

export Resolver;
