const request = require('request')
const forecast = (lat, lon, callback) => {
    const url ='http://api.weatherstack.com/current?access_key=77a7ffad1b1aef3a57efb4acd7d6c3f0&query='+encodeURIComponent(lon)+"," + encodeURIComponent(lat)  
    console.log(url)
    request({url, json: true },(error, {body})=>{
        if (error){
            callback('Unable to connect to weather service!',undefined)
        }else if(body.error){
            callback('Unable to find location', undefined)
        } 
        else{
            const current= body.current
            callback(undefined ,current.weather_descriptions + '. It is currently '+ current.temperature + ' degress out. It feels like ' + current.feelslike + ' degress out. Humidity is: '+ current.humidity)
        }
    })
}
module.exports = forecast 


// const c= '37.8267,-122.4233'
// const url='http://api.weatherstack.com/current?access_key=77a7ffad1b1aef3a57efb4acd7d6c3f0&query=37.8267,-122.4233'

// request({url: url, json: true },(error, response)=>{
//     if (error){
//         console.log('Unable to connect to weather service!')
//     }else if(response.body.error){
//         console.log('Unable to find location')
//     } 
//     else{
//         const current= response.body.current
//         console.log(current.weather_descriptions +'. It is currently '+ current.temperature + ' degress out. It feels like ' + current.feelslike + ' degress out.')
//     }
    
// })