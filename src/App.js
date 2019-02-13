import React, { Component } from 'react'
import Header from './Header'
import MapContainer from './Map'
import './App.css'

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <MapContainer />
      </div>
    )
  }
}

export default App
