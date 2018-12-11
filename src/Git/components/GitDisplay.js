import React, {Component} from 'react'
import {fetchGitHubData} from '../redux/actions'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

export class GitDisplay extends Component {
    static propTypes = {
      fetchGitHubData: PropTypes.func
    }

    componentDidMount () {
      this.props.fetchGitHubData()
    }

    render () {
      return (
        <div className={'container-fluid'}>
          <div className={'row'}>
            <div className={'col bg-success'}>check this</div>
            <div className={'col bg-warning'}>out!!!</div>
          </div>
        </div>
      )
    }
}

export default connect(null, {fetchGitHubData})(GitDisplay)
