// CRUD = create read update delete

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// // pour nous permettre de générer nous-même nos ID et non ceux générés automatiquement par mongo
// const ObjectID = mongodb.ObjectID

// l'import multiple
const { MongoClient, ObjectID } = require('mongodb')
const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

// const id = new ObjectID()
// TIPS : si on faisait console.log(id.id) => nous donnerais la chaine en binaire : <Buffer 5f b2 7b d3 1d 36 75 1f b3 46 09 ef> (12 caractères)
//  TIPS : si on faisait console.log(id.toHexString(),length) => cela nous donnerai une longueur de chaine 2X plus longue de 24 caractères.
// console.log(id)
// getTimestamp() permet de récuperer l horodatage exact au moment ou on le demande)
// console.log(id.getTimestamp())

MongoClient.connect(connectionURL, { useUnifiedTopology : true }, (error, client) => {

    if(error) {
        return console.log('Unable to connect to database!')
    }
    // console.log('Connected correctly!')
    // appelle a notre bdd
    const db = client.db(databaseName)

    db.collection('users').findOne({ name : 'Chloé'}, (error, user) => {
        if(error) {
            return console.log('Unable to fetch')
        }
        console.log(user)
    })
})