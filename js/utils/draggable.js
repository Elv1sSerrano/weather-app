const defaultConfig = {
    open: true,
    debug: true,
    animatable: true
}


export default function draggable($container, config = defaultConfig){    
    if(!($container instanceof HTMLElement))return console.warn(`Se esperaba un elemento html y se recibió ${$container}`)

    let isOpen = config.open

    const containerHeight = $container.getBoundingClientRect().height
    const $marker = $container.querySelector('.weeklyWeather-marker')    
    const markerHeight = $marker.getBoundingClientRect().height
    let initialPositionY = 0
    let finalPositionY = 0
    let widgetPosition = 0
    let areaRestada = containerHeight - markerHeight    

    let isDragging = false    

    isOpen ? setVisible():unsetVisible()        
    
    $marker.addEventListener('click', () => {        
        if(!isDragging){
            if(!isOpen){                
                setVisible()
            } else {                            
                unsetVisible()
            }            
        }
    })
    $marker.addEventListener('pointerdown', handlePointerDown)
    $marker.addEventListener('pointerup', handlePointerUp)
    $marker.addEventListener('pointerout', handlePointerOut)
    $marker.addEventListener('pointercancel', handlePointerCancel)
    $marker.addEventListener('pointermove', handlePointerMove)
    

    function handlePointerDown(event){
        // toma la posición incial
        isDragging = true
        initialPositionY = event.pageY || event.touches[0].pageY                
    }
    function handlePointerUp(event){
        stopDragAndBounce()
    }
    function handlePointerOut(event){
        stopDragAndBounce()
    }
    function handlePointerCancel(event){
        stopDragAndBounce()
    }
    function handlePointerMove(event){
        // toma la posición final        
        finalPositionY = event.pageY || event.touches[0].pageY
        // calculatePosition()        
        const areaFinal = finalPositionY - initialPositionY        
        initialPositionY = finalPositionY 
        widgetPosition = widgetPosition + areaFinal
        logger(`Esta es la posición del widget ${widgetPosition} y este es el container height ${areaRestada}`)
        if(widgetPosition > areaRestada) {
            return false     
        }
        setWidgetPositon(widgetPosition)                   
    }

    function setVisible(){                   
        isOpen = true
        setWidgetPositon(0)        
    }

    function unsetVisible(){
        isOpen = false        
        setWidgetPositon(areaRestada)        
    }

    function setWidgetPositon(value){
        $container.style.marginBottom = `-${value}px`
    }    

    function stopDragAndBounce(){        
        isDragging = false
        bounce()
        if(widgetPosition > containerHeight / 2){
            unsetVisible()
        } else {
            setVisible()
        }        
    }

    function bounce(){
        $container.style.transition = 'margin-bottom .3s'        
    }

    function logger(message){
        if(config.debug) console.info(message)
    }
}