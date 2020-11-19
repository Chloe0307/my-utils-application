//  === NPM
const path = require('path')
const express = require('express')
const hbs = require('hbs')

// === FILES IMPORTS
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
require('./database/mongoose')
const User = require('./models/users')
const Task = require('./models/tasks')

// === UTILS FOR EXPRESS AND LISTEN
const app = express()
const port = process.env.PORT || 3000

//  DEFINE PATH FOR EXPRESS CONFIG
const publicDirectoryPath = path.join(__dirname, '../public')
// ici nous renommons le fichier views en templates dans une variable pour pouvoir donner les indications a HBS d'aller chercher les template dans ce
// dossier template puisqu'il s'attend par défaut à les trouver dans un dossier VIEWS
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
// SETUP HANDLEBARS ENGINE AND VIEWS LOCATION
// ici c'est notre appel a HBS avec un esyntaxe et une casse toujours identique sinon n'est pas pris en compte.
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


// ------------------------- ROUTER APP GET---------------
// APP.USE méthods
app.use(express.static(publicDirectoryPath))
//  la méthode .json() va nous permettre de transmettre les données json directement à un objet pour créer nos users
app.use(express.json())



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

// ERROR 404
app.get('*', (req, res) => {
    res.render('404-page', {
        title:'404',
        errorMessage : 'Page non trouvée',

    })
})


// ------------------- ROUTER USERS -------------------

//  CREATE USER 
app.post('/users', (req,res) => {
   const user = new User(req.body)

   user.save().then(() => {
    res.status(201).send(user)
   }).catch((error) => {
    //    on envoie toujours les codes erreurs avant l'objet error sinon le code status ne s'affichera pas dans postman.
    //    res.status(400)
    //    res.send(error)
    //   on peut chainer les 2 ensemble :
    res.status(400).send(error)
   })
})

// READ ALL USERS
app.get('/users', (req,res) => {
    // la méthode GET nous permet de récupérer tous les utlisateurs et par conséquent on laisse l'{} de find vide pour tous les avoir.
    User.find({}).then((users) => {
        res.send(users)
    }).catch((error) => {
        res.status(500).send()
    })
})

// READ SINGULAR USER BY ID
app.get('/users/:id', (req,res) => {
    // console.log(req.params)
    const _id = req.params.id

    User.findById(_id).then((user) => {
        if(!user) {
            return res.status(404).send()
        }
        res.send(user)
    }).catch((error) => {
        res.status(500).send()
    })
})



//  ------------------- ROUTER TASKS -----------------------

// CREATE TASK
app.post('/tasks', (req,res) => {
    const task = new Task(req.body)

    task.save().then(() => {
        res.status(201).send(task)
    }).catch((error) => {
        res.status(400).send(error)
    })
  
})

//  READ ALL TASKS
app.get('/tasks', (req,res) => {

    Task.find({}).then((task) => {
       res.send(task)
    }).catch((error) => {
        res.status(500).send()
    })
})

// READ SINGULAR TASK BY ID
app.get('/tasks/:id', (req,res) => {
    const _id = req.params.id

    Task.findById(_id).then(() => {
        if(!task) {
            return res.status(404).send()
        }
        res.send(task)
    }).catch((error) => {
        res.status(500).send()
    })
})
// SERVER CALL
app.listen(port, () => {
    console.log('serveur is up on port' + port)
})
