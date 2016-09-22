import $ from 'jquery'
import Backbone from 'backbone'
import login from './login'
import user from '../models/user'
import router from '../router'
import settings from '../settings'

function renderSignup() {
    let signup = $(`
      <div class="signup">
        <h1> Personal Contact List </h1>
        <h2> Sign Up </h2>
      <input id="username"
        type="text"
        name="username" 
        placeholder="username" >
      <input id="password" 
        type="password" 
        name="password"
        placeholder="password" >
      <input id = "signupButton" 
        type="button" 
        name="button" 
        value="Sign-Up" >
      <p> Already a member? </p>
      <input id = "routeToLoginButton" 
        class ="routeToLoginButton" 
        type="button" 
        name="button" 
        value="Log-In">
      </div>
  `);
    
    signup.find('#routeToLoginButton')
      .on('click', function(e) {
        e.preventDefault();
        router.navigate('login', {
          trigger: true 
      });
    });
    signup.find('#signupButton').on('click', function(e) {
        e.preventDefault();
        let username = signup.find('#username').val();
        let password = signup.find('#password').val();
        let encrypted = btoa(settings.appKey + ':' + settings.appSecret);
        $.ajax({
          type: 'POST',
          url: `https://baas.kinvey.com/user/${settings.appKey}/`,
          data: JSON.stringify({
            username: username,
            password: password
          }),
          headers: {
            Authorization: `Basic ${encrypted}`
          },
          contentType: 'application/json',
          success: function(model, response) {
            user.username = username;
            user.authtoken = response._kmd.authtoken;
            router.navigate('contacts', {trigger: true});
            console.log("You created a user")
          },
          error: function() {
            console.log('Error')
          }
        });
    });
  return signup;
}
export default renderSignup;
