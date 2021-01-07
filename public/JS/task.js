let task = {

    init: function () {
        task.createTask()
    },

    createTask: function () {

        console.log('Hello je suis la')

        inputAddTask = document.querySelector('.add-task-input')
        // console.log(inputAddTask)
        inputAddTask.addEventListener('submit', task.handleTaskSubmit)
    },

    handleTaskSubmit: function (event) {
        event.preventDefault()
        console.log('je suis le handle')

        inputValue = document.querySelector('.add-task-input').value
        console.log(event.currentTarget(inputValue))

        task.saveNewTask(taskDescription, taskCompleted, taskOwner)
    },

    saveNewTask: function () {
      console.log()  
    },
}

document.addEventListener('DOMContentLoaded', task.init)