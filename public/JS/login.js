
let login = {

    init: function () {
        login.loginForm()
    },

    loginForm: function () {
        console.log('ola je suis la')
        let inputLogin = document.querySelector('.login-input')
        inputLogin.addEventListener('submit', login.handleLogin)
    },

    handleLogin: function (event) {
        event.preventDefault()

        const emailValue = document.querySelector('.login-input').value
        const passwordValue = document.getElementById('passwordLogin').value

       
    }
}

document.addEventListener('DOMContentLoaded', login.init)