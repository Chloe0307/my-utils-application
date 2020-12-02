//  === NPM
const express = require('express')
const hbs = require('hbs')
const path = require('path')
require('./database/mongoose')

// === FILES IMPORTS
// Weather functions
const geocode = require('./utils-functions/geocode')
const forecast = require('./utils-functions/forecast')

// Router
const userRouter = require('./routers/users-router')
const taskRouter = require('./routers/tasks-router')

// === Define express and port 
const app = express()
const port = process.env.PORT || 3000


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
//  la méthode .json() va nous permettre de transmettre les données json directement à un objet pour créer nos users
app.use(express.json())
// va nous permettre d'appeler le fichier qui contient nos routes pour nos utilisateurs ainsi que nos tâches.
app.use(userRouter)
app.use(taskRouter)



//  ======== NAV LIST ==========
// HOME 
app.get('', (req, res) => {
    res.render('index',{
        title : 'Bienvenue sur la boîte à outils',
        name: "Chloé Cuny",
        image: '../IMG/organisation-img.jpg'
    })
})

// ABOUT
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Qui suis-je?',
        name: 'Chloé Cuny',
        profession: 'Développeuse Web Fulstack JavaScript',
    })
})

// HELP
app.get('/help', (req, res) => {
    res.render('help', {
        title:'Ecrivez-moi pour obtenir de l\'aide',
        thanks: 'Merci pour votre message',
        name: 'Chloé Cuny',
    })
})

// LEGAL MENTIONS
app.get('/legal-mentions', (req,res) => {
    res.render('legal-mentions', {
        title: 'Mentions légales'
    })
})



//  ======= TOOLS LIST =============
// UPDATE WEATHER
app.get('/weather', (req, res) => {
    res.render('weather', {
        title: 'Connaître la météo',
        message: 'Vous devez fournir une adresse valide',
        name: 'Chloé Cuny',
        image: '../IMG/icon-weather.webp'
    }) 
})

// GET WEATHER
app.get('/weather-address', (req,res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Vous devez fournir une adresse'
        })
    } else {
        geocode (req.query.address, (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({ error })
            }
            forecast (latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({ error })
                } else {
                    res.send({
                        forecast: forecastData,
                        location,
                        address: req.query.address
                     })
                }
            })
        })
    }
})

// CALENDAR 
app.get('/calendar', (req,res) => {
    res.render('calendar', {
        title: 'Mon calendrier',
        message: 'i\'m the calendar baby! But I don\'t exist yet',
        image: '../IMG/icon-calendar.jpg'
    })
})

// NOTEPAD 
app.get('/notepad', (req,res) => {
    res.render('notepad', {
        title: 'Mes petites notes',
        message: 'I\'m the notepad baby! But I don\'t exist yet',
        image: '../IMG/icon-notepad.jpg'
    })
})


//  -TODOLIST 
app.get('/todolist', (req,res) => {
    res.render('todolist', {
        title: 'Ma Todolist',
        message: 'Créez vos listes de tâches à effectuer',
        image: '../IMG/icon-todolist.jpg',
    })
})
//  ==== ERROR LIST ==========
// NO SEARCH TERM
app.get('/products', (req,res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Vous devez fournir un terme de recherche',
        })
    }
        res.render({
            products: [],
        })  
})

// HELP AND MORE ARGUMENTS
app.get('/help/*', (req, res) => {
    res.render('404-page', {
        title: '404',
        errorMessage: 'Article non trouvé'
    })
})

//  --------- 404 ------------------
// ERROR 404
app.get('*', (req, res) => {
    res.render('404-page', {
        title:'404',
        errorMessage : 'Page non trouvée',

    })
})

// SERVER CALL
app.listen(port, () => {
    console.log('serveur is up on port' + port)
})

const Task = require('./models/task-model')
const User = require('./models/user-model')

const main = async () => {
//     const task = await Task.findById('5fc4f661808047698fb93403')
//     await task.populate('owner').execPopulate()
//     console.log(task.owner)

    const user = await User.findById('5fc4f661808047698fb93403')
    await user.populate('tasks').execPopulate()
    console.log(user.tasks)
}

main()