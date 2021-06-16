import React, { EventHandler } from 'react'
import './styles.css'

interface ButtonResetProps {
    onNewGame: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const ButtonReset: React.FC<ButtonResetProps> = ({onNewGame}) => {
    return(
        <div className="buttonReset">
            <button onClick={onNewGame}>
                NOVO JOGO
            </button>
        </div>
    )
}
export default ButtonReset