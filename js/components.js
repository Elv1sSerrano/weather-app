import htmlParser from './utils/dom.js'

function tabPanelTemplate(id){
    return `
    <div class="tabPanel" tabindex="0" aria-labelledby="tab-${id}">
        <div class="dayWeather" id="dayWeather-${id}">
            <ul class="dayWeather-list" id="dayWeather-list-${id}">              
                
            </ul>
        </div>
    </div>
    `
}

export function createTabPanel(id){
    const $panel = htmlParser(tabPanelTemplate(id))
    if (id > 0) {
        $panel.hidden = true
    }
    return $panel
}

function weatherContainerTemplate({dt, temp, icon, description}){
    return `
    <li class="dayWeather-item is-selected">
        <span class="dayWeather-time">${dt}</span>
        <img class="dayWeather-icon" src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}" rain="">
        <span class="dayWeather-temp">${temp}°</span>
    </li>
    `
}

export function createWeatherContainer(apiInfo){
    const $container = htmlParser(weatherContainerTemplate(apiInfo))
    return $container
}