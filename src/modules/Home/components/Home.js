import React, {Component} from 'react'
import {connect} from 'react-redux'

export class Home extends Component {
  render () {
    return (
      <div className={'container'}>
        <div className={'row'}>
          <div className={'col'}>
                  Hit /git for redirecting to git fetcher project
          </div>
        </div>
      </div>
    )
  }
}

export default connect()(Home)
