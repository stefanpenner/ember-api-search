import Resolver from 'app/lib/resolver';
import Router from 'app/config/router';

var Application = Ember.Application.extend({
  resolver: new Resolver('app'),
  Router: Router
});

export Application;
