import $ from 'jquery'
import Backbone from 'backbone'
import settings from './settings'
import router from './router'
import session from './session'

$(document).ajaxSend(function(evt, jqXHR) {
  if (session.get('authtoken')) {
    jqXHR.setRequestHeader('Authorization','Kinvey ' + session.get('authtoken'));
  } else {
    jqXHR.setRequestHeader('Authorization','Basic ' + settings.basicAuth);
  }
  console.log( jqXHR );
});

Backbone.history.start();

if (!session.username) {
  router.navigate('login', 
    {trigger: true});
}
