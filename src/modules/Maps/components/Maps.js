import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import mapStyles from './mapStyles'
import {fetchMeteoriteData} from '../redux/actions'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'
import supercluster from 'points-cluster'
const sun = require('../sun.png')
require('./mapTableStyles.css')

export class Maps extends Component {
    static propTypes = {
      fetchMeteoriteData: PropTypes.func,
      google: PropTypes.object
    }

    state ={
      meteorites: [],
      selectedMarker: false,
      zoom: 2
    }

    onMapLoaded (mapProps, map) {
      map.setOptions({
        styles: mapStyles
      })
      this.props.fetchMeteoriteData().then(res => {
        this.setState({
          meteorites: res.data
        })

        // let markers = res.data.filter(function(meteorite, i) {
        //     let lat = meteorite.geolocation && meteorite.geolocation.latitude
        //     let lng = meteorite.geolocation && meteorite.geolocation.longitude
        //     if(lat && lng){
        //         return new google.maps.Marker({
        //             position: {lat:parseInt(lat), lng:parseInt(lng)},
        //             label: 'label' + i
        //         });
        //     }
        // });
        //
        // let markerCluster = new MarkerClusterer(map, markers, {
        //     imagePath:
        //         "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m"
        // });
        //
        //  console.log(markerCluster, '<---- check the marker')
      })
    }

    render () {
      let {meteorites, selectedMarker} = this.state
      return (
        <div>
          <Map
            google={this.props.google}
            zoom={this.state.zoom || 2}
            initialCenter={{
              lat: 10,
              lng: 32
            }}
            onReady={(mapProps, map) => this.onMapLoaded(mapProps, map)}
          >
            {meteorites.length && meteorites.map((eachMeteorite) => {
              let geolocation = eachMeteorite.geolocation
              // console.log(eachMeteorite.mass, '<---- mass of each meteorite')
              if (geolocation) {
                return (
                  <Marker
                    icon={{
                      url: sun,
                      scaledSize: new window.google.maps.Size(20, 20),
                      origin: new window.google.maps.Point(0, 0),
                      anchor: new window.google.maps.Point(10, 10)
                    }}
                    key={eachMeteorite.name}
                    position={{lat: geolocation.latitude, lng: geolocation.longitude}}
                    onClick={() => {
                      this.setState({
                        selectedMarker: eachMeteorite
                      })
                    }}
                    name='My Marker'
                    marker={eachMeteorite.name}
                  />
                )
              }
            })}
            <InfoWindow
              visible={Boolean(this.state.selectedMarker)}
              position={{
                lat: parseInt(selectedMarker && selectedMarker.geolocation.latitude),
                lng: parseInt(selectedMarker && selectedMarker.geolocation.longitude)
              }}
              onCloseClick={() => this.setState({selectedMarker: false})}
            >
              <table>
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
              </table>
            </InfoWindow>
          </Map>
        </div>
      )
    }
}

// export default

export default connect(null, {fetchMeteoriteData})(
  GoogleApiWrapper({
    apiKey: 'AIzaSyA2zjNmUWOFkH-SFv7CsyEhGvEwV_Dzu7M',
    loadingElement: <div style={{height: `100%`}} />,
    containerElement: <div style={{height: `400px`}} />,
    mapElement: <div style={{height: `100%`}} />
  })(Maps)
)
