import React, { useEffect, useState } from 'react'
import ArrayUtils from '../../utils/ArrayUtils'
import Piece from '../piece'
import { HandleSwipeProps } from './props'
import './styles.css'

export const useEvent = (event: any, handler: { (this: Window, ev: any): any; (this: Window, ev: any): any; }, passive = false) => {
  useEffect(() => {
    window.addEventListener(event, handler, passive)
    return () => window.removeEventListener(event, handler)
  })
}

const SliderBoard: React.FC = () => {

  const PIECES = 16
  const LINES = PIECES / 4
  const TO = 0
  const FROM = 1

  const [gameState, setGameState] = useState<number[]>([])

  const addNumber = (grid: number[]) => {
    let freeIndexes = new Array<number>()

    grid.forEach((p, index) => {
      if (p === 0) freeIndexes.push(index)
    })

    if (ArrayUtils.isNotEmpty(freeIndexes)) {
      let randomIndex = ArrayUtils.randomItem(freeIndexes)
      grid[randomIndex] = Math.random() >= 0.4 ? 2 : 4
    }
  }

  const handleKeyDown = (key: string) => {

    const moveProps: HandleSwipeProps | undefined = moveFunctions[key]

    if (moveProps) {
      handleSwipe(moveProps)
    }
  }

  const initialize = () => {
    let newGrid = new Array<number>(PIECES).fill(0)
    addNumber(newGrid)
    addNumber(newGrid)
    return newGrid
  }

  useEffect(() => {
    setGameState(initialize())
  }, [])

  useEvent("keydown", (event: KeyboardEvent) => handleKeyDown(event.key))

  const handleSwipe = ({ isOffline, selectLinePieces, nextPieceFrom }: HandleSwipeProps) => {

    const transfer = (array: number[], pieceTo: number, pieceFrom: number) => {
      array[pieceTo] += array[pieceFrom]
      array[pieceFrom] = 0
    }

    let newArray = [...gameState]
    let pieces = [0, 1]

    for (let i = 0; i < LINES; i++) {
      selectLinePieces(pieces, i)
      while (!isOffline(pieces[TO], i)) {
        if (isOffline(pieces[FROM], i)) {
          selectLinePieces(pieces)
        }
        else if (newArray[pieces[FROM]] === 0) {
          nextPieceFrom(pieces)
        }
        else if (newArray[pieces[TO]] === 0 || newArray[pieces[TO]] === newArray[pieces[FROM]]) {
          transfer(newArray, pieces[TO], pieces[FROM])
          nextPieceFrom(pieces)
        }
        else selectLinePieces(pieces)
      }
    }

    addNumber(newArray)
    setGameState([...newArray])
  }

  const handleSwipeLeft: HandleSwipeProps = {
    isOffline: (piece, iterator) => piece > (iterator * LINES) + LINES - 1,
    selectLinePieces: (pieces, iterator) => {
      pieces[TO] = iterator !== undefined ? (iterator * LINES) : (pieces[TO] + 1)
      pieces[FROM] = pieces[TO] + 1
    },
    nextPieceFrom: (pieces) => pieces[FROM]++
  }

  const handleSwipeUp: HandleSwipeProps = {
    isOffline: (piece, iterator) => piece > (iterator + (LINES * (LINES - 1))),
    selectLinePieces: (pieces, iterator) => {
      pieces[TO] = iterator !== undefined ? iterator : (pieces[TO] + LINES)
      pieces[FROM] = pieces[TO] + LINES
    },
    nextPieceFrom: (pieces) => pieces[FROM] += LINES
  }

  const handleSwipeDown: HandleSwipeProps = {
    isOffline: (piece, iterator) => piece < iterator,
    selectLinePieces: (pieces, iterator) => {
      pieces[TO] = iterator !== undefined ? (iterator + (LINES * (LINES - 1))) : (pieces[TO] - LINES)
      pieces[FROM] = pieces[TO] - LINES
    },
    nextPieceFrom: (pieces) => pieces[FROM] -= LINES
  }

  const handleSwipeRight: HandleSwipeProps = {
    isOffline: (piece, iterator) => piece < (iterator * LINES),
    selectLinePieces: (pieces, iterator) => {
      pieces[TO] = iterator !== undefined ? (iterator * LINES + (LINES - 1)) : (pieces[TO] - 1)
      pieces[FROM] = pieces[TO] - 1
    },
    nextPieceFrom: (pieces) => pieces[FROM]--
  }

  const moveFunctions = {
    ArrowUp: handleSwipeUp,
    ArrowDown: handleSwipeDown,
    ArrowLeft: handleSwipeLeft,
    ArrowRight: handleSwipeRight,
  }

  return (
    <div className="board">
      {gameState.map((number, index) =>
        <Piece num={number} key={index} />
      )}
    </div>
  )
}

export default SliderBoard