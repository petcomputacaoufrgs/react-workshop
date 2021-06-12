import React, { useState } from 'react'
import Piece from '../piece'
import { useEvent } from '../../utils'
import './styles.css'

const Board: React.FC = () => {

	const LINES = 4 
	const TO = 0
	const FROM = 1

	const initialize = () => {
		let newGrid = new Array(16).fill(0)
		addNumber(newGrid)
		addNumber(newGrid)
		return newGrid
	}

	const addNumber = (newGrid: number[]) => {
			let added = false

			while(!added) {
					let position = Math.floor(Math.random() * 16)

					if(newGrid[position] === 0) {
							newGrid[position] = Math.random() > 0.5 ? 2 : 4
							added = true
					}
			}
	}

	const [gameState, setGameState] = useState(initialize())

	const handleKeyDown = (event: KeyboardEvent) => {

			const move = {
					ArrowUp: handleSwipeUp,
					ArrowDown: handleSwipeDown,
					ArrowLeft: handleSwipeLeft,
					ArrowRight: handleSwipeRight,
			}

			const moveFunction: (command: string) => void | undefined = move[event.key]

			if(moveFunction) moveFunction(event.key)
	}

	const handleSwipe = (
		isLastPieceOfLine: (piece: number, iterator: number) => boolean,
		selectLinePieces: (pieces: number[], iterator?: number) => void,
		nextPieceFrom: (pieces: number[]) => void
	) => {

		const transfer = (array: number[], pieceTo: number, pieceFrom: number) => {
			array[pieceTo] += array[pieceFrom]
			array[pieceFrom] = 0
		}

		let newArray = [...gameState]

		let pieces = [0,1]
		
		for(let i = 0; i < LINES; i++) {
			selectLinePieces(pieces, i)
			while (!isLastPieceOfLine(pieces[TO], i)) {
				if(isLastPieceOfLine(pieces[FROM], i)) {
					selectLinePieces(pieces)
				}
				else if(newArray[pieces[FROM]] === 0) {
					nextPieceFrom(pieces)
				} 
				else if(newArray[pieces[TO]] === 0 || newArray[pieces[TO]] === newArray[pieces[FROM]]) {
					transfer(newArray, pieces[TO], pieces[FROM])
					nextPieceFrom(pieces)
				} 
				else selectLinePieces(pieces)
			}
		}

		addNumber(newArray)
		setGameState(newArray)
	}

	const handleSwipeUp = () => {

		const isLastPieceOfLine = (piece: number, iterator: number) => piece > iterator + (LINES * (LINES - 1)) 

		const selectLinePieces = (pieces: number[], iterator?: number) => {
			pieces[TO] = iterator ? iterator : (pieces[TO] + LINES)
			pieces[FROM] = pieces[TO] + LINES
		}

		const nextFromPiece = (pieces: number[]) => pieces[FROM] += LINES
		
		handleSwipe(isLastPieceOfLine, selectLinePieces, nextFromPiece)	
	}

		const handleSwipeDown = () => {

			const isLastPieceOfLine = (piece: number, iterator: number) => piece < iterator 

			const selectLinePieces = (pieces: number[], iterator?: number) => {
				pieces[TO] = iterator ? (iterator + LINES * (LINES - 1)) : (pieces[TO] - LINES)
				pieces[FROM] = pieces[TO] - LINES
			}
	
			const nextFromPiece = (pieces: number[]) => pieces[FROM] -= LINES
			
			handleSwipe(isLastPieceOfLine, selectLinePieces, nextFromPiece)	
	}

	const handleSwipeLeft = () => {

			const isLastPieceOfLine = (piece: number, iterator: number) => piece > (iterator * LINES) + LINES - 1

			const selectLinePieces = (pieces: number[], iterator?: number) => {
				pieces[TO] = iterator ? (iterator * LINES) : (pieces[TO] + 1)
				pieces[FROM] = pieces[TO] + 1
			}

			const nextFromPiece = (pieces: number[]) => pieces[FROM]++

			handleSwipe(isLastPieceOfLine, selectLinePieces, nextFromPiece)
	}

	const handleSwipeRight = () => {

		const isLastPieceOfLine = (piece: number, iterator: number) => piece < (iterator * LINES) 

		const selectLinePieces = (pieces: number[], iterator?: number) => {
			pieces[TO] = iterator ? (iterator * LINES + (LINES - 1)) : (pieces[TO] - 1)
			pieces[FROM] = pieces[TO] - 1
		}

		const nextFromPiece = (pieces: number[]) => pieces[FROM]--
		
		handleSwipe(isLastPieceOfLine, selectLinePieces, nextFromPiece)
	}

	
	useEvent("keydown", handleKeyDown)

	return (
			<div className="board">
					{gameState.map(
							(number, index) => <Piece num={number} key={index}/>
					)}
			</div>
	)
}
export default Board