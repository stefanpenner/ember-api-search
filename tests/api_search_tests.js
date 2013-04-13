module("ApiSearch public api");

function buildApiSearch (data) {
  return new ApiSearch(data);
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
  var result, query, apiSearch;

  instance = buildApiSearch();

  query = "Ember.View";
  result = instance.search(query);

  deepEqual(result.files,      [], 'empty files');
  deepEqual(result.classes,    [], 'empty classes');
  deepEqual(result.modules,    [], 'empty modules');
  deepEqual(result.classItems, [], 'empty classitems');
});
