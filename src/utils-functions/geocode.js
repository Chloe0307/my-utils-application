
const request = require('request')


// fonction réutilisable pour la localisation ('location' en anglais), avec datas dynamique pour être appelé autant de fois que l'on veut 
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiY2hsb2UwMSIsImEiOiJja2ZxdnQzeG0wajdsMnhycDZqajF6c2x4In0.vUnwvWdTwpfJnM-NiJkLrg&limit=1'
    
    request({ url, json: true}, (error, { body }) => {
        if (error) {
            // ici c'est une callback avec 2 arguments. Mais nous gérons l'erreur ici donc le 2ieme argument (data) doit êter undefined = plus explicite!
            callback('Unable to connect to location services', undefined)
        } else if (body.features.length === 0) {
            // ici c'est une callback avec 2 arguments. Mais nous gérons l'erreur ici donc le 2ieme argument (data) doit êter undefined = plus explicite!
            callback('Unable to find location. Try an other search', undefined)
        } else {
            //  cette fois nous commençons par undefined car nous ne voulons pas le cas d'une erreur, pour plus de cohérence et de clareté on met undefined
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode