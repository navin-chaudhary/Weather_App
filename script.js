let button = document.querySelector('#getWeather');
let form=document.querySelector('form')
form.addEventListener('submit', (e) => {
    const city = document.querySelector('#city').value;
    let apikey=`439d4b804bc8187953eb36d2a8c26a02`;
    const weatherResult = document.getElementById('weatherResult');
    let nav =document.querySelector('nav')
    let footer=document.querySelector('#footer')
    e.preventDefault()
   
    async function findlatlot(city) {
        
        try {
            const api = await fetch(`https://openweathermap.org/data/2.5/find?q=${city}&appid=${apikey}&units=metric`);
            const data = await api.json();
            if (data.list && data.list.length > 0) {
                const { lat, lon } = data.list[0].coord;
                fetchdata(lat, lon);
            } else {
                weatherResult.innerHTML = `<div id="error">City not found.</div>`;
            }
        } catch (error) {
            
           weatherResult.innerHTML=``
        }
    }
    async function fetchdata(lat, lon) {
        let apiUrl=`https://openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`
        console.log(apiUrl);
        let data = await fetch(apiUrl);
        let response = await data.json()
        if (response) {
            displaywether(response)
        }
        else {
            console.log("error");
            weatherResult.innerHTML = `
            <div id="error">somthing went wrong..?</div>
            `;
            
        }
        
    }
    function displaywether(response){
        nav.style.borderBottomRightRadius='0px'
        nav.style.borderBottomLeftRadius='0px'


        let temp=document.querySelector(".temperature")
        let rtemp=document.querySelector(".righttemperature")
        let weather=document.querySelector(".weather");
        let rweather=document.querySelector(".rightweather");
        let cityy=document.querySelector(".city")
        let speed=document.querySelector(".detail-value")
        let rspeed=document.querySelector(".rdetail-value")
        let humidity=document.querySelector("#humidity")
        let rhumidity=document.querySelector(".rhumidity")
        let clauds=document.querySelector(".clauds")
        let pressure=document.querySelector(".pressure")
        let Feels=document.querySelector(".uv-value")
        let ft1=document.querySelector(".forecast-temp1")
        let ft2=document.querySelector(".forecast-temp2")
        let ft3=document.querySelector(".forecast-temp3")
        let ft4=document.querySelector(".forecast-temp4")
        let ft5=document.querySelector(".forecast-temp5")
        let ft6=document.querySelector(".forecast-temp6")
        let fw1=document.querySelector(".forecast-weather1")
        let fw2=document.querySelector(".forecast-weather2")
        let fw3=document.querySelector(".forecast-weather3")
        let fw4=document.querySelector(".forecast-weather4")
        let fw5=document.querySelector(".forecast-weather5")
        let fw6=document.querySelector(".forecast-weather6")



        Feels.innerHTML=`${Math.floor(response.current.feels_like)}%`
        clauds.innerHTML=`${response.current.clouds}%`
        pressure.innerHTML=`${response.current.pressure} hPa`
        temp.innerHTML=`${Math.floor(response.current.temp)}°C`;
        rtemp.innerHTML=`${Math.floor(response.current.temp)}°C`;
        ft1.innerHTML=`${Math.floor(response.hourly[0].temp)}°C`;
        ft2.innerHTML=`${Math.floor(response.hourly[1].temp)}°C`;
        ft3.innerHTML=`${Math.floor(response.hourly[2].temp)}°C`;
        ft4.innerHTML=`${Math.floor(response.hourly[3].temp)}°C`;
        ft5.innerHTML=`${Math.floor(response.hourly[4].temp)}°C`;
        ft6.innerHTML=`${Math.floor(response.hourly[5].temp)}°C`;
        weather.innerHTML=`${response.current.weather[0].description}`;
        rweather.innerHTML=`${response.current.weather[0].description}`;
        fw1.innerHTML=`${response.hourly[0].weather[0].main}`;
        fw2.innerHTML=`${response.hourly[1].weather[0].main}`;
        fw3.innerHTML=`${response.hourly[2].weather[0].main}`;
        fw4.innerHTML=`${response.hourly[3].weather[0].main}`;
        fw5.innerHTML=`${response.hourly[4].weather[0].main}`;
        fw6.innerHTML=`${response.hourly[5].weather[0].main}`;
        speed.innerHTML=`${response.current.wind_speed}kph`;
        rspeed.innerHTML=`${response.current.wind_speed}kph`;
        humidity.innerHTML=`${response.current.humidity}%`;
        rhumidity.innerHTML=`${response.current.humidity}%`;
        cityy.innerHTML=`📍${city}`;
        footer.innerHTML="@Navin Chaudhary"
       weatherResult.style.display="flex"
    }
    findlatlot(city)

})
