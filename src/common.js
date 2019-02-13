import { getTrains } from './Api'

export function departureTrains(stationData) {
    let trains = getTrains(stationData.code, 'HKI').then((response) => {
        if (response) {
            if (response.code !== 'TRAIN_NOT_FOUND') {
                const firstTrains = trainsAmount(response)
                const results = filterTrains(firstTrains, stationData.code)
                return results
            }
        }
        console.log('Network response was not ok.')
    })
    if (trains) {
        return trains
    }
    else {
        console.log('Something went wrong.')
    }
}

function trainsAmount(response) {
    const trains = []
    for (let i = 0; i < 10; i++) { //Trains in InfoWindow
        trains.push(response[i])
    }
    return trains
}

function filterTrains(response, from) {
    let infoWindowTrains = []
    let data = ''
    for (let trains in response) {
        let train = response[trains]
        for (let stations in train.timeTableRows) {
            let station = train.timeTableRows[stations]
            if (station.type === 'DEPARTURE' && station.stationShortCode === from && train.commuterLineID !== "") {
                let time = formatDate(station.scheduledTime)
                data = "Train: " + train.commuterLineID + " " + time
                infoWindowTrains.push(data);
            }
        }
    }
    return infoWindowTrains
}

function formatDate(day) {
    let date = new Date(day)
    let options = {
        hour: '2-digit',
        minute: '2-digit',
        //second: '2-digit',
        hour12: false
    }
    let formattedTime = date.toLocaleTimeString([], options)
    return formattedTime
}
