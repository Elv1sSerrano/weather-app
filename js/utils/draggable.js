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

    isOpen ? setVisible():unsetVisible(areaRestada)        
    
    $marker.addEventListener('click', () => {
        if(!isDragging){
            if(!isOpen){
                logger('ya está abierto')
                return setVisible(0)
            } else {
                logger('ya no está abierto')
                logger(areaRestada)
                return unsetVisible(areaRestada)
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
        
    }
    function handlePointerOut(event){

    }
    function handlePointerCancel(event){

    }
    function handlePointerMove(event){
        // toma la posición final        
        finalPositionY = event.pageY || event.touches[0].pageY
        // calculatePosition()        
        const areaFinal = finalPositionY - initialPositionY        
        initialPositionY = finalPositionY 
        widgetPosition = widgetPosition + areaFinal
        setWidgetPositon(widgetPosition)
    }

    function setVisible(value){                   
        $container.style.marginBottom = `-${value}px`
        isOpen = true
        logger(`El elemento es visible`)
    }

    function unsetVisible(value){
        $container.style.marginBottom = `-${value}px`
        isOpen = false
        logger(`El elemento no es visible`)
    }

    function setWidgetPositon(value){
        $container.style.marginBottom = `-${value}px`
    }    

    function logger(message){
        if(config.debug) console.info(message)
    }
}