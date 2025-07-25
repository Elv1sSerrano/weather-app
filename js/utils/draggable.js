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
        logger('Click event fired');
        if(!isDragging){
            if(!isOpen){
                logger('ya está abierto')
                setVisible()
            } else {
                logger('ya no está abierto')                
                unsetVisible()
            }
            logger(`Estado de isOpen después del clic: ${isOpen}`);
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
        setWidgetPositon(widgetPosition)        
    }

    function setVisible(){                   
        isOpen = true
        setWidgetPositon(0)
        logger(` ${isDragging} is dragging de set visible`)        
        logger(` ${isOpen} is open de set visible`)        
        logger(`El elemento es visible`)
    }

    function unsetVisible(){
        isOpen = false        
        setWidgetPositon(areaRestada)
        logger(` ${isDragging} is dragging de unset visible`)        
        logger(` ${isOpen} is open de set visible`)        
        logger(`El elemento no es visible`)
    }

    function setWidgetPositon(value){
        $container.style.marginBottom = `-${value}px`
    }    

    function stopDragAndBounce(){
        logger ('stop drag and bounce executed')
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