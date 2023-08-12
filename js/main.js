
//html elements
let todayData = document.querySelector('.todayData');
let nextDayData = document.querySelector('.nextDayData');
let thirdDayData = document.querySelector('.thirdDayData');
let searchInput = document.querySelector('.searchInput');


//get data from API
async function getData(city){
    let allDataFromAPI = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=afd7f87bd5044bc0a22125145231208&q=${city}&days=3`);

    let allData = await allDataFromAPI.json();
    displayAllData(allData);
}
getData("cairo")


//display data
async function displayAllData(weatherData){
    //get date
    let date = new Date(weatherData.forecast.forecastday[0].date);


    //display today data
    todayData.innerHTML = `
    <div class="headerContent  d-flex justify-content-between">
              <h6 class="mb-0 p-2">${date.toLocaleDateString("en-us" , {weekday:"long"})}</h6>
              <h6 class="mb-0 p-2"><p class="d-inline">${date.getDate()}</p> ${date.toLocaleDateString("en-us" , {month:"long"})}</h6>
            </div>
            <div class="innercontent p-3">
              <p class="fs-4">${weatherData.location.name}</p>
              <div class="fs-lg fw-bolder mb-4">${weatherData.current.temp_c}<sup>o</sup>C <img src="${weatherData.current.condition.icon}" class="w-25" alt=""></div>
              <p class="text-info">${weatherData.current.condition.text}</p>
              <div class="text-secondary">
                <span class="w-25 me-4"><img width="20px" height="20px" src="./imgs/icon-wind@2x.png" alt=""> ${weatherData.forecast.forecastday[0].hour[0].humidity}%</span>
                <span class="w-25 me-4"><img width="20px" height="20px" src="./imgs/icon-umberella@2x.png" alt=""> ${weatherData.forecast.forecastday[0].hour[0].wind_kph}kph</span>
                <span class="w-25 me-4"><img width="20px" height="20px" src="./imgs/icon-compass@2x.png" alt=""> ${weatherData.forecast.forecastday[0].hour[0].wind_dir}</span>
              </div>
            </div>
    `
//---------------------------------------------------------------

    //get date
    let date1 = new Date(weatherData.forecast.forecastday[1].date);
    //display next day data
    nextDayData.innerHTML = `
    <div class="headerContent bg-222530">
              <p class="mb-0 p-2">${date1.toLocaleDateString("en-us" , {weekday:"long"})}</p>
            </div>
            <div class="innercontent p-3">
              <img src="${weatherData.forecast.forecastday[1].day.condition.icon}" alt="">
              <div class="fs-2 fw-bolder">${weatherData.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup>C</div>
              <div class="fs-5 fw-bolder text-secondary mb-3">${weatherData.forecast.forecastday[1].day.mintemp_c}<sup>o</sup>C</div>
              <p class="text-info">${weatherData.forecast.forecastday[1].day.condition.text}</p>
              
            </div>
    `
//-----------------------------------------------------------------------


    //get date
    let date2 = new Date(weatherData.forecast.forecastday[2].date);
    //display third day data
    thirdDayData.innerHTML = `
    <div class="headerContent  d-flex justify-content-between">
              <p class="mb-0 p-2 w-100">${date2.toLocaleDateString("en-us" , {weekday:"long"})}</p>
            </div>
            <div class="innercontent p-3">
              <img src="${weatherData.forecast.forecastday[2].day.condition.icon}" alt="">
              <div class="fs-2 fw-bolder">${weatherData.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup>C</div>
              <div class="fs-5 fw-bolder text-secondary mb-3">${weatherData.forecast.forecastday[2].day.mintemp_c}<sup>o</sup>C</div>
              <p class="text-info">${weatherData.forecast.forecastday[2].day.condition.text}</p>
              
            </div>
    `
}


//search
searchInput.addEventListener('keyup' , function(){
  search(searchInput.value)
})

async function search(term) {
    let allData = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=afd7f87bd5044bc0a22125145231208&q=${term}&days=3`);
    if (allData.ok && 400 != allData.status) {
        let a = await allData.json();
        displayAllData(a);
    }
}