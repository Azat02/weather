
let key = "2cfda1f27f8f18422038c85cc30073ad"
let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${42.882004}&lon=${74.582748}&lang=ru&units=metric&appid=${key}`;
let url2 = `https://api.openweathermap.org/data/2.5/weather?q=London,uk&callback=test&appid=357094a6315e6e5efdcdf3d6f9bbae01`



let $currentTemp = document.querySelector('.temp'); 
let $currentDescription = document.querySelector('#description');
let $descriptionIcon = document.querySelector('#descriptionIcon');
let $currentMaxTemp = document.querySelector('#maxTemp');
let $currentMinTemp = document.querySelector('#minTemp');
let $hours = document.querySelector('.hours'); 
let $dayly = document.querySelector('.daily');


fetch(url)
    .then(resp => resp.json())
    .then(data=> {
        console.log(data)
        $currentTemp.textContent = data.current.temp.toFixed(0) +'°' + 'C';
        $currentDescription.textContent = data.current.weather[0].description
        $descriptionIcon.setAttribute('src',`http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`) 
        $currentMaxTemp.textContent ='max:' + data.daily[0].temp.max.toFixed(0) +'°'+ 'C';
        $currentMinTemp.textContent = 'min:' + data.daily[0].temp.min.toFixed(0) +'°' + 'C';


        data.hourly.forEach((element, index) => {
            let hour =  new Date().getHours() + index ;
            $hours.insertAdjacentHTML('beforeend', `
            <div class="hour">
                <p>${index == 0 ? "Сейчас" : hour < 24 ? hour : hour < 48 ? hour - 24 : hour < 72 ? hour - 48: hour}</p>
                <img class='icon' src ="http://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png">
                <p>${element.temp.toFixed(0)}° C</p>
            </div>
            `)
        });

        data.daily.forEach((element, index) => {
            let day = new Date().getDay() + index;
            const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            $dayly.insertAdjacentHTML('beforeend', `
                <div class="day">
                    <p class = "days">${daysOfWeek[day]}</p>
                    <img class="dayIcon" src="http://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png">
                    <p>${element.temp.day.toFixed(0)}° C</p>
                </div>
            `)
        })
    })


fetch(url2)
    .then(respon => respon.json())
    .then(data => {
        console.log(data);
    })
    
    // ${new Date().toLocaleDateString('en-US', { weekday: 'long' } )}
    // ${daysOfWeek[new Date().getDay() + index]} .toLocaleString('en-US', { weekday: 'long' }