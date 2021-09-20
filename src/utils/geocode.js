const request = require('request')
const geocode=(address ,callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoieWFpcmxhaGFkIiwiYSI6ImNrdGpzd3dwMTFmMXYydmpvcTI1NDVhazYifQ.lH9-wkK7Nq7XGUHG1WScVw&limit=1'
    console.log(url)
    request({url, json: true },(error, {body})=>{
        if (error){
            callback('Unable to connect to location services!', undefined)
        }else if (body.features.length == 0){
            callback('Unable to find location', undefined)
        }else{
            const center = body.features[0].center
            callback(undefined,{
                location: body.features[0].place_name,
                latitude: center[1],
                longtitude: center[0]
            })
        }

    })
}

module.exports = geocode