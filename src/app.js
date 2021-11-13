const path = require('path')
const express = require('express') ; 
const hbs = require('hbs') 
const forcast = require('./utils/forcast') ;
const geoCode = require('./utils/geocode') ; 
const { send } = require('process');
// ceate a server 
const app = express(); 
const port = process.env.PORT || 3000 ; 
// Define paths for express config 
const publicDirectoryPath = path.join(__dirname , '../public') ; 
const viewsPath = path.join(__dirname , '../templates/views') ; 
const partialsPath = path.join(__dirname , '../templates/partials') ; 


// To set Up hbs package with express --. to set up handlebars engine and view locations 
// hbs --> refares to handle bars 
app.set('view engine', 'hbs');
app.set('views' , viewsPath) ; 
hbs.registerPartials(partialsPath)

// set up static directory to serve  
app.use(express.static(publicDirectoryPath))
// serve index page 
app.get('' , (req , res)=>{
    res.render('index' , {
        title: "Weather App " , 
        name: "Ahmed Mansour "
    }) ; 
})

// serve About Page 
app.get('/about' , (req , res) =>{
    res.render('about' , {
        title: "About Me  " , 
        name: "Ahmed Mansour "
    })
})

// serve Help page 
app.get('/help' , (req , res) =>{
    res.render('help' , {
        title: "Help Me  " , 
        name: "Ahmed Mansour "
    })
})

// serve products page 
app.get('/products' , (req , res)=>{
    if(!req.query.search){
        return res.send({
            error: 'you must provide a search term '
        })
    }
    console.log(req.query) 
    res.send({
        products: [] 
    })
})

// serve weather page 
app.get('/weather' , (req , res)=>{
    const address = req.query.address ; 
    if(!address){
        return res.send({
            Erroe: "please enter the Address"
        })
    }
   
    geoCode(address , (error , {latitude ,longitude , locaton} ={} )=>{
        if(error){
            return res.send({error}) ; 
        }
        forcast(latitude , longitude , locaton , (error , forcastData) =>{
            if(error){
                return res.send({error}) ; 
            }
            console.log('Data', forcastData);
            res.send({
                forcast : forcastData , 
                location: locaton ,
                address : address
            })
        } )
    })

   
})



app.get('/help/*' , (req , res ) =>{
    res.render('404' , {
        title: "404" , 
        name: "Ahmed Mansour " , 
        errorMessage: 'Help Not Found! '
    })
})

// if Page not found 
app.get('*' , (req , res ) =>{
    res.render('404' , {
        title: "404" , 
        name: "Ahmed Mansour " , 
        errorMessage: 'Page Not Found! '
    })
})



app.listen(port, ()=>{
    console.log('Server is up on port' + port )
})





