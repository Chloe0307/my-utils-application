# HASHAGE ET SÉCURITÉ

``` 

Notamment pour les mots de passes, il est primordial de hasher le mdp en base de données pour qu'aucun piratage permette
de récupérer les infos de nos utilisateurs.

ici on a utilisé la librairie npm bcryptjs pour hasher nos mdp.

à utiliser très facilement

ICI ON RECUPERE ET HASH LE MOT DE PASSE :

const bcrypt = require('bcryptjs')

const myFunction = async () => {

    const password = 'salut!'

    // ici  on crée une promesse pour hasher le password et en arguments on donne la variable qui récupère le MDP ainsi que le nb de tour qui va 
    // déterminer combien de fois l'algorithme de hachage est éxécuté = 8 bon équilibre entre sécurité et vitesse et c'est la valeur recommandé
    // par le créateur du npm
    const hashedPassword = await bcrypt.hash(password, 8)

    console.log(hashedPassword)
}

myFunction()

ATTENTION à ne pas confondre cryptage et hashage. Un mdp crypté retournera une chaîne de caractères aléatoires mais on peut toujours retrouver le 
mdp d'origine et donc fait la manipulation inverse =>
monmotdepasse = ckjbvbrivrrtnjrntjbnrjenb
ckjbvbrivrrtnjrntjbnrjenb = monmotdepasse

Tandis qu'avec les algorithmes de hashage sont à sens unique et on ne peux retrouver le mdp d'origine de notre utilisateur. Ce qui signifie que l'on 
ne peut pas inverser le processus.


ICI ON COMPARE LE MOT DE PASSE D'ORIGINE AVEC CELUI EST HASHÉ

 const isMatch = await bcrypt.compare('salut!', hashedPassword)
    console.log(isMatch)

la console nous retourne un boléen (true/false)

```

## LES MIDDLEWARES AVEC MONGOOSE

```

On crée des schémas pour utiliser nos middlewares
(cf doc mongoose)

Les middlewares vont nous aider à intercepter des actions et ajouter des systèmes de sécurités avant que les données soient envoyées à notre bdd
Typiquement pour le hashage du mot de passe.
Dans les fichiers qui vont contenir les mot de passe en claire, on va créer des middleware pour pouvoir les intercepter avant qu'ils ne partent en bdd et ainsi les hashé pour la sécurité de nos utilisateurs. Car une personne mal intentionné aura accès à la bdd poru récupérer les infos dont il a besoin pour usurper les identités de nos utilisateurs.

<!-- création du middleware avec .Schema DANS LE MODEL-->

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true,
    },
    age : {
         type : Number,
         required : true,
         default : 0,
         validate(value) {
             if(value < 0) {
                throw new Error('Age must be a positive number')
             }
        }
    },

<!-- Pour le hashage, on veut intercépter le mdp avant qu'il ne parte en bdd, le hasher et l'envoyer en bdd ainsi. -->

userSchema.pre('save', async function (next) {
    const user = this
        // next nous permet de dire que notre code est fini et qu'il peut passer à la suite et sauvegarder notre utilisateur. pas de next = tourne dans le vide
        // et ne s'arrête pas
    next()
})


// ici on ajoute notre schema en deuxième argument (doc mongoose)
const User = mongoose.model('User', userSchema)

module.exports = User


<!-- ON MODIFIE EGALEMENT NOTRE ROUTE UPDATE - DANS LE ROUTER -->

 const _id = req.params.id

    const updates = Object.keys(req.body)
    const allowedUpdate = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdate.includes(update))

    if (!isValidOperation) {
        return res.status(404).send({ error : 'Invalid updates! '})
    }

    try {

        const task = await Task.findById(_id)

        updates.forEach((update) => task[update] = req.body[update])

        await task.save()

ici on a crée un tableau de chaines de caractères pour nos clés (description et completed)
On retrouve notre tâche via finById et on boucle sur le tableau updates et on sauve en bdd les modifications.
```

