import $ from 'jquery'
import Backbone from 'backbone'
import $login from './login'
import $signup from './signup'
import $contacts from './contacts'

const Router = Backbone.Router.extend({
  routes: {
    login   : 'appendLogin',
    signup  : 'appendSignup',
    contacts: 'appendContacts',
    '/*'    : 'appendLogin'
  },
  appendLogin: function() {
    $('#page').empty().append($login)
  },
  appendSignup: function() {
    $('#page').empty().append($signup)
  },
  appendContacts: function() {
    $('#page').empty().append($contacts)
  }
});
const router = new Router();
export default router;