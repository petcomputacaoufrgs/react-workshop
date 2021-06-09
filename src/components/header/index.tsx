import React from 'react'
import './styles.css'

const Header: React.FC = () => {
    return (
        <div className="header">
            <div className="header__bar">
                <div className="header__bar__title">
                    <h1>2048</h1>
                </div>
            </div>
        </div>
    )
}
export default Header