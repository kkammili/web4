import React, {useState, useEffect, createRef} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {compose, withProps} from 'recompose'
import mapStyles from './mapStyles'
import {fetchMeteoriteData, fetchLatLng} from '../redux/actions'
import {withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow} from 'react-google-maps'
import MarkerClusterer from 'react-google-maps/lib/components/addons/MarkerClusterer'
const asteroid = require('../asteroid.png')
require('./mapTableStyles.css')
const {SearchBox} = require('react-google-maps/lib/components/places/SearchBox')
const apiKey = require('../../../../env.js').apiKey

export function GoogleMapsComp ({fetchMeteoriteData, bounds, fetchLatLng}) {
  const searchPlace = createRef()
  const googleMapRef = createRef()
  const [zoom, setZoom] = useState(2)
  const [meteorites, setMeteorites] = useState([])
  const [selectedMarker, setSelectedMarker] = useState(false)
  const [hoveringMarker, setHoveringMarker] = useState(false)
  const [pointPlace, setPointPlace] = useState(false)
  const [selectedPointPlace, setSelectedPointPlace] = useState(false)

  useEffect(() => {
    fetchMeteoriteData().then(res => {
      setMeteorites(res.data)
    })
  }, [])

  return (
    <div>
      <GoogleMap
        defaultZoom={zoom}
        zoom={zoom}
        defaultCenter={{
          lat: 10,
          lng: 32
        }}
        onZoomChanged={() => {
          setSelectedMarker(false)
          setHoveringMarker(false)
          setSelectedPointPlace(false)
          // setPointPlace(false)
        }}
        ref={googleMapRef}
        options={{styles: mapStyles, disableDefaultUI: true, zoomControl: true, minZoom: 2}}
      >
        <div style={{position: 'absolute', top: 15, right: 15, zIndex: 20, display: 'flex', height: 73}}>
          <h5 style={{display: 'flex', alignSelf: 'center'}}>Meteorites</h5>
          <img style={{height: 50, width: 50}} src={asteroid} alt={'asteroid image'} />
        </div>
        <SearchBox
          bounds={bounds}
          controlPosition={google.maps.ControlPosition.TOP_LEFT}   //eslint-disable-line
          onPlacesChanged={() => {
            let address = searchPlace.current.value
            fetchLatLng(address, apiKey).then(res => {
              let location = res.coords.geometry.location
              googleMapRef.current.panTo(location) // Make map global
              setZoom(14)
              setPointPlace({...location, address})
            })
          }}
        >
          <input
            type='search'
            className={'searchMoveRight'}
            placeholder='search ....'
            ref={searchPlace}
            style={{
              boxSizing: `border-box`,
              border: `1px solid transparent`,
              width: `240px`,
              height: `32px`,
              marginTop: `27px`,
              padding: `0 12px`,
              borderRadius: `3px`,
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
              fontSize: `14px`,
              outline: `none`,
              textOverflow: `ellipses`
            }}
          />
        </SearchBox>
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
                  icon={
                    ((hoveringMarker.name === meteorite.name) || (selectedMarker.name === meteorite.name))
                      ? {
                        url: asteroid,
                        scaledSize: new window.google.maps.Size(60, 60),
                        origin: new window.google.maps.Point(0, 0),
                        anchor: new window.google.maps.Point(30, 30)
                      }
                      : {
                        url: asteroid,
                        scaledSize: new window.google.maps.Size(30, 30),
                        origin: new window.google.maps.Point(0, 0),
                        anchor: new window.google.maps.Point(15, 15)
                      }
                  }
                  key={meteorite.name}
                  position={{lat: parseFloat(geolocation.latitude), lng: parseFloat(geolocation.longitude)}}
                  onClick={() => setSelectedMarker(meteorite)}
                  onMouseOver={() => setHoveringMarker(meteorite)}
                  onMouseOut={() => setHoveringMarker(false)}
                  name={meteorite.name}
                />
              )
            }
          })}
        </MarkerClusterer>

        {selectedMarker && (
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
                  <td>{
                    selectedMarker &&
                      selectedMarker.mass.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} gms
                  </td>
                </tr>
              </tbody>
            </table>
          </InfoWindow>
        )}

        {pointPlace && (
          <Marker
            position={{lat: parseFloat(pointPlace.lat), lng: parseFloat(pointPlace.lng)}}
            onClick={() => setSelectedPointPlace(true)}
          />
        )}

        {
          selectedPointPlace && (
            <InfoWindow
              options={{pixelOffset: new window.google.maps.Size(0, -40)}}

              position={{
                lat: pointPlace && parseFloat(pointPlace.lat),
                lng: pointPlace && parseFloat(pointPlace.lng)
              }}
              onCloseClick={() => setSelectedPointPlace(false)}
            >
              <table>
                <tbody>
                  <tr>
                    <td>Address:</td>
                    <td>{pointPlace && pointPlace.address}</td>
                  </tr>
                  <tr>
                    <td>Latitude:</td>
                    <td>{pointPlace.lat}</td>
                  </tr>
                  <tr>
                    <td>Longitude:</td>
                    <td>{pointPlace.lng}</td>
                  </tr>
                </tbody>
              </table>
            </InfoWindow>
          )
        }

      </GoogleMap>
    </div>
  )
}

GoogleMapsComp.propTypes = {
  fetchMeteoriteData: PropTypes.func,
  fetchLatLng: PropTypes.func,
  bounds: PropTypes.object
}

const WrappedMap = compose(
  withProps({
    googleMapURL:
            `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{height: `100%`}} />,
    containerElement: <div style={{height: `100vh`}} />,
    mapElement: <div style={{height: `100%`}} />
  }),
  connect(null, {fetchMeteoriteData, fetchLatLng}),
  withScriptjs,
  withGoogleMap
)(GoogleMapsComp)

export default WrappedMap
// const WrappedMap = connect(null, fetchMeteoriteData)(withScriptjs(withGoogleMap(GoogleMapsComp)))
// export default
