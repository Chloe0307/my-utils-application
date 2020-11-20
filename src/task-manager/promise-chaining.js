require('../src/database/mongoose')
const Task = require('../src/task-manager/task-model')


const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({ completed : false })

    return count
}

deleteTaskAndCount('5fb3debf609ddd35d80008dc').then((count) => {
    console.log(count)
}).catch((error) => {
    console.log('error', error)
})
