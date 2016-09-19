import $ from 'jquery'
import settings from './settings'
import router from './router'
import session from './session'
 
let $login = $(`
    <form class="login-form">
      <h2>Login</h2>
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
        model.unset('password');
        router.navigate( 'contacts', {trigger:true});
      },
      error: function() {
        console.log( 'ERROR' );
      }
    });
});
export default $login;