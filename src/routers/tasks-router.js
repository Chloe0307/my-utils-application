const express = require('express')
const Task = require('../task-manager/task-model')
const router = new express.Router()

// CREATE TASK
router.post('/add-tasks',async (req,res) => {
    const task = new Task(req.body)

   try {
        await task.save()
        res.status(201).send(task)
   } catch (error) {
       res.status(400).send(error)
   }
})

//  READ ALL TASKS
router.get('/list-tasks', async (req,res) => {

    try {
        const task = await Task.find({})
        res.send(task)
    } catch(error){
        res.status(500).send()
    }
})

// READ SINGULAR TASK BY ID
router.get('/task/:id', async (req,res) => {
    const _id = req.params.id

    try  {
      const task = await Task.findById(_id)
      if (!task) {
          return res.status(404).send()
      }
      res.send(task)
    } catch (error) {
        res.status(500).send()
    }
})

// UPDATE TASK
router.patch('/update-task/:id', async (req,res) => {
    const _id = req.params.id
    
    const updates = Object.keys(req.body)
    const allowedUpdate = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdate.includes(update))

    if (!isValidOperation) {
        return res.status(404).send({ error : 'Invalid updates! '})
    }

    try {
       
        const task = await Task.findById(_id)

        updates.forEach((update) => task[update] = req.body[update])

        await task.save()
        
        if(!task) {
            res.status(404).send()
        }

        res.status(200).send(task)
    } catch (error) {
        res.status(500).send()
    }
})

// DELETE TASK
router.delete('/delete-task/:id', async (req,res) => {
    const _id = req.params.id

    try {
        const deleteTask = await Task.findByIdAndDelete(_id)

        if (!deleteTask) {
            res.status(404).send()
        }

        res.send(deleteTask)
    } catch (error) {
        res.status(500).send()
    }
})


module.exports = router