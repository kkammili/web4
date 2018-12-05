import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'

class App extends Component {
  render () {
    return (
      <div className={'container-fluid'}>
        <div className={'row'}>
          <div className={'col bg-success'}>check this</div>
          <div className={'col bg-warning'}>out!!!</div>
        </div>
      </div>
    )
  }
}

export default connect(null, null)(App)

ReactDOM.render(<App />, document.getElementById('app'))
