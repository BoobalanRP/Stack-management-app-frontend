import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('stacks' , {path:'stacks'} );
  this.route('usage-history', { path: '/usagehistory/:stack_id'});
  
  this.route('stack', function () {
    this.route('new');
  });
});

export default Router;
