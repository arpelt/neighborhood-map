import React, { Component } from 'react'
import './App.css';

class Sidebar extends Component {

  onSideBarClick = this.onSideBarClick.bind(this)

  onStatioKeyPress = (event, stationData) => {
    if (event.key === 'Enter') {
      this.props.markerAnimation(stationData)
      this.props.onStationClick(stationData)
    }
  }

  onSideBarClick(e, stationData) {
    this.props.markerAnimation(stationData)
    this.props.onStationClick(stationData)
  }

  render() {
    return (
      <div className="sidebar-container">
        <ol tabIndex="0" className="sidebar">
          {this.props.stations.map((station) => (
            <li tabIndex="0"
              key={station.code}
              onClick={e => this.onSideBarClick(e, station)}
              onKeyPress={(e) => this.onStatioKeyPress(e, station)}
            >
              {station.name} </li>
          ))}
        </ol>
      </div>
    )
  }
}

export default Sidebar
