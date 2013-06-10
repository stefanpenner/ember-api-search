import App from 'app/main';

App.setupForTesting();

module("App Tests", {
  setup: function() {
    App.reset();
    App.injectTestHelpers();
  }
});

test("namespace existence", function(){
  ok(App, 'namespace was loaded');
});
