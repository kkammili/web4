import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {compose, withProps} from 'recompose'
import mapStyles from './mapStyles'
import {fetchMeteoriteData} from '../redux/actions'
import {withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow} from 'react-google-maps'
import MarkerClusterer from 'react-google-maps/lib/components/addons/MarkerClusterer'
const sun = require('../asteroid.png')
require('./mapTableStyles.css')
const apiKey = require('../../../../env.js').apiKey

export function GoogleMapsComp ({fetchMeteoriteData}) {
  const [zoom, setZoom] = useState(2)
  const [meteorites, setMeteorites] = useState([])
  const [selectedMarker, setSelectedMarker] = useState(false)

  useEffect(() => {
    fetchMeteoriteData().then(res => {
      setMeteorites(res.data)
    })
  }, [])

  return (
    <div>
      <GoogleMap
        defaultZoom={zoom}
        defaultCenter={{
          lat: 10,
          lng: 32
        }}
        options={{styles: mapStyles, disableDefaultUI: true, zoomControl: true}}
      >
        <MarkerClusterer
          averageCenter
          enableRetinaIcons
          gridSize={60}
        >
          {meteorites.length && meteorites.map((meteorite) => {
            let geolocation = meteorite.geolocation
            if (geolocation) {
              return (
                <Marker
                  icon={{
                    url: sun,
                    scaledSize: new window.google.maps.Size(30, 30),
                    origin: new window.google.maps.Point(0, 0),
                    anchor: new window.google.maps.Point(15, 15)
                  }}
                  key={meteorite.name}
                  position={{lat: parseFloat(geolocation.latitude), lng: parseFloat(geolocation.longitude)}}
                  onClick={() => setSelectedMarker(meteorite)}
                  name={meteorite.name}
                  // marker={meteorite.name}
                />
              )
            }
          })}
        </MarkerClusterer>

        {selectedMarker ? (
          <InfoWindow
            position={{
              lat: parseFloat(selectedMarker && selectedMarker.geolocation.latitude),
              lng: parseFloat(selectedMarker && selectedMarker.geolocation.longitude)
            }}
            onCloseClick={() => setSelectedMarker(false)}
          >
            <table>
              <tbody>
                <tr>
                  <td>Name:</td>
                  <td>{selectedMarker && selectedMarker.name}</td>
                </tr>
                <tr>
                  <td>Year:</td>
                  <td>
                    {selectedMarker.year ? selectedMarker.year.split('T')[0] : 'Not Available'}
                  </td>
                </tr>
                <tr>
                  <td>Mass:</td>
                  <td>{selectedMarker && selectedMarker.mass}</td>
                </tr>
              </tbody>
            </table>
          </InfoWindow>
        ) : null}

      </GoogleMap>
    </div>
  )
}

GoogleMapsComp.propTypes = {
  fetchMeteoriteData: PropTypes.func
}

const WrappedMap = compose(
  withProps({
    googleMapURL:
            `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{height: `100%`}} />,
    containerElement: <div style={{height: `100vh`}} />,
    mapElement: <div style={{height: `100%`}} />
  }),
  connect(null, {fetchMeteoriteData}),
  withScriptjs,
  withGoogleMap
)(GoogleMapsComp)

export default WrappedMap
// const WrappedMap = connect(null, fetchMeteoriteData)(withScriptjs(withGoogleMap(GoogleMapsComp)))
// export default
