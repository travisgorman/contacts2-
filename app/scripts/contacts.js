import $ from 'jquery'
import Backbone from 'backbone'
import settings from '../settings'
import user from '../models/user'
import contactCollection from '../collections/contactsCollection'

function renderContacts() {
  let contacts = $(`
    <div class="contacts">
      <div class="createContact">
        <h3>Add Contact</h3>
        <form>
          <input id="name"
            type="text"
            name="fullname"
            placeholder="fullname" />
          <input id="nickname"
            type="text"
            name="nickname"
            placeholder="nickname" />
          <input id="phone"
            type="text"
            name="phone"
            placeholder="phone" />
          <input id="email"
            type="text"
            name="email"
            placeholder="email" />
          <input id="add"
            type="submit"
            name="add"
            value="add contact" />
        </form>
      </div>
      <div class="savedContacts">
        <h3>Contacts</h3>
        <ul></ul>
      </div>
    </div>
 `);

console.log( 'your user authtoken:', user.authtoken );

  contactCollection.fetch({
    headers: {
      Authorization: `Kinvey ${user.authtoken}`
    }
  });
  
contacts.find('#add')
  .on('click', function(e){
    e.preventDefault();
    let name = contacts.find('#name').val();
    let nickname = contacts.find('#nickname').val();
    let phone = contacts.find('#phone').val();
    let email = contacts.find('#email').val();
    contactCollection.create({
      name: name,
      nickname: nickname,
      phone: phone, 
      email: email
    }, {
      headers: {
        Authorization: `Kinvey ${user.authtoken}`
      }
    });
  });


  // let $contact = `<li>${user.getItem('name')}</li>`
     contactCollection.on('add', function(model, collection, evt) {
         $('ul').append($('<li>' + model.get( 'contactName' ) + '</li>'));
                 // console.log(signup);

 });

  // contactCollection.on('add', 
  //   function(model) {
  //     $('ul').append($contact)
  //   });

  return contacts;
}
export default renderContacts;



// function renderContacts() {

//     let contacts = $(
//         `<div class="Contacts">

// <div class="createContact">
//  <h1>Create a New Contact</h1>
//  <form>
//   <input id = "contactName" type="textarea" name="name" class="newContactName" placeholder="Contact Name">
//   <input id = "nickname" type="textarea" name="nickname " class="newContactNickname" placeholder="Nickname">
//   <input id = "email" type="textarea" name="email" class="newContactEmail" placeholder="Email Address">
//   <input id = "number" type="textarea" name="number" class="newContactNumber" placeholder="Phone Number">
//   <input id = "add" type="submit" name="submit" value="Add to Contact List">
//  </form>
// </div>

// <div class="SavedContacts">
//  <h1>List of Contacts</h1>
//  <ul></ul>
// </div>
// </div>`);
//     contactCollection.fetch({
//         headers: {
//             Authorization: `Kinvey ${user.authtoken}`
//         }
//     });

// console.log( user.authtoken );

//     contacts.find("#add").on('click', function(evt) {
//         evt.preventDefault();
//         let contactName = contacts.find('#contactName').val();
//         let nickname = contacts.find('#nickname').val();
//         let email = contacts.find('#email').val();
//         let number = contacts.find('#number').val();
//         let encrypted = btoa(settings.appId + ':' + settings.appSecret);

//         contactCollection.create({
//             contactName: contactName,
//             nickname: nickname,
//             email: email,
//             number: number
//         }, {
//             headers: {
//                 Authorization: `Kinvey ${user.authtoken}`
//             }
//         });


//     });

//     contactCollection.on('add', function(model, collection, evt) {
//         $('ul').append($('<li>' + model.get( 'contactName' ) + '</li>'));
//                 // console.log(signup);

// });




    // The below was removed because i used a collection and consolidated all the information to the above create()

    // $.ajax({
    //     type: 'POST',
    //     url: `https://baas.kinvey.com/appdata/${settings.appId}/contacts`,
    //     data: JSON.stringify({
    //         contactName: contactName,
    //         nickname: nickname,
    //         email: email,
    //         number: number
    //     }),
    //
    //     headers: {
    //         Authorization: `Kinvey ${user.authtoken}`
    //     },
    //
    //     contentType: 'application/json',
    //     success: function(response) {
    //         console.log("yas queen");
    //     }
    // });

//     return contacts;
// }

// export default renderContacts;
