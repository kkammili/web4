import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import toastMessageData from './selector'
import {displayToastMessage, clearToastMessage} from './redux/actions'
import {Map} from 'immutable'

const styles = {
  success: {
    backgroundColor: '#00AC3E'
  },
  warning: {
    backgroundColor: '#FFBC3D'
  },
  error: {
    backgroundColor: '#ED7000'
  },
  info: {
    backgroundColor: '#0088CE'
  }
}

const getStyle = (type) => {
  return {
    textAlign: 'center',
    padding: '10px',
    margin: '0.5em 0em',
    color: 'white',
    minWidth: '264px',
    ...styles[type]
  }
}

class Message extends Component {
    static propTypes = {
      message: PropTypes.string,
      style: PropTypes.string,
      index: PropTypes.string,
      clearToastMessage: PropTypes.func
    }
    componentDidMount () {
      let timer = null
      if (this.props.index) {
        const index = parseInt(this.props.index)
        timer = 10000 * (index + 1)
        setTimeout(() => {
          this.props.clearToastMessage(index)
        }, timer)
      }
    }

    render () {
      const {message, style} = this.props
      return (
        <i
          style={getStyle(style || 'success')}
        >
          {message}
          {/* <TimesCircleO */}
          {/* onClick={this.handleCloseClick} */}
          {/* style={{height: '25px', width: '25px', cursor: 'pointer', position: 'relative', bottom: '1px'}} */}
          {/* className={'pl-2'} */}
          {/* /> */}
        </i>
      )
    }
}

class ToastComponent extends Component {
    static propTypes = {
      toastMessage: PropTypes.instanceOf(Map),
      clearToastMessage: PropTypes.func
    }

    render () {
      const {toastMessage} = this.props
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          top: '50px',
          right: '10px'}}
        >
          {
            toastMessage && toastMessage.map((message, index) => {
              return (
                <Message
                  message={message.get('message')}
                  key={message.get('id')}
                  style={message.get('style')}
                  index={index.toString()}
                  {...this.props}
                />
              )
            }).toList()
          }
        </div>
      )
    }
}

export default connect(toastMessageData, {displayToastMessage, clearToastMessage})(ToastComponent)
