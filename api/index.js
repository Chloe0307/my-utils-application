const app = require('./app')

const port = process.env.PORT || 3000

//  ======== NAV LIST ==========
// HOME 
app.get('', (req, res) => {
    res.render('index',{
        title : 'La boîte à outils',
        name: "Chloé Cuny",
        createdBy: "Crée avec",
    })
})

// ABOUT
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'A propos',
        name: 'Chloé Cuny',
        profession: 'Développeuse Web Fullstack JavaScript',
        createdBy: "Crée avec",
    })
})

// HELP
app.get('/help', (req, res) => {
    res.render('help', {
        title:'Aide & Contact',
        thanks: 'Merci pour votre message',
        name: 'Chloé Cuny',
        createdBy: "Crée avec",
    })
})
// REGISTRATION
app.get('/add-user', (req, res) => {
    res.render('add-user', {
        title : 'Inscription',
        name: 'Chloé Cuny',
        createdBy: "Crée avec",
    })
})

// LOGIN
app.get('/login', (req,res) => {
    res.render('login', {
        title: 'Connexion',
        name: 'Chloé Cuny',
        createdBy: "Crée avec",
    })
})
// LEGAL MENTIONS
app.get('/legal-mentions', (req,res) => {
    res.render('legal-mentions', {
        title: 'Mentions légales',
        name: 'Chloé Cuny',
        createdBy: "Crée avec",
    })
})



//  ======= TOOLS LIST =============
// UPDATE WEATHER
app.get('/weather', (req, res) => {
    res.render('weather', {
        title: 'Connaître la météo',
        message: 'Vous devez fournir une adresse valide',
        name: 'Chloé Cuny',
        createdBy: "Crée avec",
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
        name: 'Chloé Cuny',
        createdBy: "Crée avec",
    })
})

// NOTEPAD 
app.get('/notepad', (req,res) => {
    res.render('notepad', {
        title: 'Mes petites notes',
        message: 'I\'m the notepad baby! But I don\'t exist yet',
        name: 'Chloé Cuny',
        createdBy: "Crée avec",
    })
})


//  -TODOLIST 
app.get('/todolist', (req,res) => {
    res.render('todolist', {
        title: 'Ma Todolist',
        message: 'Créez vos listes de tâches à effectuer',
        name: 'Chloé Cuny',
        createdBy: "Crée avec",
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

//  --------- 404 ------------------
// ERROR 404
app.get('*', (req, res) => {
    res.render('404-page', {
        title:'Page ERREUR',
        errorMessage : 'Erreur 404 : Cette page n\'éxiste pas',
        name: 'Chloé Cuny',
        createdBy: "Crée avec",
    })
})

// HELP AND MORE ARGUMENTS, ERROR 404
app.get('/help/*', (req, res) => {
    res.render('404-page', {
        title:'Page ERREUR',
        errorMessage : 'Erreur 404 : Cette page n\'éxiste pas',
        name: 'Chloé Cuny',
        createdBy: "Crée avec",
    })
})


// SERVER CALL
app.listen(port, () => {
    console.log('serveur is up on port' + port)
})
