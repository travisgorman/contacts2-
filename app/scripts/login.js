import $ from 'jquery'
import Backbone from 'backbone'
import signup from './signup'
import user from '../models/user'
import router from '../router'
import settings from '../settings'

function renderLogin() {
  let login = $(`
    <div class="loginPage">
      <h1>Personal Contact List</h1>
      <h2>Log In</h2>
    <input id = "usernameLogIn"
      type="textarea" 
        placeholder="username" 
        value="">
    <input id = "passwordLogIn" 
        type="password" 
        placeholder="password" 
        value="">
    <input id = "loginButton" 
        type="button" 
        name="button" 
        value="Log-In">
      <p>Not a member yet?</p>
    <input id = "routeToSignupButton" 
        type="button" 
        name="button" 
        value="Sign-Up">
    </div>
`);
    login.find('#routeToSignupButton')
      .on('click', function(e) {
        e.preventDefault();
        router.navigate('signup', {
          trigger: true
      });
    });
    login.find('#loginButton')
      .on('click', function(e) {
      e.preventDefault();
      let username = login.find('#username').val();
      let password = login.find('#password').val();
      let encrypted = btoa(settings.appKey + ':' + settings.appSecret);
    $.ajax({
      type: 'POST',
      url: `http://baas.kinvey.com/user/${settings.appKey}/#login`,
      data: JSON.stringify({
        username: username,
        password: password
      }),
      headers: {
        Authorization: `Basic ${encrypted}`
      },
      contentType: 'application/json',
      success: function(response) {
        user.username = username;
        user.authtoken = response._kmd.authtoken;
        router.navigate('contacts', {trigger:true})
        console.log('you logged in')
      },
      error: function() {
        console.log( 'error' )
      }
    });
  });
  return login;
}
export default renderLogin;
