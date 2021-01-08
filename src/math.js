//  ceci est un fichier exemple pour apprendre les test unitaires avec JEST
// Il ne fait pas parti de l'application.

// Fonction pour calculer le pourcentage d'un nombre donné
// dans les arguments, lorsque l'on défini une valeur = quelquechose = cela veut dire 
// que le "valeurquelquechose" est une valeur par défaut 
//  ex/ on veut un pourvoire a 30% mais le minimum (valeur par défaut) sera de 25%
const calculateTip = (total, tipPercent = .25) => total + (total * tipPercent)

const  fahrenheitToCelsius  =  ( temp )  =>  {
    return  ( temp  -  32 ) / 1.8
}

const  celsiusToFahrenheit  =  ( temp )  =>  {
    return  ( temp * 1.8 )  +  32
}


const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (a < 0 || b < 0) {
                return reject('Numbers must be non-negative')
            }

            resolve(a + b)
        }, 2000)
    })
}



module.exports = {
    calculateTip,
    fahrenheitToCelsius,
    celsiusToFahrenheit,
    add
}