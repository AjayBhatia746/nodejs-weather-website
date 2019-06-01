const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utilis/geocode')
const forecast=require('./utilis/forecast')
//console.log(path.join(__dirname,'../public'))
const app= express()
const port=process.env.PORT || 3000
//defining path for express config
const publicdirectorypath=path.join(__dirname,'../public')
const viewpath=path.join(__dirname,'../templates/views');
const partialpath=path.join(__dirname,'../templates/partials')
//setup handlebar engine and view location
app.set('view engine','hbs')//to tell the express that we are using hbs as the view engine
app.set('views',viewpath)
hbs.registerPartials(partialpath)//hbs take the path where your partials are present
//setup static directory to serve


app.use(express.static(publicdirectorypath))
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({error:'You have not entered any address'})
    }
        geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
            if(error){
                return res.send({error})
            }
            forecast(latitude,longitude, (error, forecastdata) => {
            if(error){
                return res.send({error})
            }
            
            res.send({forecast:forecastdata,
            location,
            address:req.query.address})
          })

    
})
})

app.get('/geolocation',(req,res)=>{
    if(req.query.coords.length===0){
        return res.send({error:'You have not entered any address'})    
    }
    forecast(req.query.coords[0],req.query.coords[1],(error,forecastdata)=>{
        if(error){
            return res.send({error})
        }
        res.send({
            forecast:forecastdata,

        })

    })
})



app.get('',(req,res)=>{
res.render('index',{
    title:'Weather-Application',
    
})
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Need Help Contact me....!'
    })
})
app.get('/help/*',(req,res)=>{
res.render('error',{
    title:'Help article not found'
})
})
app.get('*',(req,res)=>{
res.render('error',{
    title:'404 Error. Check your connection.'
})
 })
// ajay.com
// ajay.com/help
// ajay.com/about
//template engine that we are using handle bar used to create dynamic web pages
app.listen(port,()=>{
    console.log('Server is on port Number '+port)
})