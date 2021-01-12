const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Task = require('./task-model')


// création d'un schéma pour notre middleware (doc mongoose)
const userSchema = new mongoose.Schema({
    lastname : {
        type : String,
        required : true,
        trim : true,
    },
    firstname : {
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
    // stockage de nos tokens pour pouvoir les suivres et faciliter la connexion et déconnexion des utilisateurs notamment si ils sont connéctés su r
    // plusieurs appareils en même temps.
    tokens : [{
        token : {
            type: String,
            required : true
        }
    }],
    avatar : {
        type: Buffer,
    }
}, {
    timestamps : true,
})

userSchema.virtual('tasks', {
    ref : 'Tasks',
    localField : '_id',
    foreignField : 'owner'
})

userSchema.methods.toJSON = function () {
    // avec cette ligne de code on crée un utilisateur et on en retire sa valeur
    const user = this
    // accès à notre object de données d'un utilisateur
    const userDatas = user.toObject()
    // mnt on efface le password et le tokens des données renvoyées à l'utilisateur car il n'en fera rien et cela maximise la sécurité
    delete userDatas.password
    delete userDatas.tokens
    delete userDatas.avatar

    return userDatas
}

userSchema.methods.generateAuthToken = async function () {

    const user = this
    const token = jwt.sign({ _id : user._id.toString() }, 'thisismynewcourse')

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}



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

// Delete user tasks when user is removed
userSchema.pre('remove', async function (next) {
    const user = this
    await Task.deleteMany({ owner: user._id })
    next()
})

// ici on ajoute notre schema en deuxième argument (doc mongoose)
const User = mongoose.model('User', userSchema)

module.exports = User
