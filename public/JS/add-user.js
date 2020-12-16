
baseURI = 'http://localhost:3000/'

registerForm: function () {
    const form = document.querySelector('.form-login-content');
    form.addEventListener('submit', handleAddUserSubmit);
}

handleAddUserSubmit: function () {
     event.preventDefault()

    const lastnameValue = document.querySelector('#lastname').value;
    console.log(lastnameValue)
    const firstnameValue = document.querySelector('#firstname').value;
    const ageValue = document.querySelector('#age').value;
    const emailValue = document.querySelector('#email').value;
    const passwordValue = document.querySelector('#password').value;
    
    user.sendNewUser(lastnameValue, firstnameValue, ageValue, emailValue, passwordValue);
    
} 


    