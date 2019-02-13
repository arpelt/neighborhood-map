import React, { Component } from 'react'
import escapeRegExp from 'escape-string-regexp'
import './App.css'

class Search extends Component {
  constructor(props) {
    super(props)
    this.handleSearch = this.handleSearch.bind(this)
  }

  handleSearch = (query) => {
    let filteredSations = this.props.initialStations
    const match = new RegExp(escapeRegExp(query), 'i')
    filteredSations = filteredSations.filter((station) => match.test(station.name))
    this.props.searchResult(filteredSations)
  }

  render() {
    return (
      <div className="search-container">
        <input aria-label="Search"
            type="text"
            placeholder="Search..."
            onChange={(event) => this.handleSearch(event.target.value)}
          />
      </div>
    );
  }
}

export default Search;
