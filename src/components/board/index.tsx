import React, { useState, useEffect } from 'react'
import Piece from '../piece'
import { useEvent } from '../../utils'
import './styles.css'

const Board: React.FC = () =>{
    const UP_ARROW = 38
    const DOWN_ARROW = 40
    const LEFT_ARROW = 37
    const RIGHT_ARROW = 39
    
    const [gameState, setGameState] = useState(new Array(16).fill(0))

    const initialize = () => {
        let newGrid = [...gameState]

        addNumber(newGrid)
        addNumber(newGrid)
        setGameState(newGrid)
    }

    const emptySpace = (newGrid: number[]) => {
        let i = 0

        while(i < 16)
        {
            if(newGrid[i] === 0)
            {
                return 1  //se algum espaço é 0, então há espaço vazio no tabuleiro
            }
            i++
        }
        return 0  //se percorreu todo o tabuleiro sem retornar, então não há espaço vazio
    }

    const addNumber = (newGrid: number[]) => {
        let added = false

        if(emptySpace(newGrid))  // só adiciona número se existe espaço vazio
        {            
            while(!added){
                let position = Math.floor(Math.random() * 16)
            
                if(newGrid[position] === 0){
                    newGrid[position] = Math.random() < 0.8 ? 2 : 4
                    added = true
                }
            }
        }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
        switch(event.keyCode){
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

        for(let i = 0; i < 4; i++)
        {
            let piece_index_1 = i
            let piece_index_2 = piece_index_1 + 4

            while(piece_index_1 < (i + 12))
            {
                if(piece_index_2 > (i + 12))
                {
                    piece_index_1 += 4
                    piece_index_2 = piece_index_1 + 4
                }
                else if(newArray[piece_index_2] === 0)
                {
                    piece_index_2 += 4
                }
                else if(newArray[piece_index_1] === 0)
                {
                    newArray[piece_index_1] = newArray[piece_index_2]
                    newArray[piece_index_2] = 0
                }
                else if(newArray[piece_index_1] === newArray[piece_index_2])
                {
                    newArray[piece_index_1] *= 2
                    newArray[piece_index_2] = 0
                    piece_index_1 += 4
                    piece_index_2 = piece_index_1 + 4
                }
                else
                {
                    piece_index_1 += 4
                    piece_index_2 = piece_index_1 + 4
                }
            }
        }
        
        addNumber(newArray)
        setGameState(newArray)

    }

    const handleSwipeDown = () => {
        let newArray = [...gameState]

        for(let i = 0; i < 4; i++)
        {
            let piece_index_1 = i + 12
            let piece_index_2 = piece_index_1 - 4

            while(piece_index_1 > i)
            {
                if(piece_index_2 < i)
                {
                    piece_index_1 -= 4
                    piece_index_2 = piece_index_1 - 4
                }
                else if(newArray[piece_index_2] === 0)
                {
                    piece_index_2 -= 4
                }
                else if(newArray[piece_index_1] === 0)
                {
                    newArray[piece_index_1] = newArray[piece_index_2]
                    newArray[piece_index_2] = 0
                }
                else if(newArray[piece_index_1] === newArray[piece_index_2])
                {
                    newArray[piece_index_1] *= 2
                    newArray[piece_index_2] = 0
                    piece_index_1 -= 4
                    piece_index_2 = piece_index_1 - 4
                }
                else
                {
                    piece_index_1 -= 4
                    piece_index_2 = piece_index_1 - 4
                }
            }
        }
        
        addNumber(newArray)
        setGameState(newArray)
    }

    const handleSwipeLeft = () => {
        let newArray = [...gameState]

        for(let i = 0; i < 4; i++)
        {
            let piece_index_1 = i * 4
            let piece_index_2 = piece_index_1 + 1

            while(piece_index_1 < ((i * 4) + 3))
            {
                if(piece_index_2 > ((i * 4) + 3))
                {
                    piece_index_1++
                    piece_index_2 = piece_index_1 + 1
                }
                else if(newArray[piece_index_2] === 0)
                {
                    piece_index_2 ++
                }
                else if(newArray[piece_index_1] === 0)
                {
                    newArray[piece_index_1] = newArray[piece_index_2]
                    newArray[piece_index_2] = 0
                }
                else if(newArray[piece_index_1] === newArray[piece_index_2])
                {
                    newArray[piece_index_1] *= 2
                    newArray[piece_index_2] = 0
                    piece_index_1++
                    piece_index_2 = piece_index_1 + 1
                }
                else
                {
                    piece_index_1++
                    piece_index_2 = piece_index_1 + 1
                }
            }
        }
        
        addNumber(newArray)
        setGameState(newArray)        
    }

    const handleSwipeRight = () => {
        let newArray = [...gameState]

        for(let i = 0; i < 4; i++)
        {
            let piece_index_1 = (i * 4) + 3
            let piece_index_2 = piece_index_1 - 1

            while(piece_index_1 > (i * 4))
            {
                if(piece_index_2 < (i * 4))
                {
                    piece_index_1--
                    piece_index_2 = piece_index_1 - 1
                }
                else if(newArray[piece_index_2] === 0)
                {
                    piece_index_2 --
                }
                else if(newArray[piece_index_1] === 0)
                {
                    newArray[piece_index_1] = newArray[piece_index_2]
                    newArray[piece_index_2] = 0
                }
                else if(newArray[piece_index_1] === newArray[piece_index_2])
                {
                    newArray[piece_index_1] *= 2
                    newArray[piece_index_2] = 0
                    piece_index_1--
                    piece_index_2 = piece_index_1 - 1
                }
                else
                {
                    piece_index_1--
                    piece_index_2 = piece_index_1 - 1
                }
            }
        }
        
        addNumber(newArray)
        setGameState(newArray) 
    }

    useEffect(() => {
        initialize()
    }, [])

    useEvent("keydown", handleKeyDown)

    return(
        <div className="board">
            {gameState.map(
                (number, index) => <Piece num={number} key={index}/>
            )}
        </div>
    )
}
export default Board