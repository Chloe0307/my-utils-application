const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    // useCreateIndex est une option qui nous garantira que lorsque mongoose travaillera avec Mongo, nos index seront crées poru rapidement accéder aux données dont nous avons besoin
    useCreateIndex: true
})

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

const user = new Users({
    name : "    Cecile    ",
    age: 72,
    email : "CECILE-CUNY@ORANGE.FR",
    password : "alaincuny"
})

user.save().then((user) => {
    console.log(user)
}).catch((error) => {
    console.log(error)
})



const Tasks = mongoose.model('Task', {
    description : {
        type : String,
        required : true,
        trim : true,
    },
    completed : {
        type: Boolean,
        default : false,
    }
})

const task = new Tasks({
    description : '    Manger des frites   '
     
})

task.save().then((task) => {
    console.log(task)
}).catch((error) => {
    console.log('Error', error)
})