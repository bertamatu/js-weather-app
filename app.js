window.addEventListener('load', ()=> {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature_description');
    let temperatureDegree = document.querySelector('.temperature_degree');
    let locationTimezone = document.querySelector('.location_timezone');
    let temperatureSection = document.querySelector('.temperature_degree_section');
    const temperatureSpan = document.querySelector('.temperature_degree_section span');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/ea2eabed7f55266b377613b1644f00ea/${lat},${long}`;
            fetch(api)
                .then(dataResponse => {
                    return dataResponse.json();
                })
                .then(data => {
                    // console.log(data);
                    const { temperature, summary, icon } = data.currently;
                    //set DOM elements from the API
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;
                    //formula for celsius
                    let celsius = (temperature - 32) * (5/9);
                    //Set Icon;
                    setIcons(icon, document.querySelector('.icon'));
                    // Change from F to Celsius
                    temperatureSection.addEventListener( "click", () => {
                        if (temperatureSpan.textContent === "F") {
                            temperatureSpan.textContent = "C";
                            temperatureDegree.textContent = Math.floor(celsius);
                        } else {
                            temperatureSpan.textContent = "F";
                            temperatureDegree.textContent = temperature;
                        }
                    })
                })
        });
    } 
    function setIcons (icon, iconId) {
        const skycons = new Skycons({color: 'white'});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconId, Skycons[currentIcon]);
    }
});