import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {createNewUser, fetchAllUsers} from '../redux/actions'
import {allUsersData} from '../selectors'
import {List} from 'immutable'

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
    fetchAllUsers: PropTypes.func,
    allUsers: PropTypes.instanceOf(List)
  }

  submit=() => {
    this.props.createNewUser(this.state.name, this.state.email)
  }

    fetchUsersData=() => {
      this.props.fetchAllUsers().then((res) => {
      })
    }

    styleHeader = {
      border: '1px solid #dddddd',
      textAlign: 'left',
      padding: '8px'
    }

    render () {
      return (
        <div className={'container-fluid'}>
          <div className={'align-items-center'}>
            <div className='form-group'>
              <label htmlFor='name'>Enter Username and email to post it:</label>
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
            <button onClick={this.submit} className='btn btn-primary'>Submit</button>
          </div>
          <div className={'form-group pt-4'}>
            <label htmlFor='fetchAllUser'>Fetch All Users /get</label>
          </div>
          <button onClick={this.fetchUsersData} className='btn btn-secondary'>Show Users</button>

          <div className={'pt-4'}>
            {this.props.allUsers.size > 0 && (
              <table style={{width: '100%'}}>
                <tbody>
                  <tr>
                    <th style={this.styleHeader}>Name:</th>
                    <th style={this.styleHeader}>Email:</th>
                  </tr>
                  {this.props.allUsers.map((eachUser, index) => {
                    return (
                      <tr style={index % 2 === 0 ? {backgroundColor: '#dddddd'} : null} key={eachUser.get('_id')}>
                        <td style={this.styleHeader}>
                          {eachUser.get('name')}
                        </td>
                        <td style={this.styleHeader}>
                          {eachUser.get('email')}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            )}
          </div>

          <div className={'form-group pt-4'}>
              <label htmlFor='fetchAllUser'>Fetch All Users /get</label>

          </div>

        </div>
      )
    }
}

export default connect(allUsersData, {createNewUser, fetchAllUsers})(CreateNewUser)
