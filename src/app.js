//core node module path
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode=require('./utils/geocode')
const forecast =require('./utils/weather')

const app = express()

//dfine paths for express config
const publicDirectoryPath = path.join(__dirname, '../public') 
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handdlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))


//index page
app.get('', (req, res) => {
    res.render('index', { title:'Weather App', 
    name: 'Raymond Young'
    })
})

//about page

app.get('/about', (req, res) => {
    res.render('about', { title:'about page for weather app', 
    name: 'Raymond Young'
    })
})

//help page
app.get('/help', (req, res) => {
    res.render('help', { title:'Help page for weather app', 
    name: 'Raymond Young',
    helpText: 'some help text',
    title:'Help'
    })
})


app.get('/help/*', (req, res) => {
    res.render('404', { title:'Error', 
    messageText: 'Help Article not found'})
})


app.get('/weather', (req, res)=> {

    if (!req.query.address) {
        return res.send({
            error:'you must provide a location'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
            if (error) {
                return res.send({error})
            }

            forecast(latitude, longitude, (error, forecastData) => {
                if (error)
                {
                    res.send ( { error })
                }
                res.send( {
                    forecast:forecastData, location,
                    address: req.query.address
                })
            })
    })

    // res.send({forecast:'It is cloudy today', location: 'Manila', address:req.query.address})
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error:'you must provide a search term'
        })
    } 
    console.log(req.query.search)
    res.send({products: []})
})

//help page
app.get('*', (req, res) => {
    res.render('404', { title:'Error', 
    messageText: 'Page not found'})
})


//templating end




app.listen(3000, ()=> {
    console.log('Server start successfully on port 3000')
})
