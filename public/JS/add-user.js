import Axios from "axios";

let user = {


    baseURI = 'http://localhost:3000/',

    registerForm : function ()  {
        const form = document.querySelector('.form-login-content');
        form.addEventListener('submit', handleAddUserSubmit);
    },

    handleAddUserSubmit: function (event) {
        event.preventDefault()

        const lastnameValue = document.querySelector('#lastname').value;
        console.log(lastnameValue)
        const firstnameValue = document.querySelector('#firstname').value;
        const ageValue = document.querySelector('#age').value;
        const emailValue = document.querySelector('#email').value;
        const passwordValue = document.querySelector('#password').value;
        
        user.sendNewUser(lastnameValue, firstnameValue, ageValue, emailValue, passwordValue);
        
    }, 

    // this method is to create new user in database
    sendNewUser : function (
        lastnameUser,
        firstnameUser,
        ageUser,
        emailUser,
        passwordUser,
    ) {

        // axios request to send datas at database to create a new user
        Axios({
            method : 'post',
            url : baseUri + 'add-user',
            data : {
                lastname : lastnameUser,
                firstname : firstnameUser,
                age : ageUser,
                email : emailUser,
                password : passwordUser
            }  
       })

    }
}


    