const request = require('request')


const forecast = (latitude, longitude, callback) => {

   
    const url = 'http://api.weatherstack.com/current?access_key=da731f3b4e97742d2660fa33cc1c370a&query=' + latitude + ',' + longitude + '&units=m'
//  ici on a utilisé la syntaxe abrégée ES6 : url : url => url, pas de changement dans json:true car la propriété et la valeur n'ont pas le même nom. 
//  et on a changé response en { body } car on sait que dans body est dans l'objet response, on fait directement appel a body. le résultat est le même
    request({ url, json: true}, (error, { body }) => {

        if(error) {
            callback('Unable to connect to the weather services', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, 
                'Aujourd\'hui le temps est ' + body.current.weather_descriptions[0] + '.' +
                'Il fait actuellement ' + body.current.temperature + ' degrés.' + 
                'Le risque de précipitations est de ' + body.current.precip + '%'
                
                // weather_descriptions: body.current.weather_descriptions,
                // temperature: body.current.temperature,
                // precip: body.current.precip,
                // units: body.request.unit
            )
        }
    })
}

module.exports = forecast