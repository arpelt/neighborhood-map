# Neighborhood Map Project

With this application you can see real-time information on departing trains a specific station. (Note a very limited number of train stations supported).

## Table of Contents

* [Installation](#install)
* [Dependencies](#depend)

<a name="install"></a>
## Installation
* Go to the folder where you want to store project and use git clone to clone project.
```
$ git clone https://github.com/arpelt/neighborhood-map.git
```
Or press the "Clone or download" button and select "Download ZIP".
* Install all project dependencies with `npm install`
* Start the development server with `npm start`

***Note: The Service Worker works only in the production build.***  
* To create a production build, use `npm run build`

<a name="depend"></a>
## Dependencies
* [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/tutorial)
* [Railway traffic API](https://rata.digitraffic.fi/swagger/index.html)  
