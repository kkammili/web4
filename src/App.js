import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import AppRouter from './AppRouter'
import {Provider} from 'react-redux'
import store from './redux/store'
import 'bootstrap'


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
