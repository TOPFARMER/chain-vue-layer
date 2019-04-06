// const request = require('request-promise');

// // A request instance that talks to the API
// const makeRequest = request.defaults({
//   baseUrl: 'http://localhost:3030',
//   json: true
// });

// class Action {
//     static register() {
//         const user = {
//             email: document.querySelector('form#signUpForm [name="email"]').value,
//             password: document.querySelector('form#signUpForm [name="password"]').value
//         };

//         console.log(user);
//     }
// }


// // Retrieve email/password object from the login/signUpForm page
// const getCredentials = () => {
//     const user = {
//       email: document.querySelector('[name="email"]').value,
//       password: document.querySelector('[name="password"]').value
//     };
  
//     return user;
//   };
  
//   // Log in either using the given email/password or the token from storage
//   const login = async credentials => {
//     try {
//       if(!credentials) {
//         // Try to authenticate using the JWT from localStorage
//         await client.authenticate();
//       } else {
//         // If we get login information, add the strategy we want to use for login
//         const payload = Object.assign({ strategy: 'local' }, credentials);
  
//         await client.authenticate(payload);
//       }
  
//       // If successful, show the chat page
//       showChat();
//     } catch(error) {
//       // If we got an error, show the login page
//       showLogin(error);
//     }
//   };
  
//   document.addEventListener('click', async ev => {
//     switch(ev.target.id) {
//     case 'signUpForm': {
//       // For signUpForm, create a new user and then log them in
//       const credentials = getCredentials();
  
//       // First create the user
//       await client.service('users').create(credentials);
//       // If successful log them in
//       await login(credentials);
  
//       break;
//     }
//     case 'login': {
//       const user = getCredentials();
  
//       await login(user);
  
//       break;
//     }
//     case 'logout': {
//       await client.logout();
  
//       document.getElementById('app').innerHTML = loginHTML;
  
//       break;
//     }
//     }
//   });