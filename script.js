let button = document.querySelector('#getWeather');
let form = document.querySelector('form')
form.addEventListener('submit', (e) => {
    const city = document.querySelector('#city').value;
    let apikey = `1c464a08d72f4545bac51157242207`;
    const weatherResult = document.getElementById('weatherResult');
    let nav = document.querySelector('nav')
    let footer = document.querySelector('#footer')
    e.preventDefault()
   
    async function findlatlot(city) {
        try {
            const api = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apikey}&q=${city}%27`);
            const data = await api.json();
            if (data.location && data.current) {
                displayWeather(data);
            } else {
                weatherResult.innerHTML = `<div id="error">City not found. Please enter a valid location.</div>`;  
            }
        } catch (error) {
            weatherResult.innerHTML = `<div id="error">City not found. Please enter a valid location.</div>`
        }
    }

    function displayWeather(response) {
        nav.style.borderBottomRightRadius = '0px'
        nav.style.borderBottomLeftRadius = '0px'

        let temp = document.querySelector(".temperature")
        let rtemp = document.querySelector(".righttemperature")
        let weather = document.querySelector(".weather");
        let rweather = document.querySelector(".rightweather");
        let cityy = document.querySelector(".city")
        let speed = document.querySelector(".detail-value")
        let rspeed = document.querySelector(".rdetail-value")
        let humidity = document.querySelector("#humidity")
        let rhumidity = document.querySelector(".rhumidity")
        let clauds = document.querySelector(".clauds")
        let pressure = document.querySelector(".pressure")
        let Feels = document.querySelector(".uv-value")
        let images=document.querySelector('#img3')
        images.src=`${response.current.condition.icon}`
        images.style.width='130px'
        images.style.height='130px'

        Feels.innerHTML = `${Math.floor(response.current.feelslike_c)}%`
        clauds.innerHTML = `${response.current.cloud}%`
        pressure.innerHTML = `${response.current.pressure_mb} hPa`
        temp.innerHTML = `${Math.floor(response.current.temp_c)}°C`;
        rtemp.innerHTML = `${Math.floor(response.current.temp_c)}°C`;
        weather.innerHTML = `${response.current.condition.text}`;
        rweather.innerHTML = `${response.current.condition.text}`;
        speed.innerHTML = `${response.current.wind_kph}kph`;
        rspeed.innerHTML = `${response.current.wind_kph}kph`;
        humidity.innerHTML = `${response.current.humidity}%`;
        rhumidity.innerHTML = `${response.current.humidity}%`;
        cityy.innerHTML = `📍${response.location.name}`;
        footer.innerHTML = "@Navin Chaudhary❤️"
        weatherResult.style.display = "flex"
    }

    findlatlot(city)
})