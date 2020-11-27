// imports NPM 
const express = require('express')
// imports Models
const User = require('../models/user-model')
// Imports Middlewares
const auth = require('../middlewares/auth')

// Build router
const router = new express.Router()



// ------------------- ROUTER USERS -------------------

//  CREATE USER 

// ici on ajoute le paramètre "async" et nous n'avons pas besoin de définir de return car EXPRESS n'utlise pas RETURN.
router.post('/add-users', async (req,res) => {
    const user = new User(req.body)
 
     // ici nous enregistrons notre user et code qui va suivre ne fonctionnera que si cette ligne a fonctionné.
     // cependant le resultat ne sera retourné qu'à la fin de l'instruction.
     try {
         const token = await user.generateAuthToken()
         await user.save()
         res.status(201).send({ user, token })
     } catch (error) {
         res.status(400).send(error)
     }
 })
 
//  LOGIN WITH EXISTING ACCOUNT
 router.post('/users/login', async (req,res) => {

    const email = req.body.email
    const password = req.body.password

    try {
        const user = await User.findByCredentials(email, password)
        // l'instance que l'on crée ci-dessous n'est pas basé sur User mais sur user (fonction juste au-dessus), on fait vivre notre fonction sur celle du dessus
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch(error) {
        res.status(400).send()
    }
    
 })
 // READ ALL USERS
//  exemple middleware: dans cette fonction, le gestionnaire racine ne sera éxécuté que si le middleware appelle cette fonction. Donc le Middle passe avant la fonction
 router.get('/list-users', auth, async (req,res) => {
     // la méthode GET nous permet de récupérer tous les utlisateurs et par conséquent on laisse l'{} de find vide pour tous les avoir.
     
     try {
         const user = await User.find({})
         res.status(200).send(user)
     } catch (error) {
         res.status(400).send(error)
     }
 })
 
 // READ SINGULAR USER BY ID
 router.get('/user/:id', async (req,res) => {
   
     const _id = req.params.id
 
     try {
         const userId = await User.findById(_id)
 
         if(!userId) {
             return res.status(404).send()
         }
         res.status(200).send(userId)
     } catch (error) {
         res.status(400).send(error)
     }
 })
 
 // UPDATE USER
 router.patch('/update-user/:id', async (req,res) => {
     const _id = req.params.id
 
     // definition of parameters that the user can update
     const updates = Object.keys(req.body)
     const allowedUpdate = ['name', 'email', 'password', 'age']
     const isValidOperation = updates.every((update) => allowedUpdate.includes(update))
 
     if (!isValidOperation) {
         return res.status(404).send({ error : 'Invalid updates! '})
     }
     // 
 
     try {

        // code nécessaire pour que le middleware marche et intercepte correctement l utilisateur avant l'envoi de données en bdd
        const user = await User.findById(_id)
        updates.forEach((update) => user[update] = req.body[update])
        
        await user.save()
        //    
        
         if(!user) {
             return res.status(404).send()
         }
         res.status(200).send(user)
     } catch (error) {
         res.status(500).send()
     }
 })
 // DELETE USER
 router.delete('/delete-user/:id', async (req,res) => {
     const _id = req.params.id
 
     try {
         const deleteUser = await User.findByIdAndDelete(_id)
         if(!deleteUser) {
             res.status(404).send()
         }
         res.status(200).send(deleteUser)
     } catch (error) {
         res.status(500).send()
     }
 })
 
module.exports = router