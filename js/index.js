import climaActual from './current-weather.js'
import { ViewportSize } from './utils/viewport.js';


const $app = document.querySelector('#app')
const $loader = document.querySelector('#loading')
ViewportSize($app)
ViewportSize($loader)

console.log('Elemento $app:', $app); // Verifica que sea el elemento correcto
console.log('Elemento $loader:', $loader); // Verifica que sea el elemento correcto

climaActual();
