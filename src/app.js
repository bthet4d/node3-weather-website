//core modules first
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('../utils/geocode.js')
const forecast = require('../utils/forecast.js')


const app = express()
const port = process.env.PORT || 3000
// Define paths for express config
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//set up static directory to serve
app.use(express.static(publicPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'B.J. Thetford'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'B.J. Thetford'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help Page',
    message: 'Help is on the way',
    name: 'B.J. Thetford'
  })
})

app.get('/weather', (req, res) => {
  if(!req.query.address){
    return res.send({
      error: 'Address must be provided.'
    })
  }

  geocode(req.query.address, (error, {lattitude, longitude, location} = {}) => {
    if(error){
      return res.send({
        error: error
      })
    }
    forecast(lattitude, longitude, (error, forecastData) => {
      if(error){
        return res.send({
          error: error
        })
      }
      res.send({
        location: location,
        forecast: forecastData,
        address: req.query.address
      })
    })
  })

})

app.get('/products', (req, res) => {
  if(!req.query.search){
    //returning to avoid header error when responding twice
    return res.send({
      error: 'You must provide a search term.'
    })
  }
  console.log(req.query)
  search = req.query.search
  rating = req.query.rating
  console.log(search)
  res.send({
    products: []
  })


})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404 Error',
    name: 'B.J. Thetford',
    message: 'Help article not found'
  })
})
app.get('*', (req, res) => {
  res.render('404', {
    title: '404 Error',
    name: 'B.J. Thetford',
    message: 'Page not found'
  })
})


app.listen(port, () => {
  console.log('Server is up on port ' + port)
})
