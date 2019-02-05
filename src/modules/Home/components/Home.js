import React, {Component} from 'react'
import {connect} from 'react-redux'

// TODO watch bootstrap media queries

export class Home extends Component {
  render () {
    return (
      <div className={'h-100 container-fluid bg-dark'}>
        <div className={'row'}>
          <div className={'col pt-4 pl-4 h4 font-weight-bold text-info'}>
                  Hit /git route for redirecting to git fetcher project
          </div>
        </div>
        <div className={'row'}>
          <div className={'col pt-4 pl-4 h4 font-weight-bold text-danger'}>
                  Hit /mongo and connect to mongo db for posting and getting user
          </div>
        </div>
        <div className={'row'}>
          <div className={'col pt-4 pl-4 h4 font-weight-bold text-danger'}>
                  Hit /bio for seeing my developement skills
          </div>
        </div>
      </div>
    )
  }
}

export default connect()(Home)
