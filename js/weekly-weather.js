import { getLatLon } from './utils/geolocation.js'
import { getWeeklyWeatherapiInformation } from './services/weather.js'
import { dateFormat, tempFormat, weeklyWeatherFormat } from './utils/data-format.js'
import { createTabPanel, createWeatherContainer, createAdditionalInfoTemplate } from './components.js'
import draggable from './utils/draggable.js'

function configWeeklydata(content) {
    const hourConfig = {
        hour: 'numeric', 
        hour12: 'true'
    }
    const dt =  dateFormat(content.dt * 1000, hourConfig)
    const temp = tempFormat(content.main.temp)
    const icon = content.weather[0].icon
    const description = content.weather[0].description

    const maxTemp = content.main.temp_max
    const minTemp = content.main.temp_min
    const windSpeed = (content.wind.speed * 3.6).toFixed(3)
    const humidity = content.main.humidity

    const weeklyWeatherData = {
        dt,
        temp,
        icon,
        description,
        maxTemp,
        minTemp,
        windSpeed,
        humidity
    }    
    return weeklyWeatherData
}

function setWeeklyClimateInfo(weeklyDataArray){
    const $element = document.querySelector('.tabs')    
    weeklyDataArray.forEach((dayDataArray, index) => {    
        const $panel = createTabPanel(index)
        console.log($panel)                  
        $element.append($panel) 
        dayDataArray.forEach((content, index) => {
            const $container = createWeatherContainer(configWeeklydata(content))
            $panel.querySelector('.dayWeather-list').append($container)    
            // setIndividualInfo(configWeeklydata(content))
            // console.log(`El indice que está enviando la función para hacer los paneles adicionales es ${index}`)                         
        })        
    })       
} 

function setIndividualInfo(weeklyDataArray){       
    const $tabs = document.querySelectorAll('.tab')             


    function updateInfo(tabIndex, itemIndex){           

        const $list = document.getElementById(`dayWeather-list-${tabIndex}`)
        const $items = $list.querySelectorAll('.dayWeather-item')

        const $previosElement = $list.querySelector('.is-selected')           
        if($previosElement) $previosElement.classList.remove('is-selected')        
        $items[itemIndex].classList.add('is-selected')

        //agregar información de: temperatura máxima, temperatura mínima, viento y humedad.
        const individualData = weeklyDataArray[tabIndex][itemIndex]             
        const $panels = document.querySelectorAll('.tabPanel')
        const $panel = [...$panels].find($panel => $panel.getAttribute('aria-labelledby')===`tab-${tabIndex}`)
        const $additionalContainer = createAdditionalInfoTemplate(configWeeklydata(individualData))            
        const previousAdditionalContainer = $panel.querySelector('.additionalInfo')
        if(previousAdditionalContainer) previousAdditionalContainer.remove()            
        $panel.append($additionalContainer)                    
    }    

    $tabs.forEach(($tab, tabIndex) => { 
        const $list = document.getElementById(`dayWeather-list-${tabIndex}`)
        const $items = $list.querySelectorAll('.dayWeather-item')

        $items.forEach(($item, itemIndex) => {                    
            $item.addEventListener('click', () => {               
                const tabSelected = [...$tabs].findIndex($tab => $tab.getAttribute('aria-selected')=== 'true')                
                updateInfo(tabSelected, itemIndex)
            })
        })

        $tab.addEventListener('click', () => {                         
            updateInfo(tabIndex, 0)
        })                                 
    })

    updateInfo(0, 0)    
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
    setIndividualInfo(weeklyDataArray)
    console.log(`Los datos son: `, weeklyDataArray)    
    draggable($wholeAppContainer)        
}
