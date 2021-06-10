import React from 'react'
import './App.css'
import Board from './components/board'

function App() {
  return (
    <div className="App container">
      <h1 className="game_title">2048</h1>
      <Board />
      
    </div>
  )
}

export default App