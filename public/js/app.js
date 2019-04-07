console.log('Javascript has started')
const weatherform=document.querySelector('.form')
    const searchform=document.querySelector('input')
    const messageone=document.querySelector('#message1')
    const messagetwo=document.querySelector('#message2')
   
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