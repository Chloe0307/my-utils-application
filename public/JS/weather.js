
let weather= {

    init : function () {
        weather.getWeather()
    },
   
    getWeather : function () {

        const weatherForm = document.querySelector('form')
        const search = document.querySelector('input')
        const messageOne = document.querySelector('#message-location')
        const messageTwo = document.querySelector('#message-forecast')
    
    
        weatherForm.addEventListener('submit', (e) => {
            e.preventDefault()
    
            const location = search.value
    
            messageOne.textContent = 'Loading ...'
            messageTwo.textContent = ''
    
            fetch('/weather-address?address=' + location).then((response)=> {
                response.json().then((data) => {
                    if (data.error) {
                        messageOne.textContent = data.error
                    } else {
                        messageOne.textContent = data.location
                        messageTwo.textContent = data.forecast
                    
                    }
                })
            })
        });
    },
};

document.addEventListener('DOMContentLoaded', weather.init)