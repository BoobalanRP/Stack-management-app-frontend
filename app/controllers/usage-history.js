import Ember from 'ember';

export default Ember.Controller.extend({
  
    
    isHistoryEmpty: Ember.computed('model.[]', function() {
        let model = this.get('model');
        return Ember.isEmpty(model);
      }),
      
});
