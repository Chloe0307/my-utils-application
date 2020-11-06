//  === NPM
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require ('./utils/forecast')

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

app.get('', (req, res) => {
    res.render('index',{
        title : 'Welcome in your utility application',
        name: "Chloé Cuny"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'chloé Cuny'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title:'Write me to helping you',
        thanks: 'Thanks for your message',
        name: 'Chloé Cuny'
    })
})

app.get('/weather', (req, res) => {
    res.render('weather', {
        title: 'Weather',
        message: 'Please, provide an address',
        name: 'Chloé Cuny'
    }) 
})

app.get('/weather-address', (req,res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
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


app.get('/products', (req,res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term',
        })
    }
        res.render({
            products: [],
        })  
})

app.get('/help/*', (req, res) => {
    res.render('404-page', {
        title: '404',
        errorMessage: 'This article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404-page', {
        title:'404',
        errorMessage : 'This page not found',

    })
})

app.listen(port, () => {
    console.log('serveur is up on port' + port)
})
