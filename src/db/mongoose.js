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
    },
    age : {
         type : Number,
         required : true,
         validate(value) {
             if(value < 0) {
                throw new Error('Age must be a positive number')
             }
        }
    },
    email : {
        type : String,
        required : true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
})

const user = new Users({
    name : "Chloé",
    age: 32,
    email : "chloecuny@yahoo.fr"
})

user.save().then((user) => {
    console.log(user)
}).catch((error) => {
    console.log(error)
})
// const Tasks = mongoose.model('Task', {
//     description : {
//         type : String
//     },
//     completed : {
//         type: Boolean
//     }
// })

// const task = new Tasks({
//     description : "Faire à manger",
//     completed: false
// })

// task.save().then((task) => {
//     console.log(task)
// }).catch((error) => {
//     console.log('Error', error)
// })