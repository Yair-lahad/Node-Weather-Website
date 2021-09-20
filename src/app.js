const path =require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const e = require('express')
const app= express()
const options={
    extensions: ['htm','html']
}
const port = process.env.PORT || 3000

// define paths for Express config
const publicDirectoryPath= path.join(__dirname, '../public')
const viewsPath= path.join(__dirname,'../templates/views')
const partialsPath= path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
// Setup static directory to serve
app.use(express.static(publicDirectoryPath,options))


// Routes
app.get('', (req, res) =>{
    res.render('index', {
        title: 'Weather',
        name: 'Yair Lahad'
    })
})
app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About me',
        name:'Yair lahad'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        textHelper: 'Some info',
        title:'Help',
        name:'Yair Lahad'
    })
})
app.get('/weather',(req,res)=> {
    if(!req.query.address){
        return res.send({ error: 'You must provide an adress'})
    }
    geocode(req.query.address, (error, {latitude, longtitude, location}={}) => {
        if(error){ return res.send({error})}
        else{
            // forecast api
            forecast(longtitude, latitude, (error, forecastData) => {
                if (error){ return res.send(error)}
                else{
                    res.send([{
                        adress: req.query.address,
                        forecast: forecastData,
                        location
                    }])
                }
            })
        }
    })
})
// more routes
app.get('/products', (req,res)=> {
    if (!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})
app.get('/help/*', (req,res)=> {
    res.render('404', {
        title: '404',
        name: 'Yair Lahad',
        error: 'Help article not found'
    })})

app.get('*', (req,res)=> {
    res.render('404',{
        title: '404',
        name: 'Yair Lahad',
        error:'Page not found'
    })
})

// strating the run of server
app.listen(port, () =>{
    console.log('Server is up on port: ' + port)
})