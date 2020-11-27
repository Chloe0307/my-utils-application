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
        // la clé "unique" à true, nous permet de dire que cette adresse email ne peut être relié qu'à un seul et unique compte utilisateur.
        unique : true,
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

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if(!user) {
        throw new Error('Unable to login')
    }
    // Il est préférable de mettre le même message d erreur pour l emai et le password pour ne pas donner trop d informations a une personne mal intentionné 
    // qui essaierai de pirater le compte d'un utilisateur. 
    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

// Hash the plain text password before saving
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
