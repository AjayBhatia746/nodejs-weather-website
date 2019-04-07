const request=require('request')

forecast=(latitude,longitude,callback)=>{
url='https://api.darksky.net/forecast/093d52ed6c084857cb6fdc14768f6478/'+latitude+','+longitude+'?units:si'
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Check your coonection',undefined)
        }
        else if(body.error){
            callback('You have entered incorrect latitude and longiude',undefined)
        }
        else{
            callback(undefined, 'Summary: '+body.daily.data[0].summary+'Temperature: '+body.currently.temperature+' Chance of rain: '+body.currently.precipProbability
            //     {
            //     Summary: body.daily.data[0].summary,
            //     Temperature: body.currently.temperature,
            //     Chance_of_rain: body.currently.precipProbability
            // }
            )
        }
    })
}
module.exports=forecast