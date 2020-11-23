//  === NPM
const express = require('express')
const hbs = require('hbs')
const path = require('path')
require('./database/mongoose')

// === FILES IMPORTS
const geocode = require('./utils-functions/geocode')
const forecast = require('./utils-functions/forecast')
const User = require('./login/user-model')
const Task = require('./task-manager/task-model')

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
// ici c'est notre appel a HBS avec une syntaxe et une casse toujours identique sinon n'est pas pris en compte.
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


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

// ici on ajoute le paramètre "async" et nous n'avons pas besoin de définir de return car EXPRESS n'utlise pas RETURN.
app.post('/add-users', async (req,res) => {
   const user = new User(req.body)

    // ici nous enregistrons notre user et code qui va suivre ne fonctionnera que si cette ligne a fonctionné.
    // cependant le resultat ne sera retourné qu'à la fin de l'instruction.
    try {
        await user.save()
        res.status(201).send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

// READ ALL USERS
app.get('/list-users', async (req,res) => {
    // la méthode GET nous permet de récupérer tous les utlisateurs et par conséquent on laisse l'{} de find vide pour tous les avoir.
    
    try {
        const users = await User.find({})
        res.status(200).send(users)
    } catch (error) {
        res.status(500).send(error)
    }
})

// READ SINGULAR USER BY ID
app.get('/users/:id', async (req,res) => {
    // console.log(req.params)
    const _id = req.params.id

    try {
        const userId = await User.findById(_id)

        if(!userId) {
            return res.status(404).send()
        }
        res.status(200).send(userId)
    } catch (error) {
        res.status(500).send(error)
    }
})



//  ------------------- ROUTER TASKS -----------------------

// CREATE TASK
app.post('/add-tasks',async (req,res) => {
    const task = new Task(req.body)

   try {
        await task.save()
        res.status(201).send(task)
   } catch (error) {
       res.status(400).send(error)
   }
})

//  READ ALL TASKS
app.get('/list-tasks', (req,res) => {

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
