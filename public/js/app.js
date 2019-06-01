console.log('Javascript has started')

const weatherform=document.querySelector('.form')
    const searchform=document.querySelector('input')
    const messageone=document.querySelector('#message1')
    const messagetwo=document.querySelector('#message2')
    const alocation=document.querySelector('#alocation')
   
    alocation.addEventListener('click',(e)=>{
        e.preventDefault();
        if(!navigator.geolocation){
            return alert('You system doesnot support geolocation')
        }
        navigator.geolocation.getCurrentPosition((position)=>{
            const lat=position.coords.latitude.toString()
            const long=position.coords.longitude.toString()
            console.log(lat,long,`/geolocation?coords=${{lat}},${{long}}`)
            fetch(`/geolocation?coords=${lat},${long}`).then((response)=>{
                response.json().then((data)=>{
                    console.log(data)
                    if(data.error){
                        messageone.textContent = data.error
                        messagetwo.textContent =''
                    }
                    else{
                        messageone.textContent = data.forecast
                        messagetwo.textContent =''
                        }
            })
            })        
        })
        

        
        
    })


    weatherform.addEventListener('submit',(e)=>{
        e.preventDefault();
        const location=searchform.value
        
            fetch('/weather?address='+location).then((response)=>{

            response.json().then((data)=>{
                        if(data.error){
                            messageone.textContent = data.error
                            messagetwo.textContent =''
                        }
                        else{
                            messageone.textContent = data.forecast
                            messagetwo.textContent =data.location
                        }
                })
                
                
            })
       
    })
    