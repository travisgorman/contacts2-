import $ from 'jquery'
import settings from './settings'
import router from './router'
import session from './session'
 
let $login = $(`
    <form class="login-form">
      <h2>Log In</h2>
      <input id="username" 
        type="text" 
        name="username" 
        placeholder="username"/>
      <input id="password" 
        type="password" 
        name="password" 
        placeholder="password"/>
      <input type="submit" 
        name="submit" 
        value="submit">
    </form>
`);

$login.find('input[type="submit"]')
  .on('click', function(e) {
    e.preventDefault();
    let username = $login.find('#username').val();
    let password = $login.find('#password').val();
    session.save({
      username: username, 
      password: password
    }, {
      success: function(model, response) {
        console.log('model:', model, 
          'response:', response );
        model.unset('password');
        console.log( response._kmd.authtoken );
        window.localStorage.setItem('authtoken', 
          response._kmd.authtoken)
        router.navigate( 'contacts', {trigger:true});
      },
      error: function() {
        console.log( 'ERROR' );
      }
    });
});
export default $login;