const request = require('request')

const geocode = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYnRoZXRmbyIsImEiOiJjang3emZnM3EwNDVvM3NvYTJjdmZpZXRiIn0.1vYAF4ApMkWKPXe7-_Am5A&limit=1'
  request({url, json: true}, (error, {body} = response) => {
    if(error){
      callback('Unable to connect to location services.', undefined)
    }else if(body.features.length === 0){
      callback('Unable to find location. Try another search.', undefined)
    }else{
      callback(undefined, {
        lattitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      }

      )
    }
  })
}

module.exports = geocode
