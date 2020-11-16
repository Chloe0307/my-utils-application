# insertOne POUR INSERER UN DOCUMENT

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

## insertMany POUR EN INSERER PLUSIEURS EN MEME TEMPS

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

### Afficher une donnée de la BDD

```

    db.collection('users').findOne({ name : 'Chloé', _id : new ObjectID("5fb25e74a0ad3f667c688e15") }, (error, user) => {
        if(error) {
            return console.log('Unable to fetch')
        }
        console.log(user)
    });

Pour ajouter l'ID dans nos paramètres de recherches il faut toujours le faire de la manière présente ci-dessus.

```
