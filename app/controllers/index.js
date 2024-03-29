import ApiSearch from 'app/lib/api_search';

var get = Ember.get, set = Ember.set, searchApi;
var instance;

$.getJSON('/api/api.json').then(function(json){
  instance = new ApiSearch(json);
});

function search(query){
  return instance.search(query);
}

var IndexController = Ember.ObjectController.extend({
  content: Ember.A([]),
  query: null,
  timer: null,
  lastQuery: null,
  search: function(){
    var query, timer, lastQuery;

    query = get(this, 'query');
    timer = get(this, 'timer');
    lastQuery = get(this, 'lastQuery');

    if (lastQuery === query) {
      return;
    } else {
      set(this, 'lastQuery', query);
    }

    Ember.run.cancel(timer);

    timer = Ember.run.later(this, function(){
      set(this, 'content', search(query));
    }, 50);

    set(this, 'timer', timer);
  }.observes('query')
});

export IndexController;
