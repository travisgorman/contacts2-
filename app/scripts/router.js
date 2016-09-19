import $ from 'jquery'
import Backbone from 'backbone'
import $login from './login'
import $signup from './signup'

const Router = Backbone.Router.extend({
  routes: {
    login   : 'appendLogin',
    signup  : 'appendSignup',
    '/*'    : 'appendLogin'
  },
  appendLogin: function() {
    $('#page').empty().append($login)
  },
  appendSignup: function() {
    $('#page').empty().append($signup)
  }
});
const router = new Router();
export default router;