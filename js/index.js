import climaActual from './current-weather.js'
import { viewportSize } from './utils/viewport.js';


const $app = document.querySelector('#app')
const $loader = document.querySelector('#loading')
viewportSize($app)
viewportSize($loader)

climaActual();
