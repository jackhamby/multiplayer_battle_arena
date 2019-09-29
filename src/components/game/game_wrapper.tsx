import React from 'react';
import './game_wrapper.css';
import ConnectedGame from './game'
import { Player, AppState } from '../application/application';
import *  as redux from 'react-redux';

export interface GameWrapperProps {
    players : {
        [key: string] : Player;
    }
    isConnected: boolean;
    update: Function;
}

export interface GameWrapperState {
    isRunning: boolean;
}



class GameWrapper extends React.Component<GameWrapperProps, GameWrapperState> {
    
    render(){
        return (

            <div className="col-8 container">
                <ConnectedGame update={this.props.update}></ConnectedGame>
    
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

const ConnectedGameWrapper = redux.connect(mapStateToProps, mapDispatchToProps)(GameWrapper);

export default ConnectedGameWrapper;