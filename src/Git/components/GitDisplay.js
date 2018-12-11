import React, {Component} from 'react'
import {fetchGitHubData} from '../redux/actions'
import {gitHubData} from '../selectors'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Map} from 'immutable'

export class GitDisplay extends Component {
  componentDidMount () {
    const userName = 'Raju10100'
    this.props.fetchGitHubData(userName)
  }

  render () {
    // console.log(this.props.gitData.toJS(), '<---- props check over here')
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

GitDisplay.propTypes = {
  fetchGitHubData: PropTypes.func,
  gitData: PropTypes.instanceOf(Map)
}

export default connect(gitHubData, {fetchGitHubData})(GitDisplay)
