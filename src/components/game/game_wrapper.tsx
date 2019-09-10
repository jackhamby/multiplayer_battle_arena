import React from 'react';
import './game_wrapper.css';
import Game from './game'

class GameWrapper extends React.Component {
    
    render(){
        return (
            <div className="col-8 container">
                <Game></Game>
            </div>
        )
    }
}

export default GameWrapper;