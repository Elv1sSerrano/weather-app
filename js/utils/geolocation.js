function getBrowserAvailability () {
    if ('geolocation' in navigator){
        return true
    }
    return false
}

const configGeolocation = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 100000
}

function getPosition(config = configGeolocation){
    if(!getBrowserAvailability()) throw new Error('No hay soporte de geolocalización en el navegador')

    return new Promise ((resolve, reject) => {
            navigator.geolocation.getCurrentPosition((position) => {
            console.log(position)            
            resolve (position)
        }, () => {
            reject('No se ha podido obtener la ubicación')
        }, config)
    })    
}

export async function getLatLon(config = configGeolocation) {    
    try {
        const {coords: {latitude: lat, longitude: lon} } = await getPosition(config)
        return {lat, lon, isError: false}   
    } catch (error) {
        return {lat: null, lon: null, isError: true}        
    }    
}


