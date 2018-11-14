import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  return (
    <div>
      <p>React here!</p>
        <div className={'bg-success'}>check this out</div>
    </div>
  )
}

export default App

ReactDOM.render(<App />, document.getElementById('app'))
