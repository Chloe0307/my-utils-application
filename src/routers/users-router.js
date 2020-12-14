// imports NPM 
const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
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

    res.render('login', {
        
    })
 })

//  LOGOUT
router.post('/users/logout', auth, async (req,res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
        
    } catch (error) {
        res.status(500).send()
    }
})

// LOGOUT ALL ACCOUNT
router.post('/users/logoutAll', auth, async (req,res) => {
    try {
        // tous nos tokens sont contenus dans un tableau et pour avoir accès à l'ensemble du tableau on défini = []
        req.user.tokens = []
        req.user.save()
        res.status(200).send()
    } catch (error) {
        res.status(500).send()
    } 
})
 // READ PROFIL
//  exemple middleware: dans cette fonction, le gestionnaire racine ne sera éxécuté que si le middleware appelle cette fonction. Donc le Middle passe avant la fonction
router.get('/users/my-profile', auth, async (req,res) => {
     res.send(req.user)
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
 router.patch('/users/my-profile', auth, async (req,res) => {

     // definition of parameters that the user can update
     const updates = Object.keys(req.body)
     const allowedUpdate = ['name', 'email', 'password', 'age']
     const isValidOperation = updates.every((update) => allowedUpdate.includes(update))
 
     if (!isValidOperation) {
         return res.status(404).send({ error : 'Invalid updates! '})
     }
     // 
 
     try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
        
     } catch (error) {
         res.status(500).send()
     }
 })
 // DELETE USER
 router.delete('/users/my-profile', auth, async (req,res) => {

     try {
        await req.user.remove()
        res.send(req.user)

     } catch (error) {
         res.status(500).send()
     }
 })

 // UPLOAD AVATAR

 // creating Avatars folder for uploadings
 const uploadAvatar = multer({
    limits : {
        fileSize : 2000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpeg|jpg|gif|png)$/)) {
            return cb(new Error('Please, upload an avatar in jpeg, jpg, gif, png'))
        }

        cb(undefined, true)
    }
})


// ici notre serveur est configuré pour accepter et sauvegarder les fichiers téléchargés.
router.post('/users/my-profile/avatar', auth, uploadAvatar.single('avatar'), async (req, res) => {
    // on récupère l'avatar sous forme tampon, que l'on redimensionne (taille standart) et que l'on converti au format png
    const bufferAvatar = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
    req.user.avatar = bufferAvatar

    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
    console.log(error)
})

//  GET AVATAR
router.get('/users/:id/avatar', auth, async (req,res) => {

    try {
        const user = await User.findById(req.params.id)
        if (!user || !user.avatar) {
            throw new Error()
        }

        res.set('Content-type', 'image/png')
        res.send(user.avatar)
    } catch(error) {
        res.status(400).send()
    }
})

//  DELETE AVATAR
router.delete('/users/my-profile/avatar', auth, async (req,res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})

module.exports = router