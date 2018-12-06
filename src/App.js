import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import axios from 'axios'

class App extends Component {
  componentDidMount () {
    axios.get('http://localhost:3000/users')
      .then((res) => {
        // console.log(res, '<---- resp check over here')
      })
      .catch((err) => {
        // console.log(err, '<---- error check over here')
      })
  }
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
