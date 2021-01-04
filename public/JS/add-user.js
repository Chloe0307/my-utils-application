
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
        const loginForm = document.querySelector('.form-add-user-content')
        loginForm.addEventListener('submit', user.handleAddUserSubmit)
    },


    // method to add an avatar in new user profil
    registerAvatar : function () {

        const avatarForm = document.querySelector('.form-avatar-content')
        avatarForm.addEventListener('submit', user.handleAddUserSubmit)

        // console.log(avatarForm)
    },


    // handle to get personals informations
    handleAddUserSubmit: function (event) {
        event.preventDefault()

        const lastnameValue = document.querySelector('#lastname').value;
        const firstnameValue = document.querySelector('#firstname').value;
        const ageValue = document.querySelector('#age').value;
        const emailValue = document.querySelector('#email').value;
        const passwordValue = document.querySelector('#password').value;
        const avatarUser = document.getElementById('avatar').value

        user.saveNewUser(lastnameValue, firstnameValue, ageValue, emailValue, passwordValue, avatarUser);
        
    }, 


    // this method is to create new user in database
    saveNewUser : function (
        lastname,
        firstname,
        age,
        email,
        password,
        avatar,
    ) {
       let userDatas = {
           lastname,
           firstname,
           age,
           email,
           password,
           avatar,
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

    // This method is created to replace the default avatar by user avatar
    replaceByUserAvatar : function () {
      const avatarUser = document.createElement("img").className('avatar-user')
      const divAvatarContent = document.querySelector('.div-avatar-content')

      avatarUser.appendChild(divAvatarContent)
      
  }
}

document.addEventListener('DOMContentLoaded', user.init)


    