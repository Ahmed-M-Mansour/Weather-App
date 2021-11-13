let search = document.querySelector('input') 
const weatherForm = document.querySelector('form') ; 
let forcast = document.getElementById('forcast') ; 
let cityLocation = document.getElementById('location') ; 
let forError = document.getElementById('error') ; 

cityLocation.textContent = 'Location..'

weatherForm.addEventListener('submit' , e =>{
    let  location = search.value
    console.log(location)
    e.preventDefault() ; 

    fetch(`/weather?address=${location}`).then(res =>{
    res.json().then(data=>{
            if(data){
            forcast.textContent = data.forcast ; 
            cityLocation.textContent = data.location  ; 
            forError.textContent =  data.error ; 
        } else{
            forcast.textContent = data.error ; 
            console.log(data.error)
        }
        
    })
   
    
}) 
search.value = ''
})



