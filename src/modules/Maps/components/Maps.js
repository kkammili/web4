import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Map, Marker, Popup, TileLayer} from 'react-leaflet'

const position = [16.5283, 81.3832]

export class Maps extends Component {
    static propTypes = {
      loginId: PropTypes.string
    }

    render () {
      return (
        <div>
          <Map center={position} zoom={13} style={{height: '100vh', width: '100%'}}>
            <TileLayer
              url='https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png'
              attribution='&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors'
            />
            <Marker position={position}>
              <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
            </Marker>
          </Map>
        </div>
      )
    }
}

export default connect()(Maps)
