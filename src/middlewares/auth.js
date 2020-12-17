//  imports npm 
const jwt = require('jsonwebtoken')

// imports models
const User = require('../models/user-model')


//  ce middleware va être ajouté à toutes les routes qui auront besoin d'une authentification dans nos gestionnaires de route
const auth = async (req,res,next) => {
    
    try {
        // on défini dans postman => une requête => headers => on définit la clé 'authorization' + la valeur 'Bearer+token' pour l essaie.
        // D'ou la récupération avec req.header()
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'thisismynewcourse')

        // ici nous allons pouvoir vérifier si le token est expiré en appelant son id car ils sont enregistrés dans notre bdd pour le suivi de connexion.
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
 
        if(!user) {
            throw new Error()
        }
        req.token = token
        req.user = user
        next()
        // console.log(token)
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate' })
    }
}

module.exports = auth