import React from 'react';
import ConnectedGameWrapper from '../game/game_wrapper';
import PlayerDetailWrapper from '../player_detail/player_detail_wrapper';
import HeaderWrapper from '../header/header_wrapper';
import ConnectionManager from '../../util/connection_manager'
import Error from '../util/error';
import { createStore} from 'redux';
import *  as redux from 'react-redux';
import { ActionCreator } from 'redux';
import { connect, disconnect, update, init } from '../../reducers/root_reducer'
import ConnectedPlayerListWrapper from '../player_list/player_list_wrapper';
import { AppState, Player } from '../../types/app_state';
import { disconnectMessage, updatePlayerMessage, Message, WELCOME_MESSAGE, UPDATE_MESSAGE } from '../../types/messages';

export interface AppProps {
    connect: () => void;
    disconnect: (event: Event, id: string) => void;
    update: (state: AppState) => void;
    init: (playerId: string, state: AppState) => void;
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
        // Dispatch connect action
        this.props.connect();
    }

    onDisconnect(event: Event){
        // Dispatch disconnectaction
        this.props.disconnect(event, this.props.currentPlayerId);
        // Alert server of disconnect
        connectionManager.emit(disconnectMessage(this.props.currentPlayerId));
    }

    onPlayerUpdate(player: Player){
        connectionManager.emit(updatePlayerMessage(player));
    }



    sendMessage(message: Message){
        connectionManager.emit(message)
    }

    onMessage(message: Message){
        // console.log('recived message')
        // console.log(message)
        switch(message.type){
            case(WELCOME_MESSAGE):
                this.props.init(message.data.id, message.data.state)
                // this.props.addPlayer(message.data.id);
                break;
            case(UPDATE_MESSAGE):
                console.log('recieved update message')
                this.props.update(message.data.state)
                break;
            default:
                var x = 2;
                break;
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
                        <ConnectedGameWrapper update={this.onPlayerUpdate.bind(this)}></ConnectedGameWrapper>
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
        update: (state: AppState) => dispatch(update(state)),
        init: (playerId: string, state: AppState) => dispatch(init(playerId, state))
    };
}

const ConnectedApplication = redux.connect(mapStateToProps, mapDispatchToProps)(Application)

export default ConnectedApplication;
