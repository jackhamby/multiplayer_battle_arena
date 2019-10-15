import React from 'react';
import { Player, AppState, Container } from '../../types/app_state';
// import { Stage, Sprite, Container} from '@inlet/react-pixi'
import * as reactPIXI from '@inlet/react-pixi';
import * as PIXI from 'pixi.js'
import { keyboard, Key } from '../../util/keyboard';
import { contain } from '../../util/contain';
import * as redux from 'react-redux';
import { watch } from 'fs';
// import { Container } from 'pixi.js';
export interface GameProps {
    currentPlayerId: string,
    players: {
        [key: string] : Player
    }
    update(player: Player) : void;
    // sprites: {
    //     [key: string] : PIXI.Sprite
    // }
}

export interface GameState {
    leftKey: Key
    rightKey: Key;
    downKey: Key;
    upKey: Key;
    interval: any;
    app: PIXI.Application;
    ref: any;
    loader: PIXI.Loader;
    // sprites: {};
}

// TODO: replace hard coded width/height
const container = {
    width: 256,
    height: 256,
    x: 0,
    y: 0
} as Container;

// const app = new PIXI.Application({width: 256, height: 256})
// const loader = new PIXI.Loader()
//     .add('knight', './knight.png');


class Game extends React.Component <GameProps, GameState>{

    constructor(props: GameProps){
        super(props);
        const leftKey = keyboard("a");
        const rightKey = keyboard("d");
        const upKey = keyboard("w");
        const downKey = keyboard("s");
        rightKey.press = () => {
            const currentPlayer = this.props.players[this.props.currentPlayerId];
            currentPlayer.xVelocity += 2
            this.props.update(currentPlayer);
        };
        rightKey.release = () => {
            const currentPlayer = this.props.players[this.props.currentPlayerId];
            currentPlayer.xVelocity = 0;
            this.props.update(currentPlayer);
        };
        upKey.press = () => {
            const currentPlayer = this.props.players[this.props.currentPlayerId];
            currentPlayer.yVelocity -= 2;
            this.props.update(currentPlayer);
        }
        upKey.release = () => {
            const currentPlayer = this.props.players[this.props.currentPlayerId];
            currentPlayer.yVelocity = 0;
            this.props.update(currentPlayer);
        };
        downKey.press = () => {
            const currentPlayer = this.props.players[this.props.currentPlayerId]
            currentPlayer.yVelocity += 2;
            this.props.update(currentPlayer);
        }
        downKey.release = () => {
            const currentPlayer = this.props.players[this.props.currentPlayerId];
            currentPlayer.yVelocity = 0;
            this.props.update(currentPlayer);
        };
        leftKey.press = () => {
            const currentPlayer = this.props.players[this.props.currentPlayerId];
            currentPlayer.xVelocity -= 2;
            this.props.update(currentPlayer);
        };
        leftKey.release = () => {
            const currentPlayer = this.props.players[this.props.currentPlayerId];
            currentPlayer.xVelocity = 0
            this.props.update(currentPlayer);
        };

        this.state = {
            leftKey: leftKey,
            rightKey: rightKey,
            upKey: upKey,
            downKey: downKey,
            interval: setInterval(this.watchKeys.bind(this), 100), 
            // TODO: replace hard coded width/height
            app: new PIXI.Application({width: 256, height: 256}), 
            ref: React.createRef(),
            loader: new PIXI.Loader()
                .add('knight', './knight.png'),
        };

        this.state.loader.load(this.setup.bind(this));
        
    }

    // Callback after loader
    setup(loader: any, resources: any){
        console.log('loader ready')
        // this.state.sprites.knight = new PIXI.Sprite(resources.knight.texture);
        // this.state.app.stage.addChild(this.state.sprites.knight);
        // this.state.loader
    }

    watchKeys(){
        if (this.state.leftKey.isDown ||
            this.state.rightKey.isDown ||
            this.state.upKey.isDown || 
            this.state.downKey.isDown){
                const currentPlayer = this.props.players[this.props.currentPlayerId];
                this.props.update(currentPlayer);
            }
    }


    componentDidMount(){
        console.log('mounting')
        this.state.ref.current.appendChild(this.state.app.view);

    }

    componentWillUnmount(){
        clearInterval(this.state.interval)
    }

    render(){
        console.log('rendering')
        this.state.app.stage.removeChildren()
        Object.keys(this.props.players).forEach(playerId => {
            const sprite = new PIXI.Sprite(this.state.loader.resources.knight.texture);
            sprite.x = this.props.players[playerId].x;
            sprite.y = this.props.players[playerId].y;
            this.state.app.stage.addChild( 
                sprite
            );
        })

        return (
            <div ref={this.state.ref}> 
            </div>
        )
    }

}


export const mapStateToProps = (state: AppState) => {
    return {
        ...state
    }
}

export const mapDispatchToProps = (dispatch: Function) => {
    return {}
}

const ConnectedGame = redux.connect(mapStateToProps, mapDispatchToProps)(Game);
export default ConnectedGame;