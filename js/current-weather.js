import { dateFormat, tempFormat } from './units/data-format.js'
import { weatherConditionCodes } from './constants.js'
import { getLatLon } from './geolocation.js'
import { getWeatherapiInformation } from './services/weather.js'

function setCurrentDate($element){        
    $element.textContent = dateFormat(new Date())    
}

function setCurrentCity($element, object){
    $element.textContent = object.name
}

function setCurrentTemp($element, object){
    const formatedTemp = tempFormat(object.main.temp)
    $element.textContent = `${formatedTemp}°`
}

function setBackgroundImage($element, solarStatus, weatherCondition, size){
    $element.style.backgroundImage = `url(./images/${solarStatus}-${weatherCondition}${size}.jpg)`    
}

function getSolarStatus(object){
    const actualHour = new Date().getHours()
    const sunsetHour = new Date(object.sys.sunset * 1000).getHours() 
    const sunriseHour = new Date(object.sys.sunrise * 1000).getHours()   
    if (actualHour >= sunsetHour || actualHour < sunriseHour){
        return 'night'
    }  
    return 'morning'    
}

function getWeatherCondition(object){
    const weatherCode = String(object.weather[0].id).charAt(0)
    const weatherCondition = weatherConditionCodes[weatherCode]     
    return weatherCondition    
}

function getSize(){
    const size = window.matchMedia('(webkit-min-device-pixel-ratio: 2)').matches ? '@2x' : ''    
    return size
}

function loadAplication($app, $loader){
    $app.hidden = false
    $loader.hidden = true
}

function configWeather(weather){
    //loader
    const $app = document.querySelector('#app')
    const $loading = document.querySelector('#loading')
    loadAplication($app, $loading)
    //date
    const $date = document.querySelector('#current-weather-date')
    setCurrentDate($date)    
    //city
    const $city = document.querySelector('#current-weather-city')
    setCurrentCity($city, weather);   
    //temp
    const $temp = document.querySelector('#current-weather-temp')
    setCurrentTemp($temp, weather)
    //background-image
    const $bgImg = document.querySelector('#app')
    setBackgroundImage($bgImg, getSolarStatus(weather), getWeatherCondition(weather), getSize())    
}

export default async function currentWeather(){     
    //geolocation
    const {lat, lon, isError} = await getLatLon()           
    if(isError) return console.log("No se ha podido obtener tu ubicación")    
    console.log(lat, lon)
    //Obtener datos de la api
    const {isError:getWeatherError, data:apiData} = await getWeatherapiInformation(lat, lon)
    if(getWeatherError) return console.log(`La aplicación ha fallado`)
    console.log(`Los datos son: `, apiData)
    configWeather(apiData)   
}





