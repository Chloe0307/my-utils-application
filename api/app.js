//  === NPM
const express = require('express')
const hbs = require('hbs')
const path = require('path')
require('../src/database/mongoose')


// === FILES IMPORTS
// Weather functions
const geocode = require('../src/utils-functions/geocode')
const forecast = require('../src/utils-functions/forecast')

// Router
const userRouter = require('../src/routers/users-router')
const taskRouter = require('../src/routers/tasks-router')

// === Define express and port 
const app = express()

//  DEFINE PATH FOR EXPRESS CONFIG
const publicDirectoryPath = path.join(__dirname, '../public')
// ici nous renommons le fichier views en templates dans une variable pour pouvoir donner les indications a HBS d'aller chercher les template dans ce
// dossier template puisqu'il s'attend par défaut à les trouver dans un dossier VIEWS
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// SETUP HANDLEBARS ENGINE AND VIEWS LOCATION
// ici c'est notre appel a HBS avec une syntaxe et une casse toujours identique sinon n'est pas pris en compte.
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


// APP.USE méthods
app.use(express.static(publicDirectoryPath))
// app.use('/static', express.static(path.join(__dirname + 'public')))
//  la méthode .json() va nous permettre de transmettre les données json directement à un objet pour créer nos users
app.use(express.json())
// va nous permettre d'appeler le fichier qui contient nos routes pour nos utilisateurs ainsi que nos tâches.
app.use(userRouter)
app.use(taskRouter)

module.exports = app