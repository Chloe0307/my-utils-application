require('../src/database/mongoose')
const User = require('../src/models/user-model')

// ici on pourrait mettre { age : age } mais comme la valeur a le même nom que la variable on raccourci en { age }
//  Dans cette fonction on veut update l'age de l'utilisateur et mettre à jours le nb de documents qui ont cette age là en asynchrone pour 
// que nous recevions l'update de l'user et des documents une fois que tout est fait et non pas l'un après l'autre. D'ou l'utilisation de AWAIT
const updateAgeAndCount = async (id,age) => {
    const user = await User.findByIdAndUpdate(id, { age })
    const count = await User.countDocuments({ age })
    return count
}

// on met obligatoirement notre ID en argument
updateAgeAndCount('5fb531d2fb62620dc2fb222f', 2).then((count) => {
    console.log(count)
}).catch((error) => {
    console.log('error', error)
})