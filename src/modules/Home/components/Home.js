import React, {Component} from 'react'
import {connect} from 'react-redux'

export class Home extends Component {
  render () {
    return (
      <div style={{height: '1000px'}} className={'container-fluid bg-dark'}>
        <div className={'row'}>
          <div className={'col pt-4 pl-4 h4 font-weight-bold text-info'}>
                  Hit /git route for redirecting to git fetcher project
          </div>
        </div>
        <div className={'row'}>
          <div className={'col pt-4 pl-4 h4 font-weight-bold text-danger'}>
                  other projects coming soon
          </div>
        </div>
      </div>
    )
  }
}

export default connect()(Home)
