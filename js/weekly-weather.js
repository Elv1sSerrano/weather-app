import { getLatLon } from './utils/geolocation.js'
import { getWeeklyWeatherapiInformation } from './services/weather.js'
import { dateFormat, tempFormat, weeklyWeatherFormat } from './utils/data-format.js'
import { createTabPanel, createWeatherContainer } from './components.js'
import draggable from './utils/draggable.js'

function setWeeklyClimateInfo(weeklyDataArray){
    const $element = document.querySelector('.tabs')    
    weeklyDataArray.forEach((dayDataArray, index) => {    
        const $panel = createTabPanel(index)                  
        $element.append($panel) 
        dayDataArray.forEach((content) => {
            const $container = createWeatherContainer(configWeeklydata(content))
            $panel.querySelector('.dayWeather-list').append($container)
        })        
    });    
}

function configWeeklydata(content) {
    const hourConfig = {
        hour: 'numeric', 
        hour12: 'true'
    }
    const dt =  dateFormat(content.dt * 1000, hourConfig)
    const temp = tempFormat(content.main.temp)
    const icon = content.weather[0].icon
    const description = content.weather[0].description
    
    return {dt, temp, icon, description}    
} 

export default async function weeklyWeather() {
    const $wholeAppContainer = document.querySelector('.weeklyWeather')
    const {lat, lon, isError} = await getLatLon()
    if(isError) return console.log("No se ha podido obtener tu ubicación")            
    //Obtener datos de la api
    const {isError:getWeatherError, data:apiData} = await getWeeklyWeatherapiInformation(lat, lon)
    if(getWeatherError) return console.log(`La aplicación ha fallado`)
    const weeklyDataArray = weeklyWeatherFormat(apiData.list)
    setWeeklyClimateInfo(weeklyDataArray)
    console.log(`Los datos son: `, weeklyDataArray)
    draggable($wholeAppContainer)        
}
