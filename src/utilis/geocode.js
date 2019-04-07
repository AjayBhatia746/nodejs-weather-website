const request=require('request')
const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiYmhhdGlhMTAwOCIsImEiOiJjanRuNXk4dGQwMXRpNDlwYndkYjFybGoxIn0.EpDJGy0a1Ipc8E0y4uNPOA'
    request({url,json:true},(error,response)=>{
    if(error){
        
    callback('Unable to connect. Please check your data connections',undefined)
    } else if(response.body.features.length===0){
    callback('Unable to find the location',undefined)
    }
     else{
     callback(undefined,{
        latitude:response.body.features[0].center[1],
        longitude:response.body.features[0].center[0],
        location:response.body.features[0].place_name
     })    
    }
    
    })
    }



    module.exports=geocode