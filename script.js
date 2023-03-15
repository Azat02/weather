
let key = "2cfda1f27f8f18422038c85cc30073ad"
let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${42.882004}&lon=${74.582748}&lang=ru&units=metric&appid=${key}`;
let $select = document.querySelector('select');

$select.addEventListener('change', function(){

    switch($select.value) {
        case 'Osh': 
            getData(`https://api.openweathermap.org/data/2.5/onecall?lat=${40.513996}&lon=${72.816101}&lang=ru&units=metric&appid=${key}`)
            break
        case 'Naryn' :
            getData(`https://api.openweathermap.org/data/2.5/onecall?lat=${41.260902}&lon=${74.949463}&lang=ru&units=metric&appid=${key}`)
            break
        case 'Bishkek' :
            getData(`https://api.openweathermap.org/data/2.5/onecall?lat=${42.882004}&lon=${74.582748}&lang=ru&units=metric&appid=${key}`);
            break
    }
});
 
    async function getData (url) {
        let resp = await fetch (url);
        let data = await resp.json();

        console.log(data);
        currentData(data.current, data.daily[0].temp);
        hourData(data.hourly);
        dailyData(data.daily);
    }

    function currentData (current, dailyTemp){
        let $currentTemp = document.querySelector('.temp'); 
        let $currentDescription = document.querySelector('#description');
        let $descriptionIcon = document.querySelector('#descriptionIcon');
        let $currentMaxTemp = document.querySelector('#maxTemp');
        let $currentMinTemp = document.querySelector('#minTemp');

        $currentTemp.textContent = (current.temp).toFixed(0) + '°' 
        $currentDescription.textContent = current.weather[0].description
        $descriptionIcon.setAttribute('src',`http://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`);
        $currentMaxTemp.textContent = 'max:' + (dailyTemp.max).toFixed(0) + '°' ;
        $currentMinTemp.textContent = 'min:' + (dailyTemp.min).toFixed(0) + '°' ;
    }

    function hourData (hourly) {
        let $hours = document.querySelector('.hours'); 
        $hours.innerHTML = '';
        hourly.forEach((element, index) => {
            let hour = new Date().getHours() + index
            $hours.insertAdjacentHTML('beforeend', `
            <div class="hour">
                <p>${index == 0 ? "Сейчас" : hour < 24 ? hour : hour - 24 * Math.floor(hour/24)}</p>
                <img class='icon' src ="http://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png">
                <p>${element.temp.toFixed(0)}° C</p>
            </div>
            `)
        });
    }

    function dailyData (daily) {
        let $daily = document.querySelector('.daily');
        $daily.innerHTML = '';
        const daysOfWeek = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
        daily.forEach((element, index) => {
            $daily.insertAdjacentHTML('beforeend',  `
            <div class="day">
                <p class = "days">${index == 0 ? 'Сегодня' : daysOfWeek[new Date(element.dt*1000).getDay()]}</p>
                <img class="dayIcon" src="http://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png">
                <p>${element.temp.day.toFixed(0)}° C</p>
            </div> 
            `)
        });
    }


    function getCurrentPosition() {
        return new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
      }
      async function myFunction() {
        try {
          const pos = await getCurrentPosition();
          const latitude = pos.coords.latitude;
          const longitude = pos.coords.longitude;
          console.log(latitude, longitude);
          getData(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&lang=ru&units=metric&appid=${key}`)
        } catch (error) {
          console.log(error);
        }
      }
    myFunction();

   





