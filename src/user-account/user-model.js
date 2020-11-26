const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

// création d'un schéma pour notre middleware (doc mongoose)
const userSchema = new mongoose.Schema({
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

userSchema.pre('save', async function (next) {
    const user = this

    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    // next nous permet de dire que notre code est fini et qu'il peut passer à la suite et sauvegarder notre utilisateur. pas de next = tourne dans le vide
    // et ne s'arrête pas
    next()
})
// ici on ajoute notre schema en deuxième argument (doc mongoose)
const User = mongoose.model('User', userSchema)

module.exports = User
