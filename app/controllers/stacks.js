import Ember from 'ember';
//import {get, set } from '@ember/object';

export default Ember.Controller.extend({
  isEmailPopupOpen: false,
  isAddStackPopupOpen : false,
  email: '',
  name: '',
  enviornment:'',
    // use stack form data
    frontendBranch:'',
    backendBranch:'',
    // will recieve the stack id a from the use button of openUseStack()
    stackId:'',
    // will get the local email if email is verified
    localEmail : localStorage.getItem('email'),
  
    hasData: Ember.computed(function() {
      var localEmail = localStorage.getItem('email');
      return !!localEmail;
    }),

  //get user email from local storage
  userEmailAddress: Ember.computed(function() {
    var email = localStorage.getItem('email');
    return email;
  }),

 
  //To show the email popup while page is refresh and also didn't verified the email
  isEmailPopupOpen: Ember.computed('localEmail', function() {
    return false; // Initialize with default value 'false'
  }),


  init() {

    Ember.run.later(this, () => {
      const localEmail = localStorage.getItem('email');
      if (!localEmail) {
        this.set('isEmailPopupOpen', true);
      }
    }, 1000);
  },


  actions: {
  

    verifyEmail() {
      if (this.email.trim() !== '') {
      localStorage.setItem('email', this.email);
      this.set('isEmailPopupOpen', false); 
      this.set('email', ''); 
      window.location.reload();
    }else {
      alert('Please enter a valid email');
    }
    },

    openAddStackPopup() {
        this.set('isAddStackPopupOpen', true);
    },

    closeAddStackPopup() {
        this.set('isAddStackPopupOpen', false);
    },

    addStack(){
        var name = this.get('name');
        var environment = this.get('environment');

        return fetch('http://localhost:8080/stacks', {
            method: 'POST',
            mode: 'cors', // Set the mode to 'cors' to enable cross-origin requests
            headers: {
            'Content-Type': 'application/json',
            'crossorigin': 'http://localhost:4200/' // Add your crossorigin attribute here
            },
            body: JSON.stringify({
                name: name,
                environment: environment,
            }),
        })
            .then(response => {
              window.location.reload();
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
            })
            .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            throw error;
            });
           
    },

    releaseStack(stackId){
      
      console.log("stackId", stackId);
      return fetch(`http://localhost:8080/stack/release/${stackId}`, {
            method: 'PUT',
            mode: 'cors', // Set the mode to 'cors' to enable cross-origin requests
            headers: {
            'Content-Type': 'application/json',
            'crossorigin': 'http://localhost:4200/' // Add your crossorigin attribute here
            }
        })
            .then(response => {
              window.location.reload();
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
            })
            .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            throw error;
            });
      
    },


    // add new stacks methods
    openUseStackPopup(stackId) {
      this.stackId = stackId;
      this.set('isUseStackPopupOpen', true);
    },

    closeUseStackPopup() {
      this.set('isUseStackPopupOpen', false);
    },

    UseStack(){
      var frontendBranch = this.get('frontendBranch');
      var backendBranch = this.get('backendBranch');
      var userEmail = this.get('localEmail');
      var stackId = this.get('stackId');

      console.log(userEmail);


      return fetch('http://localhost:8080/stack/use', {
          method: 'POST',
          mode: 'cors', // Set the mode to 'cors' to enable cross-origin requests
          headers: {
          'Content-Type': 'application/json',
          'crossorigin': 'http://localhost:4200/' 
          },
          body: JSON.stringify({
            frontendBranch: frontendBranch,
            backendBranch: backendBranch,
            userEmail:userEmail,
            stackId : stackId
          }),
      })
          .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          window.location.reload();
          return response.json();


          })
          .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
          throw error;
          });

    }
  }

});