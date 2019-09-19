import React from 'react';
import GameWrapper from '../game/game_wrapper';
import PlayerListWrapper from '../player_list/player_list_wrapper';
import PlayerDetailWrapper from '../player_detail/player_detail_wrapper';
import HeaderWrapper from '../header/header_wrapper';
import ConnectionManager from '../../util/connection_manager'
import Error from '../util/error';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { rootReducer } from '../../reducers/root_reducer';
// import io from 'socket.io';
// import openSocket from 'socket.io-client';
import { connect, disconnect } from '../../reducers/connection_reducer';
import { ActionCreator } from 'redux';


export interface AppState {
    players: Player[];
    error?: string;
    isConnected: boolean;
}

export interface Player {
    ip: string;
    name: string;
    x: number;
    y: number;
}

export interface AppProps {};

const connectionManager = new ConnectionManager();
const store = createStore(rootReducer);

class Application extends React.Component<AppProps, AppState>{
    constructor(props: AppProps){
        super(props);
        this.state = {
            players: [],
            isConnected: false,
            error: undefined
        } as AppState;
        console.log(store.getState())
        const unsubscribe = store.subscribe(() => console.log(store.getState()))
        store.dispatch(connect());
        store.dispatch(disconnect())


    }

    componentDidMount(){
        connectionManager.connect(
            this.onConnect.bind(this),
            this.onDisconnect.bind(this)
        );     
    }

    onConnect(event: Event){
        this.setState({isConnected: true});
    }

    onDisconnect(event: CloseEvent){
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
                <Provider store={store}>
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
                </Provider>
            )
        }

    }
}
export default Application;