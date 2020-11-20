require('../src/database/mongoose')

const User = require('../src/login/user-model')

User.findByIdAndUpdate('5fb5320c60463d0e8df0a98c', { age : 31 }).then((user) => {
    console.log(user)
    return User.countDocuments({ age : 31 })
}).then((result) => {
    console.log(result)
})