// $.getJSON('/api.json').then(preprocess);

(function(){
  function preprocess(data){
    window.json = data;
    window.classes = Object.keys(json.classes);
    window.files = Object.keys(json.files);
    window.modules = Object.keys(json.modules);
  }

  function match(regex){
    return function(value){
      return regex.test(value);
    };
  }

  function searchClasses(query){
    return classes.
      filter(match(query)).
      map(function(className){
        return json.classes[className];
    });
  }

  function searchFiles(query){
    return files.
      filter(match(query)).
      map(function(className){
        return json.files[className];
    });
  }

  function searchModules(query){
    return modules.
      filter(match(query)).
      map(function(className){
        return json.modules[className];
    });
  }

  function searchClassItems(query){
    return json.classitems.filter(function(classItem){
      return query.test(classItem.name);
    });
  }

  function splitOnWords(words){
    var splits = words.match(/[A-Z][a-z\#\d]+/g);

    if (splits) {
      return splits.join('.*');
    } else {
      return words;
    }
  }

  function parseQuery(query){
    var matches = query;
    var splitQuery = query.split('#');
    var withMethodsRegex;

    nonMethod = splitQuery.shift();

    if (splitQuery.length === 0){
      methods = nonMethod;
    } else {
      methods = splitQuery.join('|');
    }

    nonMethod = splitOnWords(nonMethod);

    if (nonMethod === ''){
      noMethodsRegex = /^$/;
    } else {
      noMethodsRegex = new RegExp(nonMethod, 'i');
    }

    methodsRegex = new RegExp('(' + methods + ')','i');

    return {
      files: noMethodsRegex,
      modules: noMethodsRegex,
      classes: noMethodsRegex,
      classItems: methodsRegex
    };
  }

  function compileQuery(query){
    return query;
  }

  // view#method
  function search(query){
    result = {};
    if (!query){ return result; }

    query = parseQuery(query);
    // compile
    result.files = searchFiles(query.files).slice(0,10);
    result.modules = searchModules(query.modules).slice(0,10);
    result.classes = searchClasses(query.classes).slice(0,10);
    result.classItems = searchClassItems(query.classItems).slice(0,30);

    return result;
  }

  window.ApiSearch = function(){
  };

  ApiSearch.prototype.search = function(query) {
    var result;

    result = {};
    if (!query){ return result; }

    result = {
      files: [],
      modules: [],
      classes: [],
      classItems: []
    };

    return result;
  };

}());
