
const mongoose = require('mongoose')


mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    // useCreateIndex est une option qui nous garantira que lorsque mongoose travaillera avec Mongo, nos index seront crées pour rapidement accéder aux données dont nous avons besoin
    useCreateIndex: true,
    useFindAndModify: false
})

// console.log(mongoose)
