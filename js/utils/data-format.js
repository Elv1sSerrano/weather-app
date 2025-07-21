const configDate = {
    day:'numeric',
    weekday:'long',
    month:'long',
}

export function dateFormat(date, config = configDate){    
    return new Intl.DateTimeFormat('es', config).format(date)
}

export function tempFormat(temp){
    return Math.floor(temp)
}

export function weeklyWeatherFormat(rawData){
    const daysList = []
    let hoursList = []
    rawData.forEach((element, index) => {
        hoursList.push(element)
        if ((index + 1) % 8 === 0){
            daysList.push(hoursList)
            hoursList = []
        }
    });
    return daysList
}
