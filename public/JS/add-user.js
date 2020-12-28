
let user = {
    
    baseURI : 'http://localhost:3000/',


    // initial function 
    init: function () {
        // console.log("je suis l'init");
        user.registerForm()
        user.registerAvatar()
    },


    // method to create a new user profil with personals informations in database only
    registerForm : function ()  {
        const loginForm = document.querySelector('.form-login-content');
        loginForm.addEventListener('submit', user.handleAddUserSubmit);
    },


    // method to add an avatar in new user profil
    registerAvatar : function () {

        const avatarForm = document.querySelector('.form-avatar-content')
        avatarForm.addEventListener('submit', user.handleAddAvatarSubmit)

        // console.log(avatarForm)
    },


    // handle to get user avatar
    handleAddAvatarSubmit: function (event) {
        event.preventDefault()

        const avatarDefault = document.querySelector('.avatar-default')
        // console.log(avatarDefault)
        
        const avatarUser = document.getElementById('avatar').value

        
        console.log(avatarUser)
    },


    // handle to get personals informations
    handleAddUserSubmit: function (event) {
        event.preventDefault()

        const lastnameValue = document.querySelector('#lastname').value;
        const firstnameValue = document.querySelector('#firstname').value;
        const ageValue = document.querySelector('#age').value;
        const emailValue = document.querySelector('#email').value;
        const passwordValue = document.querySelector('#password').value;

        user.sendNewUser(lastnameValue, firstnameValue, ageValue, emailValue, passwordValue);
        
    }, 


    // this method is to create new user in database
    sendNewUser : function (
        lastname,
        firstname,
        age,
        email,
        password,
        avatar
    ) {
       let userDatas = {
           lastname,
           firstname,
           age,
           email,
           password,
           avatar
       }
       
       let myHeaders = new Headers()
       myHeaders.append("Content-Type", "application/json")

       let fetchOptions = {
           method : 'POST',
           mode : 'cors',
           cache : 'no-cache',
           headers : myHeaders,
           body : JSON.stringify(userDatas)
       }

       fetch( user.baseURI + 'add-users', fetchOptions)
       .then(function(response) {
           return response.json()
       }).then(function(newUser) {

       })
    },

  replaceByUserAvatar : function () {
      const avatarUser = document.createElement("img").className('avatar-user')
      const divAvatarContent = document.querySelector('.div-avatar-content')

      avatarUser.appendChild(divAvatarContent)
      
  }
}

document.addEventListener('DOMContentLoaded', user.init)


    