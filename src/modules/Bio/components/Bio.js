import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

export class Bio extends Component {
  static propTypes = {
    loginId: PropTypes.string
  }

  render () {
    return (
      <div>Welcome to mybio</div>
    )
  }
}

export default connect()(Bio)