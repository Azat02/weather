
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
        case 'Bishke' :
            getData(`https://api.openweathermap.org/data/2.5/onecall?lat=${42.882004}&lon=${74.582748}&lang=ru&units=metric&appid=${key}`);
            break
    }
})


// let $currentTemp = document.querySelector('.temp'); 
// let $currentDescription = document.querySelector('#description');
// let $descriptionIcon = document.querySelector('#descriptionIcon');
// let $currentMaxTemp = document.querySelector('#maxTemp');
// let $currentMinTemp = document.querySelector('#minTemp');
// let $dayly = document.querySelector('.daily');
// let $title = document.querySelector('.title');
// let $wrapper = document.querySelector('.wrapper');


// fetch(url)
//     .then(resp => resp.json())
//     .then(data=> {
//         console.log(data)
//         // $title.innerHTML = data.timezone;
//         $currentTemp.textContent = data.current.temp.toFixed(0) +'°' + 'C';
//         $currentDescription.textContent = data.current.weather[0].description
//         $descriptionIcon.setAttribute('src',`http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`) 
//         $currentMaxTemp.textContent ='max:' + data.daily[0].temp.max.toFixed(0) +'°'+ 'C';
//         $currentMinTemp.textContent = 'min:' + data.daily[0].temp.min.toFixed(0) +'°' + 'C';


//         data.hourly.forEach((element, index) => {
//             let hour =  new Date().getHours() + index ;
//             $hours.insertAdjacentHTML('beforeend', `
//             <div class="hour">
//                 <p>${index == 0 ? "Сейчас" : hour < 24 ? hour : hour < 48 ? hour - 24 : hour < 72 ? hour - 48: hour}</p>
//                 <img class='icon' src ="http://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png">
//                 <p>${element.temp.toFixed(0)}° C</p>
//             </div>
//             `)
//         });

//         data.daily.forEach((element, index) => {
            
//             const daysOfWeek = ['Воскресенье', 'Понедельник', 'Вторник', 'Вторник', 'Четверг', 'Пятница', 'Суббота'];
//             $dayly.insertAdjacentHTML('beforeend', `
                // <div class="day">
                //     <p class = "days">${index == 0 ? 'Сегодня' : daysOfWeek[new Date(element.dt*1000).getDay()]}</p>
                //     <img class="dayIcon" src="http://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png">
                //     <p>${element.temp.day.toFixed(0)}° C</p>
                // </div>
//             `)
//         })
//     })

    getData(url); 
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
        const daysOfWeek = ['Воскресенье', 'Понедельник', 'Вторник', 'Вторник', 'Четверг', 'Пятница', 'Суббота'];
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
   
























    // function getCurrentPosition() {
    //     return new Promise((resolve, reject) => {
    //       navigator.geolocation.getCurrentPosition(resolve, reject);
    //     });
    // }

    // getCurrentPosition();
// let key = "2cfda1f27f8f18422038c85cc30073ad"
// let $wrapper = document.querySelector('.wrapper');

// function weather (cityname, key, lat, lon) {
//     $wrapper.insertAdjacentHTML('beforeend', `
//     <div class= 'container'>
//         <div class="weather">
//         <div class="current">
//         <h1 class="title">${cityname}</h1>
//             <h1 class="temp">26°</h1>
//             <img id="descriptionIcon" src="" alt="">
//             <p id="description"></p>
//             <div class="maxmin">
//             <p id="maxTemp"></p>
//             <p id="minTemp"></p>
//             </div>
//         </div>
//         <div class="hours"></div>
//         <h2 class="week">На этой неделе</h2>
//         <div class="daily"></div>
//     </div>
//     </div>
//     `)
//     let $currentTemp = document.querySelector('.temp'); 
//     let $currentDescription = document.querySelector('#description');
//     let $descriptionIcon = document.querySelector('#descriptionIcon');
//     let $currentMaxTemp = document.querySelector('#maxTemp');
//     let $currentMinTemp = document.querySelector('#minTemp');
//     let $hours = document.querySelector('.hours'); 
//     let $dayly = document.querySelector('.daily');
//     let $title = document.querySelector('.title');

//     let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&lang=ru&units=metric&appid=${key}`;
//     fetch(url)
//     .then(resp => resp.json())
//     .then(data=> {
//         console.log(data)
//         $title.innerHTML = data.timezone;
//         $currentTemp.textContent = data.current.temp.toFixed(0) +'°' + 'C';
//         $currentDescription.textContent = data.current.weather[0].description
//         $descriptionIcon.setAttribute('src',`http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`) 
//         $currentMaxTemp.textContent ='max:' + data.daily[0].temp.max.toFixed(0) +'°'+ 'C';
//         $currentMinTemp.textContent = 'min:' + data.daily[0].temp.min.toFixed(0) +'°' + 'C';


//         data.hourly.forEach((element, index) => {
//             let hour =  new Date().getHours() + index ;
//             $hours.insertAdjacentHTML('beforeend', `
//             <div class="hour">
//                 <p>${index == 0 ? "Сейчас" : hour < 24 ? hour : hour < 48 ? hour - 24 : hour < 72 ? hour - 48: hour}</p>
//                 <img class='icon' src ="http://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png">
//                 <p>${element.temp.toFixed(0)}° C</p>
//             </div>
//             `)
//         });

//         data.daily.forEach((element, index) => {
            
//             const daysOfWeek = ['Воскресенье', 'Понедельник', 'Вторник', 'Вторник', 'Четверг', 'Пятница', 'Суббота'];
//             $dayly.insertAdjacentHTML('beforeend', `
//                 <div class="day">
//                     <p class = "days">${index == 0 ? 'Сегодня' : daysOfWeek[new Date(element.dt*1000).getDay()]}</p>
//                     <img class="dayIcon" src="http://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png">
//                     <p>${element.temp.day.toFixed(0)}° C</p>
//                 </div>
//             `)
//         })
//     })
// }

// function getCurrentPosition() {
//     return new Promise((resolve, reject) => {
//       navigator.geolocation.getCurrentPosition(resolve, reject);
//     });
// }

// async function getWeather() {
//     try {
//       const pos = await getCurrentPosition();
//       const latitude = pos.coords.latitude;
//       const longitude = pos.coords.longitude;
//       weather("Current Location", key, latitude, longitude);
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   getWeather();
//   weather("Oш", key, 40.513996, 72.816101);
//   weather("Бишкек", key, 42.882004, 74.582748);
//   weather("Нарын", key, 41.42866, 75.99111);
//   weather("Tокмок", key, 42.84194, 75.30149);
//   weather("Жалал-Абад", key, 40.933155, 72.981491);
//   weather("Баткен", key, 40.34532, 69.859741);
  
// const Naryn = new weather("Нарын", key, 41.42866, 75.99111);
// const Tokmok = new weather("Tокмок", key, 42.84194, 75.30149);
// const JalalAbad = new weather("Жалал-Абад", key, 40.933155, 72.981491);
// const Batken = new weather("Баткен", key, 40.34532, 69.859741);


