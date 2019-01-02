import React, {Component} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Home from '../src/modules/Home/components/Home'
import Git from '../src/modules/Git/components/GitDisplay'
import Bio from '../src/modules/Bio/components/Bio'
import CreateNewUser from './modules/Mongo/components/CreateNewUser'
import ToastComponent from '../src/modules/ToastMessages/ToastComponent'

class AppRouter extends Component {
  render () {
    return (
      <Router>
        <React.Fragment>
          <ToastComponent />
          <Route exact path={`/`} component={Home} />
          <Route path={'/mongo'} component={CreateNewUser} />
          <Route path={'/git'} component={Git} />
          <Route path={'/bio'} component={Bio} />
        </React.Fragment>
      </Router>
    )
  }
}

export default AppRouter
