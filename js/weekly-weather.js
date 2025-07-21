import { getLatLon } from './utils/geolocation.js'
import { getWeeklyWeatherapiInformation } from './services/weather.js'
import { weeklyWeatherFormat } from './utils/data-format.js'
import htmlParser from './utils/dom.js'

function tabPanelTemplate(id){
    return `
    <div class="tabPanel" tabindex="0" aria-labelledby="tab-${id}">
        <div class="dayWeather" id="dayWeather-${id}">
            <ul class="dayWeather-list" id="dayWeather-list-${id}">              
                Hola mundo desde tab ${id}
            </ul>
        </div>
    </div>
    `
}

function createTabPanel(id){
    const $panel = htmlParser(tabPanelTemplate(id))
    if (id > 0) {
        $panel.hidden = true
    }
    return $panel
}

function setWeeklyClimateInfo(amountData){
    const $element = document.querySelector('.weeklyWeather')
    amountData.forEach((element, index) => {    
        const $panel = createTabPanel(index)        
        $element.append($panel) 
    });    
}

export default async function weeklyWeather() {
    const {lat, lon, isError} = await getLatLon()
    if(isError) return console.log("No se ha podido obtener tu ubicación")            
    //Obtener datos de la api
    const {isError:getWeatherError, data:apiData} = await getWeeklyWeatherapiInformation(lat, lon)
    if(getWeatherError) return console.log(`La aplicación ha fallado`)
    const weeklyData = weeklyWeatherFormat(apiData.list)
    setWeeklyClimateInfo(weeklyData)
    console.log(`Los datos son: `, weeklyData)
}
