const express = require('express')
const Task = require('../models/task-model')
const auth = require('../middlewares/auth')
const router = new express.Router()

// CREATE TASK
router.post('/add-tasks',auth, async (req,res) => {
   
    const task = new Task({
        // on déverse toutes les datas d'un user avec le spread opérator
        ...req.body,
        owner : req.user._id
    })

   try {
        await task.save()
        res.status(201).send(task)
   } catch (error) {
       res.status(400).send(error)
   }
})

//  READ ALL TASKS
router.get('/list-tasks', auth, async (req,res) => {
    
    try {
        // const task = await Task.find({ owner : req.user._id}) => cette ligne sera égale à celle ci-dessous, avec populate.
        await req.user.populate('tasks').execPopulate()
        res.send(req.user.tasks)
    } catch(error){
        res.status(500).send()
    }
})

// READ SINGULAR TASK BY ID
router.get('/task/:id', auth, async (req,res) => {
    const _id = req.params.id

    try  {
      const task = await Task.findOne({ _id, owner: req.user._id})
      if (!task) {
          return res.status(404).send()
      }
      res.send(task)
    } catch (error) {
        res.status(500).send()
    }
})

// UPDATE TASK
router.patch('/update-task/:id', auth, async (req,res) => {
    
    const updates = Object.keys(req.body)
    const allowedUpdate = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdate.includes(update))

    if (!isValidOperation) {
        return res.status(404).send({ error : 'Invalid updates! '})
    }

    try {
       
        const task = await Task.findOne({ _id : req.params.id, owner : req.user._id })
        
        if(!task) {
            res.status(404).send()
        }

        updates.forEach((update) => task[update] = req.body[update])
        await task.save()

        res.status(200).send(task)

    } catch (error) {
        res.status(500).send()
    }
})

// DELETE TASK
router.delete('/delete-task/:id', auth, async (req,res) => {

    try {
        const deleteTask = await Task.findOneAndDelete({ _id : req.params.id, owner : req.user._id})

        if (!deleteTask) {
            res.status(404).send()
        }

        res.send(deleteTask)
    } catch (error) {
        res.status(500).send()
    }
})


module.exports = router