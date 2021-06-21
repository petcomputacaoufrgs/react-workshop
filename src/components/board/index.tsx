import React, { useState, useEffect } from 'react'
import Piece from '../piece'
import ButtonReset from '../button-reset'
import { useEvent } from '../../utils'
import './styles.css'

const Board: React.FC = () => {
    const UP_ARROW = 38
    const DOWN_ARROW = 40
    const LEFT_ARROW = 37
    const RIGHT_ARROW = 39

    const [gameState, setGameState] = useState(new Array(16).fill(0))
    
    const initialize = () => {
        let newGrid = [...gameState]
        newGrid.fill(0)

        addNumber(newGrid)
        addNumber(newGrid)
        setGameState(newGrid)
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

    const handleNewGame = () => {
        initialize()
    }

    const handleGameOver = (gameGrid: number[]) => {
        let isGameOver = gameGrid.includes(0)

        return !isGameOver
    }

    const handleWinGame = (gameGrid: number[]) => {
        let winGame = gameGrid.includes(2048)

        return winGame
    }

    const handleKeyDown = (event: KeyboardEvent) => {
        switch (event.keyCode) {
            case UP_ARROW:
                handleSwipeUp()
                break;
            case DOWN_ARROW:
                handleSwipeDown()
                break;
            case LEFT_ARROW:
                handleSwipeLeft()
                break;
            case RIGHT_ARROW:
                handleSwipeRight()
                break;
            default:
                break;
        }
    }

    const handleSwipeUp = () => {
        let newArray = [...gameState]

        for(let i = 0; i < 4; i++) {
            let piece_index_1 = i
            let piece_index_2 = piece_index_1 + 4

            while (piece_index_1 < 16) {
                if(piece_index_2 >= 16) {
                    piece_index_2 = i + 1
                    piece_index_1 = 16
                    continue
                }

                if(newArray[piece_index_2] === 0) {
                    piece_index_2 += 4
                } else if(newArray[piece_index_1] === 0) {
                    newArray[piece_index_1] = newArray[piece_index_2]
                    newArray[piece_index_2] = 0
                } else {
                    if(newArray[piece_index_1] === newArray[piece_index_2]) {
                        newArray[piece_index_1] *= 2
                        newArray[piece_index_2] = 0
                    } else {
                        piece_index_1 += 4
                        piece_index_2 = piece_index_1 + 4
                    }
                }
            }
        }

        if(!handleGameOver(newArray)) {
            addNumber(newArray)
            setGameState(newArray)

            if(handleWinGame(newArray)) {
                alert('PARABÉNS!!! VOCÊ GANHOU')
                handleNewGame()
            }
        }
    }
    
    const handleSwipeDown = () => {
        let newArray = [...gameState]

        for(let i = 0; i < 4; i++) {
            let piece_index_1 = i + 12
            let piece_index_2 = piece_index_1 - 4

            while (piece_index_1 > 0) {
                if(piece_index_2 < 0) {
                    piece_index_2 = i + 13
                    piece_index_1 = -1
                    continue
                }

                if(newArray[piece_index_2] === 0) {
                    piece_index_2 -= 4
                } else if(newArray[piece_index_1] === 0) {
                    newArray[piece_index_1] = newArray[piece_index_2]
                    newArray[piece_index_2] = 0
                } else {
                    if(newArray[piece_index_1] === newArray[piece_index_2]) {
                        newArray[piece_index_1] *= 2
                        newArray[piece_index_2] = 0
                    } else {
                        piece_index_1 -= 4
                        piece_index_2 = piece_index_1 - 4
                    }
                }
            }
        }

        if(!handleGameOver(newArray)) {
            addNumber(newArray)
            setGameState(newArray)

            if(handleWinGame(newArray)) {
                alert('PARABÉNS!!! VOCÊ GANHOU')
                handleNewGame()
            }
        }
    }

    const handleSwipeLeft = () => {
        let newArray = [...gameState]

        for(let i = 0; i < 4; i++) {
            let piece_index_1 = i * 4
            let piece_index_2 = piece_index_1 + 1

            while (piece_index_1 < (i + 1) * 4) {
                if(piece_index_2 === (i + 1) * 4) {
                    piece_index_2 = piece_index_1 + 1
                    piece_index_1++
                    continue
                }

                if(newArray[piece_index_2] === 0) {
                    piece_index_2++
                } else if(newArray[piece_index_1] === 0) {
                    newArray[piece_index_1] = newArray[piece_index_2]
                    newArray[piece_index_2] = 0
                } else {
                    if(newArray[piece_index_1] === newArray[piece_index_2]) {
                        newArray[piece_index_1] *= 2
                        newArray[piece_index_2] = 0
                    } else {
                        piece_index_1++
                        piece_index_2 = piece_index_1 + 1
                    }
                }
            }
        }

        if(!handleGameOver(newArray)) {
            addNumber(newArray)
            setGameState(newArray)

            if(handleWinGame(newArray)) {
                alert('PARABÉNS!!! VOCÊ GANHOU')
                handleNewGame()            
            }
        }
    }

    const handleSwipeRight = () => {
        let newArray = [...gameState]

        for(let i = 0; i < 4; i++) {
            let piece_index_1 = (i * 4) + 3
            let piece_index_2 = piece_index_1 - 1

            while (piece_index_1 > (i * 4) - 1) {
                if(piece_index_2 === (i * 4) - 1) {
                    piece_index_2 = piece_index_1 - 1
                    piece_index_1--
                    continue
                }

                if(newArray[piece_index_2] === 0) {
                    piece_index_2--
                } else if(newArray[piece_index_1] === 0) {
                    newArray[piece_index_1] = newArray[piece_index_2]
                    newArray[piece_index_2] = 0
                } else {
                    if(newArray[piece_index_1] === newArray[piece_index_2]) {
                        newArray[piece_index_1] *= 2
                        newArray[piece_index_2] = 0
                    } else {
                        piece_index_1--
                        piece_index_2 = piece_index_1 - 1
                    }
                }
            }
        }

        if(!handleGameOver(newArray)) {
            addNumber(newArray)
            setGameState(newArray) 
            
            if(handleWinGame(newArray)) {
                alert('PARABÉNS!!! VOCÊ GANHOU')
                handleNewGame()
            }
        }
    }
    

    useEffect(() => {
        initialize()
    }, [])

    useEvent("keydown", handleKeyDown)

    return (
        <div>
            <div className="board">
                {gameState.map(
                    (number, index) => <Piece num={number} key={index}/>
                )}
            </div>
            <div>
                <ButtonReset onNewGame={handleNewGame}/>
            </div>
        </div>
    )
}
export default Board