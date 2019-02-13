const api = 'https://rata.digitraffic.fi/api/v1/live-trains/station/'
//LPV/HKI

export function getTrains(departureStation, arrivalStation) {
    return fetch(`${api}${departureStation}/${arrivalStation}`)
        .then(function (response) {
            if (response.ok) {
                return response.json()
            }
            console.log('Network response was not ok.')
        })
        .then(function (json) {
            return json
        })
        .catch(function (error) {
            console.log('Request failed', error)
        })
}