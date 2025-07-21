import { API_KEY, BASE_API, TEMP_API } from "../constants.js"

export async function getWeatherapiInformation (lat, lon) {
    const response = await fetch (`${BASE_API}weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${TEMP_API}`)        
    if (!response) {
        return {isError: true, data: null}
    }
    const data = await response.json()
    return {isError:false, data:data}
}

export async function getWeeklyWeatherapiInformation (lat, lon) {
    const response = await fetch (`${BASE_API}forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${TEMP_API}`)        
    if (!response) {
        return {isError: true, data: null}
    }
    const data = await response.json()
    return {isError:false, data:data}
}