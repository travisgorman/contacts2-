import Backbone from 'backbone'
import $ from 'jquery'
import settings from '../settings'

const User = Backbone.Model.extend({
  idAttribute: '_id',
  urlRoot: `https://baas.kinvey.com/appdata/${settings.appKey}/contacts`,
  retrieve: function() {
    this.fetch({
      url: `https://baas.kinvey.com/user/${settings.appKey}/_me`,
      error: function(response) {
        console.log( response )
        throw new Error('Fetching User Failed')
      }
    })
  },
})

export default User;




// import Backbone from 'backbone'
// import router from '../router'

// const Session = Backbone.Model.extend({
//   urlRoot: `https://baas.kinvey.com/user/${settings.appKey}/login`,
//   defaults: {
//     username: ''
//   },
//   parse: function(response) {
//     if (response) {
//       return {      
//         authtoken: response._kmd.authtoken,
//         username: response.username,
//         fullname: response.fullname,
//         email: response.email,
//         nickname: response.nickname,
//         phone: response.phone,
//         userId: response._id
//       }
//     }
//   },
//   login: function(username, password) {
//     this.save({
//       username: username,
//       password: password
//     },{
//       success: (model, response) => {
//         localStorage.authtoken = response._kmd.authtoken
//         this.unset('password')
//         router.navigate('contacts', {trigger:true})
//       },
//       error: function() {
//         console.log( 'ERROR! Login failed' );
//       }
//     })
//   },
//   retrieve: function() {
//     this.fetch({
//       url: `https://baas.kinvey.com/user/${settings.appKey}/_me`,
//       error: function(response) {
//         console.log( response )
//         throw new Error('Fetching User Failed')
//       }
//     })
//   },
//   logout: function() {
    
//   };
// })

// export default Session