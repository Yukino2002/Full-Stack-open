import React from 'react'
import ReactDOM from 'react-dom/client'

import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const update = type => {
    store.dispatch({
      type
    })
  }

  return (
    <div>
      <button onClick={() => update('GOOD')}>good</button>
      <button onClick={() => update('OK')}>ok</button>
      <button onClick={() => update('BAD')}>bad</button>
      <button onClick={() => update('ZERO')}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
