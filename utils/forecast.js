const request = require('request')

const forecast = (lat, long, callback) => {
  const url = 'https://api.darksky.net/forecast/6e2e9f18d46bd479fdb239e0adc9a4c9/' + lat + ',' + long
  request({url, json: true}, (error, {body} = response) => {
    if(error){
      callback('Unable to connect to weather service.', undefined)
    }else if(body.error){
      callback('Unable to find location', undefined)
    }else{
          const {currently} = body;
          const message = body.daily.data[0].summary + " It is currently " + currently.temperature + " degrees out. There is a " + currently.precipProbability + "% chance of rain."
          callback(undefined, message)
    }
  })
}

module.exports = forecast
