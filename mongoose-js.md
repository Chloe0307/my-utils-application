# CONNEXION MONGOOSE ET MONGODB

```

const mongoose = require('mongoose')


mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    // useCreateIndex est une option qui nous garantira que lorsque mongoose travaillera avec Mongo, nos index seront crées poru rapidement accéder aux données dont nous avons besoin
    useCreateIndex: true
})

```

## CONSTRUIRE UN MODELE AVEC MONGOOSE

```
<!--  on construit notre modèle  -->
const User = mongoose.model('User', {
    name : {
        type: String
    },
    age: {
        type: Number
    }
})

//  on crée l'instance pour créer un utilisateur
const me = new User({
    name: "Chloé",
    age: 31
})

// méthode .save() pour sauvegarder nos données dans notre bdd
//  ici ci dans notre then on met (me) on peut aussi ne rien mettre le resultat sera le même, mais pour plus de compréhension je préfère le mettre pour un futur dev qui reprendrai le code derrière moi

me.save().then((me) => {
    console.log(me)
}).catch((error) => {
    console.log('Error!', error)
})

```

### Les validators de mongoose.js

```
const Users = mongoose.model('Users', {
    name : {
        type : String,
        required : true,
    },
    age : {
         type : Number,
         required : true,
         validate(value) {
             if(value < 0) {
                throw new Error('Age must be a positive number')
             }
         }
    }
})

ATTENTION CAR DANS NOTRE FICHIER MONGOOSE.JS ON UTILISE AUSSI LE NPM VALIDATOR COMME POUR EMAIL ET D'AUTRES DE MONGOOSE!!!
```

#### REST API MONGOOSE

```

    1 - DEFINITION

        Representational State Transfer - Application Programming Interface => REST API or RESTful API
        => REST = transfert d état représentatif et API = interface de programmation d'application
        API = est un ensemble d'outils permettant de créer des applications logicielles et les npm nous fournissent des vues d'API comme express.js /ex.
        REST = Définir un transfert d'état representationnel. REST s'utilise avec le modèle CRUD pour manipuler les données. Créer des requêtes, récupérer les données et tout ce dont le serveur à besoin pour traiter les demandes des utilisateurs.
        Cela permet au client = l'application web d'accéder à des ressources et de les manipuler à l'aide d'un ensemble d'opérations prédéfinies.

    2 - METHODES HTTP

        get :  L'application fait une demande de transfert données précises à notre serveur qui va aller chercher dans notre bdd les informations                 requises. EX = GET/tasks/a7eaa => on reçoit alors une réponse JSON statut 200 (réussite).

        post : post nous permet de créer de nouveaux éléments tels qu'une nouvelle tâche dans notre cas. EX = POST/tasks (JSON request). LA requête est           envoyé à notre serveur qui en fait la demande à notre bdd. Entre temps la vérification d'authentification est faite pour s'assurer que la          demande provient bien de l'utilisateur. L'élèment est ensuite créer en bdd. Une fois notre objet créer, nous recevons notre status de              réponse 201 (réussite format JSON).

    3 - REQUETE HTTP - explications

        La requête HTTP est uniquement du texte.

        --------- REQUEST---------
        POST/tasks HTTP/1.1 => ceci contient la méthode http utilisée, le chemin et le protocole http.
        Accept : application/json => entêtes de connexion paire : clé/valeur qui permet d'attacher des méta-informations à la requête
         => signifie que nous attendons les données JSON
        Connection : Keep-alive => entête de connexion paire : clé/valeur qui permet d'attacher des méta-informations à la requête
         => signifie que nous allons faire probablement d'autres demandes rapidement et que l'on garde la connexion ouverte.
        Authorization: Bearer vmjkeqhviuenvlaekjbvejarhbmaerbmje.vjerviebvie => entête de connexion paire : clé/valeur qui permet d'attacher des                                                                                   méta-informations à la requête
         => signifie que nous définissons l'autorisation de configurer l'authentification.
        ON LAISSE TOUJOURS UNE LIGNE VIDE ICI SUIVIE DU CORPS DE LA DEMANDE
        {"description" : "Order new drill bits"} =>  corps de la demande


        --------- RESPONSE--------
        HTTP/1.1 201 created => Protocole et status de réponse de réussite envoyé sous format JSON.
        Date : Sun, 28 Jul 2019 15:37:37 GMT => entête paire clé/valeur => date/heure de la création
        Server : Express => entête paire clé/valeur => serveur
        Content-Type : application/json => entête paire clé/valeur => méta-données

        {"_id" : "mcjazrlviberkher", "description" : "Order new drill bits", "completed" : false} => tâche créer avec toutes ses valeurs.








    4 - ENDPOINTS & CRUD

        CREATE : POST/tasks -- nous permet de créer une nouvelle tâche.
        READ   : GET/tasks -- pour récupérer toutes nos tâches (multiple).
        READ (one) : GET/tasks/:id -- pour récupérer une seule tâche via son ID pour être plus safe.
        UPDATE : PATCH/tasks/:id -- cela nous permet de corriger une tâche toujours via l'ID pour plus de sécurité.
        DELETE : DELETE/tasks/:id  -- nous permet de supprimer les données d'une tâche par son ID unique.
