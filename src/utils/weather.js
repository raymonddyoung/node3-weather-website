const request = require('request')

const weather  = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/06b06a3ac01424beb7503448ddfe506c/' + latitude + ',' + longitude + '?units=si'
    request({url, json : true}, (error, {body}) => {
    
        if (error){
            callback('Unable to connect to weather services. ', undefined)
        } 
        else if (body.error) {
            callback('Unable to find weather for specified location. ', undefined)
        }
        else{

            callback(undefined, 
                body.daily.data[0].summary + '. It is currently ' + body.currently.temperature + ' degrees Celsius')
            // console.log(response.body.daily.data[0].summary)
            // console.log("it is currently " + response.body.currently.temperature + ' degrees Celsius ')
            // console.log("there is " + response.body.currently.precipProbability + "% chance of rain")
        }
        

    })
}


module.exports = weather