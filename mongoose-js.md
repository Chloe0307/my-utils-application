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

### LES PARAMETRES DE NOS CHAMPS

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
```
