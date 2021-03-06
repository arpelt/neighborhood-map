import React, { Component } from 'react'
import { Map, Marker, InfoWindow, GoogleApiWrapper } from 'google-maps-react'
import Sidebar from './Sidebar'
import Search from './Search'
import { departureTrains } from './common'
import './App.css'

const stations = require('./locations.json')

export class MapContainer extends Component {

    constructor(props) {
        super(props)

        this.state = {
            showingInfoWindow: false,
            stations: [],
            query: [],
            position: { lat: 60.203596, lng: 24.907694 },
            name: '',
            stationTrains: [],
            initialStations: [],
        }
    }

    componentDidMount() {
        this.setState({ stations: stations })
        this.setState({ initialStations: stations })
    }

    searchResult = (query) => {
        if (query) {
            this.setState({ stations: query })
            this.setState({ showingInfoWindow: false })
            for (let i = 0; i < stations.length; i++) {
                delete stations[i].animation;
            }
        }
    }

//TODO: Refactor
    onStationClick = (props) => {
        if (!props.animation) {
            for (let i = 0; i < stations.length; i++) {
                delete stations[i].animation;
            }
            this.setState({ stations: stations })
        }
        
        this.setState({ stationTrains: ["Loading..."] })
        departureTrains(props).then((trains) => {
            if (trains) {
                this.setState({ stationTrains: trains })
            }
            else {
                this.setState({ stationTrains: ["Error"] })
            }
        })

        this.setState({
            position: { lat: props.position.lat, lng: props.position.lng },
            name: props.name,
            showingInfoWindow: true,
        })
    }

//TODO: Refactor
    markerAnimation = (station) => {
        for (let i = 0; i < stations.length; i++) {
            delete stations[i].animation;
        }
        for (let i = 0; i < stations.length; i++) {
            if (station.name === stations[i].name) {
                stations[i].animation = 1
            }
        }
        this.setState({ stations: stations })
    }

//TODO: Refactor
    onMapClicked = () => {
        for (let i = 0; i < stations.length; i++) {
            delete stations[i].animation;
        }
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false
            })
        }
    }

    render() {
        return (
            <div className="map-container">
                <Map
                    google={this.props.google}
                    onClick={this.onMapClicked}
                    zoom={12}
                    initialCenter={{
                        lat: 60.203596,
                        lng: 24.907694
                    }}
                >

                    {this.state.stations.map((station) => (
                        <Marker
                            key={station.code}
                            onClick={this.onStationClick}
                            name={station.name}
                            code={station.code}
                            position={{ lat: station.position.lat, lng: station.position.lng }}
                            animation={station.animation}
                        />
                    ))}
                    <InfoWindow
                        //Instead of using marker, use position (Infowindow position problem?)
                        position={{ lat: this.state.position.lat, lng: this.state.position.lng }}
                        visible={this.state.showingInfoWindow}>
                        <div>
                            <p><b>Trains from {this.state.name} to Helsinki</b></p>
                            <ul className="infoWindow">
                                {this.state.stationTrains.map((item, index) =>
                                    <li key={index}>{item}</li>
                                )}
                            </ul>
                            <p><i>Source: Traffic Management Finland / <br></br><a href="https://www.digitraffic.fi" target="_blank" rel="noopener noreferrer">digitraffic.fi</a>, lisence CC 4.0 BY</i></p>
                        </div>
                    </InfoWindow>
                    <Search
                        handleSearch={this.handleSearch}
                        searchResult={this.searchResult}
                        stations={this.state.stations}
                        initialStations={this.state.initialStations}
                    />
                    <Sidebar
                        google={this.props.google}
                        stations={this.state.stations}
                        onStationClick={this.onStationClick}
                        position={this.props.position}
                        markerAnimation={this.markerAnimation}
                    />
                </Map>
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDl5gMjMRHKlSRFKa2LZZUqGGAXb8A4_CE'
})(MapContainer);
