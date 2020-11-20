require('../src/database/mongoose')
const Task = require('../src/task-manager/task-model')

Task.findByIdAndDelete('5fb3debf609ddd35d80008dc').then((task) => {
    console.log(task)
    return Task.countDocuments({ completed : false })
}).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})