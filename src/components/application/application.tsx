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

export interface AppProps {
    // connect: () => void;
};

const connectionManager = new ConnectionManager();
// const store = createStore(rootReducer);


class Application extends React.Component<AppProps, AppState>{
    constructor(props: AppProps){
        super(props);
        this.state = {
            players: [],
            isConnected: false,
            error: undefined
        } as AppState;
        // console.log(store.getState())
        // const unsubscribe = store.subscribe(() => console.log(store.getState()))
        // store.dispatch(open());
        // store.dispatch(disconnect())
    }

    componentDidMount(){
        // this.props.connect();
        connectionManager.connect();   
        // store.dispatch(connect());
        // this.setState({isConnected: true});
    }

    onConnect(event: Event){
        // this.setState({isConnected: true});
    }

    onDisconnect(event: CloseEvent){
        // this.setState({ isConnected: false});
    }

    render() {
        console.log('rendering')
        console.log(this.state.isConnected)
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
    // console.log(state)
    // console.log('connected map state to props!')
    return state;
}

export const mapDispatchToProps = (dispatch: Function) => {
    return {
        // connect: () => dispatch(connect()),
    };
}

const ConnectedApplication = redux.connect(mapStateToProps, mapDispatchToProps)(Application)

export default ConnectedApplication;
// export default Application;