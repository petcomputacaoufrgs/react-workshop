import React, { useEffect, useState } from 'react'
import Piece from '../piece'
import { useEvent } from '../../utils'
import './styles.css'

const Board: React.FC = () => {

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

	const LINES = 4

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

	const handleSwipeUp = () => {
			console.log('cima')
	}
	
	const handleSwipeDown = () => {
			console.log('baixo')
	}

	const handleSwipeLeft = () => {

			const isLastPieceOfLine = (piece: number, iterator: number) => piece > (iterator * LINES) + LINES - 1

			const nextPiecesOfLine = (pieceTo: number, pieceFrom: number) => {
				pieceTo++
				pieceFrom = pieceTo + 1
				return [pieceTo, pieceFrom]
			}

			const selectLinePieces = (pieceTo: number, pieceFrom: number, iterator: number) => {
				pieceTo = iterator * LINES
				pieceFrom = pieceTo + 1
				return [pieceTo, pieceFrom]
			}

			const nextFromPiece = (pieceFrom: number) => pieceFrom++

			console.log('esquerda')

			handleSwipe(
				isLastPieceOfLine,
				nextPiecesOfLine,
				selectLinePieces,
				nextFromPiece
			)
	}

	const handleSwipe = (
		isLastPieceOfLine: (piece: number, iterator: number) => boolean,
		nextPiecesOfLine: (pieceTo: number, pieceFrom: number) => number[],
		selectLinePieces: (pieceTo: number, pieceFrom: number, iterator: number) => number[],
		nextPieceFrom: (pieceFrom: number) => number
	) => {

		let newArray = [...gameState]

		let pieceTo = 0
		let pieceFrom = 1
		
		for(let i = 0; i < LINES; i++) {
			selectLinePieces(pieceTo, pieceFrom, i)
			while (!isLastPieceOfLine(pieceTo, i)) {
				if(isLastPieceOfLine(pieceFrom, i)) {
					nextPiecesOfLine(pieceTo, pieceFrom)
				}
				else if(newArray[pieceFrom] === 0) {
					pieceFrom = nextPieceFrom(pieceFrom)
				} 
				else if(newArray[pieceTo] === 0 || newArray[pieceTo] === newArray[pieceFrom]) {
					transfer(newArray, pieceTo, pieceFrom)
					pieceFrom = nextPieceFrom(pieceFrom)
				} 
				else {
					nextPiecesOfLine(pieceTo, pieceFrom)
				}
			}
		}

		addNumber(newArray)
		setGameState(newArray)
	}

	const handleSwipeRight = () => {

		const isLastPieceOfLine = (piece: number, iterator: number) => piece < (iterator * LINES) 

		let newArray = [...gameState]
			
		let pieceTo = LINES - 1
		let pieceFrom = pieceTo - 1

		const nextPiecesOfLine = () => {
			pieceTo--
			pieceFrom = pieceTo - 1
		}

		const selectLinePieces = (iterator: number) => {
			pieceTo = iterator * LINES + (LINES - 1)
			pieceFrom = pieceTo - 1
		}

		const nextFromPiece = () => {
			pieceFrom--
		} 

		for(let i = 0; i < LINES; i++) {
			selectLinePieces(i)
			while (!isLastPieceOfLine(pieceTo, i)) {
					if(isLastPieceOfLine(pieceFrom, i)) {
						nextPiecesOfLine()
					}
					else if(newArray[pieceFrom] === 0) {
						nextFromPiece()
					} 
					else if(newArray[pieceTo] === 0 || newArray[pieceTo] === newArray[pieceFrom]) {
						transfer(newArray, pieceTo, pieceFrom)
						nextFromPiece()
					} 
					else nextPiecesOfLine()
			}
	}

		addNumber(newArray)
		setGameState(newArray)
		
		console.log('direita')
	}

	const transfer = (array: number[], pieceTo: number, pieceFrom: number) => {
		array[pieceTo] += array[pieceFrom]
		array[pieceFrom] = 0
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