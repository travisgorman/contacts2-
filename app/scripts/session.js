import Backbone from 'backbone';
import settings from './settings';

const Session = Backbone.Model.extend({
  urlRoot: `https://baas.kinvey.com/user/${settings.appKey}/login`,
  defaults: {
    username: '',
    authtoken: ''  
  },
  parse: function(response) {
    if (response){
      return {
        authtoken: response._kmd.authtoken,
        username: response.username,
        userId: response._id
      };
    }
  }
});
let session = new Session();
export default session;