```
CRUD MONGODB Create Read Update Delete
```

# DEMARRAGE MONGODB

```
// CRUD = create read update delete

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// // pour nous permettre de générer nous-même nos ID et non ceux générés automatiquement par mongo
// const ObjectID = mongodb.ObjectID

// l'import multiple
const { MongoClient, ObjectID } = require('mongodb')
const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

const id = new ObjectID()
// TIPS : si on faisait console.log(id.id) => nous donnerais la chaine en binaire : <Buffer 5f b2 7b d3 1d 36 75 1f b3 46 09 ef> (12 caractères)
//  TIPS : si on faisait console.log(id.toHexString(),length) => cela nous donnerai une longueur de chaine 2X plus longue de 24 caractères.
// console.log(id)
// getTimestamp() permet de récuperer l horodatage exact au moment ou on le demande)
// console.log(id.getTimestamp())

MongoClient.connect(connectionURL, { useUnifiedTopology : true, useNewUrlParser: true }, (error, client) => {

    if(error) {
        return console.log('Unable to connect to database!')
    }
    // console.log('Connected correctly!')
    // appelle a notre bdd
    const db = client.db(databaseName)

  
})
```

## insertOne POUR INSERER UN DOCUMENT

```
    db.collection('users').insertOne({
        _id : id,
        name : 'Mehdi',
        age : 32
    }, (error, result) => {
        if (error) {
            return console.log('Unable to insert user')
        }

        console.log(result.ops)
    })
```

### insertMany POUR EN INSERER PLUSIEURS EN MEME TEMPS

```
    db.collection('users').insertMany([
        {
            name : 'Chloe',
             age : 31
        },     {
            name : "Louey",
            age : 4
        },
        {
            name : 'Zakarya',
            age : 2
        }
    ], (error, result) => {
            if(error) {
               return console.log('IUnable to insert documents!')
            }
            console.log(result.ops)
    })
```

#### Afficher une donnée de la BDD

```

    db.collection('users').findOne({ name : 'Chloé', _id : new ObjectID("5fb25e74a0ad3f667c688e15") }, (error, user) => {
        if(error) {
            return console.log('Unable to fetch')
        }
        console.log(user)
    });

Pour ajouter l'ID dans nos paramètres de recherches il faut toujours le faire de la manière présente ci-dessus.

```

##### Ajouter des méthodes pour préciser nos recherches

```

toArray nous permet de préciser que l'on veut tous les documents du tableau mais il est a utiliser avec CURSOR
    db.collection('users').find({ age: 32 }).toArray((error, users) => {
            console.log(users)
    })

count, lui, nous permet de recevoir le nombre de comptes qui contiennent notre paramètre de recherche : "age : 32". Ce qui va nous éviter d'envoyer tous les champs concernés par le tableau de l'user, et donc de limiter le stockage de données inutiles et de surcharger le serveur.
    db.collection('users').find({ age: 32 }).count((error, count) => {
        console.log(count)
    })

```

###### UPDATE les données de notre bdd

```
    1 - UPDATEONE pour changer une ou plusieurs données dans un document (un compte user par ex/)

   db.collection('users').updateOne({
        _id : new ObjectID("5fb25e74a0ad3f667c688e15")
    }, {
        $set: {
            name: "Chlo"
        }
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })

On utilise toujours une promise pour mettre à jour nos données.  
    => On récupère l'ID unique du document pour éviter les erreurs.
    => On modifie la donnée à changer avec $set
    => On construit notre promise avec un then pour la réponse et un catch pour les erreurs
    => Si on imprime sur notre console le résulat, la dernière ligne "matchedCount" sera égale à 0 ou 1 avec 1 = document modifié et 0 = non modifié


on peut ajouter plusieurs changement à la suite EX:
    db.collection('users').updateOne({
        _id : new ObjectID("5fb25e74a0ad3f667c688e15")
    }, {
        $set: {
            name: "Chlo"
        },
        $inc: {
            age: 1
        }

ici on ajoute 1 an à l'age et on modifie le nom en meme temps. Mais toujours avec le .then/.catch pour appliquer les modifications.

    2- UPDATE pour modifier une donnée dans plusieurs documents (passer plusieurs taches false a true par ex/)

       db.collection('tasks').update({
        completed: false
    }, {
        $set: {
            completed: true
        }
    }).then((result) => {
        console.log(result)  // ici on peut également faire console.log(result.modifiedCount) pour voir tous les documents qui sont modifiés et récupérer le matchedCount pour savoir si =1 => réussi ou = 0 => pas réussi.
    }).catch((error) => {
        console.log(eror)
    })
```

###### DELETE pour supprimer des données ou des documents de notre bdd

```

 db.collection('users').deleteMany({
        age: 32
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })
Cette commande va effacer tous les comptes des personnes qui ont 32 ans.

 db.collection('tasks').deleteOne({
       description: "Faire les courses"
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })

Cette commande va effacer le document concerné par la description et aucun autre. 
```
