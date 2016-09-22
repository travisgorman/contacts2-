import $ from 'jquery'
import Backbone from 'backbone' 
import router from './router'
import settings from './settings'
import store from './store'
import user from './models/user'

$(document).ajaxSend(function(e, jqXHR) {
  if (store.session.authtoken) {
    jqXHR.setRequestHeader('Authorization', `Kinvey ${store.session.authtoken}`)
  } else {
    jqXHR.setRequestHeader('Authorization', `Basic ${settings.basicAuth}`)
  }
})

if (sessionStorage.session) {
  store.session = JSON.parse(sessionStorage.session)
}

Backbone.history.start()

if (!store.session.username) {
  router.navigate('login', {trigger:true})
}

user.retrieve();

// {
//   "username":"rickyfrockrocket",
//   "authtoken":"e194e4d6-f502-4696-9f11-fcbc56048c9c.4fxIY2RgzNbEoybpvvXcVmq0LUp+jxl+EHivKP/EpCY=",
//   "_id":"57e34a780582b89e050bc386"
// }