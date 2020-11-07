//  === NPM
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

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

// SETUP STATIC DIRECTORY TO SERVE
app.use(express.static(publicDirectoryPath))

//  ======== NAV LIST ROADS ==========
// HOME ROAD
app.get('', (req, res) => {
    res.render('index',{
        title : 'Bienvenue sur la boîte à outils',
        name: "Chloé Cuny"
    })
})

// ABOUT ROAD
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Qui suis-je?',
        name: 'Chloé Cuny',
        profession: 'Développeuse Web Fulstack JavaScript',
    })
})

// HELP ROAD
app.get('/help', (req, res) => {
    res.render('help', {
        title:'Ecrivez-moi pour obtenir de l\'aide',
        thanks: 'Merci pour votre message',
        name: 'Chloé Cuny'
    })
})



//  ======= TOOLS LIST ROADS =============
// UPDATE WEATHER ROAD
app.get('/weather', (req, res) => {
    res.render('weather', {
        title: 'Connaître la météo',
        message: 'Vous devez fournir une adresse valide',
        name: 'Chloé Cuny'
    }) 
})

// GET WEATHER ROAD
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

app.get('/calendar', (req,res) => {
    res.render('calendar', {
        title: 'Mon calendrier',
        message: 'i\'m the calendar baby! But I don\'t exist yet',
    })
})


//  ==== ERROR LIST ROADS ==========
// NO SEARCH TERM ROAD
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

// HELP AND MORE ARGUMENTS ROAD
app.get('/help/*', (req, res) => {
    res.render('404-page', {
        title: '404',
        errorMessage: 'Article non trouvé'
    })
})

// ERROR 404 ROAD
app.get('*', (req, res) => {
    res.render('404-page', {
        title:'404',
        errorMessage : 'Page non trouvée',

    })
})

// SERVER ROAD
app.listen(port, () => {
    console.log('serveur is up on port' + port)
})
