import React from 'react';
import { Player, AppState } from '../application/application';
import { Stage, Sprite } from '@inlet/react-pixi'
import { keyboard, Key } from '../../util/keyboard';
import * as redux from 'react-redux';
export interface GameProps {
    currentPlayerId: string,
    players: {
        [key: string] : Player
    }
    update: Function;
}

export interface GameState {
    leftKey: Key
    rightKey: Key;
    downKey: Key;
    upKey: Key;
}

class Game extends React.Component <GameProps, GameState>{

    constructor(props: GameProps){
        super(props);
        const leftKey = keyboard("a");
        const rightKey = keyboard("d");
        const upKey = keyboard("w");
        const downKey = keyboard("s");
        rightKey.press = () => {
            const currentPlayer = this.props.players[this.props.currentPlayerId]
            this.props.update(
                this.props.currentPlayerId,
                currentPlayer.x + 2,
                currentPlayer.y);
        };
        upKey.press = () => {
            const currentPlayer = this.props.players[this.props.currentPlayerId]
            this.props.update(
                this.props.currentPlayerId,
                currentPlayer.x,
                currentPlayer.y - 2);
        }
        downKey.press = () => {
            const currentPlayer = this.props.players[this.props.currentPlayerId]
            this.props.update(
                this.props.currentPlayerId,
                currentPlayer.x,
                currentPlayer.y + 2);
        }
        leftKey.press = () => {
            // console.log('pressed left')
            // console.log(this.props.currentPlayer.x)
            const currentPlayer = this.props.players[this.props.currentPlayerId]
            this.props.update(
                this.props.currentPlayerId,
                currentPlayer.x - 2,
                currentPlayer.y);
        };
        
        leftKey.release = () => {
        //   console.log('release elft')  
        };
        this.state = {
            leftKey: leftKey,
            rightKey: rightKey,
            upKey: upKey,
            downKey: downKey
        };

    }



    componentDidMount(){
       
    }

    componentWillUnmount(){

    }

    render(){
        return (
        <Stage width={300} height={300}>
            {
                Object.keys(this.props.players).map(playerId => {
                    const player = this.props.players[playerId];
                    return (
                        <Sprite image="./knight.png" x={player.x} y={player.y} />
                    )
                })
            }
        </Stage>
        )
    }

}


export const mapStateToProps = (state: AppState) => {
    console.log('mapping state to props in game')
    console.log(state)
    return {
        ...state
    }
}

export const mapDispatchToProps = (dispatch: Function) => {
    return {}
}

const ConnectedGame = redux.connect(mapStateToProps, mapDispatchToProps)(Game);
export default ConnectedGame;