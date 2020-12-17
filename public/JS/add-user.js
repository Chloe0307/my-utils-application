
let user = {
    
    baseURI : 'http://localhost:3000/',

    init: function () {
        console.log("je suis l'init");
        user.registerForm()
        user.registerAvatar()
    },

    registerForm : function ()  {
        const LoginForm = document.querySelector('.form-login-content');
        loginForm.addEventListener('submit', user.handleAddUserSubmit);
    },

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
    ) {
       let userDatas = {
           lastname,
           firstname,
           age,
           email,
           password
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

    registerAvatar : function () {

        let avatarForm = document.querySelector('.form-avatar-content')
        avatarForm.addEventListener('submit', user.handleSubmitAvatar)
    },

    handleSubmitAvatar: function (event) {
        
    } 
}

document.addEventListener('DOMContentLoaded', user.init)


    