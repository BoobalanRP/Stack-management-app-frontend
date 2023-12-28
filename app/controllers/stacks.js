import Ember from 'ember';
//import {get, set } from '@ember/object';

export default Ember.Controller.extend({
  isEmailPopupOpen: false,
  isAddStackPopupOpen : false,
  email: '',
  name: '',
  enviornment:'',

  actions: {
    openEmailPopup() {
      this.set('isEmailPopupOpen', true);
    },

    closeEmailPopup() {
      this.set('isEmailPopupOpen', false);
    },

    verifyEmail() {
      if (this.email.trim() !== '') {
      localStorage.setItem('email', this.email);
      this.set('isEmailPopupOpen', false); 
      this.set('email', ''); 
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

        console.log(name);
        console.log(environment);

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
                // Add other properties as needed
            }),
        })
            .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
            })
            .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            throw error;
            });
    }
}


});