//  imports npm 
const jwt = require('jsonwebtoken')

// imports models
const usr = require('../models/user-model')


//  ce middleware va être ajouté à toutes les routes qui auront besoin d'une authentification dans nos gestionnaires de route
const auth = async (req,res,next) => {
    
    try {
        const token = req.header('Authorization')
        console.log(token)
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate' })
    }
    

    return next()
}

module.exports = auth