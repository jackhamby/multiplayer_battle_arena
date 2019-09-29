import React from 'react';
import ConnectedGameWrapper from '../game/game_wrapper';
// import ConnectedPlayerListWrapper from '../player_list/player_list_wrapper';
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
import { connect, disconnect, addPlayer, removePlayer, init, DisconnectAction, REMOVE_PLAYER, updatePlayer } from '../../reducers/root_reducer'
import ConnectedPlayerListWrapper from '../player_list/player_list_wrapper';
// import { store } from '../../App';



export interface AppState {
    error?: string;
    isConnected: boolean;
    players: {
        [key: string]: Player;
    }
    currentPlayerId: string;
}

export interface Player {
    id: string;
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

export const REMOVE_PLAYER_MESSAGE = "remove_player";
export interface RemovePlayerData {
    id: string
}

export const ADD_PLAYER_MESSAGE = "add_player";
export interface AddPlayerData {
    id: string,
    x: number,
    y: number,
}

export const UPDATE_PLAYER_MESSAGE = "update_player";
export interface UpdatePlayerData {
    id: string;
    x: number;
    y: number;
}

export const DISCONNECT_MESSAGE = "disconnect";
export interface DisconnectData {
    id: string;
}





export interface AppProps {
    connect: () => void;
    disconnect: (event: Event, id: string) => void;
    addPlayer: (id: string) => void;
    removePlayer: (id: string) => void;
    updatePlayer: (id: string, x: number, y: number) => void;
    init: (state: AppState) => void;
    connectionManager: ConnectionManager;
    players: {
        [key: string]: Player;
    }
    isConnected: boolean;
    currentPlayerId: string;
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
        window.addEventListener("beforeunload", this.onDisconnect.bind(this));
    }

    componentWillUnmount(){
        window.alert('sdasd');
    }

    onConnect(){
        this.props.connect();
        // this.props.addPlayer();
    }

    onDisconnect(event: Event){
        // console.log('on disconnect fired')
        this.props.disconnect(event, this.props.currentPlayerId);
        const disconnectMessage = {
            type: DISCONNECT_MESSAGE,
            data: {
                id: this.props.currentPlayerId
            } as DisconnectData
        } as Message;
        connectionManager.emit(disconnectMessage);
    }

    onUpdate(id: string, x: number, y: number){
        // this.props.updatePlayer(id, x, y);
        const updateMessage = {
            type: UPDATE_PLAYER_MESSAGE,
            data: {
                id,
                x,
                y
            } as UpdatePlayerData
        } as Message;
        connectionManager.emit(updateMessage)
    }



    sendMessage(message: Message){
        connectionManager.emit(message)
    }

    onMessage(message: Message){
        // console.log('recived message')
        // console.log(message)
        switch(message.type){
            case(WELCOME_MESSAGE):
                this.props.init(message.data.state)
                this.props.addPlayer(message.data.id);
                break;
            case(REMOVE_PLAYER_MESSAGE):
                // console.log(`remove player with this message ${message.type}`)
                this.props.removePlayer(message.data.id);
                break;
            case(ADD_PLAYER_MESSAGE):
                // console.log(`add player with this message ` )
                this.props.addPlayer(message.data.id)
                break;
            case(UPDATE_PLAYER_MESSAGE):
                this.props.updatePlayer(message.data.id, message.data.x, message.data.y)
                break;
            default:
                var x = 2;
                break;
        }
    }

    render() {
        // console.log('renderings')
        // console.log(this.props)
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
                        <ConnectedGameWrapper update={this.onUpdate.bind(this)}></ConnectedGameWrapper>
                        <ConnectedPlayerListWrapper></ConnectedPlayerListWrapper>
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
        disconnect: (event: Event, id: string) => dispatch(disconnect(event, id)),
        addPlayer: (id: string) => dispatch(addPlayer(id)),
        removePlayer: (id: string) => dispatch(removePlayer(id)),
        init: (state: AppState) => dispatch(init(state)),
        updatePlayer: (id: string, x: number, y: number) => dispatch(updatePlayer(id, x, y))
    };
}

const ConnectedApplication = redux.connect(mapStateToProps, mapDispatchToProps)(Application)

export default ConnectedApplication;
