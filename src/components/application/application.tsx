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
import { connect, disconnect } from '../../reducers/connection_reducer';
import { ActionCreator } from 'redux';
// import { store } from '../../App';



export interface AppState {
    error?: string;
    isConnected: boolean;
}

export interface Player {
    ip: string;
    name: string;
    x: number;
    y: number;
}

export interface AppProps {
    connect: () => void;
    disconnect: (reason: string) => void;
    connectionManager: ConnectionManager;
    players: Player[];
};

const connectionManager = new ConnectionManager();
// const store = createStore(rootReducer);

class Application extends React.Component<AppProps, AppState>{
    constructor(props: AppProps){
        super(props);
        this.state = {
            isConnected: false,
            error: undefined
        } as AppState;
    }

    componentDidMount(){
        // Hooking into optional open/close
        // events for connectionManager 
        connectionManager.onOpen = this.onConnect.bind(this);
        connectionManager.onClose = this.onDisconnect.bind(this);
        // Attempt to open socket
        connectionManager.connect(); 
    }

    onConnect(){
        // dispatch connect action
        this.props.connect();
        this.setState({ isConnected: true });
    }

    onDisconnect(reason: string){
        // dispath disconnect action
        this.props.disconnect(reason);
        this.setState({ isConnected: false});
    }

    

    render() {
        if (!this.state.isConnected){
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
    return state;
}

export const mapDispatchToProps = (dispatch: Function) => {
    return {
        connect: () => dispatch(connect()),
        disconnect: (reason: string ) => dispatch(disconnect(reason))
    };
}

const ConnectedApplication = redux.connect(mapStateToProps, mapDispatchToProps)(Application)

export default ConnectedApplication;
