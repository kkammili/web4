import React, {Component} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Home from '../src/modules/Home/components/Home'
import Git from '../src/modules/Git/components/GitDisplay'
import CreateNewUser from '../src/modules/mongo/components/CreateNewUser'

class AppRouter extends Component {
  render () {
    return (
      <Router>
        <React.Fragment>
          <Route exact path={`/`} component={Home} />
          <Route path={'/mongo/createNewUser'} component={CreateNewUser} />
          <Route path={'/git'} component={Git} />
        </React.Fragment>
      </Router>
    )
  }
}

export default AppRouter
