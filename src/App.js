import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import AppRouter from './AppRouter'
import {Provider} from 'react-redux'
import store from './redux/store'
import Bootstrap from '../node_modules/bootstrap/dist/css/bootstrap.css' //eslint-disable-line

class App extends Component {
  render () {
    return (
      <div>
        <Provider store={store}>
          <AppRouter />
        </Provider>
      </div>
    )
  }
}

ReactDOM.render(
  <App />
  , document.getElementById('app')
)
