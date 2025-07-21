const $tabContainer = document.querySelector('#tabs')   
const $tablist = $tabContainer.querySelectorAll('.tab')

const date = new Date()
let today = date.getDay()

const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado']

function getNextDay(day){
    if (day === 6){
        return 0
    }
    return day + 1
}

function setDayText ($el) {       
    $el.forEach(($element, index) => {    
        if (index === 0){
            $element.textContent = 'Hoy'
            today = getNextDay(today)
            return false                        
        }             
        $element.textContent = dayNames[today]                                                              
        today = getNextDay(today)
    });
}

function handleSelectTabClick($el){    
    $el.forEach(($element) => {
        $element.addEventListener('click', () => {            
            const id = $element.getAttribute('id')
            const $tabs = document.querySelector(`[aria-labelledby=${id}]`)  
            const $tabSelected = document.querySelector('.tabPanel:not([hidden])')
            $tabs.hidden = false
            $tabSelected.hidden = true             
            const $tabHeadActive = document.querySelector('.tab[aria-selected="true"]')
            $tabHeadActive.removeAttribute('aria-selected')                        
            $element.setAttribute('aria-selected', 'true')
        })
    } ) 
}

setDayText($tablist)
handleSelectTabClick($tablist)