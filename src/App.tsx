import React from 'react'
import './App.css'
import Header from './components/header'
import Board from './components/board'
import ButtonReset from './components/button-reset'

function App() {
  return (
    <div className="App">
      <Header />
      <Board />
      <ButtonReset />
    </div>
  )
}

export default App