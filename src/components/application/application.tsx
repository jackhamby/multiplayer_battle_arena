import React from 'react';
import GameWrapper from '../game/game_wrapper';
import PlayerListWrapper from '../player_list/player_list_wrapper';
import PlayerDetailWrapper from '../player_detail/player_detail_wrapper';
import HeaderWrapper from '../header/header_wrapper';
import ConnectionManager from '../../util/connection_manager'
import Error from '../util/error';
// import { Provider } from 'react-redux';
import { createStore} from 'redux';
// import { rootReducer } from '../../reducers/root_reducer';
// import io from 'socket.io';
// import openSocket from 'socket.io-client';
import *  as redux from 'react-redux';
// import { connect, disconnect } from '../../reducers/connection_reducer';
import { ActionCreator } from 'redux';
// import { addPlayer, removePlayer } from '../../reducers/game_reducer'??/;
import { connect, disconnect, addPlayer, removePlayer, init } from '../../reducers/root_reducer'
// import { store } from '../../App';



export interface AppState {
    error?: string;
    isConnected: boolean;
    players: Player[];
    currentPlayer?: Player;
}

export interface Player {
    id?: string;
    name: string;
    x: number;
    y: number;
}

export interface Message {
    type: string;
    data: any;
}

export const WELCOME_MESSAGE = "welcome";
export interface WelcomeData {
    id: string;
    state: AppState;
}


export interface AppProps {
    connect: () => void;
    disconnect: (reason: string) => void;
    addPlayer: (id: string) => void;
    removePlayer: () => void;
    init: (state: AppState) => void;
    connectionManager: ConnectionManager;
    players: Player[];
    isConnected: boolean;
};

const connectionManager = new ConnectionManager();

class Application extends React.Component<AppProps, AppState>{
    constructor(props: AppProps){
        super(props);
        // Hooking into optional open/close
        // events for connectionManager 
        connectionManager.onOpen = this.onConnect.bind(this);
        connectionManager.onClose = this.onDisconnect.bind(this);
        connectionManager.onMessage = this.onMessage.bind(this);
        // Attempt to open socket
        connectionManager.connect(); 

    }

    componentDidMount(){

    }

    onConnect(){
        this.props.connect();
        // this.props.addPlayer();
    }

    onDisconnect(reason: string){
        this.props.disconnect(reason);
    }

    onMessage(message: Message){
        console.log(message)
        switch(message.type){
            case(WELCOME_MESSAGE):
                this.props.init(message.data.state)
                this.props.addPlayer(message.data.id);
                console.log('welcomed')
                console.log()
        }
    }

    render() {
        console.log(this.props)
        if (!this.props.isConnected){
            return (
                <div className="container-fluid container">
                    <Error></Error>
                </div>
            )
        }
        else{
            return (
                <div className="container-fluid container"> 
                    <div className="row top-container">
                        <HeaderWrapper></HeaderWrapper>
                    </div>
                    <div className="row center-container">
                        <GameWrapper></GameWrapper>
                        <PlayerListWrapper></PlayerListWrapper>
                    </div>
                    <div className="row bottom-container">
                        <PlayerDetailWrapper></PlayerDetailWrapper>
                    </div>
                </div>
            )
        }
    }
}


export const mapStateToProps = (state: AppState) => {
    return {
        ...state,
    };
}

export const mapDispatchToProps = (dispatch: Function) => {
    return {
        connect: () => dispatch(connect()),
        disconnect: (reason: string ) => dispatch(disconnect(reason)),
        addPlayer: (id: string) => dispatch(addPlayer(id)),
        removePlayer: () => dispatch(removePlayer()),
        init: (state: AppState) => dispatch(init(state)),
    };
}

const ConnectedApplication = redux.connect(mapStateToProps, mapDispatchToProps)(Application)

export default ConnectedApplication;
