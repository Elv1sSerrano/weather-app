import climaActual from './current-weather.js'
import climaSemanal from './weekly-weather.js'
import { ViewportSize } from './utils/viewport.js';
import './utils/tabs.js' 

const $app = document.querySelector('#app')
const $loader = document.querySelector('#loading')
ViewportSize($app)
ViewportSize($loader)

climaActual();
climaSemanal();