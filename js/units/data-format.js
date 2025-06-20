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

