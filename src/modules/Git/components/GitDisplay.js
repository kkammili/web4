import React, {Component, createRef} from 'react'
import {fetchGitHubData} from '../redux/actions'
import {gitHubData} from '../selectors'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Map} from 'immutable'
import 'bootstrap'

export class GitDisplay extends Component {
  constructor (props) {
    super(props)
    this.state = {
      userName: null,
      errors: ''
    }
    this.inputBox = createRef()
  }
  fetchGitData =() => {
    this.inputBox.current.value = '' // empties the input box
    this.props.fetchGitHubData(this.state.userName).then((res) => {
      if (res.type === 'ERROR_FETCHING_USER') {
        this.setState({
          errors: res.error.errors.message
        })
      }
    })
  }

  render () {
    return (
      <div className={'container-fluid'}>
        <div className={'row pt-5 h2 justify-content-center text-dark font-weight-bold'}>
            Git Hub User Details Displayer
        </div>

        <div className={'row pt-4 pb-5 justify-content-md-center align-items-center'}>
          <input
            placeholder={'Enter git username and hit enter'}
            className={'col-2'}
            onChange={(e) => this.setState({userName: e.target.value})}
            ref={this.inputBox}
          />
          <div className={'p-1'} />
          <button
            className={'col-2 justify-content-center  btn btn-dark'}
            onClick={this.fetchGitData}
          >Click Me</button>
        </div>
        {
          this.state.errors || (this.props.gitData.size > 0 && !this.props.gitData.get('name')) &&
            <div className={'alert alert-danger text-center'}>Error occoured {this.state.errors}</div>
        }

        {
          this.props.gitData.size > 0 &&
          this.props.gitData.get('name') &&
              !this.state.errors &&
          (
            <div style={{border: '2px solid black'}}>
              <div className={'row justify-content-center pt-4'}>
                <img
                  style={{width: '50px', height: '200px', marginRight: '200px'}}
                  src={this.props.gitData.get('avatar_url')}
                  className={'col-2 font-weight-bold'}
                />
              </div>

              <div className={'row justify-content-center pt-4'}>
                <div className={'col-2 font-weight-bold'}>Name:</div>
                <div className={'col-2 font-weight-bold'}>{this.props.gitData.get('name')}</div>
              </div>
              <div className={'row justify-content-center pt-4'}>
                <div className={'col-2 font-weight-bold'}>Company:</div>
                <div className={'col-2 font-weight-bold'}>{this.props.gitData.get('company')}</div>
              </div>
              {
                this.props.gitData.get('bio') && (
                  <div className={'row justify-content-center pt-4'}>
                    <div className={'col-2 font-weight-bold'}>Bio:</div>
                    <div className={'col-2 font-weight-bold'}>{this.props.gitData.get('bio')}</div>
                  </div>
                )
              }

              {
                this.props.gitData.get('email') && (
                  <div className={'row justify-content-center pt-4'}>
                    <div className={'col-2 font-weight-bold'}>Email:</div>
                    <div className={'col-2 font-weight-bold'}>{this.props.gitData.get('email')}</div>
                  </div>
                )
              }

            </div>
          )
        }

      </div>
    )
  }
}

GitDisplay.propTypes = {
  fetchGitHubData: PropTypes.func,
  gitData: PropTypes.instanceOf(Map)
}

export default connect(gitHubData, {fetchGitHubData})(GitDisplay)
