import React, {Component} from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import toastMessageData from './selector'
import {displayToastMessage} from './redux/actions'

class ToastComponent extends Component {
    static propTypes = {
      // loginId: PropTypes.string
    }

    render () {
      return (
        <div
          style={{
            position: 'absolute',
            right: '10px',
            backgroundColor: 'red',
            padding: '10px 20px 10px 20px'
          }}>
                this is the error
        </div>
      )
    }
}

export default connect(toastMessageData, {displayToastMessage})(ToastComponent)
