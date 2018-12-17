import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {createNewUser, fetchAllUsers} from '../redux/actions'

export class CreateNewUser extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: null,
      email: null
    }
  }

  static propTypes = {
    createNewUser: PropTypes.func,
    fetchAllUsers: PropTypes.func
  }

  submit=() => {
    this.props.createNewUser(this.state.name, this.state.email)
  }

    fetchUsersData=() => {
      this.props.fetchAllUsers().then((res) => {
        // console.log(res, '<--- resp occouring in promise')
      })
    }

    render () {
      return (
        <div className={'container-fluid'}>
          <form className={'align-items-center'}>
            <div className='form-group'>
              <label htmlFor='name'>Name</label>
              <input type='name' className='form-control' id='name' aria-describedby='name'
                placeholder='Enter name' onChange={(e) => this.setState({name: e.target.value})} />
              <small id='nameHelp' className='form-text text-muted'>Enter your name here
                    else.
              </small>
            </div>

            <div className='form-group'>
              <label htmlFor='exampleInputEmail1'>Email address</label>
              <input type='email' className='form-control' id='exampleInputEmail1' aria-describedby='emailHelp'
                placeholder='Enter email' onChange={(e) => this.setState({email: e.target.value})} />
              <small id='emailHelp' className='form-text text-muted'>We'll never share your email with anyone
                            else.
              </small>
            </div>
            <button type='submit' onClick={this.submit} className='btn btn-primary'>Submit</button>
            <button onClick={this.fetchUsersData} className='btn btn-secondary'>Fetch Data</button>
          </form>
        </div>
      )
    }
}

export default connect(null, {createNewUser, fetchAllUsers})(CreateNewUser)
