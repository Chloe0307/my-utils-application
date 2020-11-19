const mongoose = require('mongoose')
const validator = require('validator')


const Users = mongoose.model('Users', {
    name : {
        type : String,
        required : true,
        trim : true,
    },
    age : {
         type : Number,
         required : true,
         default : 0,
         validate(value) {
             if(value < 0) {
                throw new Error('Age must be a positive number')
             }
        }
    },
    email : {
        type : String,
        required : true,
        lowercase : true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password : {
        type : String,
        required : true,
        minlength : 6,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Your password cannot contain "password"')
            }
        }
    },
        
})

module.exports = Users
