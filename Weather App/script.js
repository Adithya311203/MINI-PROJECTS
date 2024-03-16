const API_KEY='c7259b6dedac8307dcfdcb9740f73da7'
const link='https://api.openweathermap.org/data/2.5/weather?units=metric&q=';
const searchBox=document.querySelector('.search input');
const searchBtn=document.querySelector('.search button');
async function checkWeather(city){
    const response=await fetch(link+city+`&appid=${API_KEY}`);
    if(response.status==404){
        document.querySelector('.error').style.display="block";
        document.querySelector('.weather').style.display="none";}
    else{var data = await response.json();
    console.log(data);
    document.querySelector('.weather').style.display="block";
    document.querySelector('.error').style.display="none";
    document.querySelector('.city').innerHTML=data.name;
    document.querySelector('.humidity').innerHTML=data.main.humidity+" %";
    document.querySelector('.wind').innerHTML=data.wind.speed+" km/h";
    document.querySelector('.temp').innerHTML=(data.main.temp).toFixed(1)+" °C"
    document.querySelector('.weathericon').src=`${data.weather[0].main}.png`
}}
searchBtn.addEventListener("click",()=>{
    checkWeather(searchBox.value);
})
