import Ember from 'ember';


export default Ember.Route.extend({

    // model: function(){
    //     var url = "http://localhost:8080/stacks";

    //     return Ember.$.ajax({
    //         url: url,
    //         method: 'GET',
    //         dataType: 'json',
    //       }).then(function(data) {
    //         return data;
    //       }, function(error) {
    //         // Handle errors here
    //         console.error("Error fetching data:", error);
    //       });
    // }

    // model: async function() {
    //     var url = "http://localhost:8080/stacks";
    
    //     try {
    //       // Use the modern fetch API to make the AJAX request
    //       let response = await fetch(url);
    //       if (!response.ok) {
    //         throw new Error(`HTTP error! Status: ${response.status}`);
    //       }
    
    //       // Parse the response as JSON
    //       let data = await response.json();
    
    //       // Resolve the promise with the retrieved data
    //       return data;
    //     } catch (error) {
    //       // Handle errors here
    //       console.error("Error fetching data:", error);
    
    //       // Optionally, you can re-throw the error to propagate it to the next catch block
    //       throw error;
    //     }    
    //   }

    model() {
      return fetch('http://localhost:8080/stacks', {
        method: 'GET',
        mode: 'cors', // Set the mode to 'cors' to enable cross-origin requests
        headers: {
          'Content-Type': 'application/json',
          'crossorigin': 'http://localhost:4200/' // Add your crossorigin attribute here
        }
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
});


