import ApiSearch from 'app/lib/api_search';

module("ApiSearch public api");

function buildApiSearch (data) {
  return new ApiSearch(data || {});
}

test("namespace", function(){
  ok(ApiSearch);
});

test("instantiation", function(){
  var instance;

  instance = buildApiSearch();

  ok(instance);
  ok(instance.search);
});

module("ApiSearch.search");

test("empty query", function(){
  var instance;

  instance = buildApiSearch();

  deepEqual(instance.search(), {}, 'no results');
});

test("simple search, with no data", function(){
  var instance, result, query, apiSearch;

  instance = buildApiSearch();

  query = "Ember.View";

  result = instance.search(query);

  ok(result, 'returned a result object');

  deepEqual(result.files,      [], 'empty files');
  deepEqual(result.classes,    [], 'empty classes');
  deepEqual(result.modules,    [], 'empty modules');
  deepEqual(result.classItems, [], 'empty classitems');
});

var exampleData = {
  project: { },
  files: {
    "../packages/ember-views/lib/views/view.js": {
      name: "../packages/ember-views/lib/views/view.js",
      modules:    {},
      classes:    { "Ember.View":1 },
      fors:       { Ember: 1 },
      namespaces: { Ember: 1 }
    }
  },

  classes: {
    'Ember.View': {
      classitems: [],
      description: "description text",
      extends: "Ember.Object",
      extension_for: [],
      extensions: [],
      file: "../packages/ember-views/lib/views/view.js",
      line: 208,
      module: "ember",
      name: "Ember.View",
      namespace: "Ember",
      plugin_for: [],
      plugins: [],
      shortname: "Ember.View",
      submodule: "ember-views"
    }
  },

  classitems: [
    {
      file: "../packages/ember-views/lib/views/view.js",
      line: 762,
      description:"description",
      itemtype: "property",
      name:"isView",
      type: "Boolean",
      default: "true",
      final: 1,
      class: "Ember.View",
      module: "ember",
      submodule: "ember-views",
      namespace: "Ember"
    }
  ],
  modules: {
    ember: {
      name: "ember",
      submodules: {
        "ember-application": 1,
        "ember-debug": 1,
        "ember-handlebars": 1,
        "ember-routing": 1,
        "ember-runtime": 1,
        "ember-states": 1,
        "ember-views": 1
      }
    }
  }
};

test("simple search, with simple data", function(){
  var instance, result, query, apiSearch, data;

  instance = buildApiSearch(exampleData);

  query = "Ember.View";

  result = instance.search(query);

  ok(result, 'returned a result object');

  var emberViewClass = exampleData.classes['Ember.View'];
  var emberViewFile  = exampleData.files['../packages/ember-views/lib/views/view.js'];

  deepEqual(result.modules,    [], 'empty modules');
  deepEqual(result.classes,    [emberViewClass], 'Ember.View class');
  deepEqual(result.classItems, [], 'empty classitems');

  // once each search catagory can return cross category results
  // deepEqual(result.files,      [emberViewFile], 'empty files');
  // deepEqual(result.classItems, exampleData.json.classitems, 'empty classitems');
});

module("ApiSearch.helpers.parseQuery");

var helpers = ApiSearch.helpers;

test("empty query", function(){
  var query, parsedQuery;

  parsedQuery = helpers.parseQuery(query);

  deepEqual(parsedQuery.files,      [], 'expected no files');
  deepEqual(parsedQuery.modules,    [], 'expected no modules');
  deepEqual(parsedQuery.classes,    [], 'expected no classes');
  deepEqual(parsedQuery.classitems, [], 'expected no classitems');
});

test("a class", function(){
  var query, parsedQuery;

  query = 'Ember.View';
  parsedQuery = helpers.parseQuery(query);

  deepEqual(parsedQuery.files,   [], 'expected no files');
  deepEqual(parsedQuery.modules, [], 'expected no modules');
  deepEqual(parsedQuery.classes, ['Ember.View'], 'expected classes');
  deepEqual(parsedQuery.classitems, [], 'expected no classitems');
});

test("a function or property", function(){
  var query, parsedQuery;

  query = "#isView";
  parsedQuery = helpers.parseQuery(query);

  deepEqual(parsedQuery.files,   [], 'expected no files');
  deepEqual(parsedQuery.modules, [], 'expected no modules');
  deepEqual(parsedQuery.classes, [], 'expected no classes');
  deepEqual(parsedQuery.classitems, ['isView'], 'expected classitems');
});

test("a file", function(){
  var query, parsedQuery;

  query = "/a/file/path";
  parsedQuery = helpers.parseQuery(query);

  deepEqual(parsedQuery.files,   ['/a/file/path'], 'expect files');
  deepEqual(parsedQuery.modules, [], 'expected no modules');
  deepEqual(parsedQuery.classes, [], 'expected no classes');
  deepEqual(parsedQuery.classitems, [], 'expected no classitems');
});

module("ApiSearch.helpers.compileParsedQuery");

test("empty query", function(){
  var compileQuery;

  compileQuery = helpers.compileParsedQuery({});

  deepEqual(compileQuery, {}, 'expected nothing');
});

test("non empty-query", function(){
  var query, parsedQuery;

  query = {
    files: ['/a/file/path'],
    modules: ['ember','ember-debug'],
    classes: ['Ember.View'],
    classitems: ['isView']
  };

  parsedQuery = helpers.compileParsedQuery(query);

  deepEqual(parsedQuery.files,      new RegExp('/a/file/path','i'));
  deepEqual(parsedQuery.modules,    /ember|ember-debug/i);
  deepEqual(parsedQuery.classes,    /Ember.*View/i);
  deepEqual(parsedQuery.classitems, /isView/i);
});

